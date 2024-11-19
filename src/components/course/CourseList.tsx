"use client";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { Course } from "@/utils/types";
import CreateCourseModal from "./CreateCourseModal";

const fetchCourseEvents = async (): Promise<Course[]> => {
  const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
  const courseContractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

  try {
    const response = await fetch(
      `https://4202.insight.thirdweb.com/v1/${clientId}/events/${courseContractAddress}/CourseListed(string,string,string,address,uint16,uint256,uint256,uint256)`
    );
    const courses: Array<
      [string, string, string, string, number, number, number]
    > = await response.json();

    return courses.map((course) => ({
      title: course[0],
      description: course[1],
      image: course[2],
      instructor: course[3],
      duration: course[4],
      price: course[5],
      capacity: course[6],
    }));
  } catch (error) {
    console.log("Error fetching courses:", error);
    return [];
  }
};

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadCourses = async () => {
      const data = await fetchCourseEvents();
      setCourses(data);
      setLoading(false);
    };
    loadCourses();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading courses...</p>;
  }

  const handleCreateCourse = (newCourse: Course) => {
    setCourses([...courses, newCourse]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={() => setModalOpen(true)}
        >
          Create Course
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
      <CreateCourseModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateCourse}
      />
    </div>
  );
};

export default CourseList;
