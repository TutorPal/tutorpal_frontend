"use client"
import Footer from "@/components/common/Footer";
import Hero from "@/components/common/Hero";
import Navbar from "@/components/common/Navbar";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { useActiveAccount } from "thirdweb/react";

const Home = () => {

  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const account = useActiveAccount();
  
  useEffect(() => {
    // Show toast when redirected
    if (searchParams.get('showConnectWallet') === 'true') {
      toast({
        title: "Authentication Required",
        description: "Please connect your wallet to access this page.",
        variant: "destructive",
      });
    }
  }, [searchParams, toast]);

  useEffect(() => {
    // When wallet is connected
    if (account) {
      // Set cookie to track wallet connection
      Cookies.set('wallet-connected', 'true', { expires: 7 }); // Expires in 7 days
      
      // Get redirect URL from query params or default to home
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

export default Home;
