"use client"
import Footer from "@/components/common/Footer";
import Hero from "@/components/common/Hero";
import Navbar from "@/components/common/Navbar";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import Cookies from 'js-cookie';
import { useAccount } from 'wagmi'

// Separate component to handle data fetching and effects
const HomeContent = () => {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const account = useAccount();
  
  useEffect(() => {
    if (searchParams.get('showConnectWallet') === 'true') {
      toast({
        title: "Authentication Required",
        description: "Please connect your wallet to access this page.",
        variant: "destructive",
      });
    }
  }, [searchParams, toast]);

  useEffect(() => {
    if (account) {
      Cookies.set('wallet-connected', 'true', { expires: 7 });
      const redirectTo = searchParams.get('redirect') || '/';
      router.push(redirectTo);
    }
  }, [account, router, searchParams]);

  return (
    <>
      <Navbar />
      <Hero />
      <Footer />
    </>
  );
};

// Main component with proper Suspense boundary
const Home = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
};

export default Home;





// "use client"
// import Footer from "@/components/common/Footer";
// import Hero from "@/components/common/Hero";
// import Navbar from "@/components/common/Navbar";
// import { useToast } from "@/hooks/use-toast";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Suspense, useEffect } from "react";
// import Cookies from 'js-cookie';
// // import { useActiveAccount } from "thirdweb/react";
// import { useAccount } from 'wagmi'

// const Home = () => {

//   const { toast } = useToast();
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   // const account = useActiveAccount();
//   const account = useAccount();
  
//   useEffect(() => {
//     // Show toast when redirected
//     if (searchParams.get('showConnectWallet') === 'true') {
//       toast({
//         title: "Authentication Required",
//         description: "Please connect your wallet to access this page.",
//         variant: "destructive",
//       });
//     }
//   }, [searchParams, toast]);

//   useEffect(() => {
//     // When wallet is connected
//     if (account) {
//       // Set cookie to track wallet connection
//       Cookies.set('wallet-connected', 'true', { expires: 7 }); // Expires in 7 days
      
//       // Get redirect URL from query params or default to home
//       const redirectTo = searchParams.get('redirect') || '/';
//       router.push(redirectTo);
//     }
//   }, [account, router, searchParams]);

//   return (
//     <>
//     <Suspense fallback={<div>Loading...</div>}>
//       <Navbar />
//       <Hero />
//       <Footer />
//     </Suspense>
//     </>
//   );
// };

// export default Home;
