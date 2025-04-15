import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface EmptyHabitsProps {
  isSearching: boolean;
  onAddHabit: () => void;
}

export function EmptyHabits({ isSearching, onAddHabit }: EmptyHabitsProps) {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium mb-2">No habits found</h3>
      <p className="text-muted-foreground mb-4">
        {isSearching 
          ? "Try adjusting your search query" 
          : "Start by adding a new habit"}
      </p>
      <Button onClick={onAddHabit}>
        <Plus size={16} className="mr-2" /> Add your first habit
      </Button>
    </div>
  );
} 