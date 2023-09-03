'use client'
import { cn } from "@/lib/utils";
import React, { FC, useState } from "react";
import { Icons } from "./Icons";
import { Button } from "./ui/Button";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
    const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
        toast({
            title: 'Error',
            description: 'There was an error logging in with Google',
            variant: 'destructive',
          })
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        type="button"
        size="sm"
        className="w-full"
        isLoading={isLoading}
        disabled={isLoading}
        onClick={loginWithGoogle}>
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
