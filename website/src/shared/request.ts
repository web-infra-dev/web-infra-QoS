import type { Metrics } from '../../../scripts/src/shared/types';
import * as localForage from 'localforage';

export type MetricsMap = Record<string, Metrics & { time: number }>;

export type CommitInfo = {
  id: string;
  time: number;
};

export type FetchedMetrics = CommitInfo & {
  metrics: Record<string, any>;
};

const fetchJsonWithCache = async (url: string) => {
  const cacheKey = url;
  const cachedData = await localForage
    .getItem<{ data: any; timestamp: number }>(cacheKey)
    .catch(() => {});

  if (cachedData) {
    const { data, timestamp } = cachedData;
    const currentTime = new Date().getTime();
    const cacheExpiration = 12 * 60 * 60 * 1000; // 12 hour in milliseconds

    if (currentTime - timestamp <= cacheExpiration) {
      return data;
    }
  }

  const data = await fetch(url)
    .then(res => res.json())
    .catch(() => {});

  if (data) {
    const cacheData = {
      data,
      timestamp: new Date().getTime(),
    };
    await localForage.setItem(cacheKey, cacheData);
  }

  return data;
};

export const fetchMetrics = async (
  productName: string,
  caseName: string,
): Promise<FetchedMetrics[]> => {
  const allMetrics: MetricsMap = await fetchJsonWithCache(
    `/data/${productName}/${caseName}.json`,
  );

  return Object.keys(allMetrics).map(id => {
    return {
      id,
      time: allMetrics[id].time,
      metrics: allMetrics[id],
    };
  });
};
