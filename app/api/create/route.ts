import { db } from "@/lib/db";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const user = await getServerSession(authOptions);

		if (!user) {
			return new NextResponse("Unauthorized to perform this action.", {
				status: 401,
			});
		}

		const existingApiKey = await db.apiKey.findFirst({
			where: { userId: user.user.id, enabled: true },
		});

		if (existingApiKey) {
			return new NextResponse("You already have a valid API key.", {
				status: 400,
			});
		}

		const createdApiKey = await db.apiKey.create({
			data: {
				userId: user.user.id,
				key: `smAPI_Pk_${nanoid(32)}`,
			},
		});

		return new NextResponse(JSON.stringify(createdApiKey));
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new NextResponse(error.message, { status: 400 });
		}
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
