import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Users, Heart } from 'lucide-react';
import type { Recommendation } from '../types';
import { Link } from 'react-router-dom';

interface RemedyCardProps {
  recommendation: Recommendation;
}

export const RemedyCard: React.FC<RemedyCardProps> = ({ recommendation }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'exercise': return <Activity className="w-6 h-6" />;
      case 'meditation': return <Brain className="w-6 h-6" />;
      case 'social': return <Users className="w-6 h-6" />;
      default: return <Heart className="w-6 h-6" />;
    }
  };

  return (
    <Link to={`/remedy/${recommendation.type}`}>
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 
                   rounded-xl shadow-lg hover:shadow-xl transition-all duration-300
                   border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg mr-4 text-white">
            {getIcon(recommendation.type)}
          </div>
          <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            {recommendation.title}
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{recommendation.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {recommendation.duration} minutes
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm"
          >
            Start Now
          </motion.button>
        </div>
      </motion.div>
    </Link>
  );
};