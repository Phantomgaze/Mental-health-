import React from 'react';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

interface MoodEmojiProps {
  score: number;
}

export const MoodEmoji: React.FC<MoodEmojiProps> = ({ score }) => {
  const emojiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (emojiRef.current) {
      gsap.from(emojiRef.current, {
        scale: -4,
        rotation: 360,
        duration: 0.6,
        ease: "back.out(1.7)"
      });
    }
  }, [score]);

  const getEmoji = () => {
    if (score >= 0) return "😊";
    if (score >= -2) return "😐";
    if (score >= -4) return "😔";
    return "😢";
  };

  const getColor = () => {
    if (score >= 0) return "text-green-500";
    if (score >= -2) return "text-yellow-500";
    if (score >= -4) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div 
      ref={emojiRef}
      className={`text-4xl ${getColor()} transition-colors duration-300`}
    >
      {getEmoji()}
    </div>
  );
};