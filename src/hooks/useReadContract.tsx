// "use client"
// // import { useState, useEffect } from 'react'
// import { useReadContract } from 'thirdweb/react'

// export const useContractRead = (contract: any, functionName: string, args?: any[]) => {

//   const { data, isLoading, isError, error } = useReadContract({
//     contract,
//     method: `${functionName}`,
//     params: args || [], // type safe params
//   });

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       if (!contract) return
      
// //       try {
// //         setLoading(true)
// //         const result = await readContract({
// //           contract,
// //           method: functionName,
// //           args: args || []
// //         })
// //         setData(result)
// //       } catch (err) {
// //         setError(err)
// //       } finally {
// //         setLoading(false)
// //       }
// //     }
    
// //     fetchData()
// //   }, [contract, functionName, JSON.stringify(args)])
  
//   return { data, isLoading, isError, error }
// }