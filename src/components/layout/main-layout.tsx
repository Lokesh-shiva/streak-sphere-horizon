import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LayoutDashboard, Flame, BarChart2, Settings } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { useCompanion } from '@/hooks/use-companion';
import { useAddHabit } from '@/contexts/AddHabitContext';
import { CompanionBot } from '@/components/companion/companion-bot';

// Import new components
import { AppHeader } from './header/app-header';
import { DesktopSidebar } from './sidebar/desktop-sidebar';
import { MobileNav } from './sidebar/mobile-nav';
import { NavigationItem } from './sidebar/navigation-types';
import { Footer } from './footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isMobile = useIsMobile();
  const { handleAddHabit } = useCompanion();
  const { openAddHabitDialog } = useAddHabit();
  
  // Navigation items shared between desktop and mobile
  const navItems = [
    { href: "/", icon: <LayoutDashboard size={20} />, label: "Dashboard", exact: true },
    { href: "/streaks", icon: <Flame size={20} />, label: "Streaks" },
    { href: "/stats", icon: <BarChart2 size={20} />, label: "Statistics" },
    { href: "/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  // Toggle mobile navigation
  const toggleMobileNav = () => setMobileNavOpen(!mobileNavOpen);
  
  // Handle adding a new habit
  const handleAddNewHabit = () => {
    handleAddHabit();
    openAddHabitDialog();
  };

  return (
    <div className="flex min-h-screen theme-gradient">
      {/* Desktop Sidebar */}
      {!isMobile && <DesktopSidebar navItems={navItems} onAddHabit={handleAddNewHabit} />}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <AppHeader 
          isMobile={isMobile} 
          mobileNavOpen={mobileNavOpen} 
          toggleMobileNav={toggleMobileNav} 
        />
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobile && (
            <MobileNav 
              isOpen={mobileNavOpen}
              navItems={navItems.map(item => ({ 
                to: item.href, 
                icon: item.icon, 
                label: item.label,
                exact: item.exact
              }))}
              onAddHabit={handleAddNewHabit}
              onClose={() => setMobileNavOpen(false)}
            />
          )}
        </AnimatePresence>
        
        {/* Content */}
        <div className="flex-1 container py-6 px-4 md:px-8 mb-auto">
          {children}
        </div>

        {/* Footer */}
        <Footer />

        {/* Companion Bot */}
        <CompanionBot />
      </main>
    </div>
  );
};

export default MainLayout;
