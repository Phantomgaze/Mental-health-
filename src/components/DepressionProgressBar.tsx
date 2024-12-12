import React from 'react';
import { motion } from 'framer-motion';

interface DepressionProgressBarProps {
  score: number;
}

export const DepressionProgressBar: React.FC<DepressionProgressBarProps> = ({ score }) => {
  // Normalize score to 0-100 range
  const normalizedScore = Math.max(0, Math.min(100, (score + 4) * 12.5));
  
  const getStageColor = (score: number) => {
    if (score >= 75) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    if (score >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getStageText = (score: number) => {
    if (score >= 75) return 'Minimal or No Depression';
    if (score >= 50) return 'Mild Depression';
    if (score >= 25) return 'Moderate Depression';
    return 'Severe Depression';
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Depression Assessment
      </h3>
      <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${normalizedScore}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`absolute top-0 left-0 h-full ${getStageColor(normalizedScore)} rounded-full`}
        />
      </div>
      <div className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">
        {getStageText(normalizedScore)}
      </div>
    </div>
  );
};