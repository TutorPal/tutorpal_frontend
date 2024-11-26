import { useEffect, useState } from 'react';
import { 
  useReadContract, 
  useReadContracts, 
  useWatchContractEvent,
  usePublicClient 
} from 'wagmi';
import { tutorPalAbi } from '../abi/tutorPalAbi'; // Your contract ABI
import { multicall } from '@wagmi/core'
import { tutorPalMarketAddress } from '@/utils/constants';
import { decodeFunctionResult, encodeFunctionData, multicall3Abi } from 'viem'
import { multicallAbi } from '@/abi/multicall';

const MULTICALL_CONTRACT_ADDRESS="0x8468D5dd0e61920C65744b6BC42f2D13D37fD759";

// At the top of your hook, define an interface for your course type
interface Course {
    courseId: number;
    title: string;
    symbol: string;
    instructor: string;
    price: bigint;
    metadataURI: string;
    timestamp: bigint;
  }

export function useGetAllCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const publicClient = usePublicClient();

  // Get the total course count
  const { data: courseCount } = useReadContract({
    abi: tutorPalAbi,
    address: tutorPalMarketAddress,
    functionName: 'createCourseCount',
  });

  // Prepare multicall for all courses
//   const courseQueries = courseCount 
//     ? Array.from({ length: Number(courseCount) }, (_, i) => ({
//         address: process.env.NEXT_PUBLIC_TUTORPAL_ADDRESS,
//         abi: tutorPalAbi,
//         functionName: 'getCoursebyId',
//         args: [BigInt(i)],
//       }))
//     : [];

  // Execute multicall to get all courses
//   const { data: coursesData } = useReadContracts({
//     contracts: courseQueries,
//   });

  // Watch for new course creation events
  useWatchContractEvent({
    address: tutorPalMarketAddress,
    abi: tutorPalAbi,
    eventName: 'CourseCreated', // Assuming this is your event name
    // onLogs() {
    //   // Refetch when new course is created
    //   refetch();
    // },
  });

  // Process the courses data
//   useEffect(() => {
//     if (!coursesData) return;

//     const processedCourses = coursesData
//       .map((result, index) => {
//         if (!result.status === 'success' || !result.result) return null;
        
//         const course = result.result;
//         return {
//           courseId: index,
//           // Map your course struct fields here
//           // This is an example - adjust according to your CourseStruct
//           name: course.name,
//           description: course.description,
//           instructor: course.instructor,
//           price: course.price,
//           // ... add other fields as needed
//         };
//       })
//       .filter(Boolean); // Remove any null entries

//     setCourses(processedCourses);
//     setIsLoading(false);
//   }, [coursesData]);

useEffect(() => {
    async function fetchCourses() {
        console.log("STARTINNG")
        if (!courseCount || !publicClient) return;
        setIsLoading(true);
console.log("BEFORE MULTICALL TRY")
      try {
        // Prepare calls for multicall
        const calls = Array.from({ length: Number(courseCount) }, (_, i) => ({
          target: tutorPalMarketAddress as `0x${string}`,
        //   allowFailure: true,
          callData: encodeFunctionData({
            abi: tutorPalAbi,
            functionName: 'getCoursebyId',
            args: [BigInt(i)]
          })
        }));

        console.log("CALLS", calls)
console.log("Before publicClient simulation")

        type MulticallResult = {
            success: boolean;
            returnData: string;
        };

        // Execute multicall
        const result:any = await publicClient?.simulateContract({
          address: MULTICALL_CONTRACT_ADDRESS as `0x${string}`,
          abi: multicallAbi,
          functionName: 'tryAggregate',
          args: [false, calls]
        });
        console.log("After publicClient simulation")
        console.log("RESULT", result)

        // Process results
        // const processedCourses = results?.map((result:any, index:any) => {
        //     if (!result[0]) return null; // Skip failed calls

        //     try {
        //       const decodedResult:any = decodeFunctionResult({
        //         abi: tutorPalAbi,
        //         functionName: 'getCoursebyId',
        //         data: result[1]
        //       });

        //       return {
        //         courseId: index,
        //         // Map your course struct fields here
        //         // Adjust according to your CourseStruct
        //         title: decodedResult.title,
        //         symbol: decodedResult.symbol,
        //         instructor: decodedResult.instructor,
        //         price: decodedResult.price,
        //         metadataURI: decodedResult.metadataURI,
        //         timestamp: decodedResult.timestamp
        //         // ... add other fields as needed
        //       };
        //     } catch (error) {
        //       console.error(`Error decoding result for course ${index}:`, error);
        //       return null;
        //     }
        //   })
        //   .filter(Boolean); // Remove null entries

        // First check if result exists and add type assertion
        if (!result) {
            console.error('No result from multicall');
            return;
        }

        let multicallResults = (result as unknown as [boolean, string][]);

        // Log raw results to verify data
        console.log('Multicall raw results:', multicallResults);

        multicallResults = result ? result.result?.map((entry: { success: boolean; returnData: string }) => [entry.success, entry.returnData]) : [];

        // Process results
      const processedCourses = multicallResults.map((res: [any, any], index: any) => {
        const [success, returnData] = res;
        console.log("RETURN DATA", returnData)
        if (!success) {
            console.log(`Failed to fetch course ${index}`);
            return null;
        }

        try {
          const decodedResult:any = decodeFunctionResult({
            abi: tutorPalAbi,
            functionName: 'getCoursebyId',
            data: returnData
          });

          // Log each decoded result
          console.log(`Decoded course ${index}:`, decodedResult);

          return {
            courseId: index,
            // Map your course struct fields here
            // Adjust according to your CourseStruct
            title: decodedResult.title,
            symbol: decodedResult.symbol,
            instructor: decodedResult.instructor,
            price: decodedResult.price,
            metadataURI: decodedResult.metadataURI,
            timestamp: decodedResult.timestamp
            // ... add other fields as needed
          };
        } catch (error) {
          console.error(`Error decoding result for course ${index}:`, error);
          return null;
        }
      })
      .filter((course): course is Course => course !== null); // Remove null entries
      console.log("PROCESSED COURSES", processedCourses)

        // setCourses(processedCourses);
        setCourses(processedCourses.filter((course): course is Course => course !== null));
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setIsLoading(false);
      }
    }
    if(courseCount) {
        fetchCourses();
    }
  }, [courseCount, publicClient]);

  return {
    courses,
    isLoading,
    totalCourses: courseCount ? Number(courseCount) : 0
  };
}