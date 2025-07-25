import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Clock, PlayCircle, PlusCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  lastTimestamp: string;
  status: "completed" | "in-progress";
}

function formatTime(ts: string) {
  const date = new Date(ts);
  return date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}

const ChatHistoryList = ({
  sessions = [],
  onSelect,
  selectedId,
  resetSession,
}: {
  sessions?: ChatSession[];
  onSelect?: (id: string) => void;
  selectedId?: string;
  resetSession?: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md mx-auto  max-h-full flex flex-col relative">
      {/* Header - glassy and sticky */}
      <div className="flex items-center gap-3  sticky top-0 z-20 bg-card/80 backdrop-blur-sm border-b border-border/50 px-2 py-3 rounded-b-xl shadow-soft">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/home")}
          className="rounded-full hover:bg-primary interactive"
        >
          <ArrowLeft className="w-5 h-5  " />
        </Button>
        <h3 className="text-lg font-semibold text-foreground">Recent Chats</h3>
      </div>
      {/* Chat Sessions List with custom scrollbar */}
      <div className="flex-1 overflow-y-auto  custom-scrollbar sidebar-chat px-4  pb-16 mb-4 pt-6">
        <div className="flex flex-col gap-3">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onSelect?.(session.id)}
              className={`w-full text-left rounded-xl border-2 px-5 py-4 bg-gradient-to-br from-primary/5 to-muted/10 transition-all duration-300 interactive-element flex items-center gap-4 shadow-calm focus:outline-none focus:ring-2 focus:ring-primary/30 group
                ${selectedId === session.id ? "border-primary/60 bg-primary/10" : "border-border hover:border-primary/20"}
              `}
              aria-label={`Open chat session: ${session.title}`}
            >
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-medium text-base text-foreground truncate capitalize ">{session.title}</span>
                <span className="text-xs text-muted-foreground truncate max-w-xs">
                  {session.lastMessage.length > 48
                    ? session.lastMessage.slice(0, 48) + "..."
                    : session.lastMessage}
                </span>
              </div>
              <div className="flex flex-col items-end gap-1 min-w-[80px]">
                <span className="text-xs text-muted-foreground/80">
                  {formatTime(session.lastTimestamp)}
                </span>
            { session.status != null &&    (<span className="flex items-center gap-1 text-xs font-medium">
                  {session.status === "completed" ? (
                    <CheckCircle className="w-4 h-4 text-success animate-pulse text-green-500" />
                  ) : (
                    <PlayCircle className="w-4 h-4 text-accent animate-spin-slow" />
                  )}
                  <span
                    className={
                      session.status === "completed"
                        ? "text-success text-green-500"
                        : "text-accent"
                    }
                  >
                    {session.status === "completed" ? "Completed" : "Start Task"}
                  </span>
                </span>)}
                { session.status == null && (
                  <span style={{visibility:"hidden"}} className=" flex items-center gap-1 text-xs font-medium text-muted-foreground">
                    <span>In Progress</span>
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 z-20 w-full px-3 py-3 pr-5">

      <button  onClick={()=> resetSession()} className="flex  items-center w-full justify-center gap-3    bg-card/80 border-2 backdrop-blur-sm border-red-100  rounded-xl shadow-soft  py-2">

          <PlusCircleIcon className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-primary">New Chat</h3>
      </button>
      </div>

    </div>
  );
};

// Helper to map API data to ChatSession[]
export function mapApiHistoryToSessions(apiData: any[]): ChatSession[] {
  return apiData.map((item) => {
    const firstMsg = item.messages && item.messages.length > 0 ? item.messages[0].content : "Untitled Chat";
    const lastMsgObj = item.messages && item.messages.length > 0 ? item.messages[item.messages.length - 1] : null;
    return {
      id: item.sessionId || item._id,
      title: firstMsg,
      lastMessage: lastMsgObj ? lastMsgObj.content : "",
      lastTimestamp: lastMsgObj ? lastMsgObj.timestamp : item.updatedAt,
      status: item.task,
    };
  });
}

export default ChatHistoryList;
