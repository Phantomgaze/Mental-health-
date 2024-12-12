import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';

const emojis = [
  { emoji: '😢', value: -4, label: 'Very Sad' },
  { emoji: '😔', value: -2, label: 'Sad' },
  { emoji: '😐', value: 0, label: 'Neutral' },
  { emoji: '🙂', value: 2, label: 'Good' },
  { emoji: '😊', value: 4, label: 'Very Good' }
];

interface MoodSelectorProps {
  onSelect: (value: number) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ onSelect }) => {
  const [hoveredEmoji, setHoveredEmoji] = React.useState<number | null>(null);

  const springProps = useSpring({
    scale: hoveredEmoji !== null ? 1.2 : 1,
    config: { tension: 300, friction: 10 }
  });

  return (
    <div className="flex flex-col items-center space-y-6 p-8">
      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        How are you feeling today?
      </h3>
      <div className="flex space-x-8">
        <AnimatePresence>
          {emojis.map(({ emoji, value, label }) => (
            <motion.button
              key={value}
              className="flex flex-col items-center space-y-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(value)}
              onMouseEnter={() => setHoveredEmoji(value)}
              onMouseLeave={() => setHoveredEmoji(null)}
            >
              <animated.div
                style={{
                  transform: hoveredEmoji === value ? springProps.scale.to(s => `scale(${s})`) : 'scale(1)'
                }}
                className="text-4xl cursor-pointer transition-transform"
              >
                {emoji}
              </animated.div>
              <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};