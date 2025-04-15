import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { HabitCategory, HabitFrequency } from "@/types";
import { Smile, AlertCircle } from "lucide-react";

interface AddHabitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddHabitDialog({ open, onOpenChange }: AddHabitDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<HabitCategory>("health");
  const [frequency, setFrequency] = useState<HabitFrequency>("daily");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Simulate a loading state
    setTimeout(() => {
      // Reset form after submission
      setName("");
      setDescription("");
      setCategory("health");
      setFrequency("daily");
      setSubmitted(false);
      onOpenChange(false);
    }, 1500);
  };

  const categories: { value: HabitCategory; label: string }[] = [
    { value: "health", label: "Health" },
    { value: "fitness", label: "Fitness" },
    { value: "productivity", label: "Productivity" },
    { value: "mindfulness", label: "Mindfulness" },
    { value: "learning", label: "Learning" },
    { value: "social", label: "Social" },
    { value: "creativity", label: "Creativity" },
    { value: "other", label: "Other" },
  ];

  const frequencies: { value: HabitFrequency; label: string }[] = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "weekdays", label: "Weekdays" },
    { value: "weekends", label: "Weekends" },
    { value: "custom", label: "Custom" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Habit</DialogTitle>
          <DialogDescription>
            Create a new habit to track. Fill out the details below.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Habit Name</Label>
            <Input
              id="name"
              placeholder="e.g., Drink water, Read, Exercise"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Input
              id="description"
              placeholder="Add more details about your habit"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={category} 
                onValueChange={(value) => setCategory(value as HabitCategory)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select 
                value={frequency} 
                onValueChange={(value) => setFrequency(value as HabitFrequency)}
              >
                <SelectTrigger id="frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map((freq) => (
                    <SelectItem key={freq.value} value={freq.value}>
                      {freq.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={submitted}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!name || submitted}
              className="relative"
            >
              {submitted ? (
                <>
                  <span className="opacity-0">Add Habit</span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Smile className="h-4 w-4 animate-bounce mr-2" />
                    Creating...
                  </span>
                </>
              ) : (
                "Add Habit"
              )}
            </Button>
          </DialogFooter>
        </form>
        
        {/* Note that this is just a mock implementation */}
        <div className="mt-4 rounded-md bg-yellow-50 p-3">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Note
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  This is a mock implementation. New habits won't be saved permanently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 