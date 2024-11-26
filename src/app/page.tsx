import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Image from "next/image"
import { BookOpen, Users, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1 mx-auto">
        {/* Hero Section */}
        <section className="container py-12 md:py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
                Unlock Your Learning Potential with TutorPal
              </h1>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Experience the future of education with our decentralized learning platform
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
                  Get Started
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
            <div className="mx-auto aspect-video overflow-hidden rounded-xl border bg-gradient-to-br from-teal-50 to-emerald-50">
              <Image
                alt="Hero"
                className="object-cover"
                height="400"
                src="/hero-image.jpg"
                width="600"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-12 md:py-24" id="features">
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-emerald-500/10" />
              <CardContent className="p-6">
                <BookOpen className="h-12 w-12 text-teal-500" />
                <h3 className="mt-4 text-xl font-bold">Enhanced Security</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Blockchain-powered security for your educational resources
                </p>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-emerald-500/10" />
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-teal-500" />
                <h3 className="mt-4 text-xl font-bold">Decentralized Learning</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Connect with tutors and learners globally
                </p>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-emerald-500/10" />
              <CardContent className="p-6">
                <Zap className="h-12 w-12 text-teal-500" />
                <h3 className="mt-4 text-xl font-bold">Smart Contracts</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Automated and transparent payment system
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="container py-12 md:py-24 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/50 dark:to-emerald-950/50" id="workflow">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xl">
                  {step}
                </div>
                <Image
                  alt={`Workflow Step ${step}`}
                  className="rounded-lg"
                  height="200"
                  src="/placeholder.svg"
                  width="300"
                />
                <h3 className="text-xl font-bold">Step {step}</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Description for step {step}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container py-12 md:py-24" id="testimonials">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">What Our Users Say</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((testimonial) => (
              <Card key={testimonial} className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5" />
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500" />
                    <div>
                      <h4 className="font-bold">User Name</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Student</p>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-500 dark:text-gray-400">
                    Great learning experience with TutorPal!
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-12 md:py-24 text-center">
          <div className="mx-auto max-w-3xl space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Join Our Learning Community Today
            </h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Start your decentralized learning journey with TutorPal
            </p>
            <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
              Get Started Now
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}



// "use client"
// import Footer from "@/components/common/Footer";
// import Hero from "@/components/common/Hero";
// import Navbar from "@/components/common/Navbar";
// import { useToast } from "@/hooks/use-toast";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Suspense, useEffect } from "react";
// import Cookies from 'js-cookie';
// import { useAccount } from 'wagmi'

// // Separate component to handle data fetching and effects
// const HomeContent = () => {
//   const { toast } = useToast();
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const account = useAccount();
  
//   useEffect(() => {
//     if (searchParams.get('showConnectWallet') === 'true') {
//       toast({
//         title: "Authentication Required",
//         description: "Please connect your wallet to access this page.",
//         variant: "destructive",
//       });
//     }
//   }, [searchParams, toast]);

//   useEffect(() => {
//     if (account) {
//       Cookies.set('wallet-connected', 'true', { expires: 7 });
//       const redirectTo = searchParams.get('redirect') || '/';
//       router.push(redirectTo);
//     }
//   }, [account, router, searchParams]);

//   return (
//     <>
//       <Navbar />
//       <Hero />
//       <Footer />
//     </>
//   );
// };

// // Main component with proper Suspense boundary
// const Home = () => {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <HomeContent />
//     </Suspense>
//   );
// };

// export default Home;
