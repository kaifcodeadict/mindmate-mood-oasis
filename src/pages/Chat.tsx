
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Send, Heart, Sparkles, Smile, Brain, Mic } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emoji?: string;
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
    // Enhanced AI greeting with more personality
    const getInitialMessage = () => {
      const greetings = {
        happy: "I can feel your positive energy! 😊✨ What's bringing you joy today? I'd love to hear about it!",
        sad: "I'm here with you, and your feelings are completely valid. 💙 Would you like to share what's on your heart? Sometimes talking helps lighten the load.",
        angry: "I can sense you're feeling frustrated, and that's okay. 😤💛 These emotions are part of being human. What's stirring up these feelings? Let's work through this together.",
        tired: "Feeling exhausted can be so overwhelming. 😴💜 You're not alone in this. Tell me about your day - sometimes sharing can help us find ways to restore your energy.",
        anxious: "I understand that anxious feeling in your chest. 😰🌿 You're safe here with me. Would you like to try some breathing exercises together, or would you prefer to talk about what's worrying you?",
        default: "Welcome to our safe space! 💚✨ I'm Luna, your AI companion, and I'm genuinely excited to be here with you today. How are you feeling right now?"
      };
      
      return greetings[mood as keyof typeof greetings] || greetings.default;
    };

    const initialMessage: Message = {
      id: Date.now().toString(),
      text: getInitialMessage(),
      sender: 'ai',
      timestamp: new Date(),
      emoji: '🌙'
    };

    setMessages([initialMessage]);
  }, [mood]);

  const generateAIResponse = (userMessage: string): { text: string; emoji: string } => {
    const responses = [
      {
        text: "That sounds really meaningful to you. ✨ I can hear the importance in your words. Tell me more about how that makes your heart feel?",
        emoji: '💝'
      },
      {
        text: "I'm listening with my whole heart. 🤗 It's completely natural to feel this way. What do you think might bring you some comfort right now?",
        emoji: '🌱'
      },
      {
        text: "Thank you for trusting me with these feelings. 💛 Your emotions are so valid, and I'm honored you're sharing them with me. How long have you been carrying this?",
        emoji: '🦋'
      },
      {
        text: "I can sense this is weighing on your soul. 🌸 You're showing incredible courage by talking about this. Would you like to explore some gentle ways to care for yourself right now?",
        emoji: '🌺'
      },
      {
        text: "Your self-awareness is truly beautiful. 🌟 I can see your strength, even in difficult moments. What would make you feel most supported right now?",
        emoji: '✨'
      },
      {
        text: "That must feel really challenging for your heart. 💙 I've noticed something - have you seen any patterns in when these feelings visit you?",
        emoji: '🌊'
      },
      {
        text: "Your emotional intelligence amazes me. 🌈 What small, gentle step could you take today to show yourself the same kindness you'd give a dear friend?",
        emoji: '🤲'
      }
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return randomResponse;
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

    // Enhanced AI typing delay with personality
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: 'ai',
        timestamp: new Date(),
        emoji: aiResponse.emoji
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm flex flex-col relative overflow-hidden">
      {/* Floating background elements */}
      <div className="floating-shape top-20 right-12 animate-float">
        <Heart className="w-6 h-6 text-primary/20" fill="currentColor" />
      </div>
      <div className="floating-shape bottom-32 left-8 animate-float" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-5 h-5 text-secondary/25" />
      </div>

      {/* Enhanced Header with AI personality */}
      <div className="bg-card/95 backdrop-blur-lg border-b border-border/50 p-4 flex items-center gap-3 shadow-soft">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/home")}
          className="rounded-full hover:bg-primary/10 interactive"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center gap-3 flex-1">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center animate-pulse-glow shadow-warm">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white animate-bounce-gentle">
              <div className="w-full h-full bg-success rounded-full animate-ping"></div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-heading font-semibold text-foreground">Luna</h2>
              <span className="text-sm">🌙</span>
            </div>
            <p className="text-xs text-muted-foreground">Your caring AI companion • Always here</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Smile className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-xs text-primary font-medium">Online</span>
        </div>
      </div>

      {/* Enhanced Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-32">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="max-w-[85%] space-y-2">
              {message.sender === 'ai' && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <span className="text-sm">{message.emoji || '🌙'}</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">Luna</span>
                </div>
              )}
              
              <div
                className={`px-4 py-3 ${
                  message.sender === 'user'
                    ? 'chat-bubble-user'
                    : 'chat-bubble-ai'
                } relative`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-2 ${
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
          </div>
        ))}
        
        {/* Enhanced typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[85%] space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse">
                  <span className="text-sm">🌙</span>
                </div>
                <span className="text-xs text-muted-foreground font-medium">Luna is thinking...</span>
              </div>
              
              <div className="chat-bubble-ai">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-secondary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Wellness Suggestions */}
      <div className="p-4 bg-card/50 backdrop-blur-sm border-t border-border/30">
        <div className="flex gap-3 mb-4 overflow-x-auto">
          <Card className="p-4 min-w-[140px] bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 interactive hover:from-primary/15 hover:to-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-xs font-semibold text-primary">Breathing</span>
            </div>
            <p className="text-xs text-muted-foreground">5-min calm session</p>
          </Card>
          
          <Card className="p-4 min-w-[140px] bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20 interactive hover:from-secondary/15 hover:to-secondary/10">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-secondary" />
              <span className="text-xs font-semibold text-secondary">Affirmation</span>
            </div>
            <p className="text-xs text-muted-foreground">Daily kindness boost</p>
          </Card>

          <Card className="p-4 min-w-[140px] bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 interactive hover:from-accent/15 hover:to-accent/10">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-accent" />
              <span className="text-xs font-semibold text-accent">Journal</span>
            </div>
            <p className="text-xs text-muted-foreground">Reflect & release</p>
          </Card>
        </div>
      </div>

      {/* Enhanced Input */}
      <div className="p-4 bg-card/95 backdrop-blur-lg border-t border-border/50 shadow-warm">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your heart..."
              className="rounded-3xl border-2 border-border/50 focus:border-primary bg-background/80 backdrop-blur-sm pl-4 pr-12 py-3 text-sm placeholder:text-muted-foreground/60"
            />
            <Mic className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground/60 hover:text-primary cursor-pointer transition-colors" />
          </div>
          
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="rounded-full w-12 h-12 bg-gradient-to-br from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white p-0 shadow-warm interactive disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="flex items-center justify-center mt-2 gap-2">
          <div className="w-1 h-1 bg-primary/30 rounded-full"></div>
          <span className="text-xs text-muted-foreground/60">Luna responds with care & empathy</span>
          <div className="w-1 h-1 bg-primary/30 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
