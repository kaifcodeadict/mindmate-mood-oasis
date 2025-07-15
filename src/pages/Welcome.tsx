
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Heart, Sparkles, Moon, Sun, Flower2, Cloud, Star } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-serenity flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Enhanced floating background elements */}
      <div className="floating-element top-24 left-12 animate-float-gentle">
        <Heart className="w-14 h-14 text-primary/25" fill="currentColor" />
      </div>
      <div className="floating-element top-40 right-20 animate-float-gentle" style={{ animationDelay: '1.5s' }}>
        <Sparkles className="w-12 h-12 text-accent/30" />
      </div>
      <div className="floating-element bottom-40 left-24 animate-float-gentle" style={{ animationDelay: '3s' }}>
        <Cloud className="w-16 h-16 text-secondary/25" />
      </div>
      <div className="floating-element bottom-32 right-16 animate-float-gentle" style={{ animationDelay: '0.8s' }}>
        <Flower2 className="w-13 h-13 text-success/35" />
      </div>
      <div className="floating-element top-2/3 left-10 animate-float-gentle" style={{ animationDelay: '4s' }}>
        <Moon className="w-10 h-10 text-secondary/20" />
      </div>
      <div className="floating-element top-1/2 right-12 animate-float-gentle" style={{ animationDelay: '2s' }}>
        <Sun className="w-11 h-11 text-accent/30" />
      </div>
      <div className="floating-element top-1/3 left-1/3 animate-float-gentle" style={{ animationDelay: '2.5s' }}>
        <Star className="w-8 h-8 text-primary/20" />
      </div>

      <div className="max-w-md w-full text-center space-y-10 z-10 animate-fade-in-up">
        {/* Enhanced logo with deeper personality */}
        <div className="space-y-8">
          <div className="relative">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary via-primary/95 to-secondary/85 rounded-full flex items-center justify-center animate-pulse-soft shadow-wellness relative overflow-hidden">
              {/* Subtle inner glow */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
              <Heart className="w-16 h-16 text-white animate-heart-beat-gentle relative z-10" fill="currentColor" />
            </div>
            {/* Enhanced decorative rings */}
            <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-2 border-primary/15 animate-pulse-soft"></div>
            <div className="absolute inset-3 w-26 h-26 mx-auto rounded-full border border-primary/10 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-display text-wellness">MindMate</h1>
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <Sparkles className="w-5 h-5 text-accent animate-bounce-subtle" />
              <span className="text-lg font-body">Your emotional sanctuary</span>
              <Sparkles className="w-5 h-5 text-accent animate-bounce-subtle" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>

        {/* Enhanced main content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-heading text-foreground leading-tight">
              Discover your inner wisdom
            </h2>
            <p className="text-muted-foreground text-lg font-body leading-relaxed">
              Track your emotional journey, connect with compassionate AI support, and cultivate lasting wellness habits.
            </p>
            <div className="wellness-card p-4 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10 mt-6">
              <p className="text-primary font-heading text-lg">
                ✨ Your path to emotional flourishing starts here
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced action buttons */}
        <div className="space-y-6">
          <Button 
            onClick={handleGetStarted}
            className="w-full bg-gradient-to-r from-primary via-primary/95 to-secondary hover:from-primary/90 hover:via-primary/85 hover:to-secondary/90 text-white rounded-full py-8 text-xl font-heading shadow-wellness transition-all duration-500 hover:shadow-xl hover:scale-[1.02] interactive-element relative overflow-hidden"
          >
            {/* Subtle shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-soft"></div>
            <Heart className="w-6 h-6 mr-3 relative z-10" fill="currentColor" />
            <span className="relative z-10">Begin Your Journey</span>
            <Sparkles className="w-6 h-6 ml-3 relative z-10" />
          </Button>
          
          <button 
            onClick={() => navigate("/home")}
            className="text-muted-foreground hover:text-primary transition-colors text-base font-body hover:scale-105 transform duration-300 interactive-element"
          >
            I already have an account →
          </button>
        </div>

        {/* Enhanced mood preview with deeper personality */}
        <Card className="wellness-card p-8 glass-wellness shadow-wellness border-white/25 relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 right-4">
              <Heart className="w-6 h-6 text-primary" fill="currentColor" />
            </div>
            <div className="absolute bottom-4 left-4">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
          </div>
          
          <div className="space-y-6 relative z-10">
            <div className="flex justify-center gap-4">
              {[
                { emoji: '😊', color: 'from-yellow-200/40 to-yellow-300/30', delay: '0s', label: 'Joyful' },
                { emoji: '😌', color: 'from-blue-200/40 to-blue-300/30', delay: '0.2s', label: 'Peaceful' },
                { emoji: '😔', color: 'from-purple-200/40 to-purple-300/30', delay: '0.4s', label: 'Tender' },
                { emoji: '😰', color: 'from-orange-200/40 to-orange-300/30', delay: '0.6s', label: 'Unsettled' },
                { emoji: '😴', color: 'from-indigo-200/40 to-indigo-300/30', delay: '0.8s', label: 'Restful' }
              ].map((mood, index) => (
                <div 
                  key={mood.emoji}
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${mood.color} flex items-center justify-center text-xl animate-bounce-subtle hover:scale-125 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg relative overflow-hidden group`}
                  style={{ animationDelay: mood.delay }}
                >
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">{mood.emoji}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-heading text-foreground">
                How are you feeling today?
              </h3>
              <p className="text-sm text-muted-foreground font-body">
                Express your emotions in a safe, nurturing space
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Welcome;
