import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import type { MoodEntry } from '../../types';
import { categorizeEmotions } from '../../utils/emotionAnalysis';

ChartJS.register(ArcElement, Tooltip, Legend);

interface EmotionalInsightsChartProps {
  entry: MoodEntry;
  isDark: boolean;
}

export const EmotionalInsightsChart: React.FC<EmotionalInsightsChartProps> = ({ entry, isDark }) => {
  const emotions = categorizeEmotions(entry.keywords);
  
  const data = {
    labels: Object.keys(emotions),
    datasets: [
      {
        data: Object.values(emotions),
        backgroundColor: [
          'rgba(147, 51, 234, 0.7)',  // Purple
          'rgba(59, 130, 246, 0.7)',  // Blue
          'rgba(236, 72, 153, 0.7)',  // Pink
          'rgba(16, 185, 129, 0.7)',  // Green
        ],
        borderColor: [
          'rgba(147, 51, 234, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(16, 185, 129, 1)',
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
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: isDark ? '#fff' : '#1f2937',
        bodyColor: isDark ? '#fff' : '#1f2937',
        padding: 12,
        borderColor: 'rgba(147, 51, 234, 0.2)',
        borderWidth: 1,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full p-6 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl shadow-lg"
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Emotional Distribution
      </h3>
      <Doughnut data={data} options={options} />
    </motion.div>
  );
};