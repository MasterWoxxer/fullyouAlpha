import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface MetricsChartProps {
  title: string;
  data: any[];
  chartType?: 'bar' | 'line';
  metrics: Array<{
    key: string;
    name: string;
    color: string;
    type?: 'percentage' | 'time' | 'count';
  }>;
  xAxisKey: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

const MetricsChart: React.FC<MetricsChartProps> = ({
  title,
  data,
  chartType = 'bar',
  metrics,
  xAxisKey,
  xAxisLabel,
  yAxisLabel
}) => {
  // Format value based on type
  const formatValue = (value: number, type?: 'percentage' | 'time' | 'count') => {
    switch (type) {
      case 'percentage':
        return `${value}%`;
      case 'time':
        return `${value} min`;
      case 'count':
      default:
        return value;
    }
  };

  // Custom tooltip to format values based on metric type
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white rounded-md shadow-md border border-gray-200">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => {
            const metric = metrics.find(m => m.key === entry.dataKey);
            return (
              <p key={index} style={{ color: entry.color }}>
                {metric?.name}: {formatValue(entry.value, metric?.type)}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey={xAxisKey} 
                  label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: -5 } : undefined} 
                />
                <YAxis 
                  label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {metrics.map((metric, index) => (
                  <Bar 
                    key={index}
                    dataKey={metric.key} 
                    name={metric.name} 
                    fill={metric.color} 
                  />
                ))}
              </BarChart>
            ) : (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey={xAxisKey}
                  label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: -5 } : undefined} 
                />
                <YAxis 
                  label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {metrics.map((metric, index) => (
                  <Line 
                    key={index}
                    type="monotone" 
                    dataKey={metric.key} 
                    name={metric.name} 
                    stroke={metric.color} 
                    activeDot={{ r: 8 }} 
                  />
                ))}
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsChart;
