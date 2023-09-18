"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { toast } from "@/components/toast";
import router from "next/router";
import { absoluteURL } from "@/lib/utils";

const SignOutButton = ({ className }: { className?: string }) => {
	const [isloading, setIsLoading] = useState<boolean>(false);

	const signOutUser = async () => {
		setIsLoading(true);
		try {
			await signOut();
		} catch (error) {
			console.log(error);
			toast({
				title: "Error signing out",
				message: "There was an error signing out. Please try again.",
				type: "error",
			});
		}
	};

	return (
		<Button
			onClick={signOutUser}
			disabled={isloading}
			className={className || ""}
		>
			Sign Out
		</Button>
	);
};

export default SignOutButton;
