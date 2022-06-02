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
  data1: FetchedMetrics[],
  data2: FetchedMetrics[],
  caseNames: string[],
  metricsNames: string[],
) =>
  mergeData(data1, data2, caseNames, metricsNames).map(item => {
    let y: number;
    const initialValue = item.metrics[item.metricsName];

    switch (item.metricsName) {
      case 'yarnInstallSize':
        y = formatFileSize(initialValue, 'MB');
        break;
      case 'yarnHotInstallTime':
      case 'yarnColdInstallTime':
        y = formatSecond(initialValue);
        break;
      default:
        y = initialValue;
        break;
    }

    return {
      metricsName: item.metricsName,
      category:
        caseNames[0] === caseNames[1] ? item.metricsName : item.caseName,
      x: formatDateWithId(item),
      y,
    };
  });

export const ContentInstallSpeed = () => {
  const chartRoot = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<Line | null>(null);
  const { caseNames, metricsNames, onSubmitForm } = useFilterResult(
    INSTALL_SPEED_DEFAULT_CASE,
    INSTALL_SPEED_METRICS[0],
  );

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
        tooltip: {
          fields: ['x', 'y', 'category', 'metricsName'],
          formatter: datum => {
            let value = datum.y;
            if (datum.metricsName === 'yarnInstallSize') {
              value += 'MB';
            }
            if (
              datum.metricsName === 'yarnColdInstallTime' ||
              datum.metricsName === 'yarnHotInstallTime'
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
    Promise.all([fetchMetrics(caseNames[0]), fetchMetrics(caseNames[1])]).then(
      ([data1, data2]) => {
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
        metrics={INSTALL_SPEED_METRICS}
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
