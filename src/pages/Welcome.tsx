
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Heart, Sparkles, Moon, Sun, Flower2, Cloud } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Enhanced floating background elements */}
      <div className="floating-shape top-20 left-10 animate-float">
        <Heart className="w-12 h-12 text-primary/30" fill="currentColor" />
      </div>
      <div className="floating-shape top-32 right-16 animate-float" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-10 h-10 text-accent/40" />
      </div>
      <div className="floating-shape bottom-32 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <Cloud className="w-14 h-14 text-secondary/30" />
      </div>
      <div className="floating-shape bottom-40 right-12 animate-float" style={{ animationDelay: '0.5s' }}>
        <Flower2 className="w-11 h-11 text-success/40" />
      </div>
      <div className="floating-shape top-1/2 left-8 animate-float" style={{ animationDelay: '3s' }}>
        <Moon className="w-8 h-8 text-secondary/25" />
      </div>
      <div className="floating-shape top-2/3 right-8 animate-float" style={{ animationDelay: '1.5s' }}>
        <Sun className="w-9 h-9 text-accent/35" />
      </div>

      <div className="max-w-sm w-full text-center space-y-8 z-10">
        {/* Enhanced logo with personality */}
        <div className="space-y-6">
          <div className="relative">
            <div className="w-28 h-28 mx-auto bg-gradient-to-br from-primary via-primary/90 to-secondary/80 rounded-full flex items-center justify-center animate-pulse-glow shadow-warm">
              <Heart className="w-14 h-14 text-white animate-heart-beat" fill="currentColor" />
            </div>
            {/* Decorative rings around logo */}
            <div className="absolute inset-0 w-28 h-28 mx-auto rounded-full border-2 border-primary/20 animate-ping"></div>
            <div className="absolute inset-2 w-24 h-24 mx-auto rounded-full border border-primary/10 animate-pulse"></div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl text-display text-warm">MindMate</h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Your emotional companion</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Enhanced main content */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl text-heading text-foreground leading-tight">
              Discover your mood insights
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Track your daily emotions, chat with AI support, and build healthy mental habits that last.
              <span className="block mt-2 text-primary font-medium">✨ Your journey to wellness starts here</span>
            </p>
          </div>
        </div>

        {/* Enhanced action buttons */}
        <div className="space-y-4">
          <Button 
            onClick={handleGetStarted}
            className="w-full bg-gradient-to-r from-primary via-primary to-secondary hover:from-primary/90 hover:via-primary/90 hover:to-secondary/90 text-white rounded-3xl py-7 text-lg font-semibold shadow-warm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] interactive"
          >
            <Heart className="w-5 h-5 mr-2" fill="currentColor" />
            Get Started
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
          
          <button 
            onClick={() => navigate("/home")}
            className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium hover:scale-105 transform duration-200"
          >
            I already have an account →
          </button>
        </div>

        {/* Enhanced mood preview with more personality */}
        <Card className="p-6 glass shadow-soft border-white/20">
          <div className="space-y-4">
            <div className="flex justify-center gap-3">
              {[
                { emoji: '😊', color: 'from-yellow-200 to-yellow-300', delay: '0s' },
                { emoji: '😢', color: 'from-blue-200 to-blue-300', delay: '0.2s' },
                { emoji: '😠', color: 'from-red-200 to-red-300', delay: '0.4s' },
                { emoji: '😴', color: 'from-purple-200 to-purple-300', delay: '0.6s' },
                { emoji: '😰', color: 'from-orange-200 to-orange-300', delay: '0.8s' }
              ].map((mood, index) => (
                <div 
                  key={mood.emoji}
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${mood.color} flex items-center justify-center text-lg animate-bounce-gentle hover:scale-125 transition-transform cursor-pointer shadow-md hover:shadow-lg`}
                  style={{ animationDelay: mood.delay }}
                >
                  {mood.emoji}
                </div>
              ))}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                How are you feeling today?
              </p>
              <p className="text-xs text-muted-foreground">
                Tap any mood to start your journey
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Welcome;
