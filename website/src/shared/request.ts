import { PUBLIC_PATH } from './constant';
import type { Metrics } from '../../../scripts/src/shared/types';

export type MetricsMap = Record<string, Metrics & { time: number }>;

export type CommitInfo = {
  id: string;
  time: number;
};

export type FetchedMetrics = CommitInfo & {
  metrics: Record<string, any>;
};

const fetchJsonWithCache = async (url: string) => {
  const data = await fetch(url)
    .then(res => res.json())
    .catch(() => {});
  return data;
};

export const fetchMetrics = async (
  productName: string,
  caseName: string,
): Promise<FetchedMetrics[]> => {
  const allMetrics: MetricsMap = await fetchJsonWithCache(
    PUBLIC_PATH + `/data/${productName}/${caseName}.json`,
  );

  return Object.keys(allMetrics).map(id => {
    return {
      id,
      time: allMetrics[id].time,
      metrics: allMetrics[id],
    };
  });
};
