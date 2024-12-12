import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TextInput } from './components/TextInput';
import { RemedyPreferences } from './components/RemedyPreferences';
import { RemedyCard } from './components/RemedyCard';
import { GlobalStatsChart } from './components/GlobalStatsChart';
import { NavigationBar } from './components/NavigationBar';
import { CustomRoutineButton } from './components/CustomRoutineButton';
import { ThemeToggle } from './components/ThemeToggle';
import { AnalysisContainer } from './components/analysis/AnalysisContainer';
import { analyzeText } from './utils/textAnalysis';
import type { MoodEntry, Recommendation } from './types';
import { motion } from 'framer-motion';

function App() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const handleTextSubmit = (text: string) => {
    const analysis = analyzeText(text);
    const newEntry: MoodEntry = {
      text,
      timestamp: new Date(),
      sentimentScore: analysis.score,
      keywords: analysis.keywords,
    };

    setEntries(prev => [...prev, newEntry]);
    setCurrentScore(analysis.score);
    generateRecommendations(analysis.score);
  };

  const handlePreferencesSelected = (preferences: string[]) => {
    setSelectedPreferences(preferences);
    generateRecommendations(currentScore, preferences);
  };

  const generateRecommendations = (score: number, prefs = selectedPreferences) => {
    const allRecommendations: Recommendation[] = [
      {
        title: 'Mindful Breathing',
        description: 'Practice deep breathing exercises with guided visualization',
        type: 'meditation',
        duration: 5,
        icon: 'brain'
      },
      {
        title: 'Gentle Yoga',
        description: 'Follow along with calming yoga poses for relaxation',
        type: 'exercise',
        duration: 15,
        icon: 'activity'
      },
      {
        title: 'Connect & Share',
        description: 'Reach out to a trusted friend or family member',
        type: 'social',
        duration: 20,
        icon: 'users'
      }
    ];

    const filteredRecommendations = prefs.length > 0
      ? allRecommendations.filter(rec => prefs.includes(rec.type))
      : allRecommendations;

    setRecommendations(filteredRecommendations);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 transition-colors duration-300">
        <NavigationBar />
        
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={
              <div className="space-y-6">
                {/* Input and Analysis Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16">
                  <section id="input-section" className="space-y-6">
                    <TextInput onSubmit={handleTextSubmit} isDark={isDarkTheme} />
                    {entries.length > 0 && (
                      <AnalysisContainer 
                        entry={entries[entries.length - 1]} 
                        isDark={isDarkTheme} 
                      />
                    )}
                    {selectedPreferences.length > 0 && (
                      <div className="flex justify-center">
                        <CustomRoutineButton 
                          depressionScore={currentScore}
                          selectedRemedies={selectedPreferences}
                        />
                      </div>
                    )}
                  </section>
                  
                  <section id="global-stats-section">
                    <GlobalStatsChart isDark={isDarkTheme} />
                  </section>
                </div>
                
                {/* Recommendations Section */}
                {recommendations.length > 0 && (
                  <motion.section 
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                      Personalized Recommendations
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {recommendations.map((rec, index) => (
                        <RemedyCard key={index} recommendation={rec} />
                      ))}
                    </div>
                  </motion.section>
                )}

                {/* Preferences Section */}
                <section id="remedies-section" className="mt-8">
                  <RemedyPreferences onPreferencesSelected={handlePreferencesSelected} />
                </section>
              </div>
            } />
          </Routes>
        </main>

        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle isDark={isDarkTheme} onToggle={() => setIsDarkTheme(!isDarkTheme)} />
        </div>
      </div>
    </Router>
  );
}

export default App;