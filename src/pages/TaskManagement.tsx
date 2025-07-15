
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar as CalendarIcon, CheckCircle, Circle, Sparkles, Heart } from "lucide-react";
import { useState } from "react";
import TaskStepCard from "@/components/TaskStepCard";
import TaskCalendarView from "@/components/TaskCalendarView";
import MotivationalQuote from "@/components/MotivationalQuote";

interface TaskStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface DailyTask {
  id: string;
  title: string;
  description: string;
  type: 'breathing' | 'journaling' | 'mindfulness' | 'movement';
  emoji: string;
  estimatedTime: string;
  steps: TaskStep[];
  completed: boolean;
  completedAt?: Date;
}

const TaskManagement = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCompletionCelebration, setShowCompletionCelebration] = useState(false);

  const [todayTask, setTodayTask] = useState<DailyTask>({
    id: '1',
    title: 'Mindful Morning Ritual',
    description: 'Start your day with intention and gentle self-care',
    type: 'mindfulness',
    emoji: '🌸',
    estimatedTime: '8 minutes',
    completed: false,
    steps: [
      {
        id: 'step1',
        title: 'Take Three Deep Breaths',
        description: 'Breathe in for 4 counts, hold for 4, exhale for 6',
        completed: false
      },
      {
        id: 'step2',
        title: 'Set Your Intention',
        description: 'Think of one thing you want to nurture about yourself today',
        completed: false
      },
      {
        id: 'step3',
        title: 'Practice Gratitude',
        description: 'Name three things you appreciate in this moment',
        completed: false
      }
    ]
  });

  const handleStepToggle = (stepId: string) => {
    setTodayTask(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === stepId ? { ...step, completed: !step.completed } : step
      )
    }));
  };

  const handleCompleteTask = () => {
    const allStepsCompleted = todayTask.steps.every(step => step.completed);
    if (allStepsCompleted) {
      setTodayTask(prev => ({
        ...prev,
        completed: true,
        completedAt: new Date()
      }));
      setShowCompletionCelebration(true);
      setTimeout(() => setShowCompletionCelebration(false), 3000);
    }
  };

  const completedSteps = todayTask.steps.filter(step => step.completed).length;
  const totalSteps = todayTask.steps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;
  const allStepsCompleted = completedSteps === totalSteps;

  // Mock data for calendar view
  const taskHistory = {
    '2024-01-15': { completed: true, type: 'breathing' },
    '2024-01-16': { completed: true, type: 'journaling' },
    '2024-01-17': { completed: false, type: 'mindfulness' },
    '2024-01-18': { completed: true, type: 'movement' },
    '2024-01-19': { completed: true, type: 'breathing' },
  };

  const currentStreak = 4;

  return (
    <div className="min-h-screen bg-gradient-wellness relative overflow-hidden">
      {/* Floating background elements */}
      <div className="floating-element top-20 left-10 w-16 h-16 bg-primary/5 rounded-full" />
      <div className="floating-element top-40 right-16 w-12 h-12 bg-secondary/5 rounded-full" />
      <div className="floating-element bottom-32 left-20 w-20 h-20 bg-accent/5 rounded-full" />

      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border/50 p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/home")}
            className="rounded-full hover:bg-primary/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div>
            <h2 className="font-semibold text-foreground">Daily Tasks</h2>
            <p className="text-sm text-muted-foreground">Your wellness journey</p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowCalendar(!showCalendar)}
          className="rounded-full hover:bg-primary/10"
        >
          <CalendarIcon className="w-5 h-5" />
        </Button>
      </div>

      <div className="p-6 space-y-8 max-w-4xl mx-auto">
        {/* Streak Counter */}
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full -translate-y-16 translate-x-16 opacity-50" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <h3 className="font-semibold text-foreground">You're on a roll!</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                You've shown up for yourself {currentStreak} days in a row 💛
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{currentStreak}</div>
              <div className="text-sm text-muted-foreground">day streak</div>
            </div>
          </div>
        </Card>

        {/* Today's Task */}
        {!todayTask.completed && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-semibold text-foreground">Today's Wellness Task</h3>
              <p className="text-muted-foreground">Take it one step at a time ✨</p>
            </div>

            {/* Task Overview */}
            <Card className="p-6 bg-gradient-to-br from-card to-muted/20 border-primary/10">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl">
                    {todayTask.emoji}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-foreground">{todayTask.title}</h4>
                    <p className="text-muted-foreground">{todayTask.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>⏱️ {todayTask.estimatedTime}</span>
                      <span>📝 {totalSteps} steps</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{completedSteps}/{totalSteps} steps</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>
              </div>
            </Card>

            {/* Task Steps */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Your Steps to Wellness</h4>
              {todayTask.steps.map((step, index) => (
                <TaskStepCard
                  key={step.id}
                  step={step}
                  stepNumber={index + 1}
                  onToggle={() => handleStepToggle(step.id)}
                />
              ))}
            </div>

            {/* Complete Task Button */}
            {allStepsCompleted && (
              <div className="text-center space-y-4">
                <div className="animate-fade-in-up">
                  <p className="text-success font-medium mb-4">
                    ✨ All steps completed! You're doing amazing.
                  </p>
                  <Button
                    onClick={handleCompleteTask}
                    className="w-full max-w-md bg-gradient-to-r from-success/80 to-success hover:from-success hover:to-success/90 text-white rounded-2xl py-3"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Complete Today's Task
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Task Completed State */}
        {todayTask.completed && (
          <div className="text-center space-y-6">
            <div className="animate-fade-in-up">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-success/20 to-success/10 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-success" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                Beautiful work! 🌟
              </h3>
              <p className="text-muted-foreground mb-6">
                You've completed today's wellness task. Take a moment to appreciate your commitment to self-care.
              </p>
              <MotivationalQuote />
            </div>
          </div>
        )}

        {/* Calendar View */}
        {showCalendar && (
          <div className="animate-fade-in-up">
            <TaskCalendarView
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              taskHistory={taskHistory}
            />
          </div>
        )}

        {/* Completion Celebration */}
        {showCompletionCelebration && (
          <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
            <div className="animate-fade-in-up bg-card/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-primary/20 max-w-sm mx-4 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Task Complete!
              </h3>
              <p className="text-muted-foreground">
                You're building beautiful habits ✨
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManagement;
