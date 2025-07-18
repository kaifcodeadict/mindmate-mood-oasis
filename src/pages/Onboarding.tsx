import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import axios from "@/lib/axios";
import { Check, Heart } from "lucide-react";

const QUESTIONS = [
  {
    key: "q1",
    question:
      "When you're feeling low, what usually helps you feel a little better?",
    type: "multi",
    options: [
      "Listening to music",
      "Talking to a close friend",
      "Watching a movie or series",
      "Going for a walk or drive",
      "Writing or journaling",
      "Sleeping it off",
      "Crying it out",
      "Just being alone",
      "Something else",
    ],
  },
  {
    key: "q2",
    question:
      "What do you wish someone would say or do when you're having a tough day?",
    type: "single",
    options: [
      "Just listen to me without judging",
      "Motivate me to feel better",
      "Give me practical advice",
      "Remind me of my strengths",
      "Distract me with something fun",
      "Tell me it’s okay to feel like this",
    ],
  },
  {
    key: "q3",
    question:
      "Which of these best describes your current mood most days?",
    type: "single",
    options: [
      "Mostly happy and stable",
      "Sometimes anxious or overwhelmed",
      "Often feel lonely or low",
      "Just feeling numb or disconnected",
      "Mood changes a lot",
      "Not sure",
    ],
  },
  {
    key: "q4",
    question: "What kind of support would you like from your AI companion?",
    type: "multi",
    options: [
      "A daily check-in",
      "Mood tracking and insights",
      "Mindful tasks or challenges",
      "Someone to vent to",
      "Positive reminders or quotes",
      "Activity ideas to feel better",
      "Help setting small goals",
    ],
  },
  {
    key: "q5",
    question: "What’s one memory that always makes you smile?",
    type: "text",
    options: [],
    placeholder:
      "E.g., Summer trip with friends, a childhood moment… (optional)",
  },
];

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    q1: [] as string[],
    q2: "",
    q3: "",
    q4: [] as string[],
    q5: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [animDirection, setAnimDirection] = useState<'left' | 'right'>('right');
  const [showCompletion, setShowCompletion] = useState(false);

  const totalSteps = QUESTIONS.length;
  const step = QUESTIONS[currentStep];

  // Animation classes
  const getAnimClass = () =>
    animDirection === 'right' ? 'animate-slide-in-right' : 'animate-fade-in-up';

  // Handlers
  const handleMultiChange = (value: string) => {
    setAnswers((prev) => {
      const arr = prev[step.key as keyof typeof prev] as string[];
      if (arr.includes(value)) {
        return { ...prev, [step.key]: arr.filter((v) => v !== value) };
      } else {
        return { ...prev, [step.key]: [...arr, value] };
      }
    });
  };

  const handleSingleChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [step.key]: value }));
  };

  const handleTextChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [step.key]: value }));
  };

  const handleContinue = async () => {
    setSubmitting(true);
    setError("");
    try {
      let responseVal;
      if (step.type === "multi") responseVal = answers[step.key as keyof typeof answers];
      else if (step.type === "single") responseVal = [answers[step.key as keyof typeof answers]];
      else responseVal = answers[step.key as keyof typeof answers] ? [answers[step.key as keyof typeof answers]] : [];
      await axios.post("/onboarding", {
        question: step.question,
        response: responseVal,
      });
      if (currentStep === totalSteps - 1) {
        localStorage.setItem("onboardingComplete", "true");
        setShowCompletion(true);
        setTimeout(() => {
          navigate("/home");
        }, 2500);
      } else {
        setAnimDirection('right');
        setCurrentStep((s) => s + 1);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    setAnimDirection('left');
    setCurrentStep((s) => (s > 0 ? s - 1 : 0));
  };

  const handleSkip = () => {
    localStorage.setItem("onboardingComplete", "true");
    navigate("/home");
  };

  // Progress bar (dots)
  const renderProgress = () => (
    <div className="flex items-center justify-center gap-2 mb-6">
      {QUESTIONS.map((_, idx) => (
        <span
          key={idx}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            idx === currentStep
              ? "bg-primary scale-125 shadow-wellness"
              : "bg-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );

  // Option card for single/multi
  const OptionCard = ({
    label,
    selected,
    onClick,
    multi,
  }: {
    label: string;
    selected: boolean;
    onClick: () => void;
    multi?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-xl border-2 px-5 py-4 mb-2 bg-gradient-wellness transition-all duration-300 interactive-element relative flex items-center gap-3 shadow-calm ${
        selected ? "border-primary ring-2 ring-primary/30" : "border-border"
      }`}
      tabIndex={0}
    >
      <span className="font-heading text-base text-foreground flex-1">{label}</span>
      <Checkbox checked={selected} tabIndex={-1} className="pointer-events-none" />
    </button>
  );

  // Completion animation
  const CompletionScreen = () => (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/90 animate-fade-in-up">
      <div className="flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary via-primary/95 to-secondary/85 flex items-center justify-center animate-pulse-soft shadow-wellness">
          <Heart className="w-10 h-10 text-white animate-heart-beat-gentle" fill="currentColor" />
        </div>

        <div className="text-xl font-heading text-primary text-center mt-2 animate-fade-in-up">
          Your daily mental health companion is getting ready...
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-serenity px-4 py-8 relative">
      {/* MindMate logo top-left (fixed) */}
      <div className="absolute left-6 top-6 z-20 flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-primary via-primary/95 to-secondary/85 rounded-full flex items-center justify-center animate-pulse-soft shadow-wellness">
          <Heart className="w-7 h-7 text-white" fill="currentColor" />
        </div>
        <span className="font-display text-2xl text-wellness hidden sm:block">MindMate</span>
      </div>
      {/* Skip button */}
      <button
        className="absolute top-6 right-8 text-muted-foreground text-sm font-medium hover:underline z-10"
        onClick={handleSkip}
        disabled={submitting}
      >
        Skip for now
      </button>
      <Card className="w-full max-w-2xl p-8 shadow-xl bg-background/90 animate-fade-in-up">
        {renderProgress()}
        <div className={`transition-all duration-500 ${getAnimClass()}`} key={step.key}>
          <Label className="font-medium text-2xl text-foreground block mb-6 text-center">
            {step.question}
          </Label>
          {/* Options */}
          {step.type === "multi" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 mb-6">
              {step.options.map((opt) => (
                <OptionCard
                  key={opt}
                  label={opt}
                  selected={(answers[step.key as keyof typeof answers] as string[]).includes(opt)}
                  onClick={() => handleMultiChange(opt)}
                  multi
                />
              ))}
            </div>
          )}
          {step.type === "single" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 mb-6">
              {step.options.map((opt) => (
                <OptionCard
                  key={opt}
                  label={opt}
                  selected={answers[step.key as keyof typeof answers] === opt}
                  onClick={() => handleSingleChange(opt)}
                />
              ))}
            </div>
          )}
          {step.type === "text" && (
            <Textarea
              value={answers[step.key as keyof typeof answers] as string}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder={step.placeholder}
              className="mt-2 mb-6"
              maxLength={200}
            />
          )}
        </div>
        {error && <div className="text-destructive text-sm text-center mb-2">{error}</div>}
        <div className="flex flex-row justify-between items-center mt-8 gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0 || submitting}
            className="w-32"
          >
            Back
          </Button>
          <Button
            type="button"
            onClick={handleContinue}
            disabled={submitting || (step.type !== 'text' && step.type !== 'multi' && !answers[step.key as keyof typeof answers])}
            className="w-32"
          >
            {currentStep === totalSteps - 1 ? (submitting ? "Finishing..." : "Finish") : (submitting ? "Loading..." : "Continue")}
          </Button>
        </div>
      </Card>
      {/* Completion overlay */}
      {showCompletion && <CompletionScreen />}
    </div>
  );
};

export default Onboarding;
