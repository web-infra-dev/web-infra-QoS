import { Card, Grid, Table, Typography } from '@arco-design/web-react';
import { BASE_PADDING } from '@/shared/constant';
import type { FetchedMetrics } from '@/shared/request';
import { formatFileSize } from '@/shared/utils';

const columns = [
  {
    title: 'File',
    dataIndex: 'file',
  },
  {
    title: 'Size',
    dataIndex: 'size',
  },
];

const FileSizeTable = (props: {
  data: FetchedMetrics[];
  caseName: string;
  metricsName: string;
}) => {
  const latestData = props.data[props.data.length - 1];
  const { files = {} } = latestData.metrics[props.metricsName] || {};
  const tableData = Object.keys(files)
    .sort((key1, key2) => files[key2] - files[key1])
    .map(key => ({
      key,
      file: key,
      size: `${formatFileSize(files[key])} KB`,
    }));
  return (
    <Grid.Col span={12}>
      <Typography.Title heading={6} style={{ marginTop: 0 }}>
        {props.caseName}
      </Typography.Title>
      <Table columns={columns} data={tableData} />
    </Grid.Col>
  );
};

export const BundleSizeDetail = ({
  data,
  caseNames,
  metricsNames,
}: {
  data: FetchedMetrics[][] | null;
  caseNames: string[];
  metricsNames: string[];
}) => {
  return (
    <Card bordered={false} style={{ marginTop: BASE_PADDING }}>
      <Typography.Title heading={5} style={{ marginTop: 0 }}>
        File Detail
      </Typography.Title>
      Size of all files in the latest commit.
      <Grid.Row gutter={40} style={{ marginTop: BASE_PADDING }}>
        {data &&
          data.map((singleData, index) => (
            <FileSizeTable
              key={caseNames[index] + metricsNames[index]}
              data={singleData}
              caseName={caseNames[index]}
              metricsName={metricsNames[index]}
            />
          ))}
      </Grid.Row>
    </Card>
  );
};
