import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

// This would typically come from an API call to your smart contract
const mockPurchasedCourses = [
  { id: 1, title: "Introduction to Blockchain", instructorName: "John Doe", progress: 30 },
  { id: 2, title: "Advanced Solidity", instructorName: "Jane Smith", progress: 75 },
]

export function PurchasedCourses() {
  if (mockPurchasedCourses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Courses</CardTitle>
          <CardDescription>You haven&apos;t purchased any courses yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground mb-4">
            Explore our course catalog to find courses that interest you.
          </p>
          <Link href="/courses">
            <Button className="w-full">Browse Courses</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {mockPurchasedCourses.map((course) => (
        <Card key={course.id}>
          <CardHeader>
            <CardTitle>{course.title}</CardTitle>
            <CardDescription>Instructor: {course.instructorName}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="text-sm font-medium">Progress: {course.progress}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
            <Link href={`/courses/${course.id}`}>
              <Button>Continue Learning</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

