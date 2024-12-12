interface EmotionCategories {
  [key: string]: number;
}

// Enhanced emotion mappings with more nuanced categories
const emotionMappings: { [key: string]: string } = {
  // Depression indicators
  'sad': 'Depression',
  'hopeless': 'Depression',
  'worthless': 'Depression',
  'empty': 'Depression',
  'depressed': 'Depression',
  
  // Anxiety indicators
  'anxious': 'Anxiety',
  'worried': 'Anxiety',
  'nervous': 'Anxiety',
  'stressed': 'Anxiety',
  'overwhelmed': 'Anxiety',
  
  // Social/Isolation indicators
  'lonely': 'Social Isolation',
  'isolated': 'Social Isolation',
  'alone': 'Social Isolation',
  'disconnected': 'Social Isolation',
  
  // Physical symptoms
  'tired': 'Physical Symptoms',
  'exhausted': 'Physical Symptoms',
  'fatigued': 'Physical Symptoms',
  'insomnia': 'Physical Symptoms',
  'pain': 'Physical Symptoms'
};

export const categorizeEmotions = (keywords: string[]): EmotionCategories => {
  const categories: EmotionCategories = {};
  
  keywords.forEach(keyword => {
    const category = emotionMappings[keyword.toLowerCase()] || 'Other';
    categories[category] = (categories[category] || 0) + 1;
  });
  
  // Sort categories by frequency
  const sortedCategories: EmotionCategories = {};
  Object.entries(categories)
    .sort(([,a], [,b]) => b - a)
    .forEach(([key, value]) => {
      sortedCategories[key] = value;
    });
  
  return sortedCategories;
};

export const calculateEmotionalIntensity = (score: number): {
  level: string;
  description: string;
  color: string;
} => {
  if (score >= -1) {
    return {
      level: 'Mild',
      description: 'Showing some signs of emotional distress',
      color: 'text-yellow-500'
    };
  }
  if (score >= -3) {
    return {
      level: 'Moderate',
      description: 'Experiencing significant emotional challenges',
      color: 'text-orange-500'
    };
  }
  return {
    level: 'Severe',
    description: 'Dealing with intense emotional difficulties',
    color: 'text-red-500'
  };
};

export const getEmotionTrends = (keywords: string[]): {
  primaryEmotions: string[];
  frequency: { [key: string]: number };
  intensity: number;
} => {
  const frequency: { [key: string]: number } = {};
  keywords.forEach(keyword => {
    frequency[keyword] = (frequency[keyword] || 0) + 1;
  });

  const primaryEmotions = Object.entries(frequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([emotion]) => emotion);

  const intensity = Object.values(frequency).reduce((sum, freq) => sum + freq, 0) / keywords.length;

  return {
    primaryEmotions,
    frequency,
    intensity
  };
};