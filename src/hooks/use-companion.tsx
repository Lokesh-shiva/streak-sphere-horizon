import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useHabits } from '@/contexts/HabitContext';
import { useAuth } from '@/contexts/AuthContext';

export type CompanionMood = 'happy' | 'sad' | 'idle' | 'greeting' | 'celebrating';
export type CompanionQuote = { text: string; type: 'tip' | 'motivation' | 'greeting' };

const morningQuotes = [
  "Good morning! Ready to build some great habits today?",
  "Rise and shine! What habits are we focusing on today?",
  "Early bird gets the... habits done! Let's do this!"
];

const afternoonQuotes = [
  "Halfway through the day! How are your habits going?",
  "Afternoon check-in: Keep up the good habit work!",
  "Don't forget your afternoon habits! You're doing great!"
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
  "Every habit completed is a win!",
  "You're building a better you, one habit at a time!"
];

const tipQuotes = [
  "Try habit stacking to build new routines",
  "Remember to celebrate small wins!",
  "Struggling? Try making your habit smaller",
  "Track your progress to stay motivated",
  "The best habit is one you can stick with",
  "Link new habits to existing behaviors for better success"
];

// Default quote to prevent undefined values
const defaultQuote: CompanionQuote = {
  text: "Hello! I'm your habit companion.",
  type: 'greeting'
};

export function useCompanion() {
  const [hasGreeted, setHasGreeted] = useState<boolean>(false);
  const [mood, setMood] = useState<CompanionMood>('idle');
  const [isTalking, setIsTalking] = useState<boolean>(false);
  const [quote, setQuote] = useState<CompanionQuote | null>(null);
  const location = useLocation();
  const { habits = [] } = useHabits();
  const { user, isAuthenticated } = useAuth();
  
  // Personalized greeting for logged-in users
  useEffect(() => {
    if (isAuthenticated && user && !hasGreeted) {
      setMood('greeting');
      setHasGreeted(true);
      
      // Show a personalized welcome message
      setIsTalking(true);
      setQuote({
        text: `Welcome back, ${user.name.split(' ')[0]}! Ready to build some great habits today?`,
        type: 'greeting'
      });
      
      // Reset the greeting after animation
      setTimeout(() => {
        setMood('idle');
        setIsTalking(false);
        setQuote(null);
      }, 6000);
    }
  }, [isAuthenticated, user, hasGreeted]);
  
  // Check if this is the first visit (for non-authenticated users)
  useEffect(() => {
    try {
      if (!isAuthenticated && !hasGreeted) {
        const hasVisited = localStorage.getItem('companionGreeted');
        
        if (!hasVisited) {
          setMood('greeting');
          setHasGreeted(true);
          localStorage.setItem('companionGreeted', 'true');
          
          // Show a welcome message for first-time visitors
          setIsTalking(true);
          setQuote({
            text: "Welcome to Habit Horizon! I'm your habit companion. I'll help you stay on track!",
            type: 'greeting'
          });
          
          // Reset the greeting after animation
          setTimeout(() => {
            setMood('idle');
            setIsTalking(false);
            setQuote(null);
          }, 6000);
        }
      }
    } catch (error) {
      console.error("Error checking if first visit:", error);
    }
  }, [isAuthenticated, hasGreeted]);
  
  // Listen for route changes and update mood based on the page
  useEffect(() => {
    try {
      const path = location.pathname;
      
      if (path === '/streaks') {
        // On streaks page, check for good streaks
        const hasGoodStreak = habits.some(habit => habit?.streak >= 3);
        if (hasGoodStreak) {
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
        } else {
          setMood('happy');
        }
      } else if (path === '/favorites') {
        // On favorites page, be happy
        setMood('happy');
        
        setTimeout(() => {
          setIsTalking(true);
          setQuote({ 
            text: "These are your favorite habits! Great choices!", 
            type: 'motivation' 
          });
          
          setTimeout(() => {
            setIsTalking(false);
            setQuote(null);
          }, 4000);
        }, 500);
      } else if (path === '/stats' || path === '/analytics') {
        // On analytics page, show thoughtful mood
        setMood('idle');
        
        setTimeout(() => {
          setIsTalking(true);
          setQuote({ 
            text: "Let's review your progress. Data helps build better habits!", 
            type: 'tip' 
          });
          
          setTimeout(() => {
            setIsTalking(false);
            setQuote(null);
          }, 4000);
        }, 500);
      } else if (path === '/test-bot') {
        // On test page, show celebrating mood
        setTimeout(() => {
          setMood('celebrating');
          setIsTalking(true);
          setQuote({ 
            text: "Testing mode active! All animations working!", 
            type: 'motivation' 
          });
        }, 1000);
      } else {
        // Default state
        setMood('idle');
        setIsTalking(false);
      }
    } catch (error) {
      console.error("Error handling route change:", error);
      // Ensure we have a valid mood if there's an error
      setMood('idle');
    }
  }, [location.pathname, habits]);

  // Check time of day for different quotes
  const getTimeBasedQuote = useCallback((): CompanionQuote => {
    try {
      const hour = new Date().getHours();
      let text: string;
      
      if (hour >= 5 && hour < 12) {
        text = morningQuotes[Math.floor(Math.random() * morningQuotes.length)];
      } else if (hour >= 12 && hour < 18) {
        text = afternoonQuotes[Math.floor(Math.random() * afternoonQuotes.length)];
      } else {
        text = eveningQuotes[Math.floor(Math.random() * eveningQuotes.length)];
      }
      
      return { text, type: 'greeting' };
    } catch (error) {
      console.error("Error getting time-based quote:", error);
      return defaultQuote;
    }
  }, []);

  // Get a random tip or motivational quote
  const getRandomQuote = useCallback((type: 'tip' | 'motivation'): string => {
    try {
      if (type === 'tip') {
        return tipQuotes[Math.floor(Math.random() * tipQuotes.length)];
      } else {
        return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      }
    } catch (error) {
      console.error("Error getting random quote:", error);
      return type === 'tip' 
        ? "Keep your habits small and consistent" 
        : "You're doing great!";
    }
  }, []);

  // Handle mouse hover
  const handleHover = () => {
    try {
      if (!isTalking) {
        setIsTalking(true);
        
        // Randomly choose between a tip or motivation
        const quoteType = Math.random() > 0.5 ? 'tip' : 'motivation';
        setQuote({ 
          text: getRandomQuote(quoteType), 
          type: quoteType 
        });
        
        // Show happy mood while talking
        setMood('happy');
        
        // Auto hide the speech bubble after a delay
        setTimeout(() => {
          setIsTalking(false);
          setQuote(null);
          setMood('idle');
        }, 5000);
      }
    } catch (error) {
      console.error("Error handling hover:", error);
    }
  };

  // Reset to idle state
  const resetToIdle = () => {
    try {
      // Don't reset if in celebrating mood
      if (mood !== 'celebrating') {
        setMood('idle');
        setIsTalking(false);
        setQuote(null);
      }
    } catch (error) {
      console.error("Error resetting to idle:", error);
    }
  };

  // Handle when user tries to add a habit
  const handleAddHabit = () => {
    try {
      setMood('happy');
      setIsTalking(true);
      setQuote({
        text: "Adding a new habit is a great step forward! Can't wait to see what you accomplish!",
        type: 'motivation'
      });
      
      // Auto hide the speech bubble after a delay
      setTimeout(() => {
        setIsTalking(false);
        setQuote(null);
        setMood('idle');
      }, 5000);
    } catch (error) {
      console.error("Error handling add habit:", error);
    }
  };

  return {
    mood: mood || 'idle',
    setMood,
    hasGreeted: hasGreeted || false,
    isTalking: isTalking || false,
    quote,
    handleHover,
    resetToIdle,
    getTimeBasedQuote,
    handleAddHabit
  };
}
