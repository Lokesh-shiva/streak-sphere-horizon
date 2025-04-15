import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  exact?: boolean;
  onClick?: () => void;
}

export const NavItem = ({ to, icon, label, exact = false, onClick }: NavItemProps) => {
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