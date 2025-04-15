import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { HabitCategory } from '@/types';

interface CategoryFilterProps {
  activeCategory: HabitCategory | 'all';
  onCategoryChange: (category: HabitCategory | 'all') => void;
  categories: Array<{ id: HabitCategory | 'all'; label: string }>;
}

export function CategoryFilter({ 
  activeCategory, 
  onCategoryChange, 
  categories 
}: CategoryFilterProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none"
    >
      {categories.map(category => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "outline"}
          size="sm"
          className={`rounded-full whitespace-nowrap ${
            activeCategory === category.id ? "" : "bg-background hover:bg-background/80"
          }`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.label}
        </Button>
      ))}
    </motion.div>
  );
} 