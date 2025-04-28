
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  message?: string;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, message }) => {
  // Determine badge level
  const getBadgeInfo = () => {
    if (score >= 90) return { name: 'Gold', color: 'bg-yellow-400' };
    if (score >= 70) return { name: 'Silver', color: 'bg-slate-300' };
    if (score >= 50) return { name: 'Bronze', color: 'bg-amber-700' };
    return { name: 'Standard', color: 'bg-slate-200' };
  };

  const badgeInfo = getBadgeInfo();

  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center mb-6">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
          className="rounded-full bg-green-100 p-3"
        >
          <CheckCircle className="h-12 w-12 text-primary" />
        </motion.div>
      </div>
      
      <motion.h2 
        className="text-2xl font-bold mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Report Submitted!
      </motion.h2>

      <motion.div 
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-muted-foreground">{message || "Thank you for helping keep our city clean!"}</p>
      </motion.div>

      <motion.div 
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="text-center">
          <div className="text-5xl font-bold text-primary mb-2">{score}</div>
          <div className="text-sm text-muted-foreground">Points Earned</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <div className="inline-flex items-center">
          <span className={`h-3 w-3 rounded-full ${badgeInfo.color} mr-2`}></span>
          <span className="font-medium">{badgeInfo.name} Badge</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ScoreDisplay;
