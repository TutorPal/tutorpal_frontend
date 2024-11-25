"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { formatUnits } from 'viem'

interface ICourse {
    id: string | number;
    title: string;
    instructor: string;
    price: string | number;

}

const CourseCard = ({ course }:{ course: any }) => {
  return (
    <>
        <div key={course.id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
                <p className="mb-2">Instructor: {course.instructor}</p>
                <p className="mb-4">Price: {formatUnits(course.price, 12)}</p>
                <Link href={`/courses/${course.id}`}>
                <Button>View Details</Button>
                </Link>
            </div>
    </>
  )
}

export default CourseCard