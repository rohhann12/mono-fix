import { Button } from "@/components/ui/button"
import { Volume2 } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="top-0 w-full bg-background/80 backdrop-blur-md border-b z-50">
      <div className="flex-1 mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Volume2 className="w-6 h-6 text-primary" />
          StereoFix
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-muted-foreground hover:text-foreground">
            Features
          </Link>
          <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground">
            How it Works
          </Link>
        </nav>

        <div className="flex items-center gap-2 ">
          <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link href="/dashboard">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
