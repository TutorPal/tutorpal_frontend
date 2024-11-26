import { TypeIcon as type, LucideIcon } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  iconClassName?: string
}

export function StatCard({ title, value, icon: Icon, iconClassName }: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className={cn("rounded-full p-2", iconClassName)}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </Card>
  )
}