"use client"

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LiveLessons } from "@/components/LiveLessons"
import { PurchasedCourses } from "@/components/PurchasedCourses"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast";

export default function StudentProfile() {
  const [activeTab, setActiveTab] = useState("live-lessons")
  const { toast } = useToast()

  const handleJoinCall = () => {
    // In a real application, this would initiate the video call
    toast({
      title: "Joining video call",
      description: "You are now joining the live lesson.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      <Tabs defaultValue="live-lessons" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="live-lessons">Live Lessons</TabsTrigger>
          <TabsTrigger value="purchased-courses">My Courses</TabsTrigger>
        </TabsList>
        <TabsContent value="live-lessons">
          <LiveLessons onJoinCall={handleJoinCall} />
        </TabsContent>
        <TabsContent value="purchased-courses">
          <PurchasedCourses />
        </TabsContent>
      </Tabs>
      {activeTab === "live-lessons" && (
        <div className="mt-6">
          <Button onClick={handleJoinCall} className="w-full md:w-auto">Join Next Lesson</Button>
        </div>
      )}
    </div>
  )
}

