import React from "react";
import { motion } from "framer-motion";
import { Flame, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavItem } from "./nav-item";
import { NavigationItem } from "./navigation-types";

interface MobileNavProps {
  isOpen: boolean;
  navItems: NavigationItem[];
  onAddHabit: () => void;
  onClose: () => void;
}

export function MobileNav({ isOpen, navItems, onAddHabit, onClose }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", damping: 25 }}
        className="fixed inset-0 z-50 w-3/4 max-w-xs bg-background border-r shadow-lg"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Flame size={24} className="text-theme-energy animate-pulse" />
              <h1 className="text-xl font-bold">Habit Horizon</h1>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu">
              <X size={20} />
            </Button>
          </div>
          
          <nav className="flex flex-col gap-1 p-3">
            {navItems.map((item) => (
              <NavItem 
                key={item.to} 
                to={item.to} 
                icon={item.icon} 
                label={item.label} 
                exact={item.exact}
                onClick={onClose}
              />
            ))}
          </nav>
          
          <div className="mt-auto p-4">
            <Button 
              className="w-full gap-2"
              onClick={() => {
                onAddHabit();
                onClose();
              }}
            >
              <Plus size={16} /> New Habit
            </Button>
          </div>
        </div>
      </motion.div>
      
      {/* Overlay */}
      <motion.div 
        className="fixed inset-0 bg-black/50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
    </>
  );
} 