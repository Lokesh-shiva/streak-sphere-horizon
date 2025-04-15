import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { QuoteCarousel } from '@/components/ui/quote-carousel';

export function GuestWelcome() {
  return (
    <section className="mb-8">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-3xl font-bold mb-2">Habit Dashboard</h1>
        <p className="text-muted-foreground">Track your daily habits and build consistent routines.</p>
      </motion.div>
      
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 flex-1"
        >
          <h2 className="text-xl font-semibold mb-3">Get Started</h2>
          <p className="text-muted-foreground mb-4">
            Sign in or create an account to start tracking your habits and building streaks.
          </p>
          <div className="flex gap-3">
            <Button asChild variant="default">
              <a href="/signin">Sign In</a>
            </Button>
            <Button asChild variant="outline">
              <a href="/signup">Create Account</a>
            </Button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="col-span-1 md:col-span-1 flex-1"
        >
          <QuoteCarousel />
        </motion.div>
      </div>
    </section>
  );
} 