
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useCompanion } from '@/hooks/use-companion';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Sparkles, MessageSquare } from "lucide-react";

export function CompanionBot() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { 
    mood, 
    isTalking, 
    quote, 
    handleHover, 
    resetToIdle,
    hasGreeted,
    getTimeBasedQuote 
  } = useCompanion();
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingText, setGreetingText] = useState<string | null>(null);

  // Time-based greeting effect
  useEffect(() => {
    const timeBasedQuote = getTimeBasedQuote();
    setGreetingText(timeBasedQuote.text);
    
    // Show time-based greeting on initial load with slight delay
    const timer = setTimeout(() => {
      setShowGreeting(true);
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        setShowGreeting(false);
      }, 5000);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [getTimeBasedQuote]);

  // Get the correct expression based on mood
  const getExpression = () => {
    switch(mood) {
      case 'happy':
        return "M 70 115 Q 100 145 130 115"; // Big smile
      case 'sad':
        return "M 70 130 Q 100 110 130 130"; // Frown
      case 'greeting':
      case 'celebrating':
        return "M 70 115 Q 100 145 130 115"; // Big smile
      default:
        return "M 70 115 Q 100 135 130 115"; // Neutral smile
    }
  };

  // Determine if we should show celebration effects
  const showCelebration = mood === 'celebrating';

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <motion.div
          className="fixed bottom-4 right-4 z-50 cursor-pointer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={handleHover}
          onHoverEnd={resetToIdle}
        >
          {/* Time-based greeting speech bubble */}
          <AnimatePresence>
            {showGreeting && greetingText && (
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                className={`absolute -top-20 -left-4 p-3 rounded-lg max-w-[200px] text-sm ${
                  isDark 
                    ? 'bg-slate-800 text-white border border-slate-700' 
                    : 'bg-white text-slate-800 border border-slate-200'
                } shadow-lg`}
                style={{
                  filter: isDark ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))' : 'none'
                }}
              >
                {greetingText}
                <div 
                  className={`absolute bottom-[-6px] left-5 w-3 h-3 rotate-45 ${
                    isDark ? 'bg-slate-800 border-r border-b border-slate-700' : 'bg-white border-r border-b border-slate-200'
                  }`}
                ></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Celebration effects */}
          <AnimatePresence>
            {showCelebration && (
              <>
                {/* Sparkles around the bot */}
                <motion.div
                  className="absolute inset-0 text-yellow-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      initial={{ 
                        x: 0, 
                        y: 0, 
                        scale: 0,
                        opacity: 0 
                      }}
                      animate={{ 
                        x: [0, (Math.random() - 0.5) * 80], 
                        y: [0, (Math.random() - 0.5) * 80], 
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        delay: i * 0.1,
                        repeat: 1,
                        repeatType: "reverse"
                      }}
                      style={{
                        left: `${40 + Math.random() * 20}%`,
                        top: `${40 + Math.random() * 20}%`,
                      }}
                    >
                      <Sparkles size={16} />
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Celebratory glow pulse */}
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)',
                    filter: 'blur(8px)'
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: [0, 0.8, 0],
                    scale: [0.8, 1.4, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: 2,
                    repeatType: "reverse"
                  }}
                />
              </>
            )}
          </AnimatePresence>
          
          <motion.svg
            width="80"
            height="80"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`drop-shadow-lg ${isDark ? 'filter-none' : 'filter drop-shadow-md'}`}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Glow effect for dark mode */}
            {isDark && (
              <motion.circle
                cx="100"
                cy="100"
                r="75"
                className="text-primary/30"
                fill="currentColor"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
            
            {/* Body */}
            <motion.circle
              cx="100"
              cy="100"
              r="70"
              className={`${isDark ? 'text-primary/90' : 'text-primary'}`}
              fill="currentColor"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Eyes */}
            <motion.circle
              cx="75"
              cy="90"
              r="8"
              className="fill-white"
              animate={{
                scale: [1, 1.2, 1],
                scaleY: mood === 'happy' || mood === 'celebrating' ? [1, 0.6, 1] : [1, 0.2, 1],
              }}
              transition={{
                scale: {
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 5,
                },
                scaleY: {
                  duration: 0.2,
                  repeat: Infinity,
                  repeatDelay: mood === 'happy' || mood === 'celebrating' ? 1 : 3,
                }
              }}
            />
            <motion.circle
              cx="125"
              cy="90"
              r="8"
              className="fill-white"
              animate={{
                scale: [1, 1.2, 1],
                scaleY: mood === 'happy' || mood === 'celebrating' ? [1, 0.6, 1] : [1, 0.2, 1],
              }}
              transition={{
                scale: {
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 5,
                },
                scaleY: {
                  duration: 0.2,
                  repeat: Infinity,
                  repeatDelay: mood === 'happy' || mood === 'celebrating' ? 1 : 3,
                }
              }}
            />
            
            {/* Smile - changes with mood */}
            <motion.path
              d={getExpression()}
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              animate={{
                d: getExpression(),
              }}
              transition={{
                duration: 0.5,
              }}
            />

            {/* Antenna with particle effects */}
            <motion.g>
              <motion.line
                x1="100"
                y1="30"
                x2="100"
                y2="10"
                stroke="currentColor"
                strokeWidth="4"
                className={isDark ? 'text-primary/90' : 'text-primary'}
                animate={{
                  x2: [100, 95, 105, 100],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.circle
                cx="100"
                cy="10"
                r="4"
                className={isDark ? 'text-primary/90' : 'text-primary'}
                fill="currentColor"
                animate={{
                  x: [-5, 0, 5, 0],
                  y: [-2, 2, -2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Particles */}
              <motion.circle
                cx="100"
                cy="10"
                r="2"
                className={`${isDark ? 'text-primary/40' : 'text-primary/60'}`}
                fill="currentColor"
                animate={{
                  y: [0, -10],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            </motion.g>
            
            {/* Waving hand for greeting animation */}
            <AnimatePresence>
              {(hasGreeted || mood === 'greeting') && (
                <motion.g
                  initial={{ rotate: -20, originX: 30, originY: 120 }}
                  animate={{ rotate: [0, 30, 0, 30, 0], originX: 30, originY: 120 }}
                  exit={{ rotate: 0, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <motion.path
                    d="M 30 120 Q 25 110 35 105 Q 45 100 40 120"
                    fill={isDark ? "#ffffff" : "#ffffff"}
                    stroke={isDark ? "#ffffff" : "#ffffff"}
                    strokeWidth="2"
                  />
                </motion.g>
              )}
            </AnimatePresence>
          </motion.svg>
        </motion.div>
      </HoverCardTrigger>
      
      {/* Speech bubble on hover */}
      <HoverCardContent 
        side="left" 
        className={`p-4 ${isDark ? 'border-slate-700 bg-slate-800 text-white' : ''}`}
        style={{
          filter: isDark ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.2))' : 'none'
        }}
      >
        <div className="flex items-start space-x-3">
          <MessageSquare className="h-5 w-5 text-primary mt-1" />
          <div>
            {quote ? (
              <p>{quote.text}</p>
            ) : (
              <p>How can I help you with your habits today?</p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              {quote?.type === 'tip' ? 'Helpful Tip!' : quote?.type === 'motivation' ? 'Keep Going!' : 'Your Companion Bot'}
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
