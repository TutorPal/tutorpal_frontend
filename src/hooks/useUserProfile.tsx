// hooks/useUserProfile.ts
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { useQueryClient } from "@tanstack/react-query";
// import { useState, useEffect } from "react";
import { useContractInteraction } from "./useContractInteraction";
import { useContractRead } from "./useReadContract";

import { prepareContractCall } from "thirdweb";
// import { sepolia } from "thirdweb/chains";

export enum RoleType {
  NotRegistered,
  Student,
  Instructor
}

interface UserProfile {
  displayName: string;
  roleType: RoleType;
  isRegistered: boolean;
}

const { tutorMarketContract } = useContractInteraction();

export function useUserProfile() {
    const account = useActiveAccount();
  const address = account?.address;
  const queryClient = useQueryClient();
//   const { contract } = useContractR(CONTRACT_ADDRESS);

// const {data} = useContractRead(tutorMarketContract, "function getUserProfile(address _user) external view", [address])

  
  // Using your custom hook to read user profile
  const { 
    data: profileData, 
    isLoading, 
    isError: error 
  } = useContractRead(
    tutorMarketContract,
    "function getUserProfile(address _user) external view",
    address ? [address] : undefined
  );

  // Parse the returned data into our UserProfile type
  const profile: any | null = profileData ? {
    displayName: profileData[0],
    roleType: profileData[1],
    isRegistered: profileData[2]
  } : null;

  const registerUser = async (displayName: string, roleType: RoleType) => {
    // if (!contract || !address) return;

    // try {
    //   const tx = await contract.write.registerUser([displayName, roleType]);
    //   await tx.wait(); // Wait for transaction confirmation
    //   return tx;
    // } catch (error) {
    //   console.error("Error registering user:", error);
    //   throw error;
    // }

    const { mutate: sendTx, data: transactionResult } = useSendTransaction();
 
    const transaction = prepareContractCall({
        contract: tutorMarketContract,
        method: "function registerUser(string calldata _displayName, RoleType _roleType) external",
        params: [displayName, roleType],
    });

    sendTx(transaction);

    return transactionResult;
  };

  return {
    profile,
    isLoading,
    error,
    registerUser,
  };
}