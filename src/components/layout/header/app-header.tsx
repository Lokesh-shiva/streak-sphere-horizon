import React from "react";
import { Flame, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserNav } from '../user-nav';

interface AppHeaderProps {
  isMobile: boolean;
  mobileNavOpen: boolean;
  toggleMobileNav: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  isMobile,
  mobileNavOpen,
  toggleMobileNav
}) => {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b p-4 flex items-center justify-between gap-4">
      {isMobile && (
        <Button 
          variant="ghost" 
          className="p-2" 
          onClick={toggleMobileNav}
        >
          {mobileNavOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      )}
      
      {isMobile && (
        <div className="flex items-center gap-2">
          <Flame size={22} className="text-theme-energy animate-pulse" />
          <h1 className="text-lg font-bold">Habit Horizon</h1>
        </div>
      )}
      
      <div className="ml-auto flex items-center gap-3">
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  );
}; 