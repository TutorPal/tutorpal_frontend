import { Card, CardContent } from '@/components/ui/card'
// import { Progress } from '@/components/ui/progress'

interface MetricsCardProps {
  title: string
  percentage: number
  description: string
  icon: React.ReactNode
}

export function MetricsCard({ title, percentage, description, icon }: MetricsCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">{title}</h3>
            <span className="text-sm text-primary">{percentage}%</span>
          </div>
          {/* <Progress value={percentage} className="h-2" /> */}
          <p className="text-xs text-muted-foreground mt-2">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

