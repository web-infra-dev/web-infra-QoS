import { Line } from '@antv/g2plot';
import { Card, Typography } from '@arco-design/web-react';
import { BUNDLE_SIZE_METRICS } from '@/shared/constant';
import { Filters } from './Filters';
import { useEffect } from 'react';
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

export const ContentBundleSize = (props: {
  caseName: string;
  metricsName: string;
}) => {
  useEffect(() => {
    fetchMetrics(props.caseName).then(response => {
      const line = new Line('line-chart', {
        data: formatData(response, props.metricsName),
        point: {
          size: 4,
          style: {
            fill: 'white',
            stroke: '#5B8FF9',
            lineWidth: 2,
          },
        },
        xField: 'date',
        yField: 'size',
      });

      line.render();
    });
  }, [props.caseName, props.metricsName]);

  return (
    <div style={{ padding: 24 }}>
      <Filters metrics={BUNDLE_SIZE_METRICS} />
      <Card bordered={false}>
        <Typography.Title heading={6} style={{ marginTop: 0 }}>
          Trending
        </Typography.Title>
        <div id="line-chart"></div>
      </Card>
    </div>
  );
};
