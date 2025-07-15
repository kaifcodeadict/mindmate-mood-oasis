
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { MessageCircle, TrendingUp, Settings, Home as HomeIcon, BarChart3, Heart, Sparkles, Star, Crown } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const moods = [
    { 
      emoji: '😊', 
      label: 'Happy', 
      value: 'happy',
      gradient: 'from-yellow-200 via-yellow-300 to-yellow-400',
      shadowColor: 'shadow-yellow-200/50'
    },
    { 
      emoji: '😢', 
      label: 'Sad', 
      value: 'sad',
      gradient: 'from-blue-200 via-blue-300 to-blue-400',
      shadowColor: 'shadow-blue-200/50'
    },
    { 
      emoji: '😠', 
      label: 'Angry', 
      value: 'angry',
      gradient: 'from-red-200 via-red-300 to-red-400',
      shadowColor: 'shadow-red-200/50'
    },
    { 
      emoji: '😴', 
      label: 'Tired', 
      value: 'tired',
      gradient: 'from-purple-200 via-purple-300 to-purple-400',
      shadowColor: 'shadow-purple-200/50'
    },
    { 
      emoji: '😰', 
      label: 'Anxious', 
      value: 'anxious',
      gradient: 'from-orange-200 via-orange-300 to-orange-400',
      shadowColor: 'shadow-orange-200/50'
    }
  ];

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setIsAnimating(true);
    
    // Navigate to chat after mood selection with enhanced animation
    setTimeout(() => {
      navigate("/chat", { state: { mood } });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-warm pb-20 relative overflow-hidden">
      {/* Floating background elements for depth */}
      <div className="floating-shape top-16 right-12 animate-float">
        <Heart className="w-8 h-8 text-primary/20" fill="currentColor" />
      </div>
      <div className="floating-shape top-32 left-8 animate-float" style={{ animationDelay: '2s' }}>
        <Sparkles className="w-6 h-6 text-accent/25" />
      </div>
      <div className="floating-shape bottom-40 right-16 animate-float" style={{ animationDelay: '1s' }}>
        <Star className="w-7 h-7 text-secondary/20" />
      </div>

      {/* Enhanced Header with personality */}
      <div className="p-6 pt-12 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-glow">
              <Heart className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-2xl text-display text-warm">
                Good afternoon! 👋
              </h1>
              <p className="text-muted-foreground text-sm">
                Ready to check in with yourself?
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-4 border border-primary/20">
            <p className="text-foreground font-medium text-center">
              How are you feeling today? ✨
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Mood Selection with personality */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-5 gap-3">
          {moods.map((mood, index) => (
            <button
              key={mood.value}
              onClick={() => handleMoodSelect(mood.value)}
              disabled={isAnimating}
              className={`mood-bubble aspect-square flex flex-col items-center justify-center gap-2 relative overflow-hidden ${
                selectedMood === mood.value 
                  ? 'selected animate-pulse-glow' 
                  : ''
              } ${mood.shadowColor}`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                transform: selectedMood === mood.value ? 'scale(1.1)' : 'scale(1)'
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${mood.gradient} opacity-0 transition-opacity duration-300 ${
                selectedMood === mood.value ? 'opacity-20' : 'hover:opacity-10'
              }`} />
              
              <span className="text-2xl relative z-10 animate-bounce-gentle" style={{ animationDelay: `${index * 0.2}s` }}>
                {mood.emoji}
              </span>
              <span className="text-xs text-muted-foreground font-medium relative z-10">
                {mood.label}
              </span>
              
              {selectedMood === mood.value && (
                <div className="absolute inset-0 rounded-3xl border-2 border-primary animate-ping" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/chat")}
            className="h-24 rounded-3xl border-2 hover:border-primary/50 bg-gradient-to-br from-card to-muted/30 hover:from-primary/5 hover:to-primary/10 shadow-soft interactive group"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-foreground">Chat Therapy</span>
              <span className="text-xs text-muted-foreground">Talk to your AI friend</span>
            </div>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate("/mood-tracker")}
            className="h-24 rounded-3xl border-2 hover:border-secondary/50 bg-gradient-to-br from-card to-muted/30 hover:from-secondary/5 hover:to-secondary/10 shadow-soft interactive group"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-foreground">Mood Garden</span>
              <span className="text-xs text-muted-foreground">Watch your growth</span>
            </div>
          </Button>
        </div>
      </div>

      {/* Enhanced Progress Card with personality */}
      <div className="px-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-success/10 via-primary/5 to-secondary/10 border-success/20 shadow-warm relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <Heart className="w-6 h-6 text-success/30 animate-heart-beat" fill="currentColor" />
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-success" />
                <h3 className="text-heading font-semibold text-foreground">
                  You're feeling good this week!
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Your emotional journey is blossoming beautifully 🌱
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-medium">Mood Journey</span>
                <span className="font-bold text-success">82% ✨</span>
              </div>
              <div className="relative">
                <Progress value={82} className="h-3 progress-heart" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Streak:</span>
                <span className="font-bold text-primary">3 days</span>
                <span className="animate-wiggle">🔥</span>
              </div>
              <div className="flex items-center gap-1">
                <Crown className="w-4 h-4 text-accent" />
                <span className="text-accent font-medium">Keep going!</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Enhanced Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border/50 px-6 py-4 shadow-warm">
        <div className="flex justify-around max-w-md mx-auto">
          <button className="flex flex-col items-center gap-1 p-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform">
              <HomeIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium text-primary">Home</span>
          </button>
          
          <button 
            onClick={() => navigate("/chat")}
            className="flex flex-col items-center gap-1 p-2 group interactive"
          >
            <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-primary/10 transition-all">
              <MessageCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">Chat</span>
          </button>
          
          <button 
            onClick={() => navigate("/mood-tracker")}
            className="flex flex-col items-center gap-1 p-2 group interactive"
          >
            <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-secondary/20 group-hover:to-secondary/10 transition-all">
              <BarChart3 className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
            </div>
            <span className="text-xs text-muted-foreground group-hover:text-secondary transition-colors">Stats</span>
          </button>
          
          <button 
            onClick={() => navigate("/settings")}
            className="flex flex-col items-center gap-1 p-2 group interactive"
          >
            <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-accent/20 group-hover:to-accent/10 transition-all">
              <Settings className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
            </div>
            <span className="text-xs text-muted-foreground group-hover:text-accent transition-colors">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
