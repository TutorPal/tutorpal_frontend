"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { formatUnits, parseEther } from 'viem'
import { formatAddress } from '@/utils/formatAddress'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from './ui/badge'
import { Clock, DollarSign, Star, Users } from 'lucide-react'
import { useWriteContract } from 'wagmi'
import { tutorPalMarketAddress } from '@/utils/constants'
import { tutorPalAbi } from '@/abi/tutorPalAbi'
import { toast } from '@/hooks/use-toast'
import { waitForTransactionReceipt } from '@wagmi/core'
import { config } from '@/utils/config'
import { motion } from "framer-motion"
import { simulateContract } from 'viem/actions'
// import { waitForTransactionReceipt } from 'viem/actions'


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
    //   description: "",
    //   duration: "6 weeks",
    //   level: "Beginner"
    // },
    // rating: 4
}

const CourseCard = ({ course, index }:{ course: any, index: any }) => {

    // function buyCourse(uint256 _courseId) external payable {
    // const [courseId, setCourseId] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const { writeContract, isPending, isSuccess, writeContractAsync } = useWriteContract();

    const handleBuyCourse = async (courseId:number, price:any) => {
        try {
            setIsLoading(true)
            // const {hash} = writeContract({
            //   address: tutorPalMarketAddress,
            //   abi: tutorPalAbi,
            //   functionName: 'buyCourse',
            //   args: [BigInt(courseId)]
            // });
console.log("Here first")
            const priceString = price.toString()
            console.log(priceString)

            const hash = await writeContractAsync({
                address: tutorPalMarketAddress,
                abi: tutorPalAbi,
                functionName: 'buyCourse',
                args: [BigInt(courseId)],
                value: priceString,
                gas: BigInt('500000'),
  
            })
            console.log("Here second")

            // Show initial transaction sent toast
            toast({
                title: "Transaction Sent",
                description: "Your purchase is being processed...",
            })

            try {
                // Wait for transaction confirmation
                const receipt = await waitForTransactionReceipt(config, { hash });
                console.log("Receipt", receipt);
              
                
                if (receipt.status === 'success') {
                  toast({
                    title: "Purchase Successful!",
                    description: "You have successfully purchased the course.",
                  });
                } 
                
                else if (receipt.status === 'reverted') {
                  toast({
                    title: "Transaction Reverted",
                    description: "Your purchase could not be completed. Please try again.",
                  });
                } 
                
                else {
                  toast({
                    title: "Transaction Failed",
                    description: `Unexpected status: ${receipt.status}. Please contact support.`,
                  });
                }
              } catch (error) {
                
                console.error("Transaction error:", error);
                toast({
                  title: "Error",
                  description: "An unexpected error occurred during the transaction.",
                });
              }


            // const receipt = await waitForTransactionReceipt(config, { hash });

            // if (receipt.status === 'success') {
            //     toast({
            //       title: "Purchase Successful!",
            //       description: "You have successfully purchased the course.",
            //     })
            // } else {
            //     toast({
            //       title: "Transaction Failed",
            //       description: "Your purchase could not be completed. Please try again.",
            //     })
            // }

        
        } catch (error) {

            console.log("ERRORRRR", error)
            console.error('Transaction error:', error)

            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
            })

        } finally {
            setIsLoading(false)
        }
    };

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
            <CardFooter className="bg-gradient-to-br from-teal-500/5 to-emerald-500/5 flex justify-between items-center py-2">
                <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1 text-teal-500" />
                <span className="font-bold">
                    {parseFloat(course.price) / 1e18} ETH
                </span>
                </div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >

                    <Button disabled={isLoading} onClick={() => handleBuyCourse(course.courseId, course.price)} className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
                    {isLoading ? (
                        <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                    ) : (
                        'Buy Course'
                    )}
                    
                    </Button>
                </motion.div>
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