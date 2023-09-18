"use client";

import { Key, Loader2 } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/toast";
import { Button } from "@/components/ui/button";
import ApiDashboard from "./apiDashboard";

const RequestApiKey = () => {
	const [isCreating, setIsCreating] = useState<boolean>(false);
	const [apiKey, setApiKey] = useState<string | null>(null);
	const [copied, setCopied] = useState<boolean>(false);
	const [showDashboard, setShowDashboard] = useState<boolean>(false);

	async function createNewApiKey(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setIsCreating(true);

		try {
			const response = await axios.get("/api/create");
			// Assuming the response contains the API key as data
			const generatedApiKey = response.data.key;

			setApiKey(generatedApiKey);
		} catch (err) {
			if (err instanceof Error) {
				toast({
					title: "Error",
					message: err.message,
					type: "error",
				});
			} else {
				toast({
					title: "Error",
					message: "Something went wrong",
					type: "error",
				});
			}
		} finally {
			setIsCreating(false);
		}
	}

	return (
		<div>
			{!showDashboard ? (
				<div className="container md:max-w-2xl space-y-10">
					<div className="flex flex-col gap-6 items-center">
						<Key className="mx-auto h-12 w-12" />
						<h1 className="text-center heading">Request your API key</h1>
						<p>You haven&apos;t requested an API key yet.</p>
					</div>
					<form
						onSubmit={createNewApiKey}
						className="mt-6 sm:flex sm:items-center"
						action="#"
					>
						<label htmlFor="emails" className="sr-only">
							Your API key
						</label>
						<div className="relative rounded-md shadow-sm sm:min-w-0 sm:flex-1">
							<Input readOnly value={apiKey || ""} placeholder="smAPI_Pk_..." />
						</div>
						<div className="mt-6 flex justify-center sm:mt-0 sm:ml-4 sm:flex-shrink-0">
							{!apiKey && (
								<Button type="submit">
									{isCreating ? (
										<Loader2 className="animate-spin h-5 w-5 mr-2" />
									) : null}
									Request Key
								</Button>
							)}
							{apiKey && (
								<Button
									type="button"
									onClick={() => {
										navigator.clipboard.writeText(apiKey);
										setCopied(true);
										toast({
											title: "Copied",
											message: "Your API key has been copied to your clipboard",
											type: "success",
										});
									}}
								>
									{copied ? "Copied" : "Copy"}
								</Button>
							)}
						</div>
					</form>
					{apiKey && (
						<div className="flex items-center justify-center">
							<Button onClick={() => setShowDashboard(true)}>
								Manage your API key
							</Button>
						</div>
					)}
				</div>
			) : (
				<ApiDashboard />
			)}
		</div>
	);
};

export default RequestApiKey;
