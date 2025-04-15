import React, { createContext, useState, useContext } from 'react';
import { AddHabitDialog } from '@/components/habits/add-habit-dialog';

interface AddHabitContextType {
  isOpen: boolean;
  openAddHabitDialog: () => void;
  closeAddHabitDialog: () => void;
}

const AddHabitContext = createContext<AddHabitContextType>({
  isOpen: false,
  openAddHabitDialog: () => {},
  closeAddHabitDialog: () => {},
});

export const useAddHabit = () => useContext(AddHabitContext);

export const AddHabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openAddHabitDialog = () => {
    setIsOpen(true);
  };

  const closeAddHabitDialog = () => {
    setIsOpen(false);
  };

  return (
    <AddHabitContext.Provider
      value={{
        isOpen,
        openAddHabitDialog,
        closeAddHabitDialog,
      }}
    >
      {children}
      <AddHabitDialog open={isOpen} onOpenChange={setIsOpen} />
    </AddHabitContext.Provider>
  );
}; 