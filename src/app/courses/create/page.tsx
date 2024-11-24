"use client"

import { Navigation } from '@/components/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react'
import { useToast } from "@/hooks/use-toast";

export default function CreateCourse() {
  const [formData, setFormData] = useState({
    title: '',
    symbol: '',
    metadataURI: '',
    maxSupply: '',
    price: '',
    royalty: '',
  })
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically interact with your smart contract
    console.log('Form submitted:', formData)
    toast({
      title: "Course Created",
      description: "Your course has been successfully created.",
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
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Create a New Course</h1>
      <Navigation />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <Label htmlFor="title">Course Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
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
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="metadataURI">Metadata URI</Label>
          <Input
            type="text"
            id="metadataURI"
            name="metadataURI"
            value={formData.metadataURI}
            onChange={handleChange}
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
            required
          />
        </div>
        <Button type="submit" className="w-full">Create Course</Button>
      </form>
    </div>
  )
}

