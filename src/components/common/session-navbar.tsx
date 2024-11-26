import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, BookmarkIcon as BookmarkSimple } from 'lucide-react'

export function NavBar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">TutorPal</span>
        </Link>
        
        <div className="flex items-center space-x-6 ml-6">
          <Link href="/subjects" className="text-sm font-medium transition-colors hover:text-primary">
            Subjects
          </Link>
          <Link href="/tutors" className="text-sm font-medium transition-colors hover:text-primary">
            Tutors
          </Link>
          <Link href="/groups" className="text-sm font-medium transition-colors hover:text-primary">
            Groups
          </Link>
          <Link href="/help" className="text-sm font-medium transition-colors hover:text-primary">
            Help
          </Link>
        </div>

        <div className="flex items-center ml-auto space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <BookmarkSimple className="h-4 w-4" />
          </Button>
          <Button variant="link">Become a Tutor</Button>
        </div>
      </div>
    </nav>
  )
}

