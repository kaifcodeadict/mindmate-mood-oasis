
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Crown, MessageSquare, BarChart3, Heart, Sparkles, Calendar } from "lucide-react";

const Premium = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: MessageSquare,
      title: "Save Chat History",
      description: "Keep all your therapy conversations"
    },
    {
      icon: BarChart3,
      title: "Advanced Mood Analytics",
      description: "Detailed insights and patterns"
    },
    {
      icon: Calendar,
      title: "Complete Mood Calendar",
      description: "View months of emotional data"
    },
    {
      icon: Heart,
      title: "Unlimited Daily Affirmations",
      description: "Personalized positive messages"
    },
    {
      icon: Sparkles,
      title: "Priority AI Support",
      description: "Faster, more detailed responses"
    }
  ];

  const handleUpgrade = () => {
    // This would integrate with Stripe/Razorpay
    console.log("Upgrade to premium");
    // For demo, just navigate back
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div>
          <h2 className="font-semibold text-foreground">Premium</h2>
          <p className="text-sm text-muted-foreground">Unlock your full potential</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent to-primary rounded-3xl flex items-center justify-center">
            <Crown className="w-10 h-10 text-background" />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Upgrade to Premium
            </h1>
            <p className="text-muted-foreground">
              Get unlimited access to all MindMate features and take your mental wellness journey to the next level.
            </p>
          </div>
        </div>

        {/* Pricing Card */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/20">
          <div className="text-center space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl font-bold text-foreground">₹49</span>
                <span className="text-lg text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">7-day free trial</p>
            </div>
            
            <div className="bg-accent/20 rounded-2xl p-3">
              <p className="text-sm font-medium text-foreground">
                🎉 Limited time: First month 50% off!
              </p>
            </div>
          </div>
        </Card>

        {/* Features List */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">What you'll get:</h3>
          
          {features.map((feature, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground">{feature.title}</h4>
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Current Plan Comparison */}
        <Card className="p-6 bg-muted/20">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Your current plan:</h3>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-muted-foreground">Free</div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Limited chat history</p>
                  <p>• Basic mood tracking</p>
                  <p>• Weekly insights</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">Premium</div>
                <div className="text-xs text-foreground space-y-1">
                  <p>• Unlimited everything</p>
                  <p>• Advanced analytics</p>
                  <p>• Priority support</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA Buttons */}
        <div className="space-y-3 pt-4">
          <Button 
            onClick={handleUpgrade}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-2xl py-6 text-lg font-medium shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02]"
          >
            Start 7-Day Free Trial
          </Button>
          
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              Cancel anytime. No commitment required.
            </p>
            <button 
              onClick={() => navigate(-1)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center space-y-2 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            🔒 Secure payments • 💳 Cancel anytime • 🌟 30-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  );
};

export default Premium;
