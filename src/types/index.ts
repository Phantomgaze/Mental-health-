export interface UserProfile {
  age?: number;
  weight?: number;
  height?: number;
  name?: string;
}

export interface MoodEntry {
  text: string;
  timestamp: Date;
  sentimentScore: number;
  keywords: string[];
}

export interface Recommendation {
  title: string;
  description: string;
  type: 'exercise' | 'meditation' | 'activity' | 'social';
  duration: number;
  icon: string;
}