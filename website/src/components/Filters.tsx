import { CASES } from '@/shared/constant';
import {
  Card,
  Grid,
  Form,
  Button,
  Select,
  FormProps,
  Typography,
} from '@arco-design/web-react';

export const Filters = (props: {
  metrics: string[];
  onSubmit: FormProps['onSubmit'];
  initialCase: string;
}) => {
  const { metrics } = props;
  return (
    <Card bordered={false} style={{ marginBottom: 24 }}>
      <Form layout="vertical" onSubmit={props.onSubmit}>
        <Typography.Title heading={6} style={{ marginTop: 0 }}>
          Filters
        </Typography.Title>
        <Grid.Row gutter={40}>
          <Grid.Col span={8}>
            <Form.Item
              label="Case"
              field="caseName"
              initialValue={props.initialCase}
              style={{ marginBottom: 8 }}
            >
              <Select>
                {CASES.map(caseName => (
                  <Select.Option key={caseName} value={caseName}>
                    {caseName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={8}>
            <Form.Item
              label="Metrics"
              field="metricsName"
              initialValue={metrics[0]}
              style={{ marginBottom: 8 }}
            >
              <Select>
                {metrics.map(name => (
                  <Select.Option key={name} value={name}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Grid.Col>
        </Grid.Row>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: 120, marginTop: 10 }}
        >
          Query
        </Button>
      </Form>
    </Card>
  );
};
