"use client"
import CourseCard from '@/components/CourseCard'
import Navbar from '@/components/common/Navbar'
// import { Navigation } from '@/components/navigation'
// import { Button } from "@/components/ui/button"
// import Link from 'next/link'
import { useReadContract } from 'wagmi'
import { tutorPalAbi } from '@/abi/tutorPalAbi'
import { tutorPalMarketAddress } from '@/utils/constants'
// import { useState } from 'react'
import { useCourses } from '@/hooks/useCourses'
import { useState } from 'react'

// This would typically come from an API call to your smart contract
const mockCourses = [
  { id: 1, title: "Introduction to Blockchain", instructor: "0x1234...5678", price: "0.1 ETH" },
  { id: 2, title: "Advanced Solidity", instructor: "0x8765...4321", price: "0.2 ETH" },
]

export default function Courses() {

    // const [courses, setCourses] = useState<string[]>([]);
    // const { courses, isLoading } = useCourses(tutorPalAbi, tutorPalMarketAddress);

    // useWatchContractEvent({
    //     address: tutorPalMarketAddress,
    //     abi: tutorPalAbi,
    //     eventName: 'CourseListed',
    //     onLogs(logs) {
    //         setCourses((prevEvents) => [...prevEvents, ...logs]);
    //       console.log('New logs!', logs)
    //     },
    // })

    // const { data, isLoading } = useReadContract({
    //     abi: tutorPalAbi,
    //     address: tutorPalMarketAddress,
    //     functionName: 'getAllCourses',
    // })

    const { data:courseId, isLoading:isCourseIdLoading } = useReadContract({
      abi: tutorPalAbi,
      address: tutorPalMarketAddress,
      functionName: 'createCourseCount',
  })

  const { data: course, isLoading:isCourseLoading } = useReadContract({
    abi: tutorPalAbi,
    address: tutorPalMarketAddress,
    functionName: 'getCoursebyId',
    args: [Number(0)]
})
console.log("COURSE", course)

// Function to convert BigInt values to regular numbers/strings
// const serializeCourseData = (course:any) => {
//   const serializedCourse = {} as any;
//   for (const [key, value] of Object.entries(course)) {
//     if (typeof value === 'bigint') {
//       serializedCourse[key] = value.toString();
//     } else {
//       serializedCourse[key] = value;
//     }
//   }
//   return serializedCourse;
// };

  return (
    <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Available Courses</h1>
        {/* <Navigation /> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* {JSON.stringify(courses)} */}
            {/* {isLoading && <div>Loading..</div>} */}
            {isCourseIdLoading && <div>id loading..</div>}
            {/* {JSON.stringify(Number(courseId))} */}
            {/* {isCourseLoading && <div>Course Loading</div>} */}
            {/* {JSON.stringify(courses)} */}
            {/* {mockCourses.map((course, i) => ( */}
            {isCourseLoading ? <div>Loading...</div> :
                <CourseCard course={course} />
            }
              {/* // ))} */}
        </div>
        </div>
    </>
  )
}
// <div key={course.id} className="bg-white p-6 rounded-lg shadow-md">
//     <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
//     <p className="mb-2">Instructor: {course.instructor}</p>
//     <p className="mb-4">Price: {course.price}</p>
//     <Link href={`/courses/${course.id}`}>
//     <Button>View Details</Button>
//     </Link>
// </div>

