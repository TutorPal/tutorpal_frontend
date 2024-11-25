import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";

export const useCourses = (tutorPalAbi: any, tutorPalMarketAddress: any) => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    // Get the total count of courses
    const { data: courseCount } = useReadContract({
      abi: tutorPalAbi,
      address: tutorPalMarketAddress,
      functionName: 'createCourseCount',
    });
  
    // Function to convert BigInt values to regular numbers/strings
    const serializeCourseData = (course: any) => {
      const serializedCourse = {} as any;
      for (const [key, value] of Object.entries(course)) {
        if (typeof value === 'bigint') {
          serializedCourse[key] = value.toString();
        } else {
          serializedCourse[key] = value;
        }
      }
      return serializedCourse;
    };
  
    // Multiple course read contract
    // const { data: coursesData } = useReadContract({
    //   abi: tutorPalAbi,
    //   address: tutorPalMarketAddress,
    //   functionName: 'getCoursebyId',
    //   args: [0], // Start with first course
    // });
  
    const fetchAllCourses = async () => {
      if (!courseCount) return;

      setIsLoading(true);
      try {
        const count = Number(courseCount);
        const fetchedCourses = [] as any;
        
        for (let i = 0; i < count; i++) {
          const { data: course, isLoading, isSuccess } = useReadContract({
              abi: tutorPalAbi,
              address: tutorPalMarketAddress,
              functionName: 'getCoursebyId',
              args: [i]
          });

          if (course && !isLoading && isSuccess) {
            fetchedCourses.push({
              ...course,
              id: i.toString()
            });
          }
        }
        
        setCourses(fetchedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setIsLoading(false);
      }
    };
    useEffect(() => {
  
      fetchAllCourses();
    }, [courseCount, tutorPalAbi, tutorPalMarketAddress]);
  
    return { courses, isLoading };
  };