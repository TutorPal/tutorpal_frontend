"use client"

import { ChangeEvent, FormEvent, useState } from 'react'
import { Bell, Search, LogOut, Settings, BookOpen, MessageSquare, Star, DollarSign, LayoutDashboard, ThumbsUp, PlusCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import axios from "axios";
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { useWriteContract } from 'wagmi'
import { sessionBookingAddress, tutorPalMarketAddress } from '@/utils/constants'
import { tutorPalAbi } from '@/abi/tutorPalAbi'
import { waitForTransactionReceipt } from '@wagmi/core'
import { config } from "@/utils/config"
import { useToast } from '@/hooks/use-toast'
import { motion } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { parseEther } from 'viem'
import { sessionAbi } from '@/abi/sessionAbi'

interface Metadata {
  title: string;
}

// Mock data for session offers
const mockOffers = [
  { id: 1, student: "0x1234...5678", amount: "0.5", duration: 3600, title: "Help with React Hooks", content: "I need assistance understanding and implementing React Hooks in my project.", isAccepted: false, isCanceled: false },
  { id: 2, student: "0xabcd...efgh", amount: "0.7", duration: 5400, title: "Solidity Contract Review", content: "Could you review my smart contract for security vulnerabilities?", isAccepted: true, isCanceled: false },
]

export default function TutorDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isCreateSessionOpen, setIsCreateSessionOpen] = useState(false)
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false)
  const [newSession, setNewSession] = useState({
      amount: '',
      duration: '',
      title: '',
      content: '',
  })

  const [formData, setFormData] = useState({
    title: '',
    symbol: '',
    metadataURI: '',
    maxSupply: '',
    price: '',
    royalty: '',
  })
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

    const [isLoading, setIsLoading] = useState(false);

    const [metadata] = useState<Metadata>({
      title: "",
  });

  const [responseUrls, setResponseUrls] = useState<{
    fileUrl: string;
    metadataUrl: string;
} | null>(null);

  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: BookOpen, label: 'Courses', id: 'courses' },
    { icon: MessageSquare, label: 'Consultations', id: 'consultations' },
    { icon: ThumbsUp, label: 'Feedback', id: 'feedback' },
    { icon: DollarSign, label: 'Earnings', id: 'earnings' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ]

//   uint256 amount, uint32 duration, string memory title, string memory content
  const handleCreateSession = async () => {

      try {
        console.log(parseEther(newSession.amount))
      const amount = parseEther(newSession.amount).toString()
        const hash = await writeContractAsync({
          address: sessionBookingAddress,
          abi: sessionAbi,
          functionName: 'createSessionListing',
          args: [
            amount, 
            newSession.duration, 
            newSession.title, 
            newSession.content
          ],
          gas: BigInt('1000000'),
        });
  
        // Show initial transaction sent toast
        toast({
          title: "Transaction Sent",
          description: "Your transaction is being processed...",
          itemID: "transaction-send"
        })
  
        // Wait for transaction confirmation
        const receipt = await waitForTransactionReceipt(config, { hash });
  
                    if (receipt.status === 'success') {
                        toast({
                          title: "Session Creation Successful!",
                          description: "You have successfully created a course.",
                          itemID: "transaction-success"
                        })
  
                        // Reset form after submission
                        setNewSession({ title: '', content: '', amount: '', duration: '' })
                        setIsCreateSessionOpen(false)
                    } else {
                        toast({
                          title: "Session Failed",
                          description: "Your transaction could not be completed. Please try again.",
                        })
                    }
  
        
      } catch (error) {
        console.log("BIG ERROR", error)
      }

    // This would typically interact with the blockchain
    console.log('Creating session:', newSession)
    // Reset form and close dialog
    setNewSession({ title: '', content: '', amount: '', duration: '' })
    
  }

  const { isPending, isSuccess, writeContractAsync } = useWriteContract();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      
      const hash = await writeContractAsync({
        address: tutorPalMarketAddress,
        abi: tutorPalAbi,
        functionName: 'createCourse',
        args: [
          formData.title, 
          formData.symbol, 
          responseUrls?.metadataUrl, 
          formData.maxSupply, 
          formData.price,
          formData.royalty
        ]
      });

      // Show initial transaction sent toast
      toast({
        title: "Transaction Sent",
        description: "Your transaction is being processed...",
      })

      // Wait for transaction confirmation
      const receipt = await waitForTransactionReceipt(config, { hash });

      console.log("REceipt", receipt)
                  if (receipt.status === 'success') {
                      toast({
                        title: "Course Creation Successful!",
                        description: "You have successfully created a course.",
                      })

                      // Reset form after submission
                      setFormData({
                        title: '',
                        symbol: '',
                        metadataURI: '',
                        maxSupply: '',
                        price: '',
                        royalty: '',
                      })
                  } else {
                      toast({
                        title: "Transaction Failed",
                        description: "Your transaction could not be completed. Please try again.",
                      })
                  }
      
                  if(receipt.status === "reverted") {
                      toast({
                          title: "Transaction Failed",
                          description: "Your transaction could not be completed. Please try again.",
                      })
                  }

      
    } catch (error) {
      console.log("BIG ERROR", error)
    }

    if(isSuccess) {
      toast({
        title: "Course Created",
        description: "Your course has been successfully created.",
      })
    }
  }

  const handleFileUpload = async (e: FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
        setIsLoading(true)

        if (!file) {
            setErrorMessage("Please upload a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        const pinataMetadata = {
            name: `${metadata.title}`,
            keyvalues: metadata,
        };
        formData.append("pinataMetadata", JSON.stringify(pinataMetadata));

        try {
            const response = await axios.post("/api/ipfs-uploads", formData, {
                headers: { 
                    "Content-Type": "multipart/form-data"
                },
            });

            setResponseUrls({
                fileUrl: response.data.fileUrl,
                metadataUrl: response.data.metadataUrl || "N/A"
            });

            toast({
            title: "Upload Successful",
            description: "Your course file uploaded successfully.",
            })
            
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.response?.data || error.message);
                setErrorMessage("Failed to upload file. Please try again.");
            } else if (error instanceof Error) {
                console.error("Error uploading file:", error.message);
                setErrorMessage("An unexpected error occurred. Please try again.");
            } else {
                console.error("Unknown error:", error);
                setErrorMessage("An unknown error occurred. Please contact support.");
            }

            toast({
            title: "Upload Failed",
            description: errorMessage
            })
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="min-h-screen bg-[#E6F4F1] dark:bg-gray-950">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[#D1EAE4] dark:bg-gray-900">
        <div className="flex h-16 items-center px-6">
          <span className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
            TutorPal
          </span>
        </div>
        <nav className="space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                activeSection === item.id
                  ? "bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400"
                  : "text-gray-700 hover:bg-teal-500/10 dark:text-gray-400 dark:hover:bg-teal-500/20"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="absolute bottom-4 w-full px-3">
          <button className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-teal-500/10 dark:text-gray-400 dark:hover:bg-teal-500/20">
            <LogOut className="h-5 w-5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white/95 px-6 dark:bg-gray-900/95">
          <div className="flex flex-1 items-center space-x-4">
            <div className="relative w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search..."
                className="w-full bg-gray-100 pl-8 dark:bg-gray-800"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-teal-500" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>TP</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
            <div className='flex justify-between'>
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">Welcome Back</h1>
                    <p className="text-sm text-gray-500">
                    {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}
                    </p>
                </div>

                <div className='flex gap-4'>
                    {/* <Dialog open={isCreateCourseOpen} onOpenChange={setIsCreateCourseOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create Course
                            </Button>
                        </DialogTrigger>

                            <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/50 dark:to-emerald-950/50">
                                <DialogHeader>
                                <DialogTitle>Create New Course</DialogTitle>
                                <DialogDescription>
                                Set up a new course. Click create when you're done.
                                </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                <div className="flex flex-col items-start gap-4">
                                    <Label htmlFor="title">Course Title</Label>
                                    <Input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className='rounded col-span-3'
                                        required
                                    />
                                </div>
                                <div className="flex flex-col items-start gap-4">
                                    <Label htmlFor="symbol">Symbol</Label>
                                    <Input
                                        type="text"
                                        id="symbol"
                                        name="symbol"
                                        value={formData.symbol}
                                        onChange={handleChange}
                                        className='rounded'
                                        required
                                    />
                                </div>
                                <div className="flex flex-col items-start gap-4">
                                    <label className="block mb-2 text-black">Course File</label>
                                    <div className='flex w-full'>
                                    <div>

                                    <Input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="w-full p-2 border rounded text-black"
                                    />
                                    </div>
                                    <div>
                                        <button onClick={handleFileUpload} disabled={isLoading || !file} className='rounded p-2 text-sm border'>{isLoading ? <LoadingSpinner /> : "proceed"}</button>
                                    </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start gap-4">
                                    <Label htmlFor="metadataURI">Metadata URI</Label>
                                    <Input
                                        type="text"
                                        id="metadataURI"
                                        name="metadataURI"
                                        value={responseUrls?.metadataUrl}
                                        // onChange={handleChange}
                                        className='rounded'
                                        required
                                    />
                                </div>
                                <div className="flex flex-col items-start gap-4">
                                    <Label htmlFor="maxSupply">Max Supply</Label>
                                    <Input
                                        type="number"
                                        id="maxSupply"
                                        name="maxSupply"
                                        value={formData.maxSupply}
                                        onChange={handleChange}
                                        className='rounded'
                                        required
                                    />
                                </div>
                                <div className="flex flex-col items-start gap-4">
                                    <Label htmlFor="price">Price (in wei)</Label>
                                    <Input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className='rounded'
                                        required
                                    />
                                </div>
                                <div className="flex flex-col items-start gap-4">
                                    <Label htmlFor="royalty">Royalty (in basis points, e.g., 500 for 5%)</Label>
                                    <Input
                                        type="number"
                                        id="royalty"
                                        name="royalty"
                                        value={formData.royalty}
                                        onChange={handleChange}
                                        className='rounded'
                                        required
                                    />
                                </div>
                                </div>
                                <div className="flex justify-end">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button disabled={isPending} onClick={handleSubmit} className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
                                        {isPending ? (
                                            <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                            />
                                        ) : (
                                            'Create Course'
                                        )}
                                        
                                    </Button>
                                </motion.div>
                                </div>
                            </DialogContent>
                    </Dialog> */}
                    <Dialog open={isCreateCourseOpen} onOpenChange={setIsCreateCourseOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create Course
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/50 dark:to-emerald-950/50">
                            <DialogHeader className="flex-shrink-0">
                            <DialogTitle>Create New Course</DialogTitle>
                            <DialogDescription>
                                Set up a new course. Click create when you're done.
                            </DialogDescription>
                            </DialogHeader>
                            <div className="flex-grow overflow-y-auto">
                            <div className="grid gap-4 py-4">
                                <div className="flex flex-col items-start gap-4">
                                <Label htmlFor="title">Course Title</Label>
                                <Input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="rounded col-span-3"
                                    required
                                />
                                </div>
                                <div className="flex flex-col items-start gap-4">
                                <Label htmlFor="symbol">Symbol</Label>
                                <Input
                                    type="text"
                                    id="symbol"
                                    name="symbol"
                                    value={formData.symbol}
                                    onChange={handleChange}
                                    className="rounded"
                                    required
                                />
                                </div>
                                <div className="flex flex-col items-start gap-4">
                                <label className="block mb-2 text-black">Course File</label>
                                <div className="flex w-full">
                                    <div>
                                    <Input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="w-full p-2 border rounded text-black"
                                    />
                                    </div>
                                    <div>
                                    <button onClick={handleFileUpload} disabled={isLoading || !file} className="rounded p-2 text-sm border">
                                        {isLoading ? <LoadingSpinner /> : "proceed"}
                                    </button>
                                    </div>
                                </div>
                                </div>
                                <div className="flex flex-col items-start gap-4">
                                <Label htmlFor="metadataURI">Metadata URI</Label>
                                <Input
                                    type="text"
                                    id="metadataURI"
                                    name="metadataURI"
                                    value={responseUrls?.metadataUrl}
                                    className="rounded"
                                    required
                                />
                                </div>
                                <div className="flex flex-col items-start gap-4">
                                <Label htmlFor="maxSupply">Max Supply</Label>
                                <Input
                                    type="number"
                                    id="maxSupply"
                                    name="maxSupply"
                                    value={formData.maxSupply}
                                    onChange={handleChange}
                                    className="rounded"
                                    required
                                />
                                </div>
                                <div className="flex flex-col items-start gap-4">
                                <Label htmlFor="price">Price (in wei)</Label>
                                <Input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="rounded"
                                    required
                                />
                                </div>
                                <div className="flex flex-col items-start gap-4">
                                <Label htmlFor="royalty">Royalty (in basis points, e.g., 500 for 5%)</Label>
                                <Input
                                    type="number"
                                    id="royalty"
                                    name="royalty"
                                    value={formData.royalty}
                                    onChange={handleChange}
                                    className="rounded"
                                    required
                                />
                                </div>
                            </div>
                            </div>
                            <div className="flex justify-end mt-4 flex-shrink-0">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button disabled={isPending} onClick={handleSubmit} className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
                                {isPending ? (
                                    <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                    />
                                ) : (
                                    'Create Course'
                                )}
                                </Button>
                            </motion.div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isCreateSessionOpen} onOpenChange={setIsCreateSessionOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create Session
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/50 dark:to-emerald-950/50">
                            <DialogHeader>
                            <DialogTitle>Create New Session</DialogTitle>
                            <DialogDescription>
                                Set up a new tutoring session. Click create when you're done. 
                            </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="content" className="text-right">
                                Title
                                </Label>
                                <Textarea
                                id="content"
                                value={newSession.title}
                                onChange={(e) => setNewSession({...newSession, title: e.target.value})}
                                className="col-span-3"
                                />
                            </div>
                            
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="content" className="text-right">
                                Content
                                </Label>
                                <Textarea
                                id="content"
                                value={newSession.content}
                                onChange={(e) => setNewSession({...newSession, content: e.target.value})}
                                className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="amount" className="text-right">
                                Amount (ETH)
                                </Label>
                                <Input
                                id="amount"
                                type="number"
                                value={newSession.amount}
                                onChange={(e) => setNewSession({...newSession, amount: e.target.value })}
                                className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="duration" className="text-right">
                                Duration (min)
                                </Label>
                                <Input
                                id="duration"
                                type="number"
                                value={newSession.duration}
                                onChange={(e) => setNewSession({...newSession, duration: e.target.value})}
                                className="col-span-3"
                                />
                            </div>
                            </div>
                            <div className="flex justify-end">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button disabled={isPending} onClick={handleCreateSession} className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
                                {isPending ? (
                                    <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                    />
                                ) : (
                                    'Create Session'
                                )}
                                </Button>
                            </motion.div>
                            {/* <Button onClick={handleCreateSession} className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
                                Create Session
                            </Button> */}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            <Card className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/50 dark:to-emerald-950/50">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-teal-500/10 rounded-lg">
                  <BookOpen className="h-6 w-6 text-teal-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Sessions</p>
                  <h3 className="text-2xl font-bold">5</h3>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/50 dark:to-emerald-950/50">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <DollarSign className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Earnings</p>
                  <h3 className="text-2xl font-bold">13.5 ETH</h3>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/50 dark:to-emerald-950/50">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-teal-500/10 rounded-lg">
                  <Star className="h-6 w-6 text-teal-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rating</p>
                  <h3 className="text-2xl font-bold">4.8</h3>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/50 dark:to-emerald-950/50">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending Offers</p>
                  <h3 className="text-2xl font-bold">3</h3>
                </div>
              </div>
            </Card>
            {/* <Card className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/50 dark:to-emerald-950/50">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-teal-500/10 rounded-lg">
                  <ThumbsUp className="h-6 w-6 text-teal-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Reviews</p>
                  <h3 className="text-2xl font-bold">127</h3>
                </div>
              </div>
            </Card> */}
          </div>

          {/* Session Offers */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Recent Session Offers</h2>
              <Button variant="outline">View All</Button>
            </div>
            <div className="grid gap-6">
              {mockOffers.map((offer) => (
                <Card key={offer.id} className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/50 dark:to-emerald-950/50">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{offer.title}</h3>
                      <p className="text-sm text-gray-500">From: {offer.student}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{offer.amount} ETH</p>
                      <p className="text-sm text-gray-500">{offer.duration / 60} minutes</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{offer.content}</p>
                  {!offer.isAccepted && !offer.isCanceled && (
                    <div className="flex justify-end space-x-3">
                      <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                        Reject
                      </Button>
                      <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
                        Accept
                      </Button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

