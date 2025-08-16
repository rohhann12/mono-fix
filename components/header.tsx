"use client";

import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export function Header() {
  return (
    <header className="top-0 w-full bg-background/80 backdrop-blur-md border-b z-50">
      <div className="flex-1 mx-auto h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Volume2 className="w-6 h-6 text-primary" />
          StereoFix
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-muted-foreground hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-muted-foreground hover:text-foreground"
          >
            How it Works
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Show when NOT signed in */}
          <SignedOut>
            <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
              <Button variant="ghost">Sign in</Button>
            </SignInButton>
          </SignedOut>

          {/* Show when signed in */}
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
