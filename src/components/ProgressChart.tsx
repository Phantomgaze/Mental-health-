import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
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
  Legend
);

interface ProgressChartProps {
  entries: MoodEntry[];
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ entries }) => {
  const data = {
    labels: entries.map(entry => 
      new Date(entry.timestamp).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Mood Score',
        data: entries.map(entry => entry.sentimentScore),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Your Mood Progress',
      },
    },
  };

  return (
    <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow-md">
      <Line options={options} data={data} />
    </div>
  );
};