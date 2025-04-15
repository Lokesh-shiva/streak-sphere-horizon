
import { useState, useEffect } from 'react';

export function useCompanion() {
  const [hasGreeted, setHasGreeted] = useState(false);
  
  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('companionGreeted');
    
    if (!hasVisited) {
      setHasGreeted(true);
      localStorage.setItem('companionGreeted', 'true');
      
      // Reset the greeting after animation
      setTimeout(() => {
        setHasGreeted(false);
      }, 3000);
    }
  }, []);
  
  return {
    hasGreeted
  };
}
