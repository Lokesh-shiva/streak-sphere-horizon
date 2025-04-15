import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface DesktopSidebarProps {
  navItems: NavItem[];
  onAddHabit: () => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  navItems,
  onAddHabit
}) => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <aside className="hidden md:flex flex-col h-screen w-60 border-r bg-background">
      <div className="flex items-center gap-2 p-6">
        <Flame size={26} className="text-theme-energy animate-pulse" />
        <h1 className="text-xl font-bold">Habit Horizon</h1>
      </div>
      
      <nav className="flex-1 overflow-auto py-6 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink to={item.href} end={item.href === "/"}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 text-left font-medium",
                      isActive ? "bg-secondary" : "hover:bg-secondary/50"
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <Button
          onClick={onAddHabit}
          className="w-full"
        >
          Add New Habit
        </Button>
      </div>
    </aside>
  );
}; 