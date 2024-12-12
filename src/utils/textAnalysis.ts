import nlp from 'compromise';

const depressionKeywords = [
  'sad', 'hopeless', 'worthless', 'tired', 'lonely', 'depressed',
  'anxious', 'empty', 'numb', 'exhausted', 'helpless'
];

export const analyzeText = (text: string) => {
  const doc = nlp(text.toLowerCase());
  const words = doc.terms().out('array');
  
  let sentimentScore = 0;
  const foundKeywords: string[] = [];

  words.forEach(word => {
    if (depressionKeywords.includes(word)) {
      sentimentScore -= 1;
      foundKeywords.push(word);
    }
  });

  return {
    score: sentimentScore,
    keywords: [...new Set(foundKeywords)],
    severity: getSeverityLevel(sentimentScore)
  };
};

const getSeverityLevel = (score: number): 'low' | 'moderate' | 'high' => {
  if (score >= -2) return 'low';
  if (score >= -5) return 'moderate';
  return 'high';
};