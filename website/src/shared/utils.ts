import dayjs from 'dayjs';
import { FetchedMetrics } from './request';

export const formatDate = (time: number) =>
  dayjs(time).format('YY-MM-DD HH:mm');

export const formatDateWithId = (item: FetchedMetrics) =>
  `${formatDate(item.time)}（${item.id}）`;

export const formatFileSize = (size: number, target = 'KB') => {
  if (target === 'KB') {
    size = size / 1024;
  } else if (target === 'MB') {
    size = size / 1024 / 1024;
  }
  return Number(size.toFixed(2));
};

export const formatSecond = (ms: number) => Number((ms / 1000).toFixed(2));

export const mergeData = (
  results: FetchedMetrics[][],
  caseNames: string[],
  metricsNames: string[],
) => {
  const mergedData: {
    id: string;
    time: number;
    metrics: Record<string, any>;
    caseName: string;
    metricsName: string;
  }[] = [];

  results.forEach((data, index) => {
    const mergedDataForCase = data.map(item => ({
      ...item,
      caseName: caseNames[index],
      metricsName: metricsNames[index],
    }));

    mergedData.push(...mergedDataForCase);
  });

  return mergedData
    .sort((a, b) => a.time - b.time)
    .filter(item => item.metrics[item.metricsName]);
};
