import { Course } from "@/utils/types";
import Image from "next/image";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <Image
        src={course.image}
        alt={course.title}
        layout="fill"
        objectFit="cover"
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{course.title}</h2>
        <p className="text-sm text-gray-600 mb-4">{course.description}</p>
        <p className="text-sm text-gray-500">
          <strong>Instructor:</strong> {course.instructor}
        </p>
        <p className="text-sm text-gray-500">
          <strong>Duration:</strong> {course.duration} hours
        </p>
        <p className="text-sm text-gray-500">
          <strong>Capacity:</strong> {course.capacity} students
        </p>
        <p className="text-lg font-semibold text-blue-600 mt-4">
          ${course.price}
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
