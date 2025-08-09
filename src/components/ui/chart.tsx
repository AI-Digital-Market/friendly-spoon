
import React from 'react';

// Minimal Chart component (replace with your charting library as needed)
export interface ChartProps {
  title?: string;
  data?: Array<{ label: string; value: number; color?: string }>;
}

export const Chart: React.FC<ChartProps> = ({ title, data = [] }) => {
  return (
    <div className="chart-container p-4 bg-card rounded-lg">
      {title && <h3 className="text-lg font-bold mb-2">{title}</h3>}
      <div className="flex gap-2 items-end h-32">
        {data.map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <div
              className={
                'w-6 rounded-t bg-primary mb-1' +
                (item.color ? ` ${item.color}` : '')
              }
              style={{ height: `${item.value}px` }}
            />
            <span className="text-xs mt-1">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
