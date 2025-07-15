
import { Card } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";

const MotivationalQuote = () => {
  const quotes = [
    {
      text: "You are exactly where you need to be in your journey.",
      author: "Unknown"
    },
    {
      text: "Small steps every day lead to big changes one day.",
      author: "Unknown"
    },
    {
      text: "Your commitment to yourself is a beautiful gift.",
      author: "Unknown"
    },
    {
      text: "Progress, not perfection, is what matters most.",
      author: "Unknown"
    },
    {
      text: "Every moment of self-care is an act of self-love.",
      author: "Unknown"
    }
  ];

  const todayQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full -translate-y-10 translate-x-10 opacity-50" />
      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <Heart className="w-5 h-5" />
          <span className="font-medium text-sm">Today's Affirmation</span>
        </div>
        
        <blockquote className="text-lg font-medium text-foreground leading-relaxed">
          "{todayQuote.text}"
        </blockquote>
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <Star className="w-4 h-4" />
          <cite className="text-sm">— {todayQuote.author}</cite>
        </div>
      </div>
    </Card>
  );
};

export default MotivationalQuote;
