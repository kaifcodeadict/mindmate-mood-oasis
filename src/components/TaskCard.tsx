
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Play, Flame, Sprout } from "lucide-react";
import { useState } from "react";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    type: 'breathing' | 'journaling' | 'mindfulness' | 'movement';
    status: 'pending' | 'in-progress' | 'completed';
    emoji: string;
    estimatedTime: string;
  };
  onStatusChange: (id: string, status: 'pending' | 'in-progress' | 'completed') => void;
}

const TaskCard = ({ task, onStatusChange }: TaskCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = () => {
    switch (task.status) {
      case 'completed': return 'text-success';
      case 'in-progress': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-success" />;
      case 'in-progress': return <Play className="w-5 h-5 text-accent" />;
      default: return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const handleStart = () => {
    onStatusChange(task.id, 'in-progress');
    setIsExpanded(true);
  };

  const handleComplete = () => {
    onStatusChange(task.id, 'completed');
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-card to-muted/20 border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-wellness">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-xl">
              {task.emoji}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{task.title}</h3>
              <p className="text-sm text-muted-foreground">{task.estimatedTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon()}
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {task.description}
        </p>

        {task.status === 'pending' && (
          <Button 
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-2xl"
          >
            Start Task
          </Button>
        )}

        {task.status === 'in-progress' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Progress value={75} className="flex-1" />
              <span className="text-xs text-muted-foreground">75%</span>
            </div>
            <Button 
              onClick={handleComplete}
              className="w-full bg-gradient-to-r from-success/80 to-success hover:from-success hover:to-success/90 text-white rounded-2xl"
            >
              Mark as Complete
            </Button>
          </div>
        )}

        {task.status === 'completed' && (
          <div className="flex items-center justify-center gap-2 py-2">
            <CheckCircle className="w-5 h-5 text-success" />
            <span className="text-success font-medium">Completed! Great job 🎉</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;
