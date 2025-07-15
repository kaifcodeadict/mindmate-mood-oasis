
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { MessageCircle, TrendingUp, Settings, Home as HomeIcon, BarChart3 } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  
  const moods = [
    { emoji: '😊', label: 'Happy', value: 'happy' },
    { emoji: '😢', label: 'Sad', value: 'sad' },
    { emoji: '😠', label: 'Angry', value: 'angry' },
    { emoji: '😴', label: 'Tired', value: 'tired' },
    { emoji: '😰', label: 'Anxious', value: 'anxious' }
  ];

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    // Navigate to chat after mood selection
    setTimeout(() => {
      navigate("/chat", { state: { mood } });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="p-6 pt-12">
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Good afternoon, Friend 👋
        </h1>
        <p className="text-muted-foreground">
          How are you feeling today?
        </p>
      </div>

      {/* Mood Selection */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-5 gap-3">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => handleMoodSelect(mood.value)}
              className={`aspect-square rounded-2xl bg-card border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg flex flex-col items-center justify-center gap-1 ${
                selectedMood === mood.value 
                  ? 'border-primary bg-primary/10 scale-105' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-xs text-muted-foreground font-medium">
                {mood.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/chat")}
            className="h-20 rounded-2xl border-2 hover:border-primary/50 bg-card hover:bg-primary/5"
          >
            <div className="flex flex-col items-center gap-2">
              <MessageCircle className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium">Chat Therapy</span>
            </div>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate("/mood-tracker")}
            className="h-20 rounded-2xl border-2 hover:border-secondary/50 bg-card hover:bg-secondary/5"
          >
            <div className="flex flex-col items-center gap-2">
              <TrendingUp className="w-6 h-6 text-secondary" />
              <span className="text-sm font-medium">Mood Garden</span>
            </div>
          </Button>
        </div>
      </div>

      {/* Progress Card */}
      <div className="px-6 mb-8">
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                You're feeling good this week! 💚
              </h3>
              <p className="text-sm text-muted-foreground">
                Your mood journey is looking positive
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Mood Journey</span>
                <span className="font-medium text-foreground">82%</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>3 days streak!</span>
              <span>🔥</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-6 py-4">
        <div className="flex justify-around max-w-md mx-auto">
          <button className="flex flex-col items-center gap-1 p-2">
            <HomeIcon className="w-6 h-6 text-primary" />
            <span className="text-xs font-medium text-primary">Home</span>
          </button>
          
          <button 
            onClick={() => navigate("/chat")}
            className="flex flex-col items-center gap-1 p-2"
          >
            <MessageCircle className="w-6 h-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Chat</span>
          </button>
          
          <button 
            onClick={() => navigate("/mood-tracker")}
            className="flex flex-col items-center gap-1 p-2"
          >
            <BarChart3 className="w-6 h-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Stats</span>
          </button>
          
          <button 
            onClick={() => navigate("/settings")}
            className="flex flex-col items-center gap-1 p-2"
          >
            <Settings className="w-6 h-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
