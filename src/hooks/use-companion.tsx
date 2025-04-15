
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useHabits } from '@/contexts/HabitContext';

export type CompanionMood = 'happy' | 'sad' | 'idle' | 'greeting' | 'celebrating';
export type CompanionQuote = { text: string; type: 'tip' | 'motivation' | 'greeting' };

const morningQuotes = [
  "Good morning! Ready to build some great habits today?",
  "Rise and shine! What habits are we focusing on today?",
  "Early bird gets the... habits done! Let's do this!"
];

const eveningQuotes = [
  "Great job today! Time to wind down with some good habits.",
  "Evening check-in: How did your habits go today?",
  "Stars are out, but your habits are still shining bright!"
];

const motivationalQuotes = [
  "You're making amazing progress!",
  "Small steps lead to big changes!",
  "Consistency is your superpower!",
  "Keep going, you've got this!",
];

const tipQuotes = [
  "Try habit stacking to build new routines",
  "Remember to celebrate small wins!",
  "Struggling? Try making your habit smaller",
  "Track your progress to stay motivated",
];

export function useCompanion() {
  const [hasGreeted, setHasGreeted] = useState(false);
  const [mood, setMood] = useState<CompanionMood>('idle');
  const [isTalking, setIsTalking] = useState(false);
  const [quote, setQuote] = useState<CompanionQuote | null>(null);
  const location = useLocation();
  const { habits } = useHabits();
  
  // Check if this is the first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('companionGreeted');
    
    if (!hasVisited) {
      setMood('greeting');
      setHasGreeted(true);
      localStorage.setItem('companionGreeted', 'true');
      
      // Reset the greeting after animation
      setTimeout(() => {
        setMood('idle');
        setHasGreeted(false);
      }, 3000);
    }
  }, []);
  
  // Listen for route changes
  useEffect(() => {
    setMood('idle');
    setIsTalking(false);
  }, [location.pathname]);

  // Check time of day for different quotes
  const getTimeBasedQuote = useCallback(() => {
    const hour = new Date().getHours();
    let text: string;
    
    if (hour >= 5 && hour < 12) {
      text = morningQuotes[Math.floor(Math.random() * morningQuotes.length)];
    } else if (hour >= 18 || hour < 5) {
      text = eveningQuotes[Math.floor(Math.random() * eveningQuotes.length)];
    } else {
      text = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    }
    
    return { text, type: 'greeting' as const };
  }, []);

  // Get a random tip or motivational quote
  const getRandomQuote = useCallback((type: 'tip' | 'motivation') => {
    if (type === 'tip') {
      return tipQuotes[Math.floor(Math.random() * tipQuotes.length)];
    } else {
      return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    }
  }, []);

  // Handle mouse hover
  const handleHover = () => {
    if (!isTalking) {
      setIsTalking(true);
      
      // Randomly choose between a tip or motivation
      const quoteType = Math.random() > 0.5 ? 'tip' : 'motivation';
      setQuote({ 
        text: getRandomQuote(quoteType), 
        type: quoteType 
      });
      
      // Auto hide the speech bubble after a delay
      setTimeout(() => {
        setIsTalking(false);
        setQuote(null);
      }, 5000);
    }
  };
  
  // Check streaks (simulated for this implementation)
  useEffect(() => {
    // Check if on streaks page and have at least one streak of 5+
    const hasGoodStreak = location.pathname === '/streaks' && 
      habits.some(habit => habit.streak >= 5);
      
    // Show celebration animation when on streaks page with good streaks
    if (hasGoodStreak && mood !== 'celebrating') {
      setMood('celebrating');
      setIsTalking(true);
      setQuote({ 
        text: "Amazing streak! You're on fire! 🔥", 
        type: 'motivation' 
      });
      
      // Reset after animation completes
      setTimeout(() => {
        setMood('idle');
        setIsTalking(false);
        setQuote(null);
      }, 4000);
    }
  }, [location.pathname, habits, mood]);

  // Reset to idle state
  const resetToIdle = () => {
    setMood('idle');
    setIsTalking(false);
    setQuote(null);
  };

  return {
    mood,
    setMood,
    hasGreeted,
    isTalking,
    quote,
    handleHover,
    resetToIdle,
    getTimeBasedQuote
  };
}
