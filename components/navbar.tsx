import { getServerSession } from "next-auth";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import SignInButton from "@/components/signInButton";
import SignOutButton from "@/components/signOutButton";
import MobileMenu from "@/components/mobile-menu";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Navbar = async () => {
	const session = await getServerSession(authOptions);
	return (
		<nav className="fixed text-foreground/60 backdrop-blur-sm top-0 right-0 left-0 border-b border-foreground/20 h-20 z-50 shadow-sm flex items-center justify-between">
			<div className="container max-w-7xl mx-auto w-full flex items-center justify-between">
				<Link
					href={"/"}
					className="scroll-m-20 text-xl text-foreground font-extrabold tracking-tight lg:text-3xl"
				>
					Similarity API
				</Link>
				<div className="md:hidden flex items-center justify-between gap-3">
					<ThemeToggle />
					<MobileMenu />
				</div>

				<div className="hidden md:flex items-center gap-4">
					<Link
						href={"/docs"}
						className="text-muted-foreground hover:text-foreground font-medium"
					>
						Documentation
					</Link>
					{session ? (
						<>
							<Link
								href={"/dashboard"}
								className="text-muted-foreground hover:text-foreground font-medium"
							>
								Dashboard
							</Link>
							<SignOutButton />
							{/* Signout Button */}
						</>
					) : (
						<>
							<SignInButton />
							{/* SignIn Button */}
						</>
					)}
					<ThemeToggle />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
