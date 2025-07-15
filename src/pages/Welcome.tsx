
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Heart, Sparkles, Moon, Sun } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 animate-float">
        <Heart className="w-8 h-8 text-primary/30" />
      </div>
      <div className="absolute top-32 right-16 animate-float" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-6 h-6 text-accent/40" />
      </div>
      <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <Moon className="w-7 h-7 text-secondary/40" />
      </div>
      <div className="absolute bottom-40 right-12 animate-float" style={{ animationDelay: '0.5s' }}>
        <Sun className="w-9 h-9 text-accent/30" />
      </div>

      <div className="max-w-sm w-full text-center space-y-8 z-10">
        {/* Logo */}
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center animate-pulse-glow">
            <Heart className="w-10 h-10 text-primary-foreground" fill="currentColor" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">MindMate</h1>
        </div>

        {/* Main content */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground leading-tight">
            Discover your mood insights
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Track your daily emotions, chat with AI support, and build healthy mental habits that last.
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-4">
          <Button 
            onClick={handleGetStarted}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl py-6 text-lg font-medium shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02]"
          >
            Get Started
          </Button>
          
          <button 
            onClick={() => navigate("/home")}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            I already have an account
          </button>
        </div>

        {/* Mood preview */}
        <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="flex justify-center gap-4">
            {['😊', '😢', '😠', '😴', '😰'].map((emoji, index) => (
              <div 
                key={emoji}
                className="w-10 h-10 rounded-full bg-background/80 flex items-center justify-center text-lg animate-pulse-glow hover:scale-110 transition-transform cursor-pointer"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {emoji}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            How are you feeling today?
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Welcome;
