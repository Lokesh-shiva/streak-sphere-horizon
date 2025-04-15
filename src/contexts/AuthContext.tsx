import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Mock user data
const MOCK_USERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    avatarUrl: 'https://ui-avatars.com/api/?name=John+Doe&background=random'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem('habit_horizon_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Simulate network delay for a more realistic experience
    setTimeout(checkAuth, 1000);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem('habit_horizon_user', JSON.stringify(userWithoutPassword));
          setIsLoading(false);
          resolve(true);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 1500);
    });
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if email already exists
        const emailExists = MOCK_USERS.some(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        
        if (emailExists) {
          setIsLoading(false);
          resolve(false);
          return;
        }
        
        // Create new user
        const newUser = {
          id: `${MOCK_USERS.length + 1}`,
          name,
          email,
          password,
          avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
        };
        
        // In a real app, you would send this to your backend
        // Here we're just updating our mock data
        MOCK_USERS.push(newUser);
        
        // Set the user in state (without password)
        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        localStorage.setItem('habit_horizon_user', JSON.stringify(userWithoutPassword));
        
        setIsLoading(false);
        resolve(true);
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('habit_horizon_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 