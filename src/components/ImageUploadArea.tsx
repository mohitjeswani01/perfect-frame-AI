import { useCallback, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  type: "source" | "reference";
}

interface ImageUploadAreaProps {
  title: string;
  description: string;
  image: UploadedImage | null;
  onUpload: (files: FileList) => void;
  required?: boolean;
}

export const ImageUploadArea = ({ 
  title, 
  description, 
  image, 
  onUpload, 
  required = false 
}: ImageUploadAreaProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onUpload(files);
    }
  }, [onUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onUpload(files);
    }
  }, [onUpload]);

  const removeImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    // Reset the file input
    const fileInput = document.querySelector(`input[type="file"]`) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  }, []);

  return (
    <Card className={`relative p-6 border-2 border-dashed transition-smooth ${
      isDragging 
        ? "border-primary bg-primary/5 shadow-glow" 
        : image 
        ? "border-border bg-card"
        : "border-border/50 bg-upload hover:border-border hover:bg-upload-hover"
    }`}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">{title}</h3>
          {required && <span className="text-xs text-destructive">*</span>}
        </div>

        {image ? (
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden bg-muted">
              <img 
                src={image.preview} 
                alt="Uploaded preview"
                className="w-full h-48 object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={removeImage}
                className="absolute top-2 right-2 h-8 w-8 shadow-lg"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium truncate">{image.file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(image.file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        ) : (
          <div
            className="relative"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            
            <div className="text-center py-8 space-y-4">
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="font-medium">Drop your image here</p>
                <p className="text-sm text-muted-foreground">{description}</p>
                <p className="text-xs text-muted-foreground">
                  or click to browse • PNG, JPG, WebP up to 10MB
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};