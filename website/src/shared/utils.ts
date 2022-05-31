import dayjs from 'dayjs';
import { FetchedMetrics } from './request';

export const formatDate = (time: number) =>
  dayjs(time).format('YY-MM-DD HH:mm');

export const formatFileSize = (size: number) =>
  Number((size / 1000).toFixed(2));

export const formatSecond = (ms: number) => Number((ms / 1000).toFixed(2));

export const mergeData = (
  data1: FetchedMetrics[],
  data2: FetchedMetrics[],
  caseNames: string[],
  metricsNames: string[],
) =>
  [
    ...data1.map(item => ({
      ...item,
      caseName: caseNames[0],
      metricsName: metricsNames[0],
    })),
    ...data2.map(item => ({
      ...item,
      caseName: caseNames[1],
      metricsName: metricsNames[1],
    })),
  ].sort((a, b) => a.time - b.time);
