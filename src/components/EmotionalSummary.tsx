
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus, Heart, Brain } from "lucide-react";

interface EmotionalSummaryProps {
  dominantMood: {
    mood: string;
    emoji: string;
    percentage: number;
  };
  stabilityIndex: number;
  weeklyComparison: {
    trend: 'up' | 'down' | 'stable';
    change: number;
  };
  insights: string[];
}

const EmotionalSummary = ({ dominantMood, stabilityIndex, weeklyComparison, insights }: EmotionalSummaryProps) => {
  const getTrendIcon = () => {
    switch (weeklyComparison.trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-success" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-orange-500" />;
      default: return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    switch (weeklyComparison.trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-orange-500';
      default: return 'text-muted-foreground';
    }
  };

  const getTrendMessage = () => {
    switch (weeklyComparison.trend) {
      case 'up': return `${weeklyComparison.change}% better than last week`;
      case 'down': return `${weeklyComparison.change}% lower than last week`;
      default: return 'Stable mood patterns';
    }
  };

  return (
    <div className="space-y-4">
      {/* Dominant Mood Card */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Most Common Mood
          </h3>
          <div className="text-2xl">{dominantMood.emoji}</div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-foreground capitalize">{dominantMood.mood}</span>
            <span className="text-primary font-semibold">{dominantMood.percentage}%</span>
          </div>
          <Progress value={dominantMood.percentage} className="h-2" />
          <p className="text-sm text-muted-foreground">
            You felt {dominantMood.mood} most of the time this week
          </p>
        </div>
      </Card>

      {/* Stability Index */}
      <Card className="p-6 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Brain className="w-5 h-5 text-accent" />
            Emotional Balance
          </h3>
          <div className="flex items-center gap-2">
            {getTrendIcon()}
            <span className={`text-sm font-medium ${getTrendColor()}`}>
              {getTrendMessage()}
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-foreground">Stability Score</span>
            <span className="text-accent font-semibold">{stabilityIndex}%</span>
          </div>
          <Progress value={stabilityIndex} className="h-2" />
          <p className="text-sm text-muted-foreground">
            {stabilityIndex >= 80 ? "Excellent emotional stability" : 
             stabilityIndex >= 60 ? "Good emotional balance" : 
             "Focus on consistent self-care"}
          </p>
        </div>
      </Card>

      {/* Insights */}
      <Card className="p-6 bg-gradient-to-br from-card to-muted/10">
        <h3 className="font-semibold text-foreground mb-4">Weekly Insights</h3>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">{insight}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default EmotionalSummary;
