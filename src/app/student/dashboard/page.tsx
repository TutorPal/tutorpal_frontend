import { Sidebar } from '@/components/common/side-bar'
import { CourseCard } from '@/components/common/course-card'
import { Calendar } from '@/components/common/calendar'
import { MetricsCard } from '@/components/common/metrics-card'
import { SessionChart } from '@/components/common/session-cart'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// import { Progress } from '@/components/ui/progress'
import { BookOpen, GraduationCap, Award } from 'lucide-react'
import Image from 'next/image'

const courses = [
  {
    id: '1',
    title: 'Quantum Computing 101',
    institution: 'Stanford University',
    progress: { completed: 5, total: 12 },
    status: 'In Progress',
    image: '/placeholder.svg?height=400&width=600',
  },

] as const

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#E0F2F1]">
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <Input
                placeholder="Search"
                className="max-w-md"
              />
              <div className="text-right">
                <div className="text-sm text-muted-foreground">
                  16, November 2024, Monday
                </div>
              </div>
            </div>

            <div className="grid gap-8">
              {/* Welcome Banner */}
              <div className="relative bg-white/50 rounded-lg p-6">
                <div className="max-w-lg">
                  <h1 className="text-2xl font-bold mb-2">Welcome Back Debby Sam!</h1>
                  <p className="text-muted-foreground mb-4">New Crypto course classes available</p>
                  <Button>Buy Course</Button>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/3">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    alt="Decorative books"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Current Courses */}
              <div>
                <h2 className="text-xl font-bold mb-4">Current Courses</h2>
                <div className="grid gap-4">
                  {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>

              {/* Progress Tracking */}
              <div>
                <h2 className="text-xl font-bold mb-4">Progress Tracking</h2>
                <div className="bg-white rounded-lg p-6">
                  <div className="mb-2">40% Complete</div>
                  {/* <Progress value={40} className="h-2 mb-2" /> */}
                  <div className="text-sm text-muted-foreground">
                    4 of 10 courses completed
                  </div>
                </div>
              </div>

              {/* Rewards and Metrics */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-bold mb-4">Earned Rewards</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {[5, 10, 15].map((amount) => (
                      <div
                        key={amount}
                        className="bg-white rounded-lg p-4 text-center"
                      >
                        <Award className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <div className="text-sm">${amount} off any course</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4">Performance Metrics</h2>
                  <div className="grid gap-4">
                    <MetricsCard
                      title="Attendance"
                      percentage={95}
                      description="Great! Keep showing up!"
                      icon={<BookOpen className="w-5 h-5 text-primary" />}
                    />
                    <MetricsCard
                      title="Homeworks"
                      percentage={92}
                      description="Don't forget to turn in all assignments"
                      icon={<GraduationCap className="w-5 h-5 text-primary" />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <aside className="hidden lg:block w-80 p-8 bg-white">
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-24 h-24 mb-4">
              <Image
                src="/placeholder.svg?height=96&width=96"
                alt="Profile"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h2 className="text-lg font-semibold">Debby Sam</h2>
            <p className="text-sm text-muted-foreground">Student</p>
            <Button variant="outline" className="mt-4">
              Profile
            </Button>
          </div>

          <div className="space-y-8">
            <Calendar />
            
            <SessionChart
              data={{
                present: 65.5,
                absent: 15.8,
                excused: 9.4,
                total: 100,
              }}
            />
          </div>
        </aside
>
      </div>
    </div>
  )
}

