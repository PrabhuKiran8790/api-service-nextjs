"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { toast } from "@/components/toast";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const SignInButton = ({ className }: { className?: string }) => {
	const [isloading, setIsLoading] = useState<boolean>(false);

	const signInWithGoogle = async () => {
		setIsLoading(true);
		try {
			await signIn("google", { callbackUrl: "/" });
		} catch (error) {
			console.log(error);
			toast({
				title: "Error signing in",
				message: "There was an error signing in. Please try again.",
				type: "error",
			});
		}
	};

	return (
		<Button
			onClick={signInWithGoogle}
			disabled={isloading}
			className={cn("", className)}
		>
			{isloading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : null}
			Sign In
		</Button>
	);
};

export default SignInButton;
