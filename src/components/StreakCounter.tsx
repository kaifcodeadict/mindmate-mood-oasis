
import { Card } from "@/components/ui/card";
import { Flame, Sprout, Award, Target } from "lucide-react";

interface StreakCounterProps {
  taskStreak: number;
  moodStreak: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

const StreakCounter = ({ taskStreak, moodStreak, weeklyGoal, weeklyProgress }: StreakCounterProps) => {
  const streakCards = [
    {
      icon: Flame,
      title: "Task Streak",
      value: taskStreak,
      suffix: "days",
      color: "from-orange-400 to-red-400",
      bgColor: "from-orange-50 to-red-50"
    },
    {
      icon: Sprout,
      title: "Mood Check-ins",
      value: moodStreak,
      suffix: "days",
      color: "from-green-400 to-emerald-400",
      bgColor: "from-green-50 to-emerald-50"
    },
    {
      icon: Target,
      title: "Weekly Goal",
      value: weeklyProgress,
      suffix: `/${weeklyGoal}`,
      color: "from-blue-400 to-cyan-400",
      bgColor: "from-blue-50 to-cyan-50"
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {streakCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card 
            key={index}
            className={`p-4 text-center bg-gradient-to-br ${card.bgColor} border-0 relative overflow-hidden`}
          >
            <div className="relative z-10">
              <div className={`w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-lg font-bold text-foreground">
                {card.value}
                <span className="text-sm text-muted-foreground ml-1">{card.suffix}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{card.title}</p>
            </div>
            
            {/* Animated background element */}
            <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br ${card.color} opacity-10 animate-pulse-soft`}></div>
          </Card>
        );
      })}
    </div>
  );
};

export default StreakCounter;
