"use client";

import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: any;

export const createCourse = async (
  title: string,
  symbol: string,
  metadataURI: string,
  maxSupply: number,
  price: number,
  royalty: number
): Promise<void> => {
  try {
    if (typeof window === "undefined" || !window.ethereum) {
      console.log("Ethereum wallet not found. Please install MetaMask.");
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const sdk = new ThirdwebSDK(signer);

    const contract = await sdk.getContract(
      "0xdAC17F958D2ee523a2206206994597C13D831ec7"
    );

    // Call the createCourse function
    const tx = await contract.call("createCourse", [
      title,
      symbol,
      metadataURI,
      maxSupply,
      ethers.utils.parseEther(price.toString()), // Converting price to wei
      royalty,
    ]);

    console.log("Course created successfully:", tx);
    return tx;
  } catch (error) {
    console.log("Error creating course:", error);
  }
};
