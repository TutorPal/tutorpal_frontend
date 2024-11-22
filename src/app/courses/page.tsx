import Navbar from '@/components/common/Navbar'
import { Navigation } from '@/components/navigation'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

// This would typically come from an API call to your smart contract
const mockCourses = [
  { id: 1, title: "Introduction to Blockchain", instructor: "0x1234...5678", price: "0.1 ETH" },
  { id: 2, title: "Advanced Solidity", instructor: "0x8765...4321", price: "0.2 ETH" },
]

export default function Courses() {
  return (
    <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Available Courses</h1>
        <Navigation />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.map((course) => (
            <div key={course.id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
                <p className="mb-2">Instructor: {course.instructor}</p>
                <p className="mb-4">Price: {course.price}</p>
                <Link href={`/courses/${course.id}`}>
                <Button>View Details</Button>
                </Link>
            </div>
            ))}
        </div>
        </div>
    </>
  )
}

