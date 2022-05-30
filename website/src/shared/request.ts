import { COMMITS_INFO_URL } from './constant';
import type { Metrics } from '../../../scripts/src/shared/types';

export type CommitInfo = {
  id: string;
  time: number;
};

let commitsInfo: CommitInfo[];

export type FetchedMetrics = CommitInfo & {
  metrics: Record<string, any>;
};

export const fetchCommitsInfo = async () => {
  commitsInfo = await fetch(COMMITS_INFO_URL).then(res => res.json());
  return commitsInfo;
};

export const fetchMetrics = async (
  caseName: string,
): Promise<FetchedMetrics[]> => {
  const commitsInfo = await fetchCommitsInfo();

  const allMetrics: Metrics[] = await Promise.all(
    commitsInfo.map(info =>
      fetch(`./${info.id}/${caseName}.json`)
        .then(res => res.json())
        .catch(() => {}),
    ),
  );

  return allMetrics
    .map((metrics, index) => ({
      ...commitsInfo[index],
      metrics,
    }))
    .filter(item => !!item.metrics);
};
