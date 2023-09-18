/* eslint-disable no-unused-vars */
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
	// rome-ignore lint/suspicious/noRedeclare: <explanation>
	interface JWT {
		id: UserId;
	}
}

declare module "next-auth" {
	// rome-ignore lint/suspicious/noRedeclare: <explanation>
	interface Session {
		user: User & {
			id: UserId;
		};
	}
}
