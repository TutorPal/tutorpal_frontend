
"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface Metadata {
    title: string;
    category: string;
    subcategory?: string;
    description?: string;
    author?: string;
    tags?: string;
}

 const UploadFormPage: React.FC = () => {
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
                headers: { 
                    "Content-Type": "multipart/form-data"
                },
            });

            setResponseUrls({
                fileUrl: response.data.fileUrl,
                metadataUrl: response.data.metadataUrl || "N/A"
            });
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
        }
    };

    return (
        <section className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="p-4 max-w-md mx-auto">
        
            <form
                onSubmit={handleSubmit}
                className="bg-gray-100 p-4 rounded shadow"
            >
                <h1 className="text-2xl font-bold mb-4 text-black">Upload File</h1>
                <div className="mb-4">
                    <label className="block mb-2 text-black">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={metadata.title}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-black">Category</label>
                    <select
                        name="category"
                        value={metadata.category}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded text-black"
                    >
                        <option value="">Select Category</option>
                        <option value="PDF Courses">PDF Courses</option>
                        <option value="Videos Courses">Music Videos</option>
                        <option value="Audio Content">Audio Content</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-black">File</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded text-black"
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
                    <h2 className="font-bold text-black">Upload Successful!</h2>
                    
                    <p className="w-full">
                        <span className="font-bold text-black">File URL:</span>
                        {/* <Link href={responseUrls.fileUrl} target="_blank" className="hover:text-blue-600 text-black">
                          Url Link
                        </Link> */}
                    </p>
                    <p>
                        <strong className="text-black">Metadata URL:</strong>{" "}
                        <a href={responseUrls.metadataUrl} target="_blank" className="text-blue-600">
                            {responseUrls.metadataUrl}
                        </a>
                    </p>
                </div>
            )}
        </div>
        </section>
    );
};

export default UploadFormPage;

