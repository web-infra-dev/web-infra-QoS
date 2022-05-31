import { Line } from '@antv/g2plot';
import { Card, Typography } from '@arco-design/web-react';
import {
  COMPILE_SPEED_METRICS,
  COMPILE_SPEED_DEFAULT_CASE,
} from '@/shared/constant';
import { Filters } from './Filters';
import { useEffect, useRef, useState } from 'react';
import { FetchedMetrics, fetchMetrics } from '@/shared/request';
import { formatDate, formatSecond } from '@/shared/utils';

const formatData = (response: FetchedMetrics[], metricsName: string) =>
  response.map(item => ({
    date: `${formatDate(item.time)}（${item.id}）`,
    time: formatSecond(item.metrics[metricsName]),
  }));

export const ContentCompileSpeed = () => {
  const chartRoot = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<Line | null>(null);
  const [caseName, setCaseName] = useState(COMPILE_SPEED_DEFAULT_CASE);
  const [metricsName, setMetricsName] = useState(COMPILE_SPEED_METRICS[0]);

  const renderLineChart = (
    metrics: FetchedMetrics[],
    metricsName: string,
    root: HTMLElement | null,
  ) => {
    if (chartInstance.current) {
      chartInstance.current.changeData(formatData(metrics, metricsName));
    } else if (root) {
      chartInstance.current = new Line(root, {
        data: formatData(metrics, metricsName),
        height: 400,
        xField: 'date',
        yField: 'time',
        xAxis: {
          label: {
            formatter: text => text.split(' ')[0],
          },
        },
        yAxis: {
          label: {
            formatter: text => `${text} s`,
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
          formatter: datum => ({
            name: 'Time',
            value: datum.time + 's',
          }),
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
        metrics={COMPILE_SPEED_METRICS}
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
