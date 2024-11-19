"use client";
import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import { Course } from "@/utils/types";
import { createCourse } from "@/utils/createCourse";
import { fetchCourseEvents } from "@/utils/fetchCourseEvents";

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newCourse: Course) => void;
}

const CreateCourseModal: React.FC<CreateCourseModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    symbol: "",
    metadataURI: "",
    maxSupply: "",
    price: "",
    royalty: "",
  });

  const fetchCourses = async () => {
    const courseData = await fetchCourseEvents();
    if (courseData) setCourses(courseData.data || []);
  };

  const handleCreateCourse = async () => {
    const { title, symbol, metadataURI, maxSupply, price, royalty } = formData;
    const newCourse: Course = {
      title,
      description: "",
      image: "",
      instructor: "",
      duration: 0,
      price: Number(price),
      capacity: Number(maxSupply),
    };
    await createCourse(
      title,
      symbol,
      metadataURI,
      Number(maxSupply),
      Number(price),
      Number(royalty)
    );
    onCreate(newCourse);
    await fetchCourses();
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const modal = document.getElementById("create-course-modal");
      if (modal && !modal.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="create-course-modal"
      className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50"
    >
      <div className="bg-white p-8 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
        <h1 className="text-2xl font-bold mb-6">Course Manager</h1>

        <button
          onClick={fetchCourses}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-6"
        >
          Fetch Courses
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course: Course, index: number) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>

        <div className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Create New Course</h2>
          <input
            type="text"
            placeholder="Title"
            className="border p-2 rounded w-full"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Symbol"
            className="border p-2 rounded w-full"
            onChange={(e) =>
              setFormData({ ...formData, symbol: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Metadata URI"
            className="border p-2 rounded w-full"
            onChange={(e) =>
              setFormData({ ...formData, metadataURI: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Max Supply"
            className="border p-2 rounded w-full"
            onChange={(e) =>
              setFormData({ ...formData, maxSupply: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price (ETH)"
            className="border p-2 rounded w-full"
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Royalty (bps)"
            className="border p-2 rounded w-full"
            onChange={(e) =>
              setFormData({ ...formData, royalty: e.target.value })
            }
          />
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handleCreateCourse}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Create Course
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourseModal;
