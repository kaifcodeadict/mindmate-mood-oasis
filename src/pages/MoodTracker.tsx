import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar as CalendarIcon, TrendingUp, Lock, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";
import TaskCard from "@/components/TaskCard";
import MoodChart from "@/components/MoodChart";
import StreakCounter from "@/components/StreakCounter";
import EmotionalSummary from "@/components/EmotionalSummary";


interface Task {
  id: string;
  title: string;
  description: string;
  type: 'breathing' | 'journaling' | 'mindfulness' | 'movement' | 'creative' | 'mental';
  status: 'pending' | 'in-progress' | 'completed';
  emoji: string;
  estimatedTime: string;
  steps?: Array<{
    label: string;
    completed: boolean;
    completedAt?: string;
    _id: string;
  }>;
}

interface MoodData {
  day: string;
  mood: string;
  emoji: string;
  value: number;
}

interface AnalyticsData {
  progress: {
    taskStreak: number;
    moodCheckIns: number;
    weeklyGoal: number;
  };
  todaysTask: Array<{
    _id: string;
    taskTitle: string;
    description: string;
    steps: Array<{
      label: string;
      completed: boolean;
      completedAt?: string;
      _id: string;
    }>;
    status: 'pending' | 'in-progress' | 'completed';
    category: string;
    difficulty: string;
  }>;
  moodJourney: Array<{
    day: string;
    mood: string;
    percentage: number;
  }>;
  commonMood: {
    mood: string;
    percentage: number;
  };
  stabilityScore: {
    stabilityScore: number;
    changeFromLastWeek: number;
    isImproved: boolean;
    message: string;
  };
  weeklyInsights: {
    insights: string[];
  };
}

const MoodTracker = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mood emoji mapping
  const getMoodEmoji = (mood: string) => {
    const emojiMap: { [key: string]: string } = {
      happy: '😊',
      sad: '😢',
      neutral: '😐',
      excited: '🤗',
      calm: '😌',
      anxious: '😰',
      angry: '😤',
      tired: '😴'
    };
    return emojiMap[mood] || '😐';
  };

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await getToken();
        const { data } = await axios.get("/mood/analytics", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success && data.data) {
          setAnalyticsData(data.data);
        } else {
          setError("Failed to fetch analytics data");
        }
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setError("Failed to load mood analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [getToken]);

  // Transform API data to component format
  const moodData: MoodData[] = analyticsData?.moodJourney.map(item => ({
    day: item.day,
    mood: item.mood,
    emoji: getMoodEmoji(item.mood),
    value: item.percentage
  })) || [];

  const [dailyTask, setDailyTask] = useState<Task>({
    id: '1',
    title: 'Mindful Breathing',
    description: 'Take 5 minutes to practice deep breathing. Focus on your breath and let go of any tension.',
    type: 'breathing',
    status: 'pending',
    emoji: '🌸',
    estimatedTime: '5 minutes'
  });

  // Update daily task when analytics data is loaded
  useEffect(() => {
    if (analyticsData?.todaysTask && analyticsData.todaysTask.length > 0) {
      const firstTask = analyticsData.todaysTask[0];
      setDailyTask({
        id: firstTask._id,
        title: firstTask.taskTitle,
        description: firstTask.description,
        type: firstTask.category as any,
        status: firstTask.status,
        emoji: '✨',
        estimatedTime:  firstTask.description,
        steps: firstTask.steps
      });
    }
  }, [analyticsData]);

  const handleTaskStatusChange = (id: string, status: 'pending' | 'in-progress' | 'completed') => {
    setDailyTask(prev => ({ ...prev, status }));
  };

  const weeklyAverage = analyticsData ?
    Math.round(
      moodData.filter(d => d.value > 0).reduce((sum, d) => sum + d.value, 0) /
      moodData.filter(d => d.value > 0).length
    ) : 0;

  const emotionalSummaryData = analyticsData ? {
    dominantMood: {
      mood: analyticsData.commonMood.mood,
      emoji: getMoodEmoji(analyticsData.commonMood.mood),
      percentage: analyticsData.commonMood.percentage
    },
    stabilityIndex: analyticsData.stabilityScore.stabilityScore,
    weeklyComparison: {
      trend: analyticsData.stabilityScore.isImproved ? 'up' as const : 'down' as const,
      change: Math.abs(analyticsData.stabilityScore.changeFromLastWeek)
    },
    insights: analyticsData.weeklyInsights.insights
  } : {
    dominantMood: {
      mood: 'happy',
      emoji: '😊',
      percentage: 45
    },
    stabilityIndex: 78,
    weeklyComparison: {
      trend: 'up' as const,
      change: 12
    },
    insights: [
      "You've shown more positive emotions this week compared to last week",
      "Your mood tends to be more stable on weekends",
      "Consider maintaining your current self-care routine"
    ]
  };

  // Calendar mood data
  const getMoodForDate = (date: Date) => {
    const dayOfWeek = date.getDay();
    const moodMap = ['😌', '😊', '😐', '😊', '😢', '😊', '🤗'];
    return moodMap[dayOfWeek] || '😐';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-wellness flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your mood analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-wellness flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-destructive">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gradient-wellness">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border/50 p-4 flex items-center gap-3 sticky top-0 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/home")}
          className="rounded-full hover:bg-primary"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div>
          <h2 className="font-semibold text-foreground">Mood & Tasks</h2>
          <p className="text-sm text-muted-foreground">Your wellness journey</p>
        </div>
      </div>

      <div className="p-6 space-y-8 max-w-4xl mx-auto">
        {/* Streak Counter */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Your Progress</h3>
          </div>
          <StreakCounter
            taskStreak={analyticsData?.progress.taskStreak || 0}
            moodStreak={analyticsData?.progress.moodCheckIns || 0}
            weeklyGoal={7}
            weeklyProgress={analyticsData?.progress.weeklyGoal || 0}
          />
        </div>

        {/* Daily Task Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Today's Wellness Task</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>Streak: {analyticsData?.progress.taskStreak || 0} days</span>
              <span>🔥</span>
            </div>
          </div>
          <TaskCard task={dailyTask} onStatusChange={handleTaskStatusChange} />
        </div>

        {/* Weekly Progress */}
        {/* <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">This Week's Journey</h3>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Overall Wellness</span>
                <span className="font-medium text-foreground">{weeklyAverage}%</span>
              </div>
              <Progress value={weeklyAverage} className="h-3" />
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Mood entries:</span>
                <span className="font-medium text-foreground">7/7</span>
                <span>✨</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Tasks completed:</span>
                <span className="font-medium text-foreground">5/7</span>
                <span>🎯</span>
              </div>
            </div>
          </div>
        </Card> */}

        {/* Mood Chart */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Mood Trends</h3>
          <MoodChart data={moodData} />
        </div>

        {/* Emotional Summary */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Weekly Insights</h3>
          <EmotionalSummary {...emotionalSummaryData} />
        </div>

        {/* Daily Mood Grid */}
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Daily Mood Check-ins</h3>

            <div className="grid grid-cols-7 gap-3">
              {moodData.map((day, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="text-xs text-muted-foreground font-medium">
                    {day.day}
                  </div>

                  <div className="relative group">
                    <div
                      className={`w-14 h-14 rounded-3xl border-2 flex items-center justify-center text-lg transition-all duration-300 cursor-pointer ${
                        day.value > 0
                          ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30 hover:scale-110 hover:shadow-lg'
                          : 'bg-muted border-border'
                      }`}
                    >
                      {day.emoji}
                    </div>

                    {day.value > 0 && (
                      <div
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                        style={{ opacity: day.value / 100 }}
                      />
                    )}

                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg px-2 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                      {day.mood} ({day.value}%)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Calendar View - Premium Feature */}
        <Card className="p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/10" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">Monthly Mood Calendar</h3>
              </div>
              <Lock className="w-4 h-4 text-muted-foreground" />
            </div>

            <p className="text-sm text-muted-foreground">
              View your complete mood history with calendar insights, patterns, and detailed analytics.
            </p>

            <Button
              onClick={() => navigate("/premium")}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-2xl"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Unlock Premium Calendar
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MoodTracker;
