"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"

const navItems = [
  { name: 'Dashboard', href: '/' },
  { name: 'Courses', href: '/courses' },
  { name: 'My Profile', href: '/profile' },
  { name: 'Student Profile', href: '/student-profile' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex space-x-4 mb-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium",
            pathname === item.href
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}

