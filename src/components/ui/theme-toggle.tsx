
import { Moon, Sun, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeMode } from "@/types";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    const themeOrder: ThemeMode[] = ['light', 'dark', 'vibe'];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  };

  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        variant="outline"
        size="icon"
        className="rounded-full w-10 h-10"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'light' && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
          >
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          </motion.div>
        )}
        {theme === 'dark' && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
          >
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          </motion.div>
        )}
        {theme === 'vibe' && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
          >
            <Sparkles className="h-[1.2rem] w-[1.2rem]" />
          </motion.div>
        )}
      </Button>
    </motion.div>
  );
}
