import { Heart } from "lucide-react";

const Loader = ({ message = "Loading..." }: { message?: string }) => (
  <div className="min-h-screen bg-gradient-serenity flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-16 h-16 mx-auto flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-secondary/85 rounded-full animate-pulse-soft shadow-wellness">
        <Heart className="w-10 h-10 text-white animate-heart-beat-gentle" fill="currentColor" />
      </div>
      <p className="text-primary font-heading text-lg ">{message}</p>
    </div>
  </div>
);

export default Loader;
