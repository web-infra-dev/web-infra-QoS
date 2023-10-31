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
        Add category by Cases and Metrics:
      </Typography.Title>
      <Grid.Row gutter={40}>
        <Grid.Col span={8}>
          <Form.Item
            label="Case"
            field={`caseName${index}`}
            initialValue={initialCase[0]}
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
  handleAddData: FormProps['onSubmit'];
  initialCase: string[];
}) => {
  return (
    <Card bordered={false} style={{ marginBottom: BASE_PADDING }}>
      <Form
        layout="horizontal"
        labelAlign="left"
        onSubmit={props.handleAddData}
      >
        <SelectGroup {...props} index={1} />
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: 120, marginTop: 12 }}
        >
          Add
        </Button>
      </Form>
    </Card>
  );
};

export const useFilterResult = (
  defaultCaseNames: string[],
  defaultMetricsName: string,
) => {
  const [data, setData] = useState([
    {
      case: defaultCaseNames[0],
      metric: defaultMetricsName,
    },
  ]);
  const [caseNames, setCaseNames] = useState([defaultCaseNames[0]]);
  const [metricsNames, setMetricsNames] = useState([defaultMetricsName]);

  const handleAddData = (params: {
    caseName1: string;
    metricsName1: string;
  }) => {
    const choice = { case: params.caseName1, metric: params.metricsName1 };
    if (
      !data.some(
        item =>
          item.case === params.caseName1 && item.metric === params.metricsName1,
      )
    ) {
      setData([...data, choice]);
      setCaseNames([...caseNames, params.caseName1]);
      setMetricsNames([...metricsNames, params.metricsName1]);
    }
  };

  return {
    caseNames,
    metricsNames,
    handleAddData,
  };
};
