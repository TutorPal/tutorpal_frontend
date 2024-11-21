"use client"
import ConsultationsPage from "@/components/common/Consultations";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
// import { useContractInteraction } from "@/hooks/useContractInteraction";
// import { useContractRead } from "@/hooks/useReadContract";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { useActiveAccount } from "thirdweb/react";
import { useAccount } from "wagmi";

const Consultations = () => {

    // const { tutorMarketContract } = useContractInteraction();
    const [loading, setLoading] = useState(false);
    const account = useAccount();
    // const address = account?.address;

    // const { data, isLoading, isError, error } = useContractRead(tutorMarketContract, 'function getUserProfile(address _user) external view', [address]);
    const router = useRouter();

    // console.log("DATA", data)
    console.log("Account", account)

    useEffect(() => {
        setLoading(true)
        if(!account?.address) {
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
            {/* {isError && <>
                <div className="text-red-500">
                    There was an Error
                    {JSON.stringify(error)}
                </div>
            </>} */}

            <div>
                {/* {JSON.stringify(data)} */}
                {/* {JSON.stringify(account)} */}
            </div>
            <ConsultationsPage />
            <Footer />
        </>
    }
    </>
  );
};

export default Consultations;
