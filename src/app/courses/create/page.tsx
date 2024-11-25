"use client"

// import { Navigation } from '@/components/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent, FormEvent, useState } from 'react'
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/common/Navbar'
import axios from "axios";
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { useWriteContract } from 'wagmi'
import { tutorPalMarketAddress } from '@/utils/constants'
import { tutorPalAbi } from '@/abi/tutorPalAbi'

interface Metadata {
  title: string;
}

export default function CreateCourse() {
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

// Write contract hook for user registration
const { writeContract, isPending, isSuccess } = useWriteContract();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically interact with your smart contract
    // string memory _title,
    //     string memory _symbol,
    //     string memory _metadataURI,
    //     uint256 _maxSupply,
    //     uint256 _price,
    //     uint16 _royalty

    writeContract({
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

    console.log('Form submitted:', formData)
    if(isSuccess) {
      toast({
        title: "Course Created",
        description: "Your course has been successfully created.",
      })
    }
    // Reset form after submission
    setFormData({
      title: '',
      symbol: '',
      metadataURI: '',
      maxSupply: '',
      price: '',
      royalty: '',
    })
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
    <>
    <Navbar />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Create a New Course</h1>
      {/* <Navigation /> */}
      <form 
      // onSubmit={handleSubmit} 
      className="max-w-md mx-auto">
        <div className="mb-4">
          <Label htmlFor="title">Course Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className='rounded'
            required
          />
        </div>
        <div className="mb-4">
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

        <div className="mb-4 w-full">
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
                        <button onClick={handleFileUpload} disabled={isLoading} className='rounded p-2 text-sm border'>{isLoading ? <LoadingSpinner /> : "proceed"}</button>
                      </div>
                    </div>
                </div>

        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
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
        <Button onClick={handleSubmit} type="submit" disabled={isPending} className="w-full">{isPending ? <LoadingSpinner /> : "Create Course"}</Button>
      </form>
    </div>
    </>
  )
}

