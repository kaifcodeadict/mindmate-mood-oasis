
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Crown, MessageSquare, BarChart3, Heart, Sparkles, Calendar, Star, Zap } from "lucide-react";

const Premium = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: MessageSquare,
      title: "Save Chat History",
      description: "Keep all your heartfelt conversations with Luna",
      gradient: "from-primary/20 to-primary/10"
    },
    {
      icon: BarChart3,
      title: "Advanced Mood Analytics",
      description: "Deep insights into your emotional patterns",
      gradient: "from-secondary/20 to-secondary/10"
    },
    {
      icon: Calendar,
      title: "Complete Mood Calendar",
      description: "Beautiful timeline of your wellness journey",
      gradient: "from-accent/20 to-accent/10"
    },
    {
      icon: Heart,
      title: "Unlimited Daily Affirmations",
      description: "Personalized messages of love and support",
      gradient: "from-success/20 to-success/10"
    },
    {
      icon: Sparkles,
      title: "Priority AI Support",
      description: "Luna's enhanced emotional intelligence",
      gradient: "from-primary/15 to-secondary/15"
    }
  ];

  const handleUpgrade = () => {
    // This would integrate with Stripe/Razorpay
    console.log("Upgrade to premium");
    // For demo, just navigate back
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-joy relative overflow-hidden">
      {/* Floating background elements */}
      <div className="floating-shape top-16 right-12 animate-float">
        <Crown className="w-8 h-8 text-accent/30" />
      </div>
      <div className="floating-shape top-32 left-8 animate-float" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-6 h-6 text-primary/25" />
      </div>
      <div className="floating-shape bottom-40 right-16 animate-float" style={{ animationDelay: '2s' }}>
        <Star className="w-7 h-7 text-secondary/20" />
      </div>
      <div className="floating-shape bottom-32 left-12 animate-float" style={{ animationDelay: '0.5s' }}>
        <Heart className="w-9 h-9 text-primary/15" fill="currentColor" />
      </div>

      {/* Enhanced Header */}
      <div className="bg-card/95 backdrop-blur-lg border-b border-border/50 p-4 flex items-center gap-3 shadow-soft">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full hover:bg-primary/10 interactive"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div>
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-accent" />
            <h2 className="text-heading font-semibold text-foreground">Premium</h2>
          </div>
          <p className="text-sm text-muted-foreground">Unlock your full potential ✨</p>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Enhanced Hero Section */}
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-28 h-28 mx-auto bg-gradient-to-br from-accent via-primary to-secondary rounded-full flex items-center justify-center animate-pulse-glow shadow-warm">
              <Crown className="w-14 h-14 text-white animate-bounce-gentle" />
            </div>
            {/* Decorative rings */}
            <div className="absolute inset-0 w-28 h-28 mx-auto rounded-full border-2 border-accent/20 animate-ping"></div>
            <div className="absolute inset-2 w-24 h-24 mx-auto rounded-full border border-primary/15 animate-pulse"></div>
            {/* Floating sparkles */}
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-accent animate-bounce-gentle" />
            <Star className="absolute -bottom-2 -left-2 w-5 h-5 text-primary animate-wiggle" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl text-display text-warm">
              Upgrade to Premium
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Unlock unlimited access to all MindMate features and transform your mental wellness journey with Luna's enhanced support.
              <span className="block mt-2 text-primary font-medium">✨ Your growth deserves the best</span>
            </p>
          </div>
        </div>

        {/* Enhanced Pricing Card */}
        <Card className="p-8 bg-gradient-to-br from-primary/5 via-card to-accent/5 border-primary/20 shadow-warm relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <Zap className="w-6 h-6 text-accent/40 animate-pulse" />
          </div>
          
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl text-display font-bold text-primary">₹49</span>
                <div className="text-left">
                  <span className="text-lg text-muted-foreground">/month</span>
                  <p className="text-xs text-success font-medium">7-day free trial</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-accent/20 via-accent/10 to-primary/20 rounded-3xl p-4 border border-accent/30">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-accent animate-bounce-gentle" />
                <span className="text-sm font-bold text-foreground">Limited Time Offer</span>
                <Sparkles className="w-5 h-5 text-primary animate-bounce-gentle" />
              </div>
              <p className="text-sm font-medium text-foreground">
                🎉 First month 50% off! Save ₹25
              </p>
            </div>
          </div>
        </Card>

        {/* Enhanced Features List */}
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-heading font-semibold text-foreground">What you'll unlock:</h3>
            <p className="text-sm text-muted-foreground">Every feature designed with love for your wellbeing</p>
          </div>
          
          {features.map((feature, index) => (
            <Card key={index} className="p-5 hover:shadow-warm transition-all duration-300 interactive border-l-4 border-l-primary/30">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0 animate-bounce-gentle`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-foreground">{feature.title}</h4>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-success to-success/80 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Enhanced Current Plan Comparison */}
        <Card className="p-6 bg-gradient-to-br from-muted/30 to-muted/10 border border-muted shadow-soft">
          <div className="space-y-4">
            <h3 className="text-heading font-semibold text-foreground text-center">Your journey so far:</h3>
            
            <div className="grid grid-cols-2 gap-6 text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="text-xl font-bold text-muted-foreground">Free</div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Limited chat history</p>
                  <p>• Basic mood tracking</p>
                  <p>• Weekly insights</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-glow">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div className="text-xl font-bold text-primary">Premium</div>
                <div className="text-xs text-foreground space-y-1 font-medium">
                  <p>• Unlimited everything</p>
                  <p>• Advanced analytics</p>
                  <p>• Priority Luna support</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Enhanced CTA Buttons */}
        <div className="space-y-4 pt-4">
          <Button 
            onClick={handleUpgrade}
            className="w-full bg-gradient-to-r from-primary via-accent to-secondary hover:from-primary/90 hover:via-accent/90 hover:to-secondary/90 text-white rounded-3xl py-7 text-lg font-bold shadow-warm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] interactive"
          >
            <Crown className="w-6 h-6 mr-3" />
            Start 7-Day Free Trial
            <Sparkles className="w-6 h-6 ml-3 animate-bounce-gentle" />
          </Button>
          
          <div className="text-center space-y-3">
            <p className="text-xs text-muted-foreground">
              Cancel anytime • No commitment • Your data stays safe
            </p>
            <button 
              onClick={() => navigate(-1)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium hover:scale-105 transform duration-200"
            >
              Maybe later →
            </button>
          </div>
        </div>

        {/* Enhanced Trust Indicators */}
        <div className="text-center space-y-3 pt-6 border-t border-border/30">
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span>🔒</span>
              <span>Secure payments</span>
            </div>
            <div className="flex items-center gap-1">
              <span>💳</span>
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🌟</span>
              <span>30-day guarantee</span>
            </div>
          </div>
          <p className="text-xs text-primary/60 font-medium">
            Join thousands on their wellness journey ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Premium;
