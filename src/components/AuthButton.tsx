
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { User, LogIn } from "lucide-react";

interface AuthButtonProps {
  variant?: "signin" | "signup" | "user";
  className?: string;
}

const AuthButton = ({ variant = "user", className = "" }: AuthButtonProps) => {
  const { isSignedIn, user } = useUser();

  if (isSignedIn) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-sm text-muted-foreground hidden sm:block">
          Hello, {user?.firstName || "Friend"}!
        </span>
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "w-8 h-8",
            },
          }}
        />
      </div>
    );
  }

  if (variant === "signin") {
    return (
      <SignInButton fallbackRedirectUrl="/home">
        <Button variant="outline" className={className}>
          <LogIn className="w-4 h-4 mr-2" />
          Sign In
        </Button>
      </SignInButton>
    );
  }

  if (variant === "signup") {
    return (
      <SignUpButton fallbackRedirectUrl="/home">
        <Button className={className}>
          <User className="w-4 h-4 mr-2" />
          Sign Up
        </Button>
      </SignUpButton>
    );
  }

  return (
    <SignInButton fallbackRedirectUrl="/home">
      <Button variant="ghost" size="icon" className={className}>
        <User className="w-5 h-5" />
      </Button>
    </SignInButton>
  );
};

export default AuthButton;
