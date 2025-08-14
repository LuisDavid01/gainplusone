import { auth } from "@clerk/nextjs/server";
import { Dumbbell } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button"
import ThemeToggle from "../ThemeToogle";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import HamburgerMenu from "../MobileMenu";
export default function MainHeader(){
    return(
      <header className="relative z-50  border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container  mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
               <Link href={"/"} className="inline-flex items-center space-x-2">
                <Dumbbell className="h-8 w-8 text-primary flex-shrink-0" />
                <span className="font-bold text-2xl">GainOne+</span>
                </Link>
              
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <SignedOut>
              <form
                action={async () => {
                "use server";

                const session = await auth();

                if (!session.userId) {
                    return redirect("/sign-up");
                }

                return redirect("/dashboard");
                }}
            >
                <Button
                size="sm"
                type="submit"
                className=""
                >
                Get Started for free
                </Button>
            </form>

            <form
                action={async () => {
                "use server";

                const session = await auth();

                if (!session.userId) {
                    return redirect("/sign-in");
                }

                return redirect("/dashboard");
                }}
            >
                <Button
                size="sm"
                type="submit"
                variant={"outline"}
                className=""
                >
                Sign in
                </Button>
            </form>
            </SignedOut>

            <SignedIn>
              <Link href={"/dashboard"}>
                <Button variant={"link"}>
                  dashboard
                </Button>
              </Link>
              
              <UserButton />
            </SignedIn>
            <ThemeToggle/>
            </nav>
            <nav className="md:hidden">
              <HamburgerMenu>
              <li>
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </a>
              </li>
              <SignedOut>
                <li>
              <form
                action={async () => {
                "use server";

                const session = await auth();

                if (!session.userId) {
                    return redirect("/sign-up");
                }

                return redirect("/dashboard");
                }}
            >
                <Button
                size="sm"
                variant={"link"}
                type="submit"
                className=""
                >
                Get Started for free
                </Button>
            </form>
            </li>

            <li>
            <form
                action={async () => {
                "use server";

                const session = await auth();

                if (!session.userId) {
                    return redirect("/sign-in");
                }

                return redirect("/dashboard");
                }}
            >
                <Button
                size="sm"
                type="submit"
                variant={"link"}
                className=""
                >
                Sign in
                </Button>
            </form>
            </li>
            </SignedOut>

            <SignedIn>
              <li>
                <Link href={"/dashboard"}>
                <Button variant={"link"}>
                  dashboard
                </Button>
              </Link>
              </li>
              <li>
              <UserButton />
              </li>
            </SignedIn>
            <li>
            <ThemeToggle/>
            </li>

              </HamburgerMenu>
            </nav>
          </div>
        </div>
      </header>
    )
}