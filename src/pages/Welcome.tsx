
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useUser, SignInButton, SignUpButton } from "@clerk/clerk-react";
import { Heart, Sparkles, Shield, Users, Brain, ArrowRight, Mail, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axiosInstance from "@/lib/axios";
import Loader from "@/components/Loader";

const Welcome = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  const saveData = async () => {
    try {
      await axiosInstance.post("/auth/sync-user");
      // Optionally handle response
      navigate("/onboarding");
      // navigate("/home");
    } catch (error) {
      // Optionally handle error
      alert("Error syncing user");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleAuth = async () => {
      if (isLoaded && isSignedIn) {
        // Fetch and store the latest token
        const token = await getToken();
        if (token) {
          localStorage.setItem("clerkToken", token);
        }
        setLoading(true);
        setTimeout(() => {
          saveData();
        }, 500);
      } else {
        localStorage.removeItem("clerkToken");
      }
    };
    handleAuth();
  }, [isSignedIn, isLoaded, navigate, getToken]);

  if (loading || !isLoaded) {
    return <Loader message="Getting your MindMate experience ready..." />;
  }



  return (
    <div className="min-h-screen bg-gradient-serenity relative overflow-hidden">
      {/* Subtle floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element top-20 left-1/4 animate-float-gentle">
          <Heart className="w-8 h-8 text-primary/15" fill="currentColor" />
        </div>
        <div className="floating-element top-32 right-1/3 animate-float-gentle" style={{ animationDelay: '2s' }}>
          <Sparkles className="w-6 h-6 text-accent/20" />
        </div>
        <div className="floating-element bottom-1/3 left-1/6 animate-float-gentle" style={{ animationDelay: '4s' }}>
          <Star className="w-7 h-7 text-secondary/15" />
        </div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-7xl w-full mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left column: Hero content */}
            <div className="space-y-12 text-center lg:text-left animate-fade-in-up">

              {/* Brand and logo */}
              <div className="space-y-6">
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary via-primary/95 to-secondary/85 rounded-full flex items-center justify-center animate-pulse-soft shadow-wellness">
                      <Heart className="w-10 h-10 text-white" fill="currentColor" />
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse-soft"></div>
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-display text-wellness">MindMate</h1>
                    <p className="text-lg text-muted-foreground font-body">Your emotional sanctuary</p>
                  </div>
                </div>
              </div>

              {/* Main headline and value proposition */}
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-6xl font-heading text-foreground leading-tight">
                  Nurture your
                  <span className="text-primary"> emotional wellness</span>
                </h2>
                <p className="text-xl text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Track your emotional journey, connect with compassionate AI support, and cultivate lasting wellness habits in a safe, nurturing space.
                </p>
              </div>

              {/* Key features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto lg:mx-0">
                <div className="flex flex-col items-center lg:items-start space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-center lg:text-left">
                    <h3 className="font-heading text-foreground">AI Support</h3>
                    <p className="text-sm text-muted-foreground">24/7 compassionate guidance</p>
                  </div>
                </div>
                <div className="flex flex-col items-center lg:items-start space-y-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="text-center lg:text-left">
                    <h3 className="font-heading text-foreground">Safe Space</h3>
                    <p className="text-sm text-muted-foreground">Private & secure environment</p>
                  </div>
                </div>
                <div className="flex flex-col items-center lg:items-start space-y-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-center lg:text-left">
                    <h3 className="font-heading text-foreground">Personal Growth</h3>
                    <p className="text-sm text-muted-foreground">Track your wellness journey</p>
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="space-y-4 max-w-md mx-auto lg:mx-0">
                <SignUpButton fallbackRedirectUrl="/home">
                  <Button className="w-full h-14 bg-gradient-to-r from-primary via-primary/95 to-secondary hover:from-primary/90 hover:via-primary/85 hover:to-secondary/90 text-white text-lg font-heading shadow-wellness transition-all duration-500 hover:shadow-xl hover:scale-[1.02] interactive-element group">
                    <Heart className="w-5 h-5 mr-3 group-hover:animate-heart-beat-gentle" fill="currentColor" />
                    Start Your Wellness Journey
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </SignUpButton>

                {/* <SignInButton fallbackRedirectUrl="/home">
                  <Button variant="outline" className="w-full h-12 text-base font-heading border-primary/30 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300">
                    <Mail className="w-4 h-4 mr-2" />
                    Sign In to Continue
                  </Button>
                </SignInButton> */}
              </div>
            </div>

            {/* Right column: Visual preview */}
            <div className="space-y-8 animate-slide-in-right">

              {/* Mood tracking preview */}
              <Card className="wellness-card p-8 glass-wellness shadow-wellness border-white/25">
                <div className="space-y-6">
                  <div className="text-center space-y-3">
                    <h3 className="text-xl font-heading text-foreground">
                      How are you feeling today?
                    </h3>
                    <p className="text-muted-foreground font-body">
                      Express yourself in a safe, nurturing space
                    </p>
                  </div>

                  <div className="flex justify-center gap-4">
                    {[
                      { emoji: '😊', color: 'from-yellow-200/40 to-yellow-300/30', label: 'Joyful' },
                      { emoji: '😌', color: 'from-blue-200/40 to-blue-300/30', label: 'Peaceful' },
                      { emoji: '😔', color: 'from-purple-200/40 to-purple-300/30', label: 'Reflective' },
                      { emoji: '😰', color: 'from-orange-200/40 to-orange-300/30', label: 'Anxious' },
                      { emoji: '😴', color: 'from-indigo-200/40 to-indigo-300/30', label: 'Tired' }
                    ].map((mood, index) => (
                      <div
                        key={mood.emoji}
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${mood.color} flex items-center justify-center text-2xl animate-bounce-subtle hover:scale-110 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg`}
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        {mood.emoji}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Trust indicators */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="wellness-card p-6 text-center">
                  <div className="space-y-2">
                    <div className="text-2xl font-heading text-primary">24/7</div>
                    <p className="text-sm text-muted-foreground">Always here for you</p>
                  </div>
                </Card>
                <Card className="wellness-card p-6 text-center">
                  <div className="space-y-2">
                    <div className="text-2xl font-heading text-secondary">100%</div>
                    <p className="text-sm text-muted-foreground">Private & secure</p>
                  </div>
                </Card>
              </div>

              {/* Testimonial preview */}
              <Card className="wellness-card p-6 relative overflow-hidden">
                <div className="absolute top-2 left-2">
                  <Sparkles className="w-4 h-4 text-accent/30" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "MindMate helped me understand my emotions better and find peace in daily life."
                  </p>
                  <div className="text-xs text-muted-foreground/80">— Sarah, Mental Health Advocate</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
