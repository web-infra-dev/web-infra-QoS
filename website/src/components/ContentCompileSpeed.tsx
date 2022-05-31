import { Line } from '@antv/g2plot';
import { Card, Typography } from '@arco-design/web-react';
import {
  COMPILE_SPEED_METRICS,
  COMPILE_SPEED_DEFAULT_CASE,
} from '@/shared/constant';
import { Filters } from './Filters';
import { useEffect, useRef, useState } from 'react';
import { FetchedMetrics, fetchMetrics } from '@/shared/request';
import { formatDate, formatSecond, mergeData } from '@/shared/utils';

const formatData = (
  data1: FetchedMetrics[],
  data2: FetchedMetrics[],
  caseNames: string[],
  metricsNames: string[],
) =>
  mergeData(data1, data2, caseNames, metricsNames).map(item => ({
    category: caseNames[0] === caseNames[1] ? item.metricsName : item.caseName,
    date: `${formatDate(item.time)}（${item.id}）`,
    time: formatSecond(item.metrics[item.metricsName]),
  }));

export const ContentCompileSpeed = () => {
  const chartRoot = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<Line | null>(null);
  const [caseNames, setCaseNames] = useState(COMPILE_SPEED_DEFAULT_CASE);
  const [metricsNames, setMetricsNames] = useState([
    COMPILE_SPEED_METRICS[0],
    COMPILE_SPEED_METRICS[0],
  ]);

  const renderLineChart = ({
    root,
    data1,
    data2,
    caseNames,
    metricsNames,
  }: {
    root: HTMLElement | null;
    data1: FetchedMetrics[];
    data2: FetchedMetrics[];
    caseNames: string[];
    metricsNames: string[];
  }) => {
    const data = formatData(data1, data2, caseNames, metricsNames);
    if (chartInstance.current) {
      chartInstance.current.changeData(data);
    } else if (root) {
      chartInstance.current = new Line(root, {
        data,
        height: 400,
        xField: 'date',
        yField: 'time',
        seriesField: 'category',
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
          size: 3,
        },
        tooltip: {
          fields: ['date', 'time', 'category'],
          formatter: datum => ({
            name: datum.category,
            value: datum.time + 's',
          }),
        },
      });

      chartInstance.current.render();
    }
  };

  const onSubmitForm = (params: {
    caseName1: string;
    caseName2: string;
    metricsName1: string;
    metricsName2: string;
  }) => {
    setCaseNames([params.caseName1, params.caseName2]);
    setMetricsNames([params.metricsName1, params.metricsName2]);
  };

  useEffect(() => {
    Promise.all([fetchMetrics(caseNames[0]), fetchMetrics(caseNames[1])]).then(
      ([data1, data2]) => {
        renderLineChart({
          data1,
          data2,
          caseNames,
          metricsNames,
          root: chartRoot.current,
        });
      },
    );
  }, [caseNames, metricsNames]);

  return (
    <div style={{ padding: 24 }}>
      <Filters
        metrics={COMPILE_SPEED_METRICS}
        initialCase={caseNames}
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
