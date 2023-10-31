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
  results: FetchedMetrics[][],
  caseNames: string[],
  metricsNames: string[],
) =>
  mergeData(results, caseNames, metricsNames).map(item => ({
    category: `${item.caseName}_${item.metricsName}`,
    x: formatDateWithId(item),
    y: formatSecond(item.metrics[item.metricsName]),
  }));

export const ContentCompileSpeed = (props: { productIndex: string }) => {
  const chartRoot = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<Line | null>(null);
  const { caseNames, metricsNames, handleAddData } = useFilterResult(
    COMPILE_SPEED_DEFAULT_CASE[props.productIndex],
    COMPILE_SPEED_METRICS[props.productIndex][0],
  );
  const productName = props.productIndex;

  const renderLineChart = ({
    root,
    results,
    caseNames,
    metricsNames,
  }: {
    root: HTMLElement | null;
    results: FetchedMetrics[][];
    caseNames: string[];
    metricsNames: string[];
  }) => {
    const data = formatData(results, caseNames, metricsNames);
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
          nice: true,
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
    const fetchDataForCaseNames = async () => {
      const promises = caseNames.map(caseName =>
        fetchMetrics(productName, caseName),
      );
      const results = await Promise.all(promises);
      renderLineChart({
        results,
        caseNames,
        metricsNames,
        root: chartRoot.current,
      });
    };

    fetchDataForCaseNames();
  }, [productName, caseNames, metricsNames]);

  return (
    <div style={{ padding: BASE_PADDING }}>
      <Filters
        productName={props.productIndex}
        metrics={COMPILE_SPEED_METRICS[props.productIndex]}
        initialCase={caseNames}
        handleAddData={handleAddData}
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
