import { Metadata } from 'next'
import StudentProfile from '@/components/StudentProfile'
import Navbar from '@/components/common/Navbar'

export const metadata: Metadata = {
  title: 'Student Profile | TutorPal',
  description: 'View your appointments, attend live lessons, and manage your courses',
}

export default function StudentProfilePage() {
    return (
        <>
        <Navbar />
        <StudentProfile />
        </>
    )
}

