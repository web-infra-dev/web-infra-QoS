import { Line } from '@antv/g2plot';
import { Card, Typography } from '@arco-design/web-react';
import {
  COMPILE_SPEED_METRICS,
  COMPILE_SPEED_DEFAULT_CASE,
  LINE_CHART_DEFAULT_CONFIG,
  BASE_PADDING,
} from '@/shared/constant';
import { Filters, useFilterResult } from './Filters';
import { useEffect, useRef } from 'react';
import { FetchedMetrics, fetchMetrics } from '@/shared/request';
import { formatDateWithId, formatSecond, mergeData } from '@/shared/utils';

const formatData = (
  data1: FetchedMetrics[],
  data2: FetchedMetrics[],
  caseNames: string[],
  metricsNames: string[],
) =>
  mergeData(data1, data2, caseNames, metricsNames).map(item => ({
    category: caseNames[0] === caseNames[1] ? item.metricsName : item.caseName,
    x: formatDateWithId(item),
    y: formatSecond(item.metrics[item.metricsName]),
  }));

export const ContentCompileSpeed = (props: { productIndex: string }) => {
  const chartRoot = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<Line | null>(null);
  const { caseNames, metricsNames, onSubmitForm } = useFilterResult(
    COMPILE_SPEED_DEFAULT_CASE[props.productIndex],
    COMPILE_SPEED_METRICS[props.productIndex][0],
  );
  const productName = props.productIndex;

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
            formatter: (text: string) => `${text} s`,
          },
        },
        tooltip: {
          fields: ['x', 'y', 'category'],
          formatter: (datum: any) => ({
            name: datum.category,
            value: datum.y + 's',
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
      renderLineChart({
        data1,
        data2,
        caseNames,
        metricsNames,
        root: chartRoot.current,
      });
    });
  }, [caseNames, metricsNames]);

  return (
    <div style={{ padding: BASE_PADDING }}>
      <Filters
        productName={props.productIndex}
        metrics={COMPILE_SPEED_METRICS[props.productIndex]}
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
