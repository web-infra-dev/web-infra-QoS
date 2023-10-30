import { BASE_PADDING, PRODUCT_CASES } from '@/shared/constant';
import {
  Card,
  Grid,
  Form,
  Button,
  Select,
  FormProps,
  Typography,
} from '@arco-design/web-react';
import { useState } from 'react';

const SelectGroup = ({
  index,
  productName,
  metrics,
  initialCase,
}: {
  index: number;
  productName: string;
  metrics: string[];
  initialCase: string[];
}) => {
  return (
    <>
      <Typography.Title heading={6} style={{ marginTop: index > 1 ? 12 : 0 }}>
        Group{index}:
      </Typography.Title>
      <Grid.Row gutter={40}>
        <Grid.Col span={8}>
          <Form.Item
            label="Case"
            field={`caseName${index}`}
            initialValue={initialCase[index - 1]}
            style={{ marginBottom: 8 }}
          >
            <Select>
              {PRODUCT_CASES[productName]?.map(caseName => (
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
            field={`metricsName${index}`}
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
    </>
  );
};

export const Filters = (props: {
  productName: string;
  metrics: string[];
  onSubmit: FormProps['onSubmit'];
  initialCase: string[];
}) => {
  return (
    <Card bordered={false} style={{ marginBottom: BASE_PADDING }}>
      <Form layout="horizontal" labelAlign="left" onSubmit={props.onSubmit}>
        <SelectGroup {...props} index={1} />
        <SelectGroup {...props} index={2} />
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: 120, marginTop: 12 }}
        >
          Query
        </Button>
      </Form>
    </Card>
  );
};

export const useFilterResult = (
  defaultCaseNames: string[],
  defaultMetricsName: string,
) => {
  const [caseNames, setCaseNames] = useState(defaultCaseNames);
  const [metricsNames, setMetricsNames] = useState([
    defaultMetricsName,
    defaultMetricsName,
  ]);

  const onSubmitForm = (params: {
    caseName1: string;
    caseName2: string;
    metricsName1: string;
    metricsName2: string;
  }) => {
    setCaseNames([params.caseName1, params.caseName2]);
    setMetricsNames([params.metricsName1, params.metricsName2]);
  };

  return {
    caseNames,
    metricsNames,
    onSubmitForm,
  };
};
