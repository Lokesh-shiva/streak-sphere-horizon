import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, X } from 'lucide-react';

interface HabitListHeaderProps {
  onSearch: (query: string) => void;
  onAddHabit: () => void;
}

export function HabitListHeader({ onSearch, onAddHabit }: HabitListHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
      <motion.h2
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-xl font-semibold"
      >
        Your Habits
      </motion.h2>
      
      <div className="flex items-center gap-2 w-full md:w-auto">
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="relative w-full md:w-auto"
            >
              <Input
                placeholder="Search habits..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pr-8"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={clearSearch}
                >
                  <X size={16} />
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowSearch(!showSearch)}
          title={showSearch ? "Hide search" : "Search habits"}
          aria-label={showSearch ? "Hide search" : "Search habits"}
        >
          <Search size={16} />
        </Button>
        
        <Button 
          className="gap-1"
          onClick={onAddHabit}
        >
          <Plus size={16} /> Add Habit
        </Button>
      </div>
    </div>
  );
} 