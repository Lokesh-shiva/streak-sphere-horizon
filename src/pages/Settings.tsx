
import MainLayout from '@/components/layout/main-layout';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeMode } from '@/types';
import { motion } from 'framer-motion';
import { AlertCircle, Bell, Paintbrush, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    toast({
      title: "Theme Updated",
      description: `Theme changed to ${newTheme} mode`,
    });
  };
  
  const handleResetData = () => {
    toast({
      title: "Data Reset",
      description: "All habit data has been reset",
      variant: "destructive"
    });
  };

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
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">Configure your habit tracking experience.</p>
          </motion.div>
        </section>
        
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Paintbrush className="h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              Data
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Theme</h3>
              <p className="text-muted-foreground mb-6">Choose your preferred theme mode.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Light Theme Option */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    theme === 'light' ? 'border-primary bg-secondary/50' : 'hover:bg-secondary/20'
                  }`}
                  onClick={() => handleThemeChange('light')}
                >
                  <div className="h-24 bg-[#f8fafc] rounded-md mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#0369a1]"></div>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Light</p>
                    <p className="text-xs text-muted-foreground">Clean, bright interface</p>
                  </div>
                </div>
                
                {/* Dark Theme Option */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    theme === 'dark' ? 'border-primary bg-secondary/50' : 'hover:bg-secondary/20'
                  }`}
                  onClick={() => handleThemeChange('dark')}
                >
                  <div className="h-24 bg-[#0f172a] rounded-md mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#38bdf8]"></div>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Dark</p>
                    <p className="text-xs text-muted-foreground">Easy on the eyes</p>
                  </div>
                </div>
                
                {/* Vibe Theme Option */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    theme === 'vibe' ? 'border-primary bg-secondary/50' : 'hover:bg-secondary/20'
                  }`}
                  onClick={() => handleThemeChange('vibe')}
                >
                  <div className="h-24 bg-gradient-calm rounded-md mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white"></div>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Vibe</p>
                    <p className="text-xs text-muted-foreground">Dynamic gradients</p>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <h3 className="text-lg font-semibold mb-4">Animations</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="animations">Enable animations</Label>
                    <p className="text-sm text-muted-foreground">Controls all animations across the app</p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="streak-celebrations">Streak celebrations</Label>
                    <p className="text-sm text-muted-foreground">Show celebration effects when completing habits</p>
                  </div>
                  <Switch id="streak-celebrations" defaultChecked />
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Reminders</h3>
              <p className="text-muted-foreground mb-6">Configure when you want to receive reminders.</p>
              
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Demo Mode</AlertTitle>
                <AlertDescription>
                  Notifications are simulated in this demo. No actual notifications will be sent.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="daily-reminder">Daily reminder</Label>
                    <p className="text-sm text-muted-foreground">Get a reminder to complete your habits</p>
                  </div>
                  <Switch id="daily-reminder" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="streak-alerts">Streak alerts</Label>
                    <p className="text-sm text-muted-foreground">Get alerted when a streak is at risk</p>
                  </div>
                  <Switch id="streak-alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="milestone-celebrations">Milestone celebrations</Label>
                    <p className="text-sm text-muted-foreground">Get notified when you hit milestones</p>
                  </div>
                  <Switch id="milestone-celebrations" defaultChecked />
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="data">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Data Management</h3>
              <p className="text-muted-foreground mb-6">Manage your habit data.</p>
              
              <Alert className="mb-6" variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  These actions cannot be undone. This will permanently reset your data.
                </AlertDescription>
              </Alert>
              
              <Button variant="destructive" onClick={handleResetData}>
                Reset All Habit Data
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </MainLayout>
  );
}
