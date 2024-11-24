import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// This would typically come from an API call to your smart contract
const mockAppointments = [
  { id: 1, courseName: "Introduction to Blockchain", instructorName: "John Doe", date: "2023-06-15", time: "14:00" },
  { id: 2, courseName: "Advanced Solidity", instructorName: "Jane Smith", date: "2023-06-16", time: "10:00" },
]

export function LiveLessons({ onJoinCall }: { onJoinCall: () => void }) {
  if (mockAppointments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Live Lessons</CardTitle>
          <CardDescription>You have no upcoming live lessons scheduled.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            When you book a live lesson, it will appear here.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {mockAppointments.map((appointment) => (
        <Card key={appointment.id}>
          <CardHeader>
            <CardTitle>{appointment.courseName}</CardTitle>
            <CardDescription>with {appointment.instructorName}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Date: {appointment.date}</p>
            <p className="mb-4">Time: {appointment.time}</p>
            <Button onClick={onJoinCall}>Join Call</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

