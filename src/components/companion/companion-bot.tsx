
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export function CompanionBot() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 cursor-pointer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`drop-shadow-lg ${isDark ? 'filter-none' : 'filter drop-shadow-md'}`}
      >
        {/* Glow effect for dark mode */}
        {isDark && (
          <motion.circle
            cx="100"
            cy="100"
            r="75"
            className="text-primary/20"
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
          className={isDark ? 'fill-white' : 'fill-white'}
          animate={{
            scale: [1, 1.2, 1],
            scaleY: [1, 0.1, 1],
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
              repeatDelay: 3,
            }
          }}
        />
        <motion.circle
          cx="125"
          cy="90"
          r="8"
          className={isDark ? 'fill-white' : 'fill-white'}
          animate={{
            scale: [1, 1.2, 1],
            scaleY: [1, 0.1, 1],
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
              repeatDelay: 3,
            }
          }}
        />
        
        {/* Smile */}
        <motion.path
          d="M 70 115 Q 100 135 130 115"
          stroke={isDark ? 'white' : 'white'}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          animate={{
            d: [
              "M 70 115 Q 100 135 130 115",
              "M 70 115 Q 100 145 130 115",
              "M 70 115 Q 100 135 130 115"
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
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
      </motion.svg>
    </motion.div>
  );
}
