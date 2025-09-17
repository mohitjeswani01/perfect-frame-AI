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
  compact?: boolean;
}

export const ImageUploadArea = ({ 
  title, 
  description, 
  image, 
  onUpload, 
  required = false,
  compact = false
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
    <div className="w-full">
      {image ? (
        <div className="relative group">
          <div className={`${compact ? 'aspect-video' : 'aspect-square'} w-full rounded-lg overflow-hidden shadow-card`}>
            <img
              src={image.preview}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <div className="space-y-2">
              <Button
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e) => {
                    const target = e.target as HTMLInputElement;
                    if (target.files && target.files.length > 0) {
                      onUpload(target.files);
                    }
                  };
                  input.click();
                }}
                variant="secondary"
                size="sm"
                className="bg-white/90 text-black hover:bg-white"
              >
                <Upload className="mr-2 h-4 w-4" />
                Change
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
              const target = e.target as HTMLInputElement;
              if (target.files && target.files.length > 0) {
                onUpload(target.files);
              }
            };
            input.click();
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative ${compact ? 'aspect-video' : 'aspect-square'} w-full rounded-lg border-2 border-dashed border-border/50 
            hover:border-primary/50 transition-all duration-300 cursor-pointer
            flex flex-col items-center justify-center space-y-2 p-4
            bg-card/30 hover:bg-card/50 group
            ${isDragging ? 'border-primary bg-primary/5' : ''}
          `}
        >
          <div className={`${compact ? 'w-8 h-8' : 'w-12 h-12'} rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors`}>
            <Upload className={`${compact ? 'w-4 h-4' : 'w-6 h-6'} text-primary`} />
          </div>
          
          <div className="text-center space-y-1">
            <h3 className={`${compact ? 'text-sm' : 'text-base'} font-medium text-foreground`}>
              {title}
              {required && <span className="text-red-500 ml-1">*</span>}
            </h3>
            <p className={`${compact ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{description}</p>
            {!compact && (
              <p className="text-xs text-muted-foreground">
                Click to upload or drag and drop
              </p>
            )}
          </div>

          {isDragging && (
            <div className="absolute inset-0 bg-primary/10 rounded-lg flex items-center justify-center">
              <p className="text-primary font-medium text-sm">Drop image here</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};