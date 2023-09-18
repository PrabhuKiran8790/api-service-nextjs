import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import SignInButton from "@/components/signInButton";
import Link from "next/link";

export const config: Metadata = {
	title: "Similarity API | Home",
	description: "Free & Open Source Similarity API",
};

export default async function Home() {
	const session = await getServerSession();

	return (
		<main className="relative flex justify-center items-center h-screen overflow-x-hidden">
			<div className="container pt-32 max-w-7xl mx-auto w-full h-full pb-11">
				{/* <div className="h-full gap-6 flex flex-col justify-start lg:justify-center items-center lg:items-start">
					<h1 className="text-black dark:text-white text-center lg:text-left font-extrabold leading-tight tracking-tighter text-5xl md:text-6xl lg:text-7xl">
						Easily determine text similarity
					</h1>
					<p className="max-w-prose text-slate-700 dark:text-slate-300 mb-2 text-center md:text-start">
						With the Similarity API, you can easily determine the similarity of
						given texts. The API is free and open source. Built on top of OpenAI
						API
					</p>
					<div className="relative w-full max-w-xl lg:max-w-3xl lg:left-1/2 aspect-square lg:absolute">
						<Image
							priority
							className="img-shadow "
							quality={100}
							style={{ objectFit: "contain" }}
							fill
							src="/typewriter.png"
							alt="typewriter"
						/>
					</div>
				</div> */}
				<div className="h-full gap-6 flex flex-col md:flex-row items-center justify-between">
					<div className="flex flex-col gap-6">
						<h1 className="text-black dark:text-white text-center md:text-start font-extrabold leading-tight tracking-tighter text-4xl md:text-5xl">
							Easily determine text similarity
						</h1>
						<p className="max-w-prose text-slate-700 dark:text-slate-300 mb-2 text-center md:text-start">
							With the Similarity API, you can easily determine the similarity
							of given texts. The API is free and open source. Built on top of
							OpenAI API
						</p>
						{session ? (
							<div className="flex items-center justify-center md:items-start md:justify-start">
								<Link href={"/dashboard"} className="button-link">
									Get Started
									<ArrowRight className="ml-2 h-5 w-5" />
								</Link>
							</div>
						) : (
							<div className="flex items-center justify-center md:items-start md:justify-start">
								<SignInButton />
							</div>
						)}
					</div>
					<div className="relative w-full max-w-xl lg:max-w-3xl lg:left-1/2 aspect-square lg:absolute">
						<Image
							priority
							className="img-shadow "
							quality={100}
							style={{ objectFit: "contain" }}
							fill
							src="/typewriter.png"
							alt="typewriter"
						/>
					</div>
				</div>
			</div>
		</main>
	);
}
