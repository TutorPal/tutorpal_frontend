'use client'

import { useState } from 'react'
import { Search, Calendar, Video } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for tutors and appointments
const tutors = [
  { id: 1, name: 'Alice Johnson', subject: 'Mathematics', rating: 4.8 },
  { id: 2, name: 'Bob Smith', subject: 'Physics', rating: 4.6 },
  { id: 3, name: 'Carol Williams', subject: 'Chemistry', rating: 4.9 },
]

const appointments = [
  { id: 1, tutor: 'Alice Johnson', subject: 'Mathematics', date: '2023-06-15', time: '14:00' },
  { id: 2, tutor: 'Bob Smith', subject: 'Physics', date: '2023-06-17', time: '10:00' },
]

export default function ConsultationsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTutors = tutors.filter(tutor => 
    tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutor.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">

        <main className='max-w-6xl mx-auto px-6'>

      <h1 className="text-3xl font-bold mb-6">Tutorpal Consultations</h1>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for tutors or subjects"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tutors List */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Available Tutors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTutors.map(tutor => (
            <Card key={tutor.id}>
              <CardContent className="flex items-center p-4">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${tutor.name}`} alt={tutor.name} />
                  <AvatarFallback>{tutor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{tutor.name}</h3>
                  <p className="text-sm text-gray-500">{tutor.subject}</p>
                  <p className="text-sm">Rating: {tutor.rating}/5</p>
                </div>
                <Button className="ml-auto">Book</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Upcoming Appointments */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Your Appointments</h2>
        <div className="space-y-4">
          {appointments.map(appointment => (
            <Card key={appointment.id}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2" />
                  {appointment.subject} with {appointment.tutor}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Date: {appointment.date}</p>
                <p>Time: {appointment.time}</p>
                <div className="mt-4">
                  <Button className="mr-2">Reschedule</Button>
                  <Button variant="outline">Cancel</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Video Chat Component */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Live Video Session</h2>
        <Card>
          <CardContent className="p-6">
            <div className="aspect-video bg-gray-200 mb-4 flex items-center justify-center">
              <Video className="h-16 w-16 text-gray-400" />
            </div>
            <Button className="w-full">
              <Video className="mr-2 h-4 w-4" /> Start Video Session
            </Button>
          </CardContent>
        </Card>
      </section>
        </main>
    </div>
  )
}