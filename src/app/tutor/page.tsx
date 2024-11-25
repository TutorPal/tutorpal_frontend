"use client"
import React, { useState, } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen, Video, FileText, Calendar} from 'lucide-react';
import Navbar from '@/components/common/Navbar';
import Link from 'next/link';



const TutorProfile = () => {
  const [sessionOffers, setSessionOffers] = useState([
    { id: 1, studentName: 'Alice Brown', course: 'Mathematics 101', dateTime: '2024-11-25 14:00', status: 'pending' },
    { id: 2, studentName: 'Bob Smith', course: 'Physics Basics', dateTime: '2024-11-26 15:30', status: 'pending' },
    { id: 3, studentName: 'Carol Davis', course: 'Mathematics 101', dateTime: '2024-11-24 13:00', status: 'accepted' },
  ]);

  const [courses] = useState([
    { id: 1, title: 'Mathematics 101', type: 'course', students: 15, materials: 8 },
    { id: 2, title: 'Physics Basics', type: 'course', students: 12, materials: 6 },
  ]);

  const [materials] = useState([
    { id: 1, title: 'Algebra Fundamentals', type: 'video', course: 'Mathematics 101' },
    { id: 2, title: 'Practice Problems', type: 'pdf', course: 'Mathematics 101' },
  ]);

  const handleSessionResponse = (offerId: number, accepted: boolean) => {
    setSessionOffers(prevOffers =>
      prevOffers.map(offer =>
        offer.id === offerId
          ? { ...offer, status: accepted ? 'accepted' : 'declined' }
          : offer
      )
    );
  };



  return (
<>
<Navbar />
<div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tutor Dashboard</h1>
        <Link href={'/courses/create'}>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Create New Course
        </Button>
        </Link>
      </div>

      <Tabs defaultValue="sessions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sessions" className="flex items-center gap-2">
            <Calendar size={16} />
            Session Requests
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <BookOpen size={16} />
            My Courses
          </TabsTrigger>
          <TabsTrigger value="materials" className="flex items-center gap-2">
            <FileText size={16} />
            Course Materials
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <CardTitle>Session Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sessionOffers.map(offer => (
                  <Card key={offer.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{offer.studentName}</h3>
                        <p className="text-sm text-gray-600">{offer.course}</p>
                        <p className="text-sm text-gray-600">{offer.dateTime}</p>
                      </div>
                      {offer.status === 'pending' ? (
                        <div className="space-x-2">
                          <Button
                            onClick={() => handleSessionResponse(offer.id, true)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Accept
                          </Button>
                          <Button
                            onClick={() => handleSessionResponse(offer.id, false)}
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            Decline
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            offer.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                          </span>
                          {offer.status === 'accepted' && (
                            <a href="/video-session"> <Button
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              Start Session
                            </Button></a>
                            
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map(course => (
                  <Card key={course.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-gray-600">{course.students} Students Enrolled</p>
                        <p className="text-sm text-gray-600">{course.materials} Materials</p>
                      </div>
                      <Button variant="outline" className="text-blue-600 border-blue-600">
                        Manage
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials">
          <Card>
            <CardHeader>
              <CardTitle>Course Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {materials.map(material => (
                  <Card key={material.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        {material.type === 'video' ? (
                          <Video className="text-blue-600" />
                        ) : (
                          <FileText className="text-red-600" />
                        )}
                        <div>
                          <h3 className="font-semibold">{material.title}</h3>
                          <p className="text-sm text-gray-600">{material.course}</p>
                        </div>
                      </div>
                      <Button variant="outline">View</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
</>
    
  );
};

export default TutorProfile;
