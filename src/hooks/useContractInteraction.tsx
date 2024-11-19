import { getContract } from "thirdweb";
import { sessionBookingAddress, tutorPalMarketAddress } from "../utils/constants";
import { thirdwebFrontendClient } from "@/utils/thirdweb/client";
import { defineChain } from "thirdweb/chains";

export const useContractInteraction = () => {
  // const { contract } = useContract(contractAddress);

  const tutorMarketContract = getContract({
    client: thirdwebFrontendClient,
    address: tutorPalMarketAddress,
    chain: defineChain(4202),
  });

  const sessionBookingContract = getContract({
    client: thirdwebFrontendClient,
    address: sessionBookingAddress,
    chain: defineChain(4202),
  });

  return { tutorMarketContract, sessionBookingContract };
};
