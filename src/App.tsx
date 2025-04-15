import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Streaks from "./pages/Streaks";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { HabitProvider } from "@/contexts/HabitContext";
import { AddHabitProvider } from "@/contexts/AddHabitContext";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthRoute from "./components/auth/auth-route";
import CompanionBotTestWrapper from "./components/companion/companion-bot.test";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <AuthProvider>
          <HabitProvider>
            <AddHabitProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/streaks" element={<AuthRoute><Streaks /></AuthRoute>} />
                  <Route path="/stats" element={<AuthRoute><Stats /></AuthRoute>} />
                  <Route path="/settings" element={<AuthRoute><Settings /></AuthRoute>} />
                  <Route path="/profile" element={<AuthRoute><Profile /></AuthRoute>} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/test-bot" element={<CompanionBotTestWrapper />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </AddHabitProvider>
          </HabitProvider>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
