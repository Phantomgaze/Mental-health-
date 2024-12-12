import React from 'react';
import { Brain, BarChart2, MessageSquare, Settings } from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  target: string;
}

export const NavigationBar: React.FC = () => {
  const navItems: NavItem[] = [
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: "Input",
      target: "input-section"
    },
    {
      icon: <Brain className="w-5 h-5" />,
      label: "Remedies",
      target: "remedies-section"
    },
    {
      icon: <BarChart2 className="w-5 h-5" />,
      label: "Progress",
      target: "progress-section"
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Global Stats",
      target: "global-stats-section"
    }
  ];

  const scrollToSection = (target: string) => {
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around py-3">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(item.target)}
              className="flex flex-col items-center space-y-1 text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
            >
              {item.icon}
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};