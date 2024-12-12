import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import type { MoodEntry } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CircularChartProps {
  entries: MoodEntry[];
  isDark: boolean;
}

export const CircularChart: React.FC<CircularChartProps> = ({ entries, isDark }) => {
  const getMoodDistribution = () => {
    const distribution = {
      positive: 0,
      neutral: 0,
      negative: 0
    };

    entries.forEach(entry => {
      if (entry.sentimentScore > 0) distribution.positive++;
      else if (entry.sentimentScore < 0) distribution.negative++;
      else distribution.neutral++;
    });

    return distribution;
  };

  const distribution = getMoodDistribution();

  const data = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        data: [
          distribution.positive,
          distribution.neutral,
          distribution.negative
        ],
        backgroundColor: [
          'rgba(72, 187, 120, 0.8)',
          'rgba(237, 137, 54, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgba(72, 187, 120, 1)',
          'rgba(237, 137, 54, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: isDark ? '#fff' : '#1f2937',
        },
      },
    },
  };

  return (
    <div className="w-full max-w-md p-6 bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl">
      <Doughnut data={data} options={options} />
    </div>
  );
};