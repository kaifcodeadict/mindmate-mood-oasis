
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';

interface MoodData {
  day: string;
  mood: string;
  value: number;
  emoji: string;
}

interface MoodChartProps {
  data: MoodData[];
}

const MoodChart = ({ data }: MoodChartProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-2xl p-3 shadow-lg">
          <p className="font-medium text-foreground">{label}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg">{data.emoji}</span>
            <span className="text-sm text-muted-foreground capitalize">{data.mood}</span>
            <span className="text-sm font-medium text-primary">{data.value}%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-muted/10 border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Mood Journey</h3>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
            <span className="text-sm text-muted-foreground">This Week</span>
          </div>
        </div>
        
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis 
                hide
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                fill="url(#moodGradient)"
                strokeLinecap="round"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default MoodChart;
