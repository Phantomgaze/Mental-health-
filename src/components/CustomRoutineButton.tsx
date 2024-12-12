import React from 'react';
import { Calendar, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';

interface CustomRoutineButtonProps {
  depressionScore: number;
  selectedRemedies: string[];
}

export const CustomRoutineButton: React.FC<CustomRoutineButtonProps> = ({
  depressionScore,
  selectedRemedies,
}) => {
  const generateRoutine = () => {
    const doc = new jsPDF();
    const routines = createWeeklyRoutine(depressionScore, selectedRemedies);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Your 7-Day Mental Wellness Routine', 20, 20);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    
    let yPosition = 40;
    routines.forEach((day, index) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`Day ${index + 1}:`, 20, yPosition);
      yPosition += 10;
      
      doc.setFont('helvetica', 'normal');
      day.activities.forEach(activity => {
        doc.text(`• ${activity.time}: ${activity.name} (${activity.duration} mins)`, 30, yPosition);
        yPosition += 7;
      });
      yPosition += 5;
    });
    
    doc.save('weekly-mental-wellness-routine.pdf');
  };

  const createWeeklyRoutine = (score: number, remedies: string[]) => {
    const intensity = score < -2 ? 'high' : score < 0 ? 'medium' : 'low';
    const days = [];

    for (let i = 0; i < 7; i++) {
      const activities = [];
      
      if (remedies.includes('meditation')) {
        activities.push({
          name: 'Morning Meditation',
          time: '8:00 AM',
          duration: intensity === 'high' ? 15 : 10
        });
      }
      
      if (remedies.includes('exercise')) {
        activities.push({
          name: 'Gentle Exercise/Yoga',
          time: '10:00 AM',
          duration: intensity === 'high' ? 30 : 20
        });
      }
      
      if (remedies.includes('social')) {
        activities.push({
          name: 'Social Connection Time',
          time: '2:00 PM',
          duration: 30
        });
      }
      
      if (remedies.includes('creative')) {
        activities.push({
          name: 'Creative Expression',
          time: '4:00 PM',
          duration: 45
        });
      }
      
      days.push({ activities });
    }

    return days;
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={generateRoutine}
      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
    >
      <Calendar className="w-5 h-5" />
      <span>Get 7-Day Routine</span>
      <Download className="w-4 h-4" />
    </motion.button>
  );
};