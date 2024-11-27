"use client"
import { Users, BookOpen, DollarSign, Star, Calendar } from 'lucide-react'
// import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
// import { Sidebar } from "@/components/common/SidebarT"
// import { StatCard } from "@/components/common/Stats-Card"
// import { Card } from "@/components/ui/card"

// const stats = [
//   { title: "Total Student", value: "427", icon: Users, iconClassName: "bg-purple-100" },
//   { title: "Active Courses", value: "5", icon: BookOpen, iconClassName: "bg-blue-100" },
//   { title: "Total Earnings", value: "$13,876", icon: DollarSign, iconClassName: "bg-green-100" },
//   { title: "Rating/Reviews", value: "231", icon: Star, iconClassName: "bg-yellow-100" },
//   { title: "Pending Consult", value: "3", icon: Calendar, iconClassName: "bg-red-100" },
// ]

// const responseData = [
//   { month: "Jan", completed: 40, uncompleted: 20 },
//   { month: "Feb", completed: 30, uncompleted: 25 },
//   { month: "Mar", completed: 20, uncompleted: 15 },
//   { month: "Apr", completed: 35, uncompleted: 20 },
//   { month: "May", completed: 25, uncompleted: 18 },
//   { month: "Jun", completed: 30, uncompleted: 22 },
//   { month: "Jul", completed: 28, uncompleted: 20 },
// ]

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* <Sidebar /> */}
      {/* <main className="flex-1 overflow-y-auto p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome Back, Shellz</h1>
            <p className="text-gray-500">Way to go!! You&apos;ve taught 50 students this month!</p>
          </div>
          <p className="text-gray-500">Sunday, 24th, November, 2024</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Student&apos;s Response</h2>
              <select className="rounded-md border p-2">
                <option>This year</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold">Published Courses Sold</h2>
            <div className="mt-4 flex items-center justify-center">
              <div className="relative h-48 w-48">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div>
                    <p className="text-center text-4xl font-bold">175</p>
                    <p className="text-center text-sm text-gray-500">Sales</p>
                  </div>
                </div>
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="10"
                    strokeDasharray="282.7"
                    strokeDashoffset="70.675"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-teal-500" />
                <span>Percentage Bought (75%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-200" />
                <span>Percentage not Bought (25%)</span>
              </div>
            </div>
          </Card>
        </div>
      </main> */}
    </div>
  )
}