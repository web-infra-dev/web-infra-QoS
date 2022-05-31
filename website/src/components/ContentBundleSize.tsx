import { Line } from '@antv/g2plot';
import { Card, Typography } from '@arco-design/web-react';
import {
  BUNDLE_SIZE_METRICS,
  BUNDLE_SIZE_DEFAULT_CASE,
} from '@/shared/constant';
import { Filters } from './Filters';
import { useEffect, useRef, useState } from 'react';
import { FetchedMetrics, fetchMetrics } from '@/shared/request';
import { formatDate, formatFileSize } from '@/shared/utils';

const formatData = (response: FetchedMetrics[], metricsName: string) => {
  return response.map(item => {
    return {
      date: formatDate(item.time),
      size: formatFileSize(item.metrics[metricsName].total),
    };
  });
};

export const ContentBundleSize = () => {
  const chartRoot = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<Line | null>(null);
  const [caseName, setCaseName] = useState(BUNDLE_SIZE_DEFAULT_CASE);
  const [metricsName, setMetricsName] = useState(BUNDLE_SIZE_METRICS[0]);

  const renderLineChart = (
    metrics: FetchedMetrics[],
    metricsName: string,
    root: HTMLElement | null,
  ) => {
    if (chartInstance.current) {
      chartInstance.current.changeData(formatData(metrics, metricsName));
    } else if (root) {
      const data = formatData(metrics, metricsName);
      chartInstance.current = new Line(root, {
        data: formatData(metrics, metricsName),
        height: 400,
        xField: 'date',
        yField: 'size',
        xAxis: {
          label: {
            formatter: text => text.split(' ')[0],
          },
        },
        yAxis: {
          label: {
            formatter: text => `${text} KB`,
          },
        },
        point: {
          size: 4,
          style: {
            fill: 'white',
            stroke: '#5B8FF9',
            lineWidth: 2,
          },
        },
        tooltip: {
          formatter: datum => {
            return { name: 'Total Size', value: datum.size + 'KB' };
          },
        },
      });

      chartInstance.current.render();
    }
  };

  const onSubmitForm = (params: { caseName: string; metricsName: string }) => {
    setCaseName(params.caseName);
    setMetricsName(params.metricsName);
  };

  useEffect(() => {
    fetchMetrics(caseName).then(response => {
      renderLineChart(response, metricsName, chartRoot.current);
    });
  }, [caseName, metricsName]);

  return (
    <div style={{ padding: 24 }}>
      <Filters
        metrics={BUNDLE_SIZE_METRICS}
        initialCase={caseName}
        onSubmit={onSubmitForm}
      />
      <Card bordered={false} style={{ height: 464 }}>
        <Typography.Title heading={6} style={{ marginTop: 0 }}>
          Trending
        </Typography.Title>
        <div ref={chartRoot} />
      </Card>
    </div>
  );
};
