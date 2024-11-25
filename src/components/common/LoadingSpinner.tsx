import { Loader2 } from 'lucide-react'
// import { Button } from "@/components/ui/button"

export default function LoadingSpinner() {
  return (
    <div>
      <Loader2 className="h-4 w-4 animate-spin" />
      <span className="sr-only">Loading</span>
    </div>
  )
}

