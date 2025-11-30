import { useRef, useState, DragEvent } from "react";
import { FileIcon, Trash2, X } from "lucide-react";

interface FilesUploadProps {
  label: string;
  onUpload?: (file: File | null) => void;
}

export default function FilesUpload({ label, onUpload }: FilesUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFile = (file: File | null) => {
    if (!file) return;

    setFile(file);
    onUpload?.(file);

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) handleFile(droppedFile);
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    onUpload?.(null);
  };

  return (
    <div className="w-full bg-white-background py-8 px-12 rounded-xl shadow-sm font-manrope">
      {/* LABEL */}
      <p className="text-black text-lg font-semibold mb-4">{label}</p>

      {/* FILE PREVIEW */}
      {file ? (
        <div className="w-full p-4 bg-white/60 rounded-xl flex flex-col gap-3 items-center justify-center relative">
          {/* Remove button */}
          <button
            onClick={removeFile}
            className="absolute top-3 right-3 bg-white rounded-full p-1 shadow hover:bg-gray-100 cursor-pointer transition"
          >
            <X className="size-4 text-gray" />
          </button>

          {/* If image */}
          {preview ? (
            <img
              src={preview}
              className="max-h-40 rounded-lg object-contain"
              alt="preview"
            />
          ) : (
            // If PDF or non-image
            <div className="flex flex-col items-center gap-2 py-6">
              <FileIcon className="size-10 text-gray" />
              <p className="text-black text-sm">{file.name}</p>
            </div>
          )}
        </div>
      ) : (
        /* UPLOAD AREA */
        <div
          className={`w-full h-32 rounded-xl flex flex-col items-center justify-center cursor-pointer transition border-2 border-dashed 
          ${
            isDragging
              ? "bg-white border-orange"
              : "bg-white/40 border-gray/30 hover:bg-white"
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <FileIcon className="text-gray size-7 mb-2" />
          <p className="text-gray text-sm">Upload from file/Photo</p>
        </div>
      )}

      {/* HIDDEN INPUT */}
      <input
        type="file"
        accept="image/*,application/pdf"
        ref={fileInputRef}
        onChange={(e) => handleFile(e.target.files?.[0] || null)}
        className="hidden"
      />
    </div>
  );
}
