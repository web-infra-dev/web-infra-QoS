import axios from 'axios';
import { readJson } from 'fs-extra';
import {
  DefaultBenchCase,
  ValidMetricsForCase,
  getCommitId,
  getCommitLink,
  getMetricsPath,
  getRepoName,
  getRepoPath,
} from './shared';

const productName = process.argv[2] || 'MODERNJS_FRAMEWORK';

const formatFileSize = (size: number, target = 'KB') => {
  if (target === 'KB') {
    size = size / 1024;
  } else if (target === 'MB') {
    size = size / 1024 / 1024;
  }
  return Number(size.toFixed(2));
};

const formatSecond = (ms: number) => Number((ms / 1000).toFixed(2));

function formatValue(value: number, property: string) {
  if (property.endsWith('Time')) {
    return String(formatSecond(value)) + 's';
  } else if (property === 'installSize') {
    return String(formatFileSize(value, 'MB')) + 'MB';
  } else if (property.endsWith('Size')) {
    return String(formatFileSize(value)) + 'KB';
  } else {
    return String(value);
  }
}

function generateTable(
  base: Record<string, number>,
  current: Record<string, number>,
  caseName: string,
) {
  const overThresholdTags: string[] = [];
  const properties = Object.keys(base);

  const maxPropertyLength = Math.max(...properties.map(p => p.length));

  const table = [
    `| Metric${' '.repeat(maxPropertyLength - 6)} | Base${' '.repeat(
      6,
    )} | Current${' '.repeat(3)} | %${' '.repeat(9)} |`,
    `|${'-'.repeat(maxPropertyLength + 2)}|${'-'.repeat(12)}|${'-'.repeat(
      12,
    )}|${'-'.repeat(12)}|`,
  ];

  properties.forEach(property => {
    if (property === 'time') return;

    let limited = 10;

    // TODO: modify this when we add complex Rslib cases
    if (caseName.startsWith('rslib-')) {
      limited = 30;
    }

    if (
      caseName.startsWith('app-') &&
      (property.toLowerCase().indexOf('build') > -1 ||
        property.toLowerCase().indexOf('dev') > -1)
    ) {
      limited = 25;
    }

    const percent =
      ((current[property] - base[property]) * 100) / base[property];
    const formattedPercent =
      percent > 0 ? `+${percent.toFixed(2)}%` : `${percent.toFixed(2)}%`;

    const row = `| ${property.padEnd(maxPropertyLength)} | ${formatValue(
      base[property],
      property,
    ).padEnd(10)} | ${formatValue(current[property], property).padEnd(
      10,
    )} | ${formattedPercent.padEnd(10)} |`;

    if (
      ValidMetricsForCase[
        caseName as keyof typeof ValidMetricsForCase
      ]?.includes(property) ||
      !ValidMetricsForCase[caseName as keyof typeof ValidMetricsForCase]
    ) {
      table.push(row);
      if (
        percent > limited &&
        !property.includes('InstallTime') &&
        property !== 'routeGenerateTime' &&
        property !== 'beforeDevTime' &&
        property !== 'beforeBuildTime' &&
        !(
          caseName.startsWith('module-') &&
          property.toLowerCase().indexOf('build') > -1
        )
      ) {
        overThresholdTags.push(property);
      }
    }
  });

  console.log('');
  console.log(table.join('\n'));
  console.log('');

  return overThresholdTags;
}

export async function compare(productName: string) {
  const cases = DefaultBenchCase[productName as keyof typeof DefaultBenchCase];

  for (const caseName of cases) {
    const { jsonPath, remoteURL } = await getMetricsPath(productName, caseName);

    const allMetrics =
      process.env.MONITOR === '1'
        ? (await axios.get(remoteURL)).data
        : await readJson(jsonPath);

    let arr = Object.keys(allMetrics).map(key => {
      return { key: key, value: allMetrics[key] };
    });

    arr.sort((a, b) => a.value.time - b.value.time);

    let currentKey = arr[arr.length - 1].key;
    let baseKey = arr[arr.length - 2]?.key || currentKey;

    if (process.env.MONITOR !== '1') {
      const repoPath = getRepoPath(getRepoName(productName));
      const id = await getCommitId(repoPath);
      if (id !== currentKey) {
        baseKey = currentKey;
        currentKey = id;
      }
    }

    const current = allMetrics[currentKey as any];
    const base = allMetrics[baseKey as any];
    const baseCommitLink = getCommitLink(productName, baseKey);
    const currentCommitLink = getCommitLink(productName, currentKey);

    console.log(`case: ${caseName}`);
    console.log('base: ', baseCommitLink);
    console.log('current: ', currentCommitLink);

    const overThresholdTags = generateTable(base, current, caseName);

    if (overThresholdTags.length > 0) {
      console.log('');
      console.log(
        `Threshold exceeded in ${caseName}: `,
        JSON.stringify(overThresholdTags),
      );
      console.log('');
    }
  }
}

compare(productName);
