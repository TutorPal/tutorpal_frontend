"use client"
import ConsultationsPage from "@/components/common/Consultations";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { useContractInteraction } from "@/hooks/useContractInteraction";
import { useContractRead } from "@/hooks/useReadContract";
import { tutorPalMarketAddress } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useActiveAccount, useReadContract } from "thirdweb/react";

const Consultations = () => {

    const { tutorMarketContract } = useContractInteraction();
    const [loading, setLoading] = useState(false);
    const { data, isLoading, isError, error } = useContractRead(tutorMarketContract, 'function getUserProfile(address _user) external view', ["0x0f490D84DDd5E0A2881eF8F319664C7f8Fd6335C"]);
    const account = useActiveAccount();
    const router = useRouter();

    console.log("DATA", data)
    console.log("Account", account)

    useEffect(() => {
        setLoading(true)
        if(!account) {
            router.push('/')
        } else {
            setLoading(false);
        }

        // setLoading(false);
    }, [])

    // const { data, isLoading } = useReadContract({
    //     contract: tutorPalMarketAddress,
    //     method: "function tokenURI(uint256 tokenId) returns (string)",
    //     params: [1n], // type safe params
    //   });

    if(loading) {
        <div>
            <h1>Loading...</h1>
        </div>
    }

    if(isLoading) {
        <div>
            <h1>Loading...</h1>
        </div>
    }

  return (
    <>
    {loading ? 
        <>
        <div>
            <h1>Loading...</h1>
        </div>
        </> 
    : 
        <>
            <Navbar />
            {isError && <>
                <div className="text-red-500">
                    There was an Error
                    {JSON.stringify(error)}
                </div>
            </>}

            <div>
                {JSON.stringify(data)}
                {JSON.stringify(account)}
            </div>
            <ConsultationsPage />
            <Footer />
        </>
    }
    </>
  );
};

export default Consultations;
