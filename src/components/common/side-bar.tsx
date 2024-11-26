import { type LucideIcon } from 'lucide-react'
import * as Icons from 'lucide-react'
import { sidebarItems } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Sidebar() {
  return (
    <div className="hidden md:flex flex-col w-64 bg-white p-4 h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          TutorPal
          <span className="text-3xl">▐</span>
        </h1>
      </div>
      
      <nav className="space-y-2">
        {sidebarItems.map((item) => {
          const Icon = Icons[item.icon as keyof typeof Icons] as LucideIcon
          
          return (
            <a
              key={item.name}
              href="#"
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors",
                item.name === "Dashboard" && "bg-primary/10 text-primary"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </a>
          )
        })}
      </nav>
    </div>
  )
}

