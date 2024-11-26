import { Button } from '@/components/ui/button'
import { Clock } from 'lucide-react'

interface SessionDetailsProps {
  date: Date
  price: number
  onConfirm: () => void
}

export function SessionDetails({ date, price, onConfirm }: SessionDetailsProps) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{formattedDate}</h2>
      
      <div className="flex items-center space-x-4 text-muted-foreground">
        <Clock className="h-5 w-5" />
        <div>
          <h3 className="font-semibold">One hour session</h3>
          <p className="text-sm">9:00 AM - 10:00 AM</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4">
        <div className="text-lg">
          Confirm and Pay <span className="font-semibold">${price}</span>
        </div>
        <Button onClick={onConfirm}>Confirm</Button>
      </div>
    </div>
  )
}

