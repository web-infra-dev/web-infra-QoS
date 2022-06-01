import { Line } from '@antv/g2plot';
import { Card, Typography } from '@arco-design/web-react';
import { BundleSizeDetail } from './BundleSizeDetail';
import {
  BUNDLE_SIZE_METRICS,
  BUNDLE_SIZE_DEFAULT_CASE,
  LINE_CHART_DEFAULT_CONFIG,
  BASE_PADDING,
} from '@/shared/constant';
import { Filters } from './Filters';
import { useEffect, useRef, useState } from 'react';
import { FetchedMetrics, fetchMetrics } from '@/shared/request';
import { formatDate, formatFileSize, mergeData } from '@/shared/utils';

const formatData = (
  data1: FetchedMetrics[],
  data2: FetchedMetrics[],
  caseNames: string[],
  metricsNames: string[],
) =>
  mergeData(data1, data2, caseNames, metricsNames).map(item => ({
    category: caseNames[0] === caseNames[1] ? item.metricsName : item.caseName,
    date: `${formatDate(item.time)}（${item.id}）`,
    size: formatFileSize(item.metrics[item.metricsName].total),
  }));

export const ContentBundleSize = () => {
  const chartRoot = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<Line | null>(null);
  const [caseNames, setCaseNames] = useState(BUNDLE_SIZE_DEFAULT_CASE);
  const [metricsNames, setMetricsNames] = useState([
    BUNDLE_SIZE_METRICS[0],
    BUNDLE_SIZE_METRICS[0],
  ]);
  const [data, setData] = useState<FetchedMetrics[][] | null>(null);

  const renderLineChart = ({
    root,
    data1,
    data2,
    caseNames,
    metricsNames,
  }: {
    root: HTMLElement | null;
    data1: FetchedMetrics[];
    data2: FetchedMetrics[];
    caseNames: string[];
    metricsNames: string[];
  }) => {
    const data = formatData(data1, data2, caseNames, metricsNames);
    if (chartInstance.current) {
      chartInstance.current.changeData(data);
    } else if (root) {
      chartInstance.current = new Line(root, {
        ...LINE_CHART_DEFAULT_CONFIG,
        data,
        yField: 'size',
        yAxis: {
          label: {
            formatter: text => `${text} KB`,
          },
        },
        tooltip: {
          fields: ['date', 'size', 'category'],
          formatter: datum => ({
            name: datum.category,
            value: `${datum.size} KB`,
          }),
        },
      });

      chartInstance.current.render();
    }
  };

  const onSubmitForm = (params: {
    caseName1: string;
    caseName2: string;
    metricsName1: string;
    metricsName2: string;
  }) => {
    setCaseNames([params.caseName1, params.caseName2]);
    setMetricsNames([params.metricsName1, params.metricsName2]);
  };

  useEffect(() => {
    Promise.all([fetchMetrics(caseNames[0]), fetchMetrics(caseNames[1])]).then(
      ([data1, data2]) => {
        setData([data1, data2]);
        renderLineChart({
          data1,
          data2,
          caseNames,
          metricsNames,
          root: chartRoot.current,
        });
      },
    );
  }, [caseNames, metricsNames]);

  return (
    <div style={{ padding: BASE_PADDING }}>
      <Filters
        metrics={BUNDLE_SIZE_METRICS}
        initialCase={caseNames}
        onSubmit={onSubmitForm}
      />
      <Card bordered={false} style={{ height: 464 }}>
        <Typography.Title heading={5} style={{ marginTop: 0 }}>
          Trending
        </Typography.Title>
        <div ref={chartRoot} />
      </Card>
      <BundleSizeDetail
        data={data}
        caseNames={caseNames}
        metricsNames={metricsNames}
      />
    </div>
  );
};
