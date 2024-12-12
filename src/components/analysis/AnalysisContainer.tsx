import React from 'react';
import { DepressionAnalysisGraph } from './DepressionAnalysisGraph';
import { EmotionalInsightsChart } from './EmotionalInsightsChart';
import type { MoodEntry } from '../../types';

interface AnalysisContainerProps {
  entry: MoodEntry;
  isDark: boolean;
}

export const AnalysisContainer: React.FC<AnalysisContainerProps> = ({ entry, isDark }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <DepressionAnalysisGraph entry={entry} isDark={isDark} />
      <EmotionalInsightsChart entry={entry} isDark={isDark} />
    </div>
  );
};