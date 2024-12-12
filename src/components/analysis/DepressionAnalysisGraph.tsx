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
import { motion } from 'framer-motion';
import type { MoodEntry } from '../../types';

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

interface DepressionAnalysisGraphProps {
  entry: MoodEntry;
  isDark: boolean;
}

export const DepressionAnalysisGraph: React.FC<DepressionAnalysisGraphProps> = ({ entry, isDark }) => {
  const getKeywordFrequency = () => {
    const frequencies = entry.keywords.reduce((acc: Record<string, number>, keyword) => {
      acc[keyword] = (acc[keyword] || 0) + 1;
      return acc;
    }, {});
    
    return {
      labels: Object.keys(frequencies),
      values: Object.values(frequencies),
    };
  };

  const { labels, values } = getKeywordFrequency();

  const data = {
    labels,
    datasets: [
      {
        label: 'Depression Indicators',
        data: values,
        borderColor: 'rgba(147, 51, 234, 1)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(147, 51, 234, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(147, 51, 234, 1)',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: isDark ? '#fff' : '#1f2937',
        bodyColor: isDark ? '#fff' : '#1f2937',
        padding: 12,
        borderColor: 'rgba(147, 51, 234, 0.2)',
        borderWidth: 1,
      },
      title: {
        display: true,
        text: 'Emotional Pattern Analysis',
        color: isDark ? '#fff' : '#1f2937',
        font: {
          size: 16,
          weight: '500',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(147, 51, 234, 0.1)',
        },
        ticks: {
          color: isDark ? '#fff' : '#1f2937',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDark ? '#fff' : '#1f2937',
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-6 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl shadow-lg"
    >
      <Line data={data} options={options} />
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        <p className="font-medium">Analysis Summary:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Detected {entry.keywords.length} emotional indicators</li>
          <li>Overall mood intensity: {Math.abs(entry.sentimentScore)}</li>
          <li>Primary emotions: {entry.keywords.slice(0, 3).join(', ')}</li>
        </ul>
      </div>
    </motion.div>
  );
};