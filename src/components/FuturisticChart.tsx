import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { MoodEntry } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface FuturisticChartProps {
  entries: MoodEntry[];
  isDark: boolean;
}

export const FuturisticChart: React.FC<FuturisticChartProps> = ({ entries, isDark }) => {
  const data = {
    labels: entries.map(entry => 
      new Date(entry.timestamp).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Mood Score',
        data: entries.map(entry => entry.sentimentScore),
        borderColor: 'rgba(147, 51, 234, 1)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(147, 51, 234, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(147, 51, 234, 1)',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Emotional Journey',
        color: isDark ? '#fff' : '#1f2937',
        font: {
          size: 20,
          family: 'system-ui',
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDark ? '#fff' : '#1f2937',
        },
      },
      x: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDark ? '#fff' : '#1f2937',
        },
      },
    },
  };

  return (
    <div className="w-full max-w-4xl p-6 bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl">
      <Line options={options} data={data} />
    </div>
  );
};