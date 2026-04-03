import { useState } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { PinturaEditor } from "@pqina/react-pintura";
import { getEditorDefaults } from "@pqina/pintura";
import imageCompression from "browser-image-compression";
import "@pqina/pintura/pintura.css";

interface ImageAddModalProps {
  onClose: () => void;
  onImageAdd: (image: string) => void;
}

export default function ImageAddModal({
  onClose,
  onImageAdd,
}: ImageAddModalProps) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [saveEdited, setSaveEdited] = useState(true);
  const [processing, setProcessing] = useState(false);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleFileSelect = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setSelectedImage(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleSubmit = async () => {
    setProcessing(true);
    try {
      if (selectedImage) {
        const reader = new FileReader();
        reader.onload = () => {
          onImageAdd(reader.result as string);
          onClose();
        };
        const compressedFile = await imageCompression(selectedImage, {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1024,
        });
        reader.readAsDataURL(compressedFile);
      }
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setProcessing(false);
    }
  };

  const handleClose = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Add New Image
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* File Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              dragOver
                ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {previewUrl ? (
              <div style={{ height: "60vh" }}>
                <PinturaEditor
                  {...getEditorDefaults()}
                  src={previewUrl}
                  onProcess={(res) => {
                    setSaveEdited(true);
                    setSelectedImage(res.dest);
                  }}
                  onLoad={() => setSaveEdited(true)}
                  onUpdate={() => setSaveEdited(false)}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 text-gray-400">
                  {dragOver ? (
                    <Upload className="w-full h-full" />
                  ) : (
                    <ImageIcon className="w-full h-full" />
                  )}
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Drag and drop an image here, or
                  </p>
                  <label className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
                    Browse Files
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedImage || !saveEdited}
            className={`px-6 py-2 rounded-lg transition-colors cursor-pointer ${
              selectedImage && saveEdited
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            }`}
          >
            {processing ? "Adding..." : "Add Image"}
          </button>
        </div>
      </div>
    </div>
  );
}
