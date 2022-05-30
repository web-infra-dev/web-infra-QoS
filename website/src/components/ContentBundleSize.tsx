import { Card, Typography } from '@arco-design/web-react';
import { BUNDLE_SIZE_METRICS } from '@/constant';
import { Filters } from './Filters';

export const ContentBundleSize = () => {
  return (
    <div style={{ padding: 24 }}>
      <Filters metrics={BUNDLE_SIZE_METRICS} />
      <Card bordered={false}>
        <Typography.Title heading={6} style={{ marginTop: 0 }}>
          Trending
        </Typography.Title>
      </Card>
    </div>
  );
};
