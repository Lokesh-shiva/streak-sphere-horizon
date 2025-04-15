
import MainLayout from '@/components/layout/main-layout';
import { useHabits } from '@/contexts/HabitContext';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format, parseISO, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';
import { HabitCategory } from '@/types';

// Colors for charts
const COLORS = {
  health: "#FF6B6B",
  fitness: "#4ECDC4",
  productivity: "#FFD166",
  mindfulness: "#6A0572",
  learning: "#1A535C",
  social: "#3A86FF",
  creativity: "#F72585",
  other: "#8E9196"
};

export default function Stats() {
  const { habits } = useHabits();
  
  // Prepare weekly completion data
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
  const daysOfWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  const weeklyCompletionData = daysOfWeek.map(day => {
    const dayStr = format(day, 'yyyy-MM-dd');
    const dayName = format(day, 'EEE');
    
    // Count completed habits for this day
    const completedCount = habits.filter(habit => 
      habit.completionHistory.some(entry => 
        entry.date === dayStr && entry.completed
      )
    ).length;
    
    return {
      name: dayName,
      completed: completedCount,
      total: habits.length,
      date: dayStr,
    };
  });
  
  // Prepare habits by category data
  const categoryCounts: Record<string, number> = {};
  habits.forEach(habit => {
    const { category } = habit;
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });
  
  const categoryData = Object.entries(categoryCounts).map(([category, count]) => ({
    name: category,
    value: count
  }));
  
  // Calculate completion rates by category
  const completionRatesByCategory: Record<string, { completed: number, total: number }> = {};
  
  habits.forEach(habit => {
    const { category } = habit;
    
    if (!completionRatesByCategory[category]) {
      completionRatesByCategory[category] = { completed: 0, total: 0 };
    }
    
    // Count total check-ins for this category
    const totalDays = habit.completionHistory.length;
    completionRatesByCategory[category].total += totalDays;
    
    // Count completed check-ins for this category
    const completedDays = habit.completionHistory.filter(entry => entry.completed).length;
    completionRatesByCategory[category].completed += completedDays;
  });
  
  const categoryCompletionData = Object.entries(completionRatesByCategory).map(([category, data]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    rate: data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0
  }));
  
  // Calculate overall stats
  const totalHabits = habits.length;
  const totalCompletions = habits.reduce((sum, habit) => sum + habit.totalCompletions, 0);
  const currentStreaks = habits.reduce((sum, habit) => sum + habit.streak, 0);
  const avgStreak = habits.length > 0 ? Math.round(currentStreaks / habits.length) : 0;
  
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <section>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h1 className="text-3xl font-bold mb-2">Statistics</h1>
            <p className="text-muted-foreground">Track your progress and see your habits insights.</p>
          </motion.div>
        </section>
        
        {/* Overall Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Habits</h3>
            <p className="text-3xl font-bold">{totalHabits}</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Completions</h3>
            <p className="text-3xl font-bold">{totalCompletions}</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Average Streak</h3>
            <p className="text-3xl font-bold">{avgStreak} days</p>
          </Card>
        </div>
        
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="weekly">Weekly Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="habits">Habits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Weekly Completion</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyCompletionData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [value, name === 'completed' ? 'Completed' : 'Total']}
                      labelFormatter={(label) => `${label}`}
                    />
                    <Legend />
                    <Bar dataKey="completed" name="Completed" fill="#4ECDC4" />
                    <Bar dataKey="total" name="Total" fill="#FFD166" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Habits by Category</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[entry.name as HabitCategory] || "#8E9196"} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} habits`, 'Count']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Completion Rate by Category</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={categoryCompletionData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Completion Rate']} />
                      <Bar dataKey="rate" name="Completion Rate" fill="#4ECDC4" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="habits" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Habit Streaks</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={habits.map(habit => ({
                      name: habit.name,
                      streak: habit.streak,
                      bestStreak: habit.bestStreak
                    }))}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="streak" name="Current Streak" fill="#3A86FF" />
                    <Bar dataKey="bestStreak" name="Best Streak" fill="#FF6B6B" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Total Completions</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={habits.map(habit => ({
                      name: habit.name,
                      completions: habit.totalCompletions
                    }))}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Bar dataKey="completions" name="Total Completions" fill="#77DD77" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </MainLayout>
  );
}
