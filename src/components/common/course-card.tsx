import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import type { Course } from '@/types/dashboard'

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex gap-4 p-4">
          <div className="relative w-48 h-32 rounded-lg overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-between flex-1">
            <div>
              <div className="text-sm text-muted-foreground mb-2">{course.status}</div>
              <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
              <p className="text-sm text-muted-foreground">{course.institution}</p>
              <p className="text-sm text-muted-foreground">
                {course.progress.completed} of {course.progress.total} lessons completed
              </p>
            </div>
            <Button variant="secondary" className="self-start">
              Continue
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

