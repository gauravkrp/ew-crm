import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { FiUpload, FiFile, FiX } from "react-icons/fi"; // Importing react-icons
import { Button } from "../ui/button";
import axios from "axios";

const UploadModal = () => {
  const [file, setFile] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/v1/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("File uploaded successfully!");
        setFile(null);
      } else {
        alert("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant={"outline"}
          className="justify-self-end px-6 h-8 text-sm"
        >
          <FiUpload className="w-5 h-5 mr-2 inline-block" />
          Upload File
        </Button>
        {/* <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring">
          <FiUpload className="w-5 h-5 mr-2 inline-block" />
          Upload File
        </button> */}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          <FiUpload className="w-6 h-6 mr-2 inline-block" />
          Upload your CSV or Excel file
        </DialogTitle>
        <DialogDescription>
          Please select a CSV or Excel file to upload.
        </DialogDescription>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Choose File
            <input
              type="file"
              accept=".csv, .xlsx, .xls"
              onChange={handleFileChange}
              className="mt-2 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
            />
          </label>
        </div>
        {file && (
          <div className="mt-4 flex items-center">
            <FiFile className="w-5 h-5 mr-2 text-gray-500" />
            <span className="text-sm text-gray-600">{file?.name}</span>
          </div>
        )}
        <div className="mt-6">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring ${
              uploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
        <DialogClose asChild>
          <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring">
            <FiX className="w-6 h-6" />
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
