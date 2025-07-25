
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Send, Heart, Sparkles, Smile, Brain, Mic } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import axios from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";
import TaskCard from "@/components/TaskCard";
import ChatHistoryList, { mapApiHistoryToSessions } from "@/components/ChatHistoryList";
import { Confetti } from "@/components/magicui/confetti";
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
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { getToken } = useAuth();
  const mood = location.state?.mood;
  const [taskData, setTaskData] = useState<any>(null);
  const [showTask, setShowTask] = useState(false);
  const [taskLoading, setTaskLoading] = useState(false);
  // For now, use mock data and highlight the current session (if sessionId is set)
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [sessionLoading, setSessionLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      setHistoryLoading(true);
      try {
        const token = await getToken();
        const { data } = await axios.get("/chat/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.success && Array.isArray(data.data)) {
          setChatHistory(mapApiHistoryToSessions(data.data));
        } else {
          setChatHistory([]);
        }
      } catch (err) {
        setChatHistory([]);
      } finally {
        setHistoryLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const resetSession = () => {
    setInputValue("");
    setSessionId(null);
    setTaskData(null);
    setShowTask(false);
    setSelectedSessionId(null);

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
  }

  // Fetch session messages when sessionId changes
  useEffect(() => {
    if (!sessionId) return;
    const fetchSession = async () => {
      setSessionLoading(true);
      try {
        const token = await getToken();
        const { data } = await axios.get(`/chat/session/${sessionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.success && data.data && Array.isArray(data.data.messages)) {
          const mappedMessages: Message[] = data.data.messages.map((msg: any) => ({
            id: msg._id || msg.timestamp || Math.random().toString(),
            text: msg.content,
            sender: msg.role === 'assistant' ? 'ai' : 'user',
            timestamp: new Date(msg.timestamp),
            emoji: msg.role === 'assistant' ? '🌙' : undefined
          }));
          setMessages(mappedMessages);
        }
      } catch (err) {
        // Optionally handle error
      } finally {
        setSessionLoading(false);
      }
    };
    const fetchTask = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get(`/task/${sessionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.success && data.data) {
          setTaskData(data.data);
          setShowTask(true);
        } else {
          setTaskData(null);
          setShowTask(false);
        }
      } catch (err) {
        setTaskData(null);
        setShowTask(false);
      }
    };
    fetchSession();
    fetchTask();
  }, [sessionId]);

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
    setSessionId(null); // Reset session on new mood
  }, [mood]);

  // Remove generateAIResponse and local AI logic

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    // Optimistically add user message
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const payload: any = { message: inputValue };
      if (sessionId) payload.sessionId = sessionId;
      const token = await getToken();
      const { data } = await axios.post("/chat/send", payload, { headers: { Authorization: `Bearer ${token}` } });
      if (data.success && data.data && Array.isArray(data.data.response)) {
        setSessionId(data.data.sessionId || null);
        // Map backend response to local Message[]
        const mappedMessages: Message[] = data.data.response.map((msg: any) => ({
          id: msg._id || msg.timestamp || Math.random().toString(),
          text: msg.content,
          sender: msg.role === 'assistant' ? 'ai' : 'user',
          timestamp: new Date(msg.timestamp),
          emoji: msg.role === 'assistant' ? '🌙' : undefined
        }));
        setMessages(mappedMessages);
        // Handle task card
        if (data.data.generateTask && data.data.task) {
          setTaskData(data.data.task);
          setShowTask(true);
        } else {
          setShowTask(false);
          setTaskData(null);
        }
      } else {
        // fallback: just keep user message
        setMessages(prev => [...prev]);
        setShowTask(false);
        setTaskData(null);
      }
    } catch (error) {
      // fallback: just keep user message
      setMessages(prev => [...prev]);
      setShowTask(false);
      setTaskData(null);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Handle task status change (complete)
  const handleTaskStatusChange = async (taskId: string, status: 'pending' | 'in-progress' | 'completed') => {
    if (!taskData) return;
    if (status !== 'completed') {
      setTaskData((prev: any) => prev ? { ...prev, status: status } : prev);
      return;
    }
    setTaskLoading(true);
    try {
      const token = await getToken();
      const sessionId = taskData.sessionId;
      const { data } = await axios.patch(`task/${taskId}/complete`, {}, {
        params: { taskId, sessionId },
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setTaskData((prev: any) => prev ? { ...prev, status: 'completed' } : prev);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3500);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setTaskLoading(false);
    }
  };

  return (
    <div className="flex flex-row  max-h-screen overflow-y-hidden  ">
      {showConfetti && (
        <div className="fixed inset-0 z-[200] pointer-events-none">
          <Confetti particleCount={120} spread={90} />
        </div>
      )}
          {/* Chat History Section */}
          <div className=" w-1/4 flex-shrink-0  border-r-2 ">
          <ChatHistoryList
            sessions={chatHistory}
            resetSession={resetSession}
            selectedId={selectedSessionId || sessionId || undefined}
            onSelect={(id) => setSessionId(id)}
          />
        {historyLoading && <div className="text-center text-xs text-muted-foreground mt-4">Loading chat history...</div>}
        </div>
    <div className=" bg-gradient-serenity flex flex-col relative overflow-hidden  h-screen max-h-screen w-full ">



      {/* Enhanced Header with AI personality */}
      <div className="bg-gradient-serenity sticky top-0 z-20 backdrop-blur-lg border-b border-border/50 p-4 flex items-center gap-3 shadow-soft">


        <div className="flex items-center gap-3 flex-1">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center animate-pulse-glow shadow-warm">
            <span className="text-lg ">{'🌙'}</span>
            </div>
            {/* <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white animate-bounce-gentle">
              <div className="w-full h-full bg-success rounded-full animate-ping"></div>
            </div> */}
          </div>
          <div>
            <div className="flex flex-row gap-3">

            <div className="flex items-center gap-2">
              <h2 className="text-heading font-semibold text-foreground">Luna</h2>
            </div>

          {/* {messages.length > 0 && sessionId !== null && ( <h2 className="text-heading font-semibold text-foreground"> |   {messages[0].text}</h2>)} */}
            </div>

            <p className="text-xs text-muted-foreground">Your caring AI companion • Always here</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Smile className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-xs text-primary font-medium">Online</span>
        </div>
      </div>
      {sessionLoading && (
          <div className=" w-full text-center text-xs text-muted-foreground  flex-1 bg-gradient-serenity p-4 space-y-6 pb-32">Loading session...</div>
        )}
      {/* Enhanced Messages */}
{   !sessionLoading &&  (<div className="flex-1  overflow-y-auto  custom-scrollbar p-4 space-y-6 pb-32">

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="max-w-[85%] space-y-2">
              {message.sender === 'ai' && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <span className="text-sm">{'🌙'}</span>
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

        {/* Task Card (conditionally rendered) */}
        {showTask && taskData && (
          <div className="mt-6">
            <TaskCard
              task={{
                id: taskData._id,
                title: taskData.taskTitle,
                description: taskData.description,
                type: taskData.category || 'mindfulness',
                status: taskData.status || 'pending',
                emoji: '✨', // Optionally map category to emoji
                estimatedTime: taskData.description || '',
                steps: taskData.steps || [],
              }}
              onStatusChange={handleTaskStatusChange}
            />
          </div>
        )}

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

              <div className="chat-bubble-ai p-3 w-fit">
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
      </div>)}



      {/* Enhanced Input */}
      <div className="p-4  backdrop-blur-lg   shadow-warm">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your heart..."
              className="rounded-3xl input-animated-shadow bg-background/80 backdrop-blur-sm pl-4 pr-12 py-3 text-sm placeholder:text-muted-foreground/60 h-12"
            />
            {/* <Mic className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground/60 hover:text-primary cursor-pointer transition-colors" /> */}
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
    </div>

  );
};

export default Chat;
