import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Flame,
  Sparkles,
  Trophy,
  Heart
} from "lucide-react";
import TaskStepCard from "@/components/TaskStepCard";
import TaskCalendarView from "@/components/TaskCalendarView";
import MotivationalQuote from "@/components/MotivationalQuote";

// Define interfaces for task steps
interface TaskStep {
  id: number;
  description: string;
  completed: boolean;
}

// Define types for different task types
type TaskType = "breathing" | "journaling" | "mindfulness" | "movement";

// Define interface for task data
interface TaskData {
  type: TaskType;
  title: string;
  description: string;
  steps: TaskStep[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
}

export interface TaskHistoryEntry {
  completed: boolean;
  type: "breathing" | "journaling" | "mindfulness" | "movement";
  steps?: number;
  completedSteps?: number;
}

const TaskManagement = () => {
  const navigate = useNavigate();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [activeDate, setActiveDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(0);

  // Mock task history data with proper typing
  const taskHistory: Record<string, TaskHistoryEntry> = {
    '2024-01-15': { completed: true, type: 'breathing' as const },
    '2024-01-16': { completed: true, type: 'journaling' as const },
    '2024-01-17': { completed: false, type: 'mindfulness' as const },
    '2024-01-18': { completed: true, type: 'movement' as const },
    '2024-01-19': { completed: true, type: 'breathing' as const },
    '2024-01-20': { completed: false, type: 'journaling' as const },
    '2024-01-21': { completed: true, type: 'mindfulness' as const },
  };

  // Mock task data
  const tasks: TaskData[] = [
    {
      type: "breathing",
      title: "Deep Breathing Exercise",
      description: "Practice deep breathing to calm your mind and reduce stress.",
      steps: [
        { id: 1, description: "Inhale deeply through your nose for 4 seconds.", completed: false },
        { id: 2, description: "Hold your breath for 6 seconds.", completed: false },
        { id: 3, description: "Exhale slowly through your mouth for 8 seconds.", completed: false },
        { id: 4, description: "Repeat the cycle 5 times.", completed: false },
      ],
      icon: Heart,
      color: "text-red-500",
    },
    {
      type: "journaling",
      title: "Gratitude Journaling",
      description: "Reflect on the things you're grateful for to boost your mood.",
      steps: [
        { id: 1, description: "Find a quiet space where you can relax.", completed: false },
        { id: 2, description: "Think about three things you are grateful for today.", completed: false },
        { id: 3, description: "Write each item in your journal, describing why you appreciate it.", completed: false },
      ],
      icon: Calendar,
      color: "text-blue-500",
    },
    {
      type: "mindfulness",
      title: "Mindful Meditation",
      description: "Engage in a short meditation to increase awareness and focus.",
      steps: [
        { id: 1, description: "Sit comfortably with your eyes closed.", completed: false },
        { id: 2, description: "Focus on your breath as it enters and leaves your body.", completed: false },
        { id: 3, description: "When your mind wanders, gently redirect your attention back to your breath.", completed: false },
        { id: 4, description: "Continue for 5-10 minutes.", completed: false },
      ],
      icon: Flame,
      color: "text-orange-500",
    },
    {
      type: "movement",
      title: "Gentle Movement",
      description: "Engage in light physical activity to energize your body and mind.",
      steps: [
        { id: 1, description: "Stand up and stretch your arms overhead.", completed: false },
        { id: 2, description: "Gently twist your torso from side to side.", completed: false },
        { id: 3, description: "Walk around your space for a few minutes.", completed: false },
      ],
      icon: Trophy,
      color: "text-green-500",
    },
  ];

  const currentTask = tasks[currentTaskIndex];
  const totalSteps = currentTask.steps.length;

  useEffect(() => {
    // Reset completed steps when the task changes
    setCompletedSteps(0);
    // Reset completion status when the task changes
    setTaskCompleted(false);
  }, [currentTaskIndex]);

  const handleStepComplete = (stepId: number) => {
    const updatedTasks = [...tasks];
    const taskIndex = currentTaskIndex;
    const stepIndex = updatedTasks[taskIndex].steps.findIndex((step) => step.id === stepId);

    if (stepIndex !== -1) {
      updatedTasks[taskIndex].steps[stepIndex].completed = true;
      setCompletedSteps((prev) => prev + 1);
    }
  };

  const handleTaskCompletion = () => {
    setTaskCompleted(true);
  };

  const handleNextTask = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
      setTaskCompleted(false);
    } else {
      alert("You've completed all tasks for today!");
    }
  };

  const handleDateSelect = (date: Date) => {
    setActiveDate(date);
    setShowCalendar(false);
  };

  const getTaskCompletionStatus = (date: Date): TaskHistoryEntry | undefined => {
    const dateString = date.toISOString().split('T')[0];
    return taskHistory[dateString];
  };

  const completionStatus = getTaskCompletionStatus(activeDate);

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
          <h2 className="font-semibold text-foreground">Today's Focus</h2>
          <p className="text-sm text-muted-foreground">
            {activeDate.toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Calendar View */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Task Calendar
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              View Calendar
            </Button>
          </div>

          {showCalendar && (
            <TaskCalendarView
              activeDate={activeDate}
              onDateSelect={handleDateSelect}
              taskHistory={taskHistory}
            />
          )}

          {completionStatus ? (
            <div className="mt-4 p-3 rounded-md bg-green-100 border border-green-200 text-green-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>
                  You completed a {completionStatus.type} task on this day!
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-4 p-3 rounded-md bg-red-100 border border-red-200 text-red-700">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>No tasks completed on this day.</span>
              </div>
            </div>
          )}
        </Card>

        {/* Task Card */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${currentTask.color} bg-card shadow-md`}
            >
              <currentTask.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                {currentTask.title}
              </h3>
              <p className="text-muted-foreground">{currentTask.description}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {completedSteps} / {totalSteps} Steps Completed
              </p>
              <span className="text-sm text-muted-foreground">
                {Math.round((completedSteps / totalSteps) * 100)}%
              </span>
            </div>
            <Progress
              value={(completedSteps / totalSteps) * 100}
              className="h-2 rounded-full"
            />
          </div>

          {/* Task Steps */}
          <div className="space-y-3">
            {currentTask.steps.map((step) => (
              <TaskStepCard
                key={step.id}
                step={step}
                onComplete={handleStepComplete}
              />
            ))}
          </div>

          {/* Complete Task Button */}
          {!taskCompleted ? (
            <Button
              className="w-full"
              onClick={handleTaskCompletion}
              disabled={completedSteps < totalSteps}
            >
              Mark Task as Complete
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-2 text-green-500 bg-green-100 p-3 rounded-md">
              <CheckCircle className="w-5 h-5" />
              <span>Task Completed!</span>
            </div>
          )}
        </Card>

        {/* Next Task Button */}
        {taskCompleted && (
          <Button className="w-full" onClick={handleNextTask}>
            Continue to Next Task <Sparkles className="w-4 h-4 ml-2" />
          </Button>
        )}

        {/* Motivational Quote */}
        <Card className="p-4">
          <MotivationalQuote />
        </Card>
      </div>
    </div>
  );
};

export default TaskManagement;
