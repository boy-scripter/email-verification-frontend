import { DateTime } from 'luxon';

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#6b7280',
      },
    },
    y: {
      beginAtZero: true,
      grace: '5%',
      grid: {
        color: '#f3f4f6',
      },
    },
  },
  elements: {
    point: {
      hoverRadius: 6,
    },
  },
};

const chartData = {
  labels: Array.from({ length: 24 }, (_, i) => `${i % 12 || 12} ${i % 24 >= 12 ? 'PM' : 'AM'}`),
  datasets: [
    {
      label: 'Total',
      data: Array.from({ length: 24 }, () => 0),
      fill: true,
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      pointBackgroundColor: '#3b82f6',
      pointBorderColor: '#3b82f6',
      pointRadius: 4,
    },
  ],
};

export enum TimeRange {
  Last24Hours = 'Last 24 Hours',
  Last7Days = 'Last 7 Days',
  Last30Days = 'Last 30 Days',
  Last12Months = 'Last 12 Months',
}

export interface TimeRangeValue {
  key: TimeRange;
  gte: string;
  lte: string;
}

export interface timeRangeOptionType {
  name: string;
  value(): TimeRangeValue;
}

const now = DateTime.local();

const timeRangeOptions: timeRangeOptionType[] = [
  {
    name: TimeRange.Last24Hours,
    value: () => ({
      key: TimeRange.Last24Hours,
      gte: now.minus({ days: 1 }).toISO(),
      lte: now.toISO(),
    }),
  },
  {
    name: TimeRange.Last7Days,
    value: () => ({
      key: TimeRange.Last7Days,
      gte: now.minus({ days: 7 }).toISO(),
      lte: now.toISO(),
    }),
  },
  {
    name: TimeRange.Last30Days,
    value: () => ({
      key: TimeRange.Last30Days,
      gte: now.minus({ days: 30 }).toISO(),
      lte: now.toISO(),
    }),
  },
  {
    name: TimeRange.Last12Months,
    value: () => ({
      key: TimeRange.Last12Months,
      gte: now.minus({ months: 12 }).toISO(),
      lte: now.toISO(),
    }),
  },
];

export const CHART_CONFIG = {
  chartOptions,
  chartData,
  timeRangeOptions,
};
