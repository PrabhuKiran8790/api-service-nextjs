import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import ApiDashboard from "@/components/apiDashboard";
import RequestApiKey from "@/components/requestApiKey";

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Dashboard | Similarity API",
};

const Dashboard = async () => {
	const user = await getServerSession(authOptions);
	if (!user) return notFound();

	const apiKey = await db.apiKey.findFirst({
		where: {
			// get the apik key for the current user where the user id is the same as the user id in the session and the api key is enabled
			userId: user.user.id,
			enabled: true,
		},
	});

	return (
		<div className="max-w-7xl mx-auto mt-16">
			{apiKey ? <ApiDashboard /> : <RequestApiKey />}
			<div className="h-96" />
		</div>
	);
};

export default Dashboard;
