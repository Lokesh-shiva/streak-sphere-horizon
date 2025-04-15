
import MainLayout from '@/components/layout/main-layout';
import { useHabits } from '@/contexts/HabitContext';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Flame, Calendar, Trophy, Star } from 'lucide-react';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, isSameDay, isWithinInterval, addDays, subMonths, addMonths, parseISO } from 'date-fns';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Streaks() {
  const { habits } = useHabits();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);
  
  // Get start and end of current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  
  // Generate array of days for current month
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get weekday names
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Get selected habit or the first one
  const selectedHabit = selectedHabitId 
    ? habits.find(h => h.id === selectedHabitId) 
    : habits[0];
  
  // Function to navigate between months
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(direction === 'prev' 
      ? subMonths(currentMonth, 1) 
      : addMonths(currentMonth, 1)
    );
  };
  
  // Function to determine day completion status
  const getCompletionStatus = (habit: typeof selectedHabit, date: Date) => {
    if (!habit) return 'empty';
    
    const dateStr = format(date, 'yyyy-MM-dd');
    const entry = habit.completionHistory.find(h => h.date === dateStr);
    
    if (!entry) return 'empty';
    return entry.completed ? 'completed' : 'missed';
  };
  
  // Function to get class based on completion status
  const getCompletionClass = (status: string) => {
    switch (status) {
      case 'completed': 
        return 'bg-progress-high hover:bg-progress-high/90';
      case 'missed': 
        return 'bg-progress-low hover:bg-progress-low/90';
      default: 
        return 'bg-secondary/50 hover:bg-secondary/70';
    }
  };
  
  // Get milestones for selected habit
  const getMilestones = (habit: typeof selectedHabit) => {
    if (!habit) return [];
    
    const milestones = [];
    
    // Add streak milestones
    if (habit.streak >= 7) {
      milestones.push({
        icon: <Flame className="h-5 w-5 text-theme-energy" />,
        label: `${habit.streak} day streak`,
        description: 'Keep it up!'
      });
    }
    
    // Add best streak milestone
    if (habit.bestStreak >= 14) {
      milestones.push({
        icon: <Trophy className="h-5 w-5 text-amber-500" />,
        label: `Best streak: ${habit.bestStreak} days`,
        description: 'Your personal record'
      });
    }
    
    // Add total completions milestone
    if (habit.totalCompletions >= 30) {
      milestones.push({
        icon: <Star className="h-5 w-5 text-yellow-500" />,
        label: `${habit.totalCompletions} total completions`,
        description: 'Consistency builds results'
      });
    }
    
    return milestones;
  };
  
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <section className="mb-6">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h1 className="text-3xl font-bold mb-2">Streak Tracker</h1>
            <p className="text-muted-foreground">Track your consistency and hit your goals.</p>
          </motion.div>
        </section>
        
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendar View
            </TabsTrigger>
            <TabsTrigger value="habits" className="flex items-center gap-2">
              <Flame className="h-4 w-4" />
              Habits
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="space-y-6">
            {/* Habit Selector */}
            <Card className="p-4 bg-background/50 backdrop-blur-sm">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Select Habit</h2>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {habits.map(habit => (
                    <Button
                      key={habit.id}
                      variant={selectedHabitId === habit.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedHabitId(habit.id)}
                      className="flex items-center gap-2"
                    >
                      <span>{habit.name}</span>
                      {habit.streak > 0 && (
                        <span className="flex items-center text-xs gap-1">
                          <Flame className="h-3 w-3 text-theme-energy" />
                          {habit.streak}
                        </span>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
            
            {/* Calendar View */}
            {selectedHabit && (
              <>
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <Button variant="outline" onClick={() => navigateMonth('prev')}>
                      Previous
                    </Button>
                    <h3 className="text-xl font-medium">
                      {format(currentMonth, 'MMMM yyyy')}
                    </h3>
                    <Button variant="outline" onClick={() => navigateMonth('next')}>
                      Next
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
                    {weekdays.map(day => (
                      <div key={day} className="text-center text-xs md:text-sm font-medium text-muted-foreground">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 md:gap-2">
                    {/* Empty cells for days before the 1st of the month */}
                    {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                      <div key={`empty-${i}`} className="h-10 md:h-16" />
                    ))}
                    
                    {/* Calendar days */}
                    {daysInMonth.map(day => {
                      const status = getCompletionStatus(selectedHabit, day);
                      const isToday = isSameDay(day, new Date());
                      
                      return (
                        <div 
                          key={day.toString()} 
                          className={cn(
                            "h-10 md:h-16 rounded-md flex flex-col items-center justify-center transition-all",
                            getCompletionClass(status),
                            isToday ? "ring-2 ring-primary ring-offset-2" : ""
                          )}
                        >
                          <span className={cn(
                            "text-xs md:text-sm font-medium",
                            status === 'empty' ? "text-muted-foreground" : "text-white"
                          )}>
                            {format(day, 'd')}
                          </span>
                          
                          {status === 'completed' && (
                            <Flame className="h-3 w-3 text-white opacity-80" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </Card>
                
                {/* Legend */}
                <div className="flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-sm bg-progress-high" />
                    <span className="text-sm text-muted-foreground">Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-sm bg-progress-low" />
                    <span className="text-sm text-muted-foreground">Missed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-sm bg-secondary/50" />
                    <span className="text-sm text-muted-foreground">No Data</span>
                  </div>
                </div>
                
                {/* Milestones */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {getMilestones(selectedHabit).map((milestone, i) => (
                    <Card key={i} className="p-4 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center">
                        {milestone.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{milestone.label}</h4>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="habits" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {habits.map(habit => {
                // Calculate completion rate for current month
                const completionsThisMonth = habit.completionHistory.filter(entry => {
                  const entryDate = parseISO(entry.date);
                  return entry.completed && 
                    isWithinInterval(entryDate, { start: monthStart, end: monthEnd });
                }).length;
                
                const daysInCurrentMonth = daysInMonth.length;
                const completionRate = (completionsThisMonth / daysInCurrentMonth) * 100;
                
                return (
                  <Card key={habit.id} className="overflow-hidden">
                    <div className="bg-secondary p-4">
                      <h3 className="font-medium text-lg">{habit.name}</h3>
                    </div>
                    
                    <div className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Flame className="h-5 w-5 text-theme-energy" />
                          <span className="font-medium">{habit.streak} day streak</span>
                        </div>
                        <span className="text-sm text-muted-foreground">Best: {habit.bestStreak}</span>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Month Progress</span>
                          <span className="text-sm font-medium">{Math.round(completionRate)}%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${completionRate}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Total Completions</span>
                        <span className="text-sm font-medium">{habit.totalCompletions}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {/* Mini heatmap for last 10 days */}
                        {Array.from({ length: 10 }).map((_, i) => {
                          const date = format(addDays(new Date(), -9 + i), 'yyyy-MM-dd');
                          const entry = habit.completionHistory.find(e => e.date === date);
                          const completed = entry?.completed || false;
                          
                          return (
                            <div 
                              key={i} 
                              className={`w-4 h-4 rounded-sm ${
                                completed ? 'bg-progress-high' : 'bg-secondary'
                              }`}
                              title={date}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </MainLayout>
  );
}
