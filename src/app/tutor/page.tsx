"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, Video, FileText, Calendar } from "lucide-react";
import Navbar from "@/components/common/Navbar";

import { tutorPalAbi } from '@/abi/tutorPalAbi';
import { tutorPalMarketAddress } from '@/utils/constants';


const TutorProfile = () => {
  const [sessionOffers, setSessionOffers] = useState([
    { id: 1, studentName: "Alice Brown", course: "Mathematics 101", dateTime: "2024-11-25 14:00", status: "pending" },
    { id: 2, studentName: "Bob Smith", course: "Physics Basics", dateTime: "2024-11-26 15:30", status: "pending" },
  ]);

  const [courses] = useState([
    { id: 1, title: "Mathematics 101", type: "course", students: 15, materials: 8 },
    { id: 2, title: "Physics Basics", type: "course", students: 12, materials: 6 },
  ]);

  const [materials] = useState([
    { id: 1, title: "Algebra Fundamentals", type: "video", course: "Mathematics 101" },
    { id: 2, title: "Practice Problems", type: "pdf", course: "Mathematics 101" },
  ]);

  const { writeContract, isPending, isSuccess } = useWriteContract();

  const { address, isConnected } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseURL, setNewCourseURL] = useState("");
  const [newSymbol, setNewSymbol] = useState("");
  const [newMaxSupply, setNewMaxSupply]= useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [newRoyalty, setNewRoyalty] = useState(0);

  const handleSessionResponse = (offerId, accepted) => {
    setSessionOffers((prevOffers) =>
      prevOffers.map((offer) =>
        offer.id === offerId
          ? { ...offer, status: accepted ? "accepted" : "declined" }
          : offer
      )
    );
  };

  const handleContract= ()=>{
    writeContract({
      address: tutorPalMarketAddress,
      abi: tutorPalAbi,
      functionName: 'createCourse',
      args: [newCourseTitle,newSymbol,newCourseURL,newMaxSupply,newPrice,newRoyalty],
    });

    if (!isConnected) return null;

  }
  const handleCreateCourse = () => {
    console.log("Course Created:", { newCourseTitle, newCourseURL, newSymbol, newPrice, newRoyalty });
    setNewCourseTitle("");
    setNewCourseURL("");
    setNewSymbol("");
    setNewMaxSupply(0);
    setNewPrice(0);
    setNewRoyalty();
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tutor Dashboard</h1>
          <Button className="flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} />
            Create New Course
          </Button>
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
                  {sessionOffers.map((offer) => (
                    <Card key={offer.id} className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{offer.studentName}</h3>
                          <p className="text-sm text-gray-600">{offer.course}</p>
                          <p className="text-sm text-gray-600">{offer.dateTime}</p>
                        </div>
                        {offer.status === "pending" ? (
                          <div className="space-x-2">
                            <Button
                              onClick={() => handleSessionResponse(offer.id, true)}
                              className="bg-green-600 hover:bg-green-700"
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
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              offer.status === "accepted"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                          </span>
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
                  {courses.map((course) => (
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
                  {materials.map((material) => (
                    <Card key={material.id} className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          {material.type === "video" ? (
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

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
              <h2 className="text-xl font-bold">Create New Course</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="courseTitle" className="block text-sm font-medium">
                    Course Title
                  </label>
                  <input
                    id="courseTitle"
                    type="text"
                    value={newCourseTitle}
                    onChange={(e) => setNewCourseTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Enter course title"
                  />
                </div>
                <div>
                  <label htmlFor="courseURL" className="block text-sm font-medium">
                    Course URL
                  </label>
                  <input
                    id="courseURL"
                    type="text"
                    value={newCourseURL}
                    onChange={(e) => setNewCourseURL(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Enter course URL"
                  />
                </div>
                <div>
                  <label htmlFor="symbol" className="block text-sm font-medium">
                    Course Symbol
                  </label>
                  <input
                    id="symbol"
                    type="text"
                    value={newSymbol}
                    onChange={(e) => setNewSymbol(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Enter course symbol"
                  />
                </div>
                <div>
                  <label htmlFor="courseURL" className="block text-sm font-medium">
                    Course MaxSupply
                  </label>
                  <input
                    id="courseURL"
                    type="text"
                    value={newCourseURL}
                    onChange={(e) =>  setNewMaxSupply(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Enter course URL"
                  />
                </div>
                
                <div>
                  <label htmlFor="price" className="block text-sm font-medium">
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Enter course price"
                  />
                </div>
                <div>
                  <label htmlFor="royalty" className="block text-sm font-medium">
                    Royalty
                  </label>
                  <input
                    id="royalty"
                    type="text"
                    value={newRoyalty}
                    onChange={(e) => setNewRoyalty(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Enter royalty percentage"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button
  onClick={handleContract}
  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl"
>
  Create
</Button>

              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TutorProfile;
