import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Users, Heart } from 'lucide-react';

interface RemedyOption {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
}

const remedyOptions: RemedyOption[] = [
  {
    id: 'meditation',
    icon: <Brain className="w-6 h-6" />,
    label: 'Meditation',
    description: 'Guided meditation and mindfulness exercises'
  },
  {
    id: 'exercise',
    icon: <Activity className="w-6 h-6" />,
    label: 'Physical Exercise',
    description: 'Light workouts and yoga sessions'
  },
  {
    id: 'social',
    icon: <Users className="w-6 h-6" />,
    label: 'Social Activities',
    description: 'Connect with others and share experiences'
  },
  {
    id: 'creative',
    icon: <Heart className="w-6 h-6" />,
    label: 'Creative Expression',
    description: 'Art therapy and creative activities'
  }
];

interface RemedyPreferencesProps {
  onPreferencesSelected: (preferences: string[]) => void;
}

export const RemedyPreferences: React.FC<RemedyPreferencesProps> = ({ onPreferencesSelected }) => {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const togglePreference = (id: string) => {
    setSelectedPreferences(prev => {
      const newPreferences = prev.includes(id)
        ? prev.filter(p => p !== id)
        : [...prev, id];
      onPreferencesSelected(newPreferences);
      return newPreferences;
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Select Your Preferred Activities
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {remedyOptions.map(option => (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => togglePreference(option.id)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedPreferences.includes(option.id)
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${
                selectedPreferences.includes(option.id)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}>
                {option.icon}
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  {option.label}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {option.description}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};