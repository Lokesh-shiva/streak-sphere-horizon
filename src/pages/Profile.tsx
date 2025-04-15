import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/main-layout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  Trophy, 
  User, 
  Mail, 
  MapPin, 
  Clock, 
  Edit, 
  Share2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useHabits } from '@/contexts/HabitContext';
import { Separator } from '@/components/ui/separator';

const mockAchievements = [
  { id: 1, title: "7-Day Streak", description: "Completed a habit for 7 consecutive days", date: "2023-11-15" },
  { id: 2, title: "Habit Master", description: "Created and maintained 5 habits", date: "2023-10-22" },
  { id: 3, title: "Perfect Week", description: "Completed all habits for an entire week", date: "2023-11-05" },
  { id: 4, title: "Early Bird", description: "Completed morning habits before 8AM for 5 consecutive days", date: "2023-11-10" },
];

const Profile = () => {
  const { user } = useAuth();
  const { habits } = useHabits();
  
  // Mockup user data (would normally come from the backend)
  const mockUserData = {
    name: user?.name || "Jane Smith",
    email: user?.email || "jane.smith@example.com",
    avatarUrl: user?.avatarUrl || "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Passionate about building great habits and becoming a better version of myself every day. I love hiking, coding, and meditation.",
    location: "San Francisco, CA",
    memberSince: "October 2023",
    totalHabits: habits?.length || 8,
    activeStreaks: habits?.filter(h => h.streak > 0)?.length || 3,
    longestStreak: habits?.reduce((max, h) => Math.max(max, h.streak || 0), 0) || 21,
    favoriteCategories: ["Health", "Productivity", "Learning"],
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Profile</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="col-span-1">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center">
                <Avatar className="h-24 w-24 border-2 border-primary/20">
                  <AvatarImage src={mockUserData.avatarUrl} alt={mockUserData.name} />
                  <AvatarFallback className="text-lg">{getInitials(mockUserData.name)}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="mt-4">{mockUserData.name}</CardTitle>
              <CardDescription className="flex items-center justify-center">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                {mockUserData.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center px-6">
              <p className="text-sm text-muted-foreground mt-2">{mockUserData.bio}</p>
              
              <div className="flex justify-between mt-6 px-2">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-semibold">{mockUserData.totalHabits}</span>
                  <span className="text-xs text-muted-foreground">Habits</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-semibold">{mockUserData.activeStreaks}</span>
                  <span className="text-xs text-muted-foreground">Streaks</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-semibold">{mockUserData.longestStreak}</span>
                  <span className="text-xs text-muted-foreground">Longest</span>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{mockUserData.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Member since {mockUserData.memberSince}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-6">
                {mockUserData.favoriteCategories.map(category => (
                  <Badge key={category} variant="outline">{category}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tabs Card */}
          <Card className="col-span-1 md:col-span-2">
            <CardContent className="pt-6">
              <Tabs defaultValue="achievements">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                </TabsList>
                
                <TabsContent value="achievements" className="space-y-4">
                  {mockAchievements.map(achievement => (
                    <div key={achievement.id} className="flex items-start gap-4 p-4 rounded-lg border">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Trophy className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {new Date(achievement.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">View All Achievements</Button>
                </TabsContent>
                
                <TabsContent value="activity" className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-primary" />
                        <p className="text-sm font-medium">Completed "Morning Meditation" habit</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Today, 8:15 AM</p>
                    </div>
                    
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <p className="text-sm font-medium">Achieved "7-Day Streak" for "Daily Exercise"</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Yesterday, 6:30 PM</p>
                    </div>
                    
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-primary" />
                        <p className="text-sm font-medium">Added new habit "Read 30 minutes"</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Nov 12, 2023, 9:45 AM</p>
                    </div>
                    
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-primary" />
                        <p className="text-sm font-medium">Completed all habits for the day</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Nov 11, 2023, 10:00 PM</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">View Activity History</Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile; 