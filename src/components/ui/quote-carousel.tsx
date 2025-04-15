
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from '@/types';
import { motivationalQuotes } from '@/data/mockData';
import { Card } from '@/components/ui/card';
import { QuoteIcon } from 'lucide-react';

export function QuoteCarousel() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [quotes] = useState<Quote[]>(motivationalQuotes);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex(prevIndex => 
        prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
      );
    }, 12000); // Change quote every 12 seconds
    
    return () => clearInterval(interval);
  }, [quotes.length]);

  const variants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <Card className="overflow-hidden h-[100px] relative bg-background/50 backdrop-blur-sm">
      <div className="absolute top-4 left-4 text-primary/20 opacity-40">
        <QuoteIcon size={24} />
      </div>
      
      <div className="p-6 flex items-center justify-center h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuoteIndex}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-sm md:text-base font-medium italic">"{quotes[currentQuoteIndex].text}"</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-2">— {quotes[currentQuoteIndex].author}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  );
}
