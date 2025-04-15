
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { 
  LayoutDashboard, 
  Flame, 
  BarChart2, 
  Settings, 
  Plus,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  exact?: boolean;
  onClick?: () => void;
}

const NavItem = ({ to, icon, label, exact = false, onClick }: NavItemProps) => {
  const location = useLocation();
  const isActive = exact 
    ? location.pathname === to
    : location.pathname.startsWith(to);

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => 
        cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all",
          isActive 
            ? "bg-primary text-primary-foreground" 
            : "hover:bg-secondary text-muted-foreground hover:text-foreground"
        )
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const closeMobileNav = () => {
    setMobileNavOpen(false);
  };
  
  const navItems = [
    { to: "/", icon: <LayoutDashboard size={20} />, label: "Dashboard", exact: true },
    { to: "/streaks", icon: <Flame size={20} />, label: "Streaks" },
    { to: "/stats", icon: <BarChart2 size={20} />, label: "Statistics" },
    { to: "/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <div className="flex min-h-screen theme-gradient">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className="hidden md:flex flex-col w-64 p-4 border-r bg-background/90 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-8 px-4 py-3">
            <Flame size={24} className="text-theme-energy animate-pulse" />
            <h1 className="text-xl font-bold">Habit Horizon</h1>
          </div>
          
          <nav className="flex flex-col gap-2 flex-1">
            {navItems.map((item) => (
              <NavItem 
                key={item.to} 
                to={item.to} 
                icon={item.icon} 
                label={item.label} 
                exact={item.exact}
              />
            ))}
          </nav>
          
          <div className="mt-auto flex justify-between items-center">
            <Button className="w-full gap-2" variant="outline">
              <Plus size={16} /> New Habit
            </Button>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b p-4 flex items-center justify-between gap-4">
          {isMobile && (
            <Button 
              variant="ghost" 
              className="p-2" 
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
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
          </div>
        </header>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobile && mobileNavOpen && (
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
                  <Button variant="ghost" size="icon" onClick={closeMobileNav}>
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
                      onClick={closeMobileNav}
                    />
                  ))}
                </nav>
                
                <div className="mt-auto p-4">
                  <Button className="w-full gap-2">
                    <Plus size={16} /> New Habit
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Overlay for mobile nav */}
        {mobileNavOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileNav}
          />
        )}
        
        {/* Content */}
        <div className="flex-1 container py-6 px-4 md:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
