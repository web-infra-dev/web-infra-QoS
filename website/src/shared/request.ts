import { COMMITS_INFO_URL, PUBLIC_PATH } from './constant';
import type { Metrics } from '../../../scripts/src/shared/types';

export type CommitInfo = {
  id: string;
  time: number;
};

export type FetchedMetrics = CommitInfo & {
  metrics: Record<string, any>;
};

const cache = new Map();

const fetchJsonWithCache = async (url: string) => {
  if (cache.has(url)) {
    return cache.get(url);
  }
  const data = await fetch(url)
    .then(res => res.json())
    .catch(() => {});
  cache.set(url, data);
  return data;
};

export const fetchCommitsInfo = async () =>
  fetchJsonWithCache(COMMITS_INFO_URL);

export const fetchMetrics = async (
  caseName: string,
): Promise<FetchedMetrics[]> => {
  const commitsInfo: CommitInfo[] = await fetchCommitsInfo();

  const allMetrics: Metrics[] = await Promise.all(
    commitsInfo.map(info =>
      fetchJsonWithCache(PUBLIC_PATH + `/data/${info.id}/${caseName}.json`),
    ),
  );

  return allMetrics
    .map((metrics, index) => ({
      ...commitsInfo[index],
      metrics,
    }))
    .filter(item => !!item.metrics);
};
