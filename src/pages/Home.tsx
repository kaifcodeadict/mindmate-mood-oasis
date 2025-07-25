import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { MessageCircle, TrendingUp, Settings, Home as HomeIcon, BarChart3, Heart, Sparkles, Star, Crown, Calendar, BookOpen, LogOut } from "lucide-react";
import { useState } from "react";
import { SignOutButton, useClerk } from "@clerk/clerk-react";
import {  UserButton } from '@clerk/clerk-react';
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
const Home = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { signOut } = useClerk();
  const { user } = useUser();




  const moods = [
    {
      emoji: '😊',
      label: 'Joyful',
      value: 'happy',
      gradient: 'from-yellow-200/60 via-yellow-300/50 to-yellow-400/40',
      shadowColor: 'shadow-joy',
      description: 'Feeling bright and positive'
    },
    {
      emoji: '😌',
      label: 'Peaceful',
      value: 'calm',
      gradient: 'from-blue-200/60 via-blue-300/50 to-blue-400/40',
      shadowColor: 'shadow-calm',
      description: 'Centered and balanced'
    },
    {
      emoji: '😔',
      label: 'Tender',
      value: 'sad',
      gradient: 'from-purple-200/60 via-purple-300/50 to-purple-400/40',
      shadowColor: 'shadow-wellness',
      description: 'Gentle and reflective'
    },
    {
      emoji: '😰',
      label: 'Unsettled',
      value: 'anxious',
      gradient: 'from-orange-200/60 via-orange-300/50 to-orange-400/40',
      shadowColor: 'shadow-joy',
      description: 'Seeking comfort and care'
    },
    {
      emoji: '😴',
      label: 'Restful',
      value: 'tired',
      gradient: 'from-indigo-200/60 via-indigo-300/50 to-indigo-400/40',
      shadowColor: 'shadow-calm',
      description: 'Ready to recharge'
    }
  ];

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setIsAnimating(true);

    setTimeout(() => {
      navigate("/chat", { state: { mood } });
    }, 1000);
  };

  const handleSignOut = () => {
    signOut(() => navigate("/"));
  };

  return (
    <div className="min-h-screen bg-gradient-serenity relative overflow-hidden">
      {/* Clerk Logout Button */}
      <div className="absolute top-4 right-4 flex items-center gap-2 flex-row">
        <UserButton />
      </div>

      {/* Enhanced floating background elements */}
      <div className="floating-element top-20 right-16 animate-float-gentle">
        <Heart className="w-10 h-10 text-primary/20" fill="currentColor" />
      </div>
      <div className="floating-element top-40 left-12 animate-float-gentle" style={{ animationDelay: '2s' }}>
        <Sparkles className="w-8 h-8 text-accent/25" />
      </div>
      <div className="floating-element bottom-60 right-20 animate-float-gentle" style={{ animationDelay: '1s' }}>
        <Star className="w-9 h-9 text-secondary/20" />
      </div>
      <div className="floating-element bottom-40 left-16 animate-float-gentle" style={{ animationDelay: '3s' }}>
        <Crown className="w-7 h-7 text-accent/20" />
      </div>

      {/* Desktop and Mobile Layout Container */}
      <div className="desktop-container">
        <div className="desktop-layout">
          {/* Desktop Grid Layout */}
          <div className="hidden md:block">
            <div className="desktop-grid pt-12 pb-20">
              {/* Main Content */}
              <div className="desktop-main space-y-8">
                {/* Enhanced Header */}
                <div className="space-y-6 animate-fade-in-up">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-primary/90 to-secondary/80 flex items-center justify-center animate-pulse-soft shadow-wellness">
                      <Heart className="w-8 h-8 text-white" fill="currentColor" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-display text-wellness mb-2">
                        Good Afternoon {user?.firstName}!  👋
                      </h1>
                      <p className="text-muted-foreground text-lg font-body">
                        Ready to check in with yourself today?
                      </p>
                    </div>
                  </div>

                  <div className="wellness-card p-8 border-2 border-primary/10">
                    <div className="text-center space-y-3">
                      <h2 className="text-2xl font-heading text-foreground">
                        How are you feeling right now? ✨
                      </h2>
                      <p className="text-muted-foreground font-body">
                        Take a moment to connect with your emotions
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Mood Selection */}
                <div className="space-y-6 animate-slide-in-right">
                  <div className="grid grid-cols-5 gap-6">
                    {moods.map((mood, index) => (
                      <button
                        key={mood.value}
                        onClick={() => handleMoodSelect(mood.value)}
                        disabled={isAnimating}
                        className={`mood-bubble rounded-3xl py-3 flex flex-col items-center justify-center gap-4 p-3 relative overflow-hidden transition-all duration-500 ${
                          selectedMood === mood.value ? 'selected' : ''
                        } ${mood.shadowColor}`}
                        style={{
                          animationDelay: `${index * 0.1}s`,
                        }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${mood.gradient} opacity-0 transition-opacity duration-500 ${
                          selectedMood === mood.value ? 'opacity-30' : 'hover:opacity-20'
                        }`} />

                        <span className="text-4xl relative z-10 animate-bounce-subtle" style={{ animationDelay: `${index * 0.3}s` }}>
                          {mood.emoji}
                        </span>
                        <div className="text-center relative z-10">
                          <span className="text-sm font-heading text-foreground block">
                            {mood.label}
                          </span>
                          <span className="text-xs text-muted-foreground font-body mt-1 block">
                            {mood.description}
                          </span>
                        </div>

                        {selectedMood === mood.value && (
                          <div className="absolute inset-0 rounded-3xl border-2 border-primary animate-pulse-soft" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Enhanced Quick Actions */}
                <div className="grid grid-cols-2 gap-6">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/chat")}
                    className="h-fit wellness-card border-2 hover:border-primary/30 interactive-element group p-8 py-5"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className=" p-4 rounded-3xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform shadow-wellness">
                        <MessageCircle style={{width: "1.5rem", height: "1.5rem"}} className=" text-white" />
                      </div>
                      <div className="text-center">
                        <span className="text-lg font-heading text-foreground block">Chat Therapy</span>
                        <span className="text-sm text-muted-foreground font-body">Connect with your AI companion</span>
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => navigate("/mood-tracker")}
                    className="h-fit wellness-card border-2 hover:border-secondary/30 interactive-element group p-8 py-5"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-4 rounded-3xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center group-hover:scale-110 transition-transform shadow-calm">
                        <TrendingUp style={{width: "1.5rem", height: "1.5rem"}} className=" text-white" />
                      </div>
                      <div className="text-center">
                        <span className="text-lg font-heading text-foreground block">Mood Garden</span>
                        <span className="text-sm text-muted-foreground font-body">Watch your growth bloom</span>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>

              {/* Desktop Sidebar */}
              <div className="desktop-sidebar space-y-6">
                {/* Progress Card */}
                <Card className="wellness-card p-8 bg-gradient-to-br from-success/10 via-primary/5 to-secondary/10 border-success/20 shadow-wellness relative overflow-hidden">
                  <div className="absolute top-6 right-6">
                    <Heart className="w-8 h-8 text-success/40 animate-heart-beat-gentle" fill="currentColor" />
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-success" />
                        <h3 className="text-xl font-heading text-foreground">
                          Beautiful progress!
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground font-body leading-relaxed">
                        Your emotional journey is blossoming beautifully this week 🌱
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground font-body">Wellness Journey</span>
                        <span className="font-heading text-success">82% ✨</span>
                      </div>
                      <div className="relative">
                        <Progress value={82} className="h-4 progress-wellness" />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-soft" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground font-body">Streak:</span>
                        <span className="font-heading text-primary">3 days</span>
                        <span className="text-lg animate-bounce-subtle">🔥</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Crown className="w-5 h-5 text-accent" />
                        <span className="text-accent font-heading">Amazing!</span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Quick Links */}
                <div className="space-y-4">
                  <h4 className="font-heading text-foreground">Quick Actions</h4>
                  <div className="space-y-3">
                    <button
                      onClick={() => navigate("/mood-tracker")}
                      className="w-full wellness-card p-4 text-left interactive-element group"
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                        <span className="font-body text-foreground">View mood calendar</span>
                      </div>
                    </button>

                    <button
                      onClick={() => navigate("/settings")}
                      className="w-full wellness-card p-4 text-left interactive-element group"
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                        <span className="font-body text-foreground">Daily reflections</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Mobile Header */}
            <div className="p-6 pt-12 space-y-6 animate-fade-in-up">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary via-primary/90 to-secondary/80 flex items-center justify-center animate-pulse-soft shadow-wellness">
                  <Heart className="w-7 h-7 text-white" fill="currentColor" />
                </div>
                <div>
                  <h1 className="text-2xl font-display text-wellness">
                    Good afternoon! 👋
                  </h1>
                  <p className="text-muted-foreground text-sm font-body">
                    Ready to check in with yourself?
                  </p>
                </div>
              </div>

              <div className="wellness-card p-6 border-2 border-primary/10">
                <div className="text-center space-y-2">
                  <h2 className="text-lg font-heading text-foreground">
                    How are you feeling today? ✨
                  </h2>
                  <p className="text-sm text-muted-foreground font-body">
                    Take a moment to connect with your emotions
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Mood Selection */}
            <div className="px-6 mb-8 animate-slide-in-right">
              <div className="grid grid-cols-5 gap-3">
                {moods.map((mood, index) => (
                  <button
                    key={mood.value}
                    onClick={() => handleMoodSelect(mood.value)}
                    disabled={isAnimating}
                    className={`mood-bubble rounded-3xl py-3 flex flex-col items-center justify-center gap-2 relative overflow-hidden ${
                      selectedMood === mood.value ? 'selected' : ''
                    } ${mood.shadowColor}`}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${mood.gradient} opacity-0 transition-opacity duration-300 ${
                      selectedMood === mood.value ? 'opacity-25' : 'hover:opacity-15'
                    }`} />

                    <span className="text-2xl relative z-10 animate-bounce-subtle" style={{ animationDelay: `${index * 0.2}s` }}>
                      {mood.emoji}
                    </span>
                    <span className="text-xs text-muted-foreground font-body font-medium relative z-10">
                      {mood.label}
                    </span>

                    {selectedMood === mood.value && (
                      <div className="absolute inset-0 rounded-3xl border-2 border-primary animate-pulse-soft" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Quick Actions */}
            <div className="px-6 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => navigate("/chat")}
                  className="h-28 wellness-card border-2 hover:border-primary/30 interactive-element group"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform shadow-wellness">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-heading text-foreground block">Chat Therapy</span>
                      <span className="text-xs text-muted-foreground font-body">Talk to your AI friend</span>
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => navigate("/mood-tracker")}
                  className="h-28 wellness-card border-2 hover:border-secondary/30 interactive-element group"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center group-hover:scale-110 transition-transform shadow-calm">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-heading text-foreground block">Mood Garden</span>
                      <span className="text-xs text-muted-foreground font-body">Watch your growth</span>
                    </div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Mobile Progress Card */}
            <div className="px-6 mb-8">
              <Card className="wellness-card p-6 bg-gradient-to-br from-success/10 via-primary/5 to-secondary/10 border-success/20 shadow-wellness relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <Heart className="w-6 h-6 text-success/30 animate-heart-beat-gentle" fill="currentColor" />
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-success" />
                      <h3 className="font-heading text-foreground">
                        You're feeling good this week!
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground font-body">
                      Your emotional journey is blossoming beautifully 🌱
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-body">Mood Journey</span>
                      <span className="font-heading text-success">82% ✨</span>
                    </div>
                    <div className="relative">
                      <Progress value={82} className="h-3 progress-wellness" />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-soft" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground font-body">Streak:</span>
                      <span className="font-heading text-primary">3 days</span>
                      <span className="animate-bounce-subtle">🔥</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Crown className="w-4 h-4 text-accent" />
                      <span className="text-accent font-heading">Keep going!</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border/50 px-4 py-3 shadow-wellness">
              <div className="flex justify-around max-w-md mx-auto">
                <button className="flex flex-col items-center gap-1 p-2 group">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform shadow-wellness">
                    <HomeIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-body text-primary">Home</span>
                </button>

                <button
                  onClick={() => navigate("/chat")}
                  className="flex flex-col items-center gap-1 p-2 group interactive-element"
                >
                  <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-primary/10 transition-all">
                    <MessageCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-xs font-body text-muted-foreground group-hover:text-primary transition-colors">Chat</span>
                </button>

                <button
                  onClick={() => navigate("/mood-tracker")}
                  className="flex flex-col items-center gap-1 p-2 group interactive-element"
                >
                  <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-secondary/20 group-hover:to-secondary/10 transition-all">
                    <BarChart3 className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
                  </div>
                  <span className="text-xs font-body text-muted-foreground group-hover:text-secondary transition-colors">Stats</span>
                </button>

                <button
                  onClick={() => navigate("/settings")}
                  className="flex flex-col items-center gap-1 p-2 group interactive-element"
                >
                  <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-accent/20 group-hover:to-accent/10 transition-all">
                    <Settings className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <span className="text-xs font-body text-muted-foreground group-hover:text-accent transition-colors">Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
