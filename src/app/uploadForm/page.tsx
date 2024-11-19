"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Link from "next/link";

interface Metadata {
    title: string;
    category: string;
    subcategory?: string;
    description?: string;
    author?: string;
    tags?: string;
}

const UploadForm: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [metadata, setMetadata] = useState<Metadata>({
        title: "",
        category: "",
    });
    const [responseUrls, setResponseUrls] = useState<{
        fileUrl: string;
        metadataUrl: string;



    } | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setMetadata({ ...metadata, [name]: value });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        if (!file) {
            setErrorMessage("Please upload a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        const pinataMetadata = {
            name: `${metadata.title} - ${metadata.category}`,
            keyvalues: metadata,
        };
        formData.append("pinataMetadata", JSON.stringify(pinataMetadata));

        try {
            const response = await axios.post("/api/ipfs-uploads", formData, {
                headers: { "Content-Type": "multipart/form-data",
                    "pinataJwt": process.env.PINATA_JWT,
                    "pinataGateway": process.env.NEXT_PUBLIC_IPFS_URL,
                 },
            });
            console.log({response});
      setResponseUrls((prev)=> ({
        fileUrl: response.data,
        metadataUrl: response?.data?.metadataUrl??"N/A",
      }))
        
        } catch (error: any) {
            console.error("Error uploading file:", error?.response?.data || error.message);
            setErrorMessage("Failed to upload file. Please try again.");
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-100 p-4 rounded shadow"
            >
                <h1 className="text-2xl font-bold mb-4">Upload File</h1>
                <div className="mb-4">
                    <label className="block mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={metadata.title}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Category</label>
                    <select
                        name="category"
                        value={metadata.category}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Category</option>
                        <option value="PDF Courses">PDF Courses</option>
                        <option value="Music Videos">Music Videos</option>
                        <option value="Audio Content">Audio Content</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">File</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded"
                >
                    Upload
                </button>
                {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            </form>

            {responseUrls?.fileUrl && (
                <div className="mt-4 bg-gray-200 p-4 rounded shadow w-full overflow-x-scroll">
                    <h2 className="font-bold">Upload Successful!</h2>
                    
                    <p className="w-full">
                        <span className="font-bold">File URL:</span>
                        <Link href={responseUrls.fileUrl} target="_blank" className="hover:text-blue-600 text-black">
                          Url Link
                        </Link>
                    </p>
                    <p>
                        <strong>Metadata URL:</strong>{" "}
                        <a href={responseUrls.metadataUrl} target="_blank" className="text-blue-600">
                            {responseUrls.metadataUrl}
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
};

export default UploadForm;