import React from "react";
import { NavLink } from "react-router-dom";
import { Flame, Github, Twitter, Heart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur-sm relative z-10">
      <div className="container mx-auto py-8 px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Brand Column */}
          <motion.div className="space-y-4" variants={item}>
            <div className="flex items-center gap-2">
              <Flame size={20} className="text-theme-energy" />
              <h3 className="font-bold text-lg">Habit Horizon</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Track your habits, build consistency, and achieve your goals.
            </p>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 hover:bg-secondary hover:text-primary transition-colors"
              >
                <Github size={16} />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 hover:bg-secondary hover:text-primary transition-colors"
              >
                <Twitter size={16} />
                <span className="sr-only">Twitter</span>
              </Button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="space-y-4" variants={item}>
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <NavLink 
                  to="/" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/streaks" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Streaks
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/stats" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Statistics
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/settings" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Settings
                </NavLink>
              </li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div className="space-y-4" variants={item}>
            <h4 className="font-semibold">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  Documentation
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  Help Center
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  Privacy Policy
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  Terms of Service
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div className="space-y-4" variants={item}>
            <h4 className="font-semibold">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              Join our newsletter for tips on building effective habits.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-background px-3 py-1 text-sm rounded-md border flex-1"
              />
              <Button variant="default" size="sm" className="sm:w-auto w-full">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <Separator className="my-6" />

        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div>
            &copy; {currentYear} Habit Horizon. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            Made with <Heart size={14} className="text-red-500 animate-pulse" /> for better habits
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 