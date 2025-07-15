
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Send, Heart, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const mood = location.state?.mood;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial AI greeting based on mood
    const getInitialMessage = () => {
      const greetings = {
        happy: "I'm so glad to hear you're feeling happy today! 😊 What's bringing you joy?",
        sad: "I notice you're feeling sad today. I'm here to listen and support you. 💙 Would you like to share what's on your mind?",
        angry: "It sounds like you're feeling angry. That's completely valid. 😤 Sometimes talking through these feelings can help. What's bothering you?",
        tired: "Feeling tired can be overwhelming. 😴 Let's explore what might be contributing to this fatigue. How has your day been?",
        anxious: "I understand you're feeling anxious. 😰 You're not alone in this. Would you like to try some breathing exercises, or would you prefer to talk about what's making you feel this way?",
        default: "Hello! I'm your AI therapist, and I'm here to support you today. 💚 How are you feeling right now?"
      };
      
      return greetings[mood as keyof typeof greetings] || greetings.default;
    };

    const initialMessage: Message = {
      id: Date.now().toString(),
      text: getInitialMessage(),
      sender: 'ai',
      timestamp: new Date()
    };

    setMessages([initialMessage]);
  }, [mood]);

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "That sounds really important to you. Tell me more about how that makes you feel.",
      "I hear you. It's completely normal to feel this way. What do you think might help right now?",
      "Thank you for sharing that with me. Your feelings are valid. How long have you been experiencing this?",
      "I can sense this is weighing on you. Would you like to explore some coping strategies together?",
      "You're showing a lot of strength by talking about this. What would make you feel more supported right now?",
      "That must be challenging for you. Have you noticed any patterns in when you feel this way?",
      "Your awareness of these feelings is really insightful. What small step could you take today to care for yourself?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
        
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-glow">
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">AI Therapist</h2>
            <p className="text-xs text-muted-foreground">Always here to listen</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' 
                  ? 'text-primary-foreground/70' 
                  : 'text-muted-foreground'
              }`}>
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-card border border-border rounded-2xl px-4 py-3 max-w-[80%]">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Wellness Suggestions */}
      <div className="p-4 border-t border-border bg-card/50">
        <div className="flex gap-2 mb-4 overflow-x-auto">
          <Card className="p-3 min-w-[120px] bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <Sparkles className="w-5 h-5 text-primary mb-1" />
            <p className="text-xs font-medium text-foreground">Breathing</p>
            <p className="text-xs text-muted-foreground">Exercise</p>
          </Card>
          
          <Card className="p-3 min-w-[120px] bg-gradient-to-r from-secondary/10 to-secondary/5 border-secondary/20">
            <Heart className="w-5 h-5 text-secondary mb-1" />
            <p className="text-xs font-medium text-foreground">Daily</p>
            <p className="text-xs text-muted-foreground">Affirmation</p>
          </Card>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-background border-t border-border">
        <div className="flex gap-2 items-end">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share your thoughts..."
            className="flex-1 rounded-2xl border-2 border-border focus:border-primary bg-card"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="rounded-full w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground p-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
