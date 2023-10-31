import { Line } from '@antv/g2plot';
import { Card, Typography } from '@arco-design/web-react';
import {
  BUNDLE_SIZE_METRICS,
  BUNDLE_SIZE_DEFAULT_CASE,
  LINE_CHART_DEFAULT_CONFIG,
  BASE_PADDING,
} from '@/shared/constant';
import { Filters, useFilterResult } from './Filters';
import { useEffect, useRef, useState } from 'react';
import { FetchedMetrics, fetchMetrics } from '@/shared/request';
import { formatDateWithId, formatFileSize, mergeData } from '@/shared/utils';

const formatData = (
  data1: FetchedMetrics[],
  data2: FetchedMetrics[],
  caseNames: string[],
  metricsNames: string[],
) =>
  mergeData(data1, data2, caseNames, metricsNames).map(item => ({
    category: caseNames[0] === caseNames[1] ? item.metricsName : item.caseName,
    x: formatDateWithId(item),
    y: formatFileSize(item.metrics[item.metricsName]),
  }));

export const ContentBundleSize = (props: { productIndex: string }) => {
  const chartRoot = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<Line | null>(null);
  const { caseNames, metricsNames, onSubmitForm } = useFilterResult(
    BUNDLE_SIZE_DEFAULT_CASE[props.productIndex],
    BUNDLE_SIZE_METRICS[props.productIndex][0],
  );
  const productName = props.productIndex;
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

        yAxis: {
          label: {
            formatter: (text: string) => `${text} KB`,
          },
          nice: true,
        },
        tooltip: {
          fields: ['x', 'y', 'category'],
          formatter: (datum: any) => ({
            name: datum.category,
            value: `${datum.y} KB`,
          }),
        },
      });

      chartInstance.current.render();
    }
  };

  useEffect(() => {
    Promise.all([
      fetchMetrics(productName, caseNames[0]),
      fetchMetrics(productName, caseNames[1]),
    ]).then(([data1, data2]) => {
      setData([data1, data2]);
      renderLineChart({
        data1,
        data2,
        caseNames,
        metricsNames,
        root: chartRoot.current,
      });
    });
  }, [productName, caseNames, metricsNames]);

  return (
    <div style={{ padding: BASE_PADDING }}>
      <Filters
        productName={props.productIndex}
        metrics={BUNDLE_SIZE_METRICS[props.productIndex]}
        initialCase={caseNames}
        onSubmit={onSubmitForm}
      />
      <Card bordered={false} style={{ height: 464 }}>
        <Typography.Title heading={5} style={{ marginTop: 0 }}>
          Trending
        </Typography.Title>
        <div ref={chartRoot} />
      </Card>
    </div>
  );
};
