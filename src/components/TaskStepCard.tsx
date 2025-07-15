
import { Card } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";

interface TaskStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskStepCardProps {
  step: TaskStep;
  stepNumber: number;
  onToggle: () => void;
}

const TaskStepCard = ({ step, stepNumber, onToggle }: TaskStepCardProps) => {
  return (
    <Card 
      className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-wellness ${
        step.completed 
          ? 'bg-gradient-to-r from-success/10 to-success/5 border-success/30' 
          : 'bg-gradient-to-br from-card to-muted/20 border-primary/10 hover:border-primary/20'
      }`}
      onClick={onToggle}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 pt-1">
          {step.completed ? (
            <CheckCircle className="w-6 h-6 text-success" />
          ) : (
            <Circle className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
              Step {stepNumber}
            </span>
          </div>
          
          <h4 className={`font-medium mb-2 ${
            step.completed ? 'text-success line-through' : 'text-foreground'
          }`}>
            {step.title}
          </h4>
          
          <p className={`text-sm leading-relaxed ${
            step.completed ? 'text-success/70' : 'text-muted-foreground'
          }`}>
            {step.description}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TaskStepCard;
