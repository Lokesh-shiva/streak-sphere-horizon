import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useAddHabit } from "@/contexts/AddHabitContext";
import { useCompanion } from "@/hooks/use-companion";
import { LogIn, User, LogOut, Settings, PlusCircle } from "lucide-react";

export function UserNav() {
  const { user, isAuthenticated, logout } = useAuth();
  const { openAddHabitDialog } = useAddHabit();
  const { handleAddHabit } = useCompanion();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/signin">
            <LogIn className="h-4 w-4 mr-2" />
            Sign In
          </Link>
        </Button>
        <Button size="sm" asChild>
          <Link to="/signup">Sign Up</Link>
        </Button>
      </div>
    );
  }

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const handleAddNewHabit = () => {
    handleAddHabit(); // Trigger companion animation
    openAddHabitDialog(); // Open the existing dialog
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage src={user?.avatarUrl} alt={user?.name} />
            <AvatarFallback>{user?.name ? getInitials(user.name) : 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleAddNewHabit}>
          <PlusCircle className="mr-2 h-4 w-4" />
          <span>New Habit</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 