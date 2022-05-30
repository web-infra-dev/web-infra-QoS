import { Line } from '@antv/g2plot';
import { Card, Typography } from '@arco-design/web-react';
import { BUNDLE_SIZE_METRICS, CASES } from '@/shared/constant';
import { Filters } from './Filters';
import { useEffect, useState } from 'react';
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

let lineChart: Line;

const renderLineChart = (metrics: FetchedMetrics[], metricsName: string) => {
  if (lineChart) {
    lineChart.changeData(formatData(metrics, metricsName));
  } else {
    lineChart = new Line('line-chart', {
      data: formatData(metrics, metricsName),
      height: 400,
      xField: 'date',
      yField: 'size',
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

    lineChart.render();
  }
};

export const ContentBundleSize = () => {
  const [caseName, setCaseName] = useState(CASES[0]);
  const [metricsName, setMetricsName] = useState(BUNDLE_SIZE_METRICS[0]);

  const onSubmitForm = (params: { caseName: string; metricsName: string }) => {
    setCaseName(params.caseName);
    setMetricsName(params.metricsName);
  };

  useEffect(() => {
    fetchMetrics(caseName).then(response => {
      renderLineChart(response, metricsName);
    });
  }, [caseName, metricsName]);

  return (
    <div style={{ padding: 24 }}>
      <Filters metrics={BUNDLE_SIZE_METRICS} onSubmit={onSubmitForm} />
      <Card bordered={false} style={{ height: 464 }}>
        <Typography.Title heading={6} style={{ marginTop: 0 }}>
          Trending
        </Typography.Title>
        <div id="line-chart"></div>
      </Card>
    </div>
  );
};
