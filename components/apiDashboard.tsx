import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { formatDistance } from "date-fns";
import { Input } from "./ui/input";
import Table from "./dashboard-table";

const ApiDashboard = async () => {
	const session = await getServerSession();
	if (!session) return notFound();

	const apiKeys = await db.apiKey.findMany({
		where: {
			userId: session.user.id,
		},
	});

	const activeApi = apiKeys.find((key) => key.enabled);

	if (!activeApi) return notFound();

	const userRequests = await db.apiRequest.findMany({
		where: {
			apiKeyId: activeApi.id,
		},
	});

	const serializableRequests = userRequests.map((request) => ({
		...request,
		timestamp: formatDistance(new Date(request.timestamp), new Date()),
	}));

	return (
		<div className="container flex flex-col gap-6">
			<h1 className="heading text-center">Welcome Back, {session.user.name}</h1>
			<div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
				<p>Your API Key :</p>
				<Input value={activeApi.key} className="w-fit truncate" readOnly />
			</div>
			<Table userRequests={serializableRequests} />
		</div>
	);
};

export default ApiDashboard;
