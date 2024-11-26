'use client'

import { useState } from 'react'
import { NavBar } from '@/components/common/session-navbar'
import { SessionDetails } from '@/components/common/session-details'
import { useToast } from '@/hooks/use-toast'
import { Calendar } from '@/components/common/session-calender'

interface BookingPageProps {
  params: {
    tutorId: string
  }
}

export default function BookingPage({ params }: BookingPageProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const { toast } = useToast()
  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleConfirm = async () => {
    if (!selectedDate) return
    
    try {
      const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
      if (!CONTRACT_ADDRESS) throw new Error('Contract address not found')
      
    //   await createBooking(
    //     CONTRACT_ADDRESS,
    //     parseInt(params.tutorId),
    //     selectedDate.toISOString(),
    //     '0.03' // 30 USD in ETH
    //   )
      
      toast({
        title: 'Booking confirmed!',
        description: 'Your session has been successfully booked.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create booking. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container py-10">
        <h1 className="text-4xl font-bold mb-10">Book a session with John</h1>
        
        <div className="grid gap-10 md:grid-cols-2">
          <Calendar 
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
          />
          
          {selectedDate && (
            <SessionDetails
              date={selectedDate}
              price={30}
              onConfirm={handleConfirm}
            />
          )}
        </div>
      </main>
    </div>
  )
}

