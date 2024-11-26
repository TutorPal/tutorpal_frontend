"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
// import { Star, Clock, Users, DollarSign } from 'lucide-react'
import { useGetAllCourses } from "@/hooks/useGetAllCourses"
import CourseCard from "@/components/CourseCard"

// Mock data based on the CourseStruct
// const courses = [
//   {
//     title: "Introduction to Blockchain",
//     symbol: "BTC101",
//     metadataURI: "https://example.com/metadata/btc101",
//     instructor: "0x1234...5678",
//     royalties: 500, // 5%
//     maxSupply: 100,
//     price: "50000000000000000", // 0.05 ETH in wei
//     totalMinted: 75,
//     timestamp: 1636000000,
//     course: {
//       description: "Learn the fundamentals of blockchain technology and its applications.",
//       duration: "6 weeks",
//       level: "Beginner"
//     },
//     rating: 4
//   },
//   {
//     title: "Smart Contract Development",
//     symbol: "ETH201",
//     metadataURI: "https://example.com/metadata/eth201",
//     instructor: "0xabcd...efgh",
//     royalties: 750, // 7.5%
//     maxSupply: 50,
//     price: "100000000000000000", // 0.1 ETH in wei
//     totalMinted: 30,
//     timestamp: 1637000000,
//     course: {
//       description: "Master the art of writing and deploying smart contracts on Ethereum.",
//       duration: "8 weeks",
//       level: "Intermediate"
//     },
//     rating: 5
//   },
//   // Add more mock courses as needed
// ]

export default function CoursesPage() {

  const { courses, isLoading, totalCourses } = useGetAllCourses();

  console.log("COURSE", courses)
  console.log("TOTAL", totalCourses)

  return (
    <div className="flex min-h-screen bg-white flex-col">
      <Header />
      <main className="flex-1 mx-auto">
        <section className="container py-12 md:py-24">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none mb-8 bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
            Explore Our Courses
          </h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? <div>Loading...</div> : 
              <>
                {courses.map((course, index) => (

                  <CourseCard key={course?.courseId} index={index} course={course} />
                  // <Card key={index} className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
                  //   <CardHeader className="bg-gradient-to-br from-teal-500/10 to-emerald-500/10 pb-4">
                  //     <div className="flex justify-between items-start">
                  //       <Badge variant="secondary" className="mb-2">
                  //         {course.symbol}
                  //       </Badge>
                  //       <div className="flex items-center">
                  //         <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  //         <span className="text-sm font-medium">{course.rating}/5</span>
                  //       </div>
                  //     </div>
                  //     <CardTitle className="text-xl font-bold line-clamp-2">{course.title}</CardTitle>
                  //   </CardHeader>
                  //   <CardContent className="flex-grow">
                  //     <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3">
                  //       {course.course.description}
                  //     </p>
                  //     <div className="grid grid-cols-2 gap-2 text-sm">
                  //       <div className="flex items-center">
                  //         <Clock className="w-4 h-4 mr-2 text-teal-500" />
                  //         {course.course.duration}
                  //       </div>
                  //       <div className="flex items-center">
                  //         <Users className="w-4 h-4 mr-2 text-teal-500" />
                  //         {course.course.level}
                  //       </div>
                  //     </div>
                  //   </CardContent>
                  //   <CardFooter className="bg-gradient-to-br from-teal-500/5 to-emerald-500/5 flex justify-between items-center">
                  //     <div className="flex items-center">
                  //       <DollarSign className="w-4 h-4 mr-1 text-teal-500" />
                  //       <span className="font-bold">
                  //         {parseFloat(course.price) / 1e18} ETH
                  //       </span>
                  //     </div>
                  //     <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
                  //       Enroll Now
                  //     </Button>
                  //   </CardFooter>
                  // </Card>
                ))}
              </>
            }
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}




// "use client"
// import CourseCard from '@/components/CourseCard'
// import Navbar from '@/components/common/Navbar'
// // import { Navigation } from '@/components/navigation'
// // import { Button } from "@/components/ui/button"
// // import Link from 'next/link'
// import { useReadContract } from 'wagmi'
// import { tutorPalAbi } from '@/abi/tutorPalAbi'
// import { tutorPalMarketAddress } from '@/utils/constants'
// // import { useState } from 'react'
// import { useCourses } from '@/hooks/useCourses'
// import { useState } from 'react'
// import { useGetAllCourses } from '@/hooks/useGetAllCourses'

// export default function Courses() {
//     const { courses, isLoading, totalCourses } = useGetAllCourses();


//     const { data:courseId, isLoading:isCourseIdLoading } = useReadContract({
//       abi: tutorPalAbi,
//       address: tutorPalMarketAddress,
//       functionName: 'createCourseCount',
//   })

// console.log("COURSE", courses)

//   return (
//     <>
//         <Navbar />
//         <div className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold mb-8">Available Courses</h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//             {JSON.stringify(Number(totalCourses))}

//             {isLoading ? <div>Loading...</div> :
//               <div>
//                 {courses.map((course) => (
  
//                   <CourseCard course={course} />
//                 ))}
//               </div>
//             }
//         </div>
//         </div>
//     </>
//   )
// }

