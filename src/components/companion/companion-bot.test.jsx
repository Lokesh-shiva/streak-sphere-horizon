import React from 'react';
import { CompanionBot } from './companion-bot';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HabitProvider } from '@/contexts/HabitContext';

// This is a test wrapper component that provides all the context required by CompanionBot
export function CompanionBotTestWrapper() {
  return (
    <ThemeProvider>
      <HabitProvider>
        <div style={{ height: "100vh", width: "100%", background: "#f5f5f5" }}>
          <h1>CompanionBot Test Page</h1>
          <p>The CompanionBot should appear in the bottom right corner with animations.</p>
          <CompanionBot />
        </div>
      </HabitProvider>
    </ThemeProvider>
  );
}

// Export the test component for use
export default CompanionBotTestWrapper; 