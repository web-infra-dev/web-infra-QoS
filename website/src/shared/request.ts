import { COMMITS_INFO_URL, PUBLIC_PATH } from './constant';
import type { Metrics } from '../../../scripts/src/shared/types';

export type CommitInfo = {
  id: string;
  time: number;
};

export type FetchedMetrics = CommitInfo & {
  metrics: Record<string, any>;
};

const map = new Map();

const cache = {
  get(key: string) {
    if (map.has(key)) {
      return map.get(key);
    }
    const data = localStorage.getItem(key);
    if (data) {
      try {
        map.set(key, JSON.parse(data));
      } catch (err) {
        return undefined;
      }
    }
    return map.get(key);
  },
  set(key: string, data: Record<string, unknown>) {
    if (data) {
      map.set(key, data);
      localStorage.setItem(key, JSON.stringify(data));
    }
  },
};

const fetchJsonWithCache = async (url: string) => {
  const cachedValue = cache.get(url);
  if (cachedValue) {
    return cachedValue;
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
