import { BASE_PADDING, PRODUCT_CASES } from '@/shared/constant';
import {
  Card,
  Grid,
  Form,
  Button,
  Select,
  FormProps,
  Typography,
  Tag,
} from '@arco-design/web-react';
import { useState } from 'react';

const SelectGroup = ({
  productName,
  metrics,
  initialCase,
}: {
  productName: string;
  metrics: string[];
  initialCase: string[];
}) => {
  return (
    <>
      <Typography.Title heading={6} style={{ marginBottom: 24 }}>
        Add category by Cases and Metrics:
      </Typography.Title>
      <Grid.Row gutter={40}>
        <Grid.Col span={8}>
          <Form.Item
            label="Case"
            field={`caseName`}
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
            field={`metricsName`}
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
        <Grid.Col span={8}>
          <Button type="primary" htmlType="submit" style={{ width: 120 }}>
            Add
          </Button>
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
  renderChoicesTags?: any;
}) => {
  return (
    <Card bordered={false} style={{ marginBottom: BASE_PADDING }}>
      <Form
        layout="horizontal"
        labelAlign="left"
        onSubmit={props.handleAddData}
      >
        <SelectGroup {...props} />
      </Form>
      {props.renderChoicesTags()}
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
    {
      case: defaultCaseNames[1],
      metric: defaultMetricsName,
    },
  ]);
  const [caseNames, setCaseNames] = useState([...defaultCaseNames]);
  const [metricsNames, setMetricsNames] = useState([defaultMetricsName]);

  const handleAddData = (params: { caseName: string; metricsName: string }) => {
    const choice = { case: params.caseName, metric: params.metricsName };
    if (
      !data.some(
        item =>
          item.case === params.caseName && item.metric === params.metricsName,
      )
    ) {
      setData([...data, choice]);
      setCaseNames([...caseNames, params.caseName]);
      setMetricsNames([...metricsNames, params.metricsName]);
    }
  };

  const handleRemoveData = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const renderChoicesTags = () => {
    return (
      <div
        style={{ display: 'flex', flexWrap: 'wrap', marginTop: BASE_PADDING }}
      >
        {data.map((item, index) => (
          <div key={index} style={{ marginRight: 12, marginBottom: 12 }}>
            <Tag
              closable
              key={`${item.case}_${item.metric}`}
              onClose={() => handleRemoveData(index)}
            >
              {`${item.case}_${item.metric}`}
            </Tag>
          </div>
        ))}
      </div>
    );
  };

  return {
    categories: data,
    handleAddData,
    renderChoicesTags,
  };
};
