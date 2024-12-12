import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface TextInputProps {
  onSubmit: (text: string) => void;
  isDark?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({ onSubmit, isDark }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="How are you feeling today? Share your thoughts..."
          className={`w-full p-4 pr-12 rounded-xl border ${
            isDark 
              ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400' 
              : 'bg-white/50 border-purple-100 text-gray-900 placeholder-gray-500'
          } focus:border-purple-400 focus:ring-2 focus:ring-purple-200 min-h-[120px] resize-none transition-colors duration-300 backdrop-blur-sm`}
        />
        <button
          type="submit"
          className="absolute bottom-4 right-4 p-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg transition-all duration-300"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};