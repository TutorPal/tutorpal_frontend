// import { useState } from 'react'
// import { sendTransaction } from 'thirdweb'
// import {  } from 'thirdweb/react'
// import { useSendTransaction } from "thirdweb/react";

// export const useContractWrite = (contract: any) => {
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [txResult, setTxResult] = useState(null)

//   const { mutate: sendTransaction } = useSendTransaction();
 
// //   const onClick = async () => {
// //     const transaction = prepareContractCall({
// //       contract,
// //       method: "function mint(address to)",
// //       params: ["0x..."], // type safe params
// //     });
// //     sendTransaction(transaction);
// //   };
  
//   const write = async (functionName: string, args?: any[]) => {
//     if (!contract) return
    
//     try {
//       setLoading(true)
//       const tx = await sendTransaction({
//         contract,
//         method: functionName,
//         args: args || []
//       })
      
//       setTxResult(tx)
//       return tx
//     } catch (err) {
//       setError(err)
//       throw err
//     } finally {
//       setLoading(false)
//     }
//   }
  
//   return { write, loading, error, txResult }
// }