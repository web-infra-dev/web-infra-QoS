import { Line } from '@antv/g2plot';
import { Card, Typography } from '@arco-design/web-react';
import { BASE_PADDING, LINE_CHART_DEFAULT_CONFIG } from '@/shared/constant';
import { useEffect, useRef } from 'react';
import { FetchedMetrics, fetchMetrics } from '@/shared/request';
import { formatFileSize } from '@/shared/utils';
import { formatDateWithId } from '@/shared/utils';
import { mergeData } from '@/shared/utils';

const formatData = (
  results: FetchedMetrics[][],
  caseNames: string[],
  metricsNames: string[],
) =>
  mergeData(results, caseNames, metricsNames).map(item => ({
    category: `${item.caseName} + ${item.metricsName}`,
    x: formatDateWithId(item),
    y: formatFileSize(item.metrics[item.metricsName], 'MB'),
  }));

export const ContentBinarySize = (props: { productIndex: string }) => {
  const productName = props.productIndex;
  const chartRoot = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<Line | null>(null);

  const renderLineChart = ({
    root,
    results,
  }: {
    root: HTMLElement | null;
    results: FetchedMetrics[];
  }) => {
    const data = formatData(
      [results],
      ['rspack-binary-size'],
      ['rspack.linux-x64-gnu'],
    );

    if (chartInstance.current) {
      chartInstance.current.changeData(data);
    } else if (root) {
      chartInstance.current = new Line(root, {
        ...LINE_CHART_DEFAULT_CONFIG,
        data,
        yAxis: {
          min: 40,
        },
        tooltip: {
          fields: ['x', 'y', 'category', 'metricsName'],
          formatter: (datum: any) => {
            return {
              name: datum.category.split('+')[1].trim(),
              value: `${datum.y} MiB`,
            };
          },
        },
        slider: {
          start: 0,
          end: 1,
        },
      });

      chartInstance.current.render();
    }
  };

  useEffect(() => {
    const fetchDataForCaseNames = async () => {
      const result = await fetchMetrics(productName, 'rspack-binary-size');
      renderLineChart({
        results: result,
        root: chartRoot.current,
      });
    };
    fetchDataForCaseNames();
  }, []);

  return (
    <div style={{ padding: BASE_PADDING }}>
      <Card bordered={false} style={{ height: 464 }}>
        <Typography.Title heading={5} style={{ marginTop: 0 }}>
          Rspack Binary Size
        </Typography.Title>
        <div ref={chartRoot} />
      </Card>
    </div>
  );
};
