import { Line } from '@antv/g2plot';
import { Card, Typography } from '@arco-design/web-react';
import {
  BASE_PADDING,
  INSTALL_SPEED_METRICS,
  INSTALL_SPEED_DEFAULT_CASE,
  LINE_CHART_DEFAULT_CONFIG,
} from '@/shared/constant';
import { Filters, useFilterResult } from './Filters';
import { useEffect, useRef } from 'react';
import { FetchedMetrics, fetchMetrics } from '@/shared/request';
import {
  mergeData,
  formatSecond,
  formatFileSize,
  formatDateWithId,
} from '@/shared/utils';

const formatData = (
  results: FetchedMetrics[][],
  caseNames: string[],
  metricsNames: string[],
) =>
  mergeData(results, caseNames, metricsNames).map(item => {
    let y: number;
    const initialValue = item.metrics[item.metricsName];

    switch (item.metricsName) {
      case 'installSize':
        y = formatFileSize(initialValue, 'MB');
        break;
      case 'hotInstallTime':
      case 'coldInstallTime':
        y = formatSecond(initialValue);
        break;
      default:
        y = initialValue;
        break;
    }

    return {
      metricsName: item.metricsName,
      category: `${item.caseName}_${item.metricsName}`,
      x: formatDateWithId(item),
      y,
    };
  });

export const ContentInstallSpeed = (props: { productIndex: string }) => {
  const chartRoot = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<Line | null>(null);
  const { categories, handleAddData, renderChoicesTags } = useFilterResult(
    INSTALL_SPEED_DEFAULT_CASE[props.productIndex],
    INSTALL_SPEED_METRICS[props.productIndex][0],
  );
  const productName = props.productIndex;
  const caseNames = categories.map(item => item.case);
  const metricsNames = categories.map(item => item.metric);

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
        tooltip: {
          fields: ['x', 'y', 'category', 'metricsName'],
          formatter: (datum: any) => {
            let value = datum.y;
            if (datum.metricsName === 'installSize') {
              value += 'MB';
            }
            if (
              datum.metricsName === 'coldInstallTime' ||
              datum.metricsName === 'hotInstallTime'
            ) {
              value += 's';
            }
            return {
              name: datum.category,
              value,
            };
          },
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
  }, [categories]);

  return (
    <div style={{ padding: BASE_PADDING }}>
      <Filters
        productName={props.productIndex}
        metrics={INSTALL_SPEED_METRICS[props.productIndex]}
        initialCase={caseNames}
        handleAddData={handleAddData}
        renderChoicesTags={renderChoicesTags}
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
