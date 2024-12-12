import React from 'react';
import { Activity, Heart, Users, Brain } from 'lucide-react';
import type { Recommendation } from '../types';

interface RecommendationsProps {
  recommendations: Recommendation[];
}

export const Recommendations: React.FC<RecommendationsProps> = ({ recommendations }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'exercise': return <Activity className="w-6 h-6" />;
      case 'meditation': return <Brain className="w-6 h-6" />;
      case 'social': return <Users className="w-6 h-6" />;
      default: return <Heart className="w-6 h-6" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recommendations.map((rec, index) => (
        <div
          key={index}
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-100 rounded-full mr-4">
              {getIcon(rec.type)}
            </div>
            <h3 className="text-lg font-semibold">{rec.title}</h3>
          </div>
          <p className="text-gray-600">{rec.description}</p>
          <div className="mt-4 text-sm text-gray-500">
            Duration: {rec.duration} minutes
          </div>
        </div>
      ))}
    </div>
  );
};