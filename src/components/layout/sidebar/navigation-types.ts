import { ReactNode } from 'react';

export interface NavigationItem {
  to: string;
  icon: ReactNode;
  label: string;
  exact?: boolean;
  onClick?: () => void;
} 