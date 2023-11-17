import { readJson } from 'fs-extra';
import { Metrics } from './shared/types';
import { DefaultBenchCase, getMetricsPath } from './shared';

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
) {
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
    table.push(row);
  });

  return table.join('\n');
}

export async function compare(productName: string) {
  const caseName =
    process.argv[3] ||
    DefaultBenchCase[productName as keyof typeof DefaultBenchCase];
  const { jsonPath } = await getMetricsPath(productName, caseName);
  const allMetrics: Metrics[] = await readJson(jsonPath);
  const keys = Object.keys(allMetrics);
  const currentKey = keys[keys.length - 1];
  const baseKey = keys[keys.length - 2];
  const current = allMetrics[currentKey as any];
  const base = allMetrics[baseKey as any];

  const formatTable = generateTable(base, current);
  console.log(`case: ${caseName}`);
  console.log(formatTable);
}

compare(productName);
