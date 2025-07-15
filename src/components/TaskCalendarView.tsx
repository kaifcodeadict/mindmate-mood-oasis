
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface TaskHistoryEntry {
  completed: boolean;
  type: 'breathing' | 'journaling' | 'mindfulness' | 'movement';
}

interface TaskCalendarViewProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  taskHistory: Record<string, TaskHistoryEntry>;
}

const TaskCalendarView = ({ selectedDate, onDateSelect, taskHistory }: TaskCalendarViewProps) => {
  const getTaskIcon = (type: string) => {
    const icons = {
      breathing: '🌸',
      journaling: '📝',
      mindfulness: '🧘',
      movement: '🏃'
    };
    return icons[type as keyof typeof icons] || '✨';
  };

  const getDateInfo = (date: Date) => {
    const dateKey = date.toISOString().split('T')[0];
    return taskHistory[dateKey];
  };

  const modifiers = {
    completed: (date: Date) => {
      const info = getDateInfo(date);
      return info?.completed === true;
    },
    skipped: (date: Date) => {
      const info = getDateInfo(date);
      return info?.completed === false;
    }
  };

  const modifiersStyles = {
    completed: {
      backgroundColor: 'hsl(142, 65%, 95%)',
      color: 'hsl(142, 65%, 45%)',
      borderColor: 'hsl(142, 65%, 55%)',
      fontWeight: '600'
    },
    skipped: {
      backgroundColor: 'hsl(0, 75%, 95%)',
      color: 'hsl(0, 75%, 45%)',
      borderColor: 'hsl(0, 75%, 55%)',
      opacity: 0.7
    }
  };

  const selectedDateInfo = selectedDate ? getDateInfo(selectedDate) : null;

  return (
    <Card className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-foreground">Your Wellness Journey</h3>
        <p className="text-muted-foreground">Track your daily progress and celebrate consistency</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="space-y-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="rounded-lg border"
            showOutsideDays={false}
          />
          
          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-success/20 border border-success/50" />
              <span className="text-muted-foreground">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-destructive/20 border border-destructive/50" />
              <span className="text-muted-foreground">Skipped</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-muted border border-border" />
              <span className="text-muted-foreground">No task</span>
            </div>
          </div>
        </div>

        {/* Selected Date Info */}
        <div className="space-y-4">
          {selectedDate && (
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h4>

              {selectedDateInfo ? (
                <Card className={`p-4 ${
                  selectedDateInfo.completed 
                    ? 'bg-gradient-to-r from-success/10 to-success/5 border-success/30'
                    : 'bg-gradient-to-r from-destructive/10 to-destructive/5 border-destructive/30'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {getTaskIcon(selectedDateInfo.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {selectedDateInfo.completed ? (
                          <CheckCircle className="w-5 h-5 text-success" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive" />
                        )}
                        <span className={`font-medium ${
                          selectedDateInfo.completed ? 'text-success' : 'text-destructive'
                        }`}>
                          {selectedDateInfo.completed ? 'Task Completed' : 'Task Skipped'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground capitalize">
                        {selectedDateInfo.type} exercise
                      </p>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="p-4 bg-muted/20">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="w-5 h-5" />
                    <span>No task scheduled for this day</span>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Weekly Summary */}
          <div className="space-y-3">
            <h5 className="font-medium text-foreground">This Week's Progress</h5>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-success/10 p-3 rounded-lg text-center">
                <div className="text-lg font-semibold text-success">5</div>
                <div className="text-muted-foreground">Completed</div>
              </div>
              <div className="bg-muted/20 p-3 rounded-lg text-center">
                <div className="text-lg font-semibold text-muted-foreground">2</div>
                <div className="text-muted-foreground">Skipped</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskCalendarView;
