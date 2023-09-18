import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import SignInButton from "./signInButton";
import SignOutButton from "./signOutButton";
import Link from "next/link";
import { getServerSession } from "next-auth";

const MobileMenu = async () => {
	const session = await getServerSession();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<MenuIcon className="w-6 h-6 text-foreground" />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="mr-6 mt-2">
				<DropdownMenuLabel>
					<Link href={"/"}>Home</Link>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link href={"/docs"}>Documentation</Link>
				</DropdownMenuItem>
				{session && (
					<DropdownMenuItem>
						<Link href={"/dashboard"}>Dashboard</Link>
					</DropdownMenuItem>
				)}
				<DropdownMenuItem>
					<Link href={"/about"}>About</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<div className="flex items-center justify-center w-full">
						{session ? (
							<>
								<SignOutButton />
								{/* Signout Button */}
							</>
						) : (
							<>
								<SignInButton />
								{/* SignIn Button */}
							</>
						)}
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default MobileMenu;
