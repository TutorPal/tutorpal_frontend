"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { formatUnits } from 'viem'
import { formatAddress } from '@/utils/formatAddress'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from './ui/badge'
import { Clock, DollarSign, Star, Users } from 'lucide-react'


// interface ICourse {
//     courseId: string | number;
//     title: string;
//     instructor: string;
//     price: string | number;

// }
interface ICourse {
    title: string,
    symbol: string,
    metadataURI: string,
    instructor: string,
    royalties: number, // 5%
    maxSupply: number,
    price: string | number, // 0.05 ETH in wei
    totalMinted: number,
    timestamp: number,
    // course: {
    //   description: "Learn the fundamentals of blockchain technology and its applications.",
    //   duration: "6 weeks",
    //   level: "Beginner"
    // },
    // rating: 4
}

const CourseCard = ({ course, index }:{ course: any, index: any }) => {
  return (
    <>

        <Card key={index} className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
            <CardHeader className="bg-gradient-to-br from-teal-500/10 to-emerald-500/10 pb-4">
                <div className="flex justify-between items-start">
                <Badge variant="secondary" className="mb-2">
                    {course.symbol}
                </Badge>
                <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{course.rating}/5</span>
                </div>
                </div>
                <CardTitle className="text-xl font-bold line-clamp-2">{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3">
                {/* {course.course.description} */}
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                {/* <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-teal-500" />
                    {course.timestamp}
                </div> */}
                <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-teal-500" />
                    {formatAddress(course.instructor)}
                </div>
                </div>
            </CardContent>
            <CardFooter className="bg-gradient-to-br from-teal-500/5 to-emerald-500/5 flex justify-between items-center">
                <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1 text-teal-500" />
                <span className="font-bold">
                    {parseFloat(course.price) / 1e18} ETH
                </span>
                </div>
                <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
                Enroll Now
                </Button>
            </CardFooter>
        </Card>

        {/* <div key={course.id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
                <p className="mb-2">Instructor: {formatAddress(course.instructor)}</p>
                <p className="mb-4">Price: {formatUnits(course.price, 12)}</p>
                <Link href={`/courses/${course.courseId}`}>
                <Button>View Details</Button>
                </Link>
            </div> */}
    </>
  )
}

export default CourseCard