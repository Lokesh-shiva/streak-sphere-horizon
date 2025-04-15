
import React from 'react';
import { motion } from 'framer-motion';

export function CompanionBot() {
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
        className="drop-shadow-lg"
      >
        {/* Body */}
        <motion.circle
          cx="100"
          cy="100"
          r="70"
          fill="currentColor"
          className="text-primary"
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
          fill="white"
          animate={{
            scaleY: [1, 0.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
        <motion.circle
          cx="125"
          cy="90"
          r="8"
          fill="white"
          animate={{
            scaleY: [1, 0.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
        
        {/* Smile */}
        <motion.path
          d="M 70 115 Q 100 135 130 115"
          stroke="white"
          strokeWidth="4"
          fill="none"
          animate={{
            d: ["M 70 115 Q 100 135 130 115", "M 70 115 Q 100 145 130 115"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Antenna */}
        <motion.line
          x1="100"
          y1="30"
          x2="100"
          y2="10"
          stroke="currentColor"
          strokeWidth="4"
          className="text-primary"
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
          className="text-primary"
          fill="currentColor"
          animate={{
            x: [-5, 0, 5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </motion.div>
  );
}
