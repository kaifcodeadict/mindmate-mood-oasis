
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Crown, HelpCircle, MessageSquare, LogOut, Bell, Palette } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  
  const settingsItems = [
    {
      icon: User,
      title: "Profile",
      description: "Edit your personal information",
      onClick: () => {},
      color: "text-primary"
    },
    {
      icon: Crown,
      title: "Upgrade to Premium",
      description: "Unlock all features",
      onClick: () => navigate("/premium"),
      color: "text-accent",
      highlight: true
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Manage your alerts",
      onClick: () => {},
      color: "text-secondary"
    },
    {
      icon: Palette,
      title: "Theme",
      description: "Customize your experience",
      onClick: () => {},
      color: "text-muted-foreground"
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      description: "Get assistance",
      onClick: () => {},
      color: "text-muted-foreground"
    },
    {
      icon: MessageSquare,
      title: "Feedback",
      description: "Share your thoughts",
      onClick: () => {},
      color: "text-muted-foreground"
    }
  ];

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
          <h2 className="font-semibold text-foreground">Settings</h2>
          <p className="text-sm text-muted-foreground">Manage your account</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Card */}
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-2xl">😊</span>
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Welcome Friend!</h3>
              <p className="text-sm text-muted-foreground">friend@example.com</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="px-2 py-1 bg-background/50 rounded-full">
                  <span className="text-xs text-muted-foreground">Free Plan</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Settings List */}
        <div className="space-y-2">
          {settingsItems.map((item, index) => (
            <Card 
              key={index}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                item.highlight ? 'bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20' : 'hover:bg-card/80'
              }`}
              onClick={item.onClick}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-2xl bg-background/50 flex items-center justify-center ${
                  item.highlight ? 'bg-accent/20' : ''
                }`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                
                {item.highlight && (
                  <div className="px-2 py-1 bg-accent/20 rounded-full">
                    <span className="text-xs font-medium text-accent-foreground">New</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Logout */}
        <Card className="p-4 border-destructive/20">
          <button 
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-4 text-left"
          >
            <div className="w-10 h-10 rounded-2xl bg-destructive/10 flex items-center justify-center">
              <LogOut className="w-5 h-5 text-destructive" />
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium text-destructive">Sign Out</h4>
              <p className="text-sm text-muted-foreground">Sign out of your account</p>
            </div>
          </button>
        </Card>

        {/* App Info */}
        <div className="text-center pt-4">
          <p className="text-xs text-muted-foreground">MindMate v1.0.0</p>
          <p className="text-xs text-muted-foreground mt-1">
            Made with 💚 for your mental wellbeing
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
