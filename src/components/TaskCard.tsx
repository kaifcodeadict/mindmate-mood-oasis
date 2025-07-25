
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
    steps?: { label: string; }[];
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
    <Card
      className={`w-fit p-4  from-card to-muted/20 border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-wellness ${task.status === 'completed' ? 'bg-primary text-white' : ''}`}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl   from-primary/20 to-secondary/20 flex items-center justify-center text-xl ${task.status === 'completed' ? 'bg-background text-white' : 'bg-gradient-to-tr'}`}>
              {task.emoji}
            </div>
            <div className="flex-1">
              <h3 className={`font-semibold ${task.status === 'completed' ? 'text-white' : 'text-foreground'}`}>{task.title}</h3>
              <p className={`text-sm ${task.status === 'completed' ? 'text-white/80' : 'text-muted-foreground'}`}>{task.estimatedTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            {getStatusIcon()}
          </div>
        </div>
        {task.steps && task.steps.length > 0 && (
          <div className="flex gap-2 flex-col">
            {task.steps.map((step: any, idx: number) => (
              <h3 key={idx} className={`text-sm leading-relaxed ${task.status === 'completed' ? 'text-white/90' : 'text-muted-foreground'}`}>
                <span className={`${task.status === 'completed' ? 'text-white' : 'text-primary'}`}>•</span> {step.label}
              </h3>
            ))}
          </div>
        )}


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
