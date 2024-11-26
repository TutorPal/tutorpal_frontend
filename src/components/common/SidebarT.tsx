import Link from "next/link"
import { BarChart2, BookOpen, MessageCircle, MessageSquare, LogOut, Settings, DollarSign } from 'lucide-react'
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart2 },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Consultations", href: "/consultations", icon: MessageSquare },
  { name: "Feedback", href: "/feedback", icon: MessageCircle },
  { name: "Earnings", href: "/earnings", icon: DollarSign },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  return (
    <div className="flex h-screen flex-col bg-[#E5F5F1] px-6 py-8">
      <div className="flex items-center gap-2 px-2">
        <h1 className="text-2xl font-bold text-teal-500">TutorPal</h1>
      </div>
      <nav className="flex-1 space-y-2 pt-16">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:text-gray-900",
              item.name === "Dashboard" && "bg-white/50 font-medium"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
      <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:text-gray-900">
        <LogOut className="h-5 w-5" />
        Log Out
      </button>
    </div>
  )
}

