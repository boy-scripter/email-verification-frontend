  import { DateTime } from 'luxon';

 const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6b7280'
        }
      },
      y: {
        min: 0,
        max: 1,
        ticks: {
          stepSize: 0.2,
          color: '#6b7280'
        },
        grid: {
          color: '#f3f4f6'
        }
      }
    },
    elements: {
      point: {
        hoverRadius: 6
      }
    }
  };

 const chartData = {
    labels: ['Feb 22nd', 'Feb 27th', 'Mar 4th', 'Mar 9th', 'Mar 14th'],
    datasets: [{
      data: [0.2, 0.6, 0.5, 0.8, 0.9],
      fill: true,
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      pointBackgroundColor: '#3b82f6',
      pointBorderColor: '#3b82f6',
      pointRadius: 4
    }]
  };

  export enum TimeRange {
    Last24Hours = 'Last 24 Hours',
    Last7Days = 'Last 7 Days',
    Last30Days = 'Last 30 Days',
    Last12Months = 'Last 12 Months'
  }
  
  export interface timeRangeOptionType {
    label: string;
    value: () => string;
  }

  const timeRangeOptions: timeRangeOptionType[] = [
    { label: TimeRange.Last24Hours, value: (() => DateTime.local().minus({ days: 1 }).toISODate()) },
    { label: TimeRange.Last7Days, value: (() => DateTime.local().minus({ days: 7 }).toISODate()) },
    { label: TimeRange.Last30Days, value: (() => DateTime.local().minus({ days: 30 }).toISODate()) },
    { label: TimeRange.Last12Months, value: (() => DateTime.local().minus({ months: 12 }).toISODate()) }
  ];


  export const CHART_CONFIG = {
    chartOptions,
    chartData,
    timeRangeOptions
  }