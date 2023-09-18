import DocTabs from "@/components/doc-tabs";
import type { Metadata } from "next";
import "simplebar-react/dist/simplebar.min.css";

export const config: Metadata = {
	title: "Similarity API | Docs",
	description: "Free & Open Source Similarity API",
};

const Docs = () => {
	return (
		<main className="container max-w-7xl mt-12 mx-auto">
			<div className="flex flex-col items-center gap-6">
				<h1 className="heading">Documentation</h1>
				<p className="bg-black text-white dark:bg-white dark:text-black px-5 py-1 rounded-md font-bold">
					/api/v1/similarity
				</p>
				<DocTabs />
			</div>
		</main>
	);
};

export default Docs;
