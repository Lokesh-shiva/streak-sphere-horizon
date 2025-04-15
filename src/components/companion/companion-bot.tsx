import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useCompanion, CompanionMood } from '@/hooks/use-companion';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Sparkles, MessageSquare } from "lucide-react";

// Define fixed path strings (don't use variables that can be undefined)
const SMILE_BIG = "M 70 115 Q 100 145 130 115";
const SMILE_NEUTRAL = "M 70 115 Q 100 135 130 115";
const SMILE_SAD = "M 70 130 Q 100 110 130 130";

export function CompanionBot() {
  // Default theme if useTheme fails
  const themeContext = useTheme();
  const theme = themeContext?.theme || 'light';
  const isDark = theme === 'dark';
  
  // Use companion hook with error handling
  const companion = useCompanion();
  const { 
    mood = 'idle', 
    isTalking = false, 
    quote = null, 
    handleHover = () => {}, 
    resetToIdle = () => {},
    hasGreeted = false,
    getTimeBasedQuote = () => ({ text: "Hello!", type: 'greeting' })
  } = companion || {};
  
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingText, setGreetingText] = useState<string | null>(null);
  const [isWaving, setIsWaving] = useState(false);
  const [bounce, setBounce] = useState(false);
  
  // Explicitly define the path for the current mood
  const [currentPath, setCurrentPath] = useState(SMILE_NEUTRAL);

  // Update path when mood changes with a smooth transition
  useEffect(() => {
    switch(mood) {
      case 'happy':
      case 'greeting':
      case 'celebrating':
        setCurrentPath(SMILE_BIG);
        // Add a little bounce when happy
        setBounce(true);
        setTimeout(() => setBounce(false), 1000);
        break;
      case 'sad':
        setCurrentPath(SMILE_SAD);
        break;
      default:
        setCurrentPath(SMILE_NEUTRAL);
        break;
    }
  }, [mood]);

  // Time-based greeting effect
  useEffect(() => {
    try {
      const timeBasedQuote = getTimeBasedQuote();
      setGreetingText(timeBasedQuote?.text || "Hello there!");
      
      // Show time-based greeting on initial load with slight delay
      const timer = setTimeout(() => {
        setShowGreeting(true);
        setIsWaving(true);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
          setShowGreeting(false);
          setIsWaving(false);
        }, 5000);
      }, 1500);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error in greeting effect:", error);
      return () => {};
    }
  }, [getTimeBasedQuote]);

  // Get eye expressions based on mood - with safe defaults
  const getEyeAnimation = useMemo(() => {
    try {
      switch(mood) {
        case 'happy':
        case 'celebrating':
          return { 
            scale: [1, 1.2, 1], 
            scaleY: [1, 0.6, 1] 
          };
        case 'sad':
          return { 
            scale: [1, 0.9, 1], 
            scaleY: [1, 0.3, 1] 
          };
        case 'greeting':
          return { 
            scale: [1, 1.2, 1], 
            scaleY: [1, 0.7, 1] 
          };
        default:
          return { 
            scale: [1, 1.1, 1], 
            scaleY: [1, 0.2, 1] 
          };
      }
    } catch (error) {
      console.error("Error getting eye animation:", error);
      return { scale: [1, 1.1, 1], scaleY: [1, 0.2, 1] }; // Default animation
    }
  }, [mood]);

  // Determine if we should show celebration effects
  const showCelebration = mood === 'celebrating';

  // Default values for animation
  const defaultLine = { x2: 100 };
  
  // Optimized rendering for particle effects
  const renderParticles = useCallback(() => {
    return Array.from({ length: 3 }).map((_, i) => (
      <motion.circle
        key={i}
        cx="100"
        cy="10"
        r="2"
        className={`${isDark ? 'text-primary/40' : 'text-primary/60'}`}
        fill="currentColor"
        initial={{ y: 0, x: 0, opacity: 0, scale: 0.5 }}
        animate={{
          y: [0, -10 - i * 5],
          x: [0, (i - 1) * 5],
          opacity: [0, 1, 0],
          scale: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
          delay: i * 0.3,
        }}
      />
    ));
  }, [isDark]);

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <motion.div
          className="fixed bottom-4 right-4 z-50 cursor-pointer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            y: bounce ? -15 : 0
          }}
          transition={{ 
            duration: bounce ? 0.3 : 0.5, 
            type: bounce ? "spring" : "spring",
            stiffness: bounce ? 300 : 100
          }}
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
                className={`absolute -top-24 -left-24 p-3 rounded-lg max-w-[200px] text-sm ${
                  isDark 
                    ? 'bg-slate-800 text-white border border-slate-700' 
                    : 'bg-white text-slate-800 border border-slate-200'
                } shadow-lg z-50`}
                style={{
                  filter: isDark ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))' : 'none'
                }}
              >
                {greetingText}
                <div 
                  className={`absolute bottom-[-6px] right-5 w-3 h-3 rotate-45 ${
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
                        x: [0, (Math.random() - 0.5) * 100], 
                        y: [0, (Math.random() - 0.5) * 100], 
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        delay: i * 0.1,
                        repeat: 2,
                        repeatType: "reverse"
                      }}
                      style={{
                        left: `${40 + Math.random() * 20}%`,
                        top: `${40 + Math.random() * 20}%`,
                      }}
                    >
                      <Sparkles size={16} className="text-yellow-300" />
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Celebratory glow pulse */}
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: isDark 
                      ? 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0) 70%)' 
                      : 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)',
                    filter: 'blur(8px)'
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: [0, 0.8, 0],
                    scale: [0.8, 1.5, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: 3,
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
              rotate: isWaving ? [0, -3, 0, 3, 0] : 0,
            }}
            transition={{
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              },
              rotate: {
                duration: 2,
                ease: "easeInOut",
                repeat: isWaving ? 1 : 0
              }
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
                initial={{ opacity: 0.3, scale: 1 }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
            
            {/* Body with subtle pulse */}
            <motion.circle
              cx="100"
              cy="100"
              r="70"
              className={`${isDark ? 'text-primary/90' : 'text-primary'}`}
              fill="currentColor"
              initial={{ scale: 1 }}
              animate={{
                scale: [1, mood === 'celebrating' ? 1.08 : 1.05, 1],
              }}
              transition={{
                duration: mood === 'celebrating' ? 1.5 : 2,
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
              initial={{ scale: 1, scaleY: 1 }}
              animate={getEyeAnimation}
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
              initial={{ scale: 1, scaleY: 1 }}
              animate={getEyeAnimation}
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
              d={currentPath}
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
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
                initial={defaultLine}
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
                initial={{ x: 0, y: 0 }}
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
              
              {/* Particles - optimized with useCallback */}
              {renderParticles()}
            </motion.g>
            
            {/* Waving hand for greeting animation */}
            <AnimatePresence>
              {(hasGreeted || mood === 'greeting' || isWaving) && (
                <motion.g
                  initial={{ rotate: -20, originX: 30, originY: 120, opacity: 1 }}
                  animate={{ rotate: [0, 30, 0, 30, 0], originX: 30, originY: 120 }}
                  exit={{ rotate: 0, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                    repeat: 1
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
        align="end"
        alignOffset={-50}
        className={`p-4 ${isDark ? 'border-slate-700 bg-slate-800 text-white' : ''} transition-all z-[100]`}
        style={{
          filter: isDark ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.2))' : 'none'
        }}
      >
        <div className="flex items-start space-x-3">
          <MessageSquare className={`h-5 w-5 mt-1 ${mood === 'celebrating' ? 'text-yellow-400' : 'text-primary'}`} />
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
