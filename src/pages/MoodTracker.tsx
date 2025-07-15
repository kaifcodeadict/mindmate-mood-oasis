
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, TrendingUp, Lock } from "lucide-react";
import { useState } from "react";

const MoodTracker = () => {
  const navigate = useNavigate();
  const [selectedWeek, setSelectedWeek] = useState(0);
  
  // Mock data for mood tracking
  const moodData = [
    { day: 'Mon', mood: 'happy', emoji: '😊', value: 85 },
    { day: 'Tue', mood: 'neutral', emoji: '😐', value: 60 },
    { day: 'Wed', mood: 'happy', emoji: '😊', value: 90 },
    { day: 'Thu', mood: 'sad', emoji: '😢', value: 30 },
    { day: 'Fri', mood: 'happy', emoji: '😊', value: 80 },
    { day: 'Sat', emoji: '❓', value: 0 },
    { day: 'Sun', emoji: '❓', value: 0 }
  ];

  const weeklyAverage = Math.round(
    moodData.filter(d => d.value > 0).reduce((sum, d) => sum + d.value, 0) / 
    moodData.filter(d => d.value > 0).length
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/home")}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div>
          <h2 className="font-semibold text-foreground">Mood Tracker</h2>
          <p className="text-sm text-muted-foreground">Your emotional journey</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Weekly Progress */}
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">This Week</h3>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Mood Journey</span>
                <span className="font-medium text-foreground">{weeklyAverage}%</span>
              </div>
              <Progress value={weeklyAverage} className="h-3" />
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Streak:</span>
                <span className="font-medium text-foreground">3 days</span>
                <span>🔥</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Most frequent:</span>
                <span>😊 Happy</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Daily Mood Chart */}
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Daily Mood</h3>
            
            <div className="grid grid-cols-7 gap-2">
              {moodData.map((day, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="text-xs text-muted-foreground font-medium">
                    {day.day}
                  </div>
                  
                  <div className="relative">
                    <div 
                      className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center text-lg transition-all duration-200 ${
                        day.value > 0 
                          ? 'bg-card border-primary/30 hover:scale-105' 
                          : 'bg-muted border-border'
                      }`}
                    >
                      {day.emoji}
                    </div>
                    
                    {day.value > 0 && (
                      <div 
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-full"
                        style={{ opacity: day.value / 100 }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Calendar View - Premium Feature */}
        <Card className="p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted/30" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">Monthly Calendar</h3>
              </div>
              <Lock className="w-4 h-4 text-muted-foreground" />
            </div>
            
            <p className="text-sm text-muted-foreground">
              View your complete mood history across months with detailed insights and patterns.
            </p>
            
            <Button 
              onClick={() => navigate("/premium")}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl"
            >
              Unlock Premium Features
            </Button>
          </div>
        </Card>

        {/* Insights */}
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Weekly Insights</h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Positive Trend
                  </p>
                  <p className="text-xs text-muted-foreground">
                    You've had more happy days this week compared to last week
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Consistency Building
                  </p>
                  <p className="text-xs text-muted-foreground">
                    You're maintaining a 3-day check-in streak!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MoodTracker;
