import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import Image from "next/image"
import ConnectWalletButton from "./common/ConnectWalletButton"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full mx-auto border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 mx-auto items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-xl font-bold text-transparent">
            <Image src={'/logo.svg'} alt="TutorPal" width={187} height={60} />
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            href="#features"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Features
          </Link>
          <Link
            href="/courses"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Courses
          </Link>
          <Link
            href="#workflow"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            How it Works
          </Link>
          {/* <Link
            href="#team"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Team
          </Link> */}
          {/* <Link
            href="#testimonials"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Testimonials
          </Link> */}
        </nav>
        <div className="flex items-center space-x-4">
          {/* <ModeToggle /> */}
          {/* <Button variant="outline" className="hidden md:flex">
            Sign In
          </Button> */}
          <ConnectWalletButton />
          {/* <Button className="hidden md:flex bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
            Get Started
          </Button> */}
        </div>
      </div>
    </header>
  )
}

