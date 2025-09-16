import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, Image as ImageIcon, Wand2, Download, RefreshCw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { ImageUploadArea } from "./ImageUploadArea";
import heroDemo from "@/assets/hero-demo.jpg";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  type: "source" | "reference";
}

export const Workspace = () => {
  const [sourceImage, setSourceImage] = useState<UploadedImage | null>(null);
  const [referenceImage, setReferenceImage] = useState<UploadedImage | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const handleImageUpload = useCallback((files: FileList, type: "source" | "reference") => {
    const file = files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const uploadedImage: UploadedImage = {
        id: Math.random().toString(36).substring(7),
        file,
        preview: e.target?.result as string,
        type
      };

      if (type === "source") {
        setSourceImage(uploadedImage);
        toast.success("Source image uploaded successfully");
      } else {
        setReferenceImage(uploadedImage);
        toast.success("Reference image uploaded successfully");
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const handleGenerate = async () => {
    if (!sourceImage) {
      toast.error("Please upload a source image first");
      return;
    }

    if (!prompt.trim()) {
      toast.error("Please enter a description prompt");
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    // Simulate AI generation process
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      
      setTimeout(() => {
        // Mock result - in real app, this would be the AI-generated image
        setResult(sourceImage.preview); // Using source as mock result
        setIsGenerating(false);
        setProgress(0);
        toast.success("Image generation completed!");
      }, 500);
    }, 3000);
  };

  const clearAll = () => {
    setSourceImage(null);
    setReferenceImage(null);
    setPrompt("");
    setResult(null);
    toast("Workspace cleared");
  };

  return (
    <div className="h-full p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            AI Image Completion Studio
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload your incomplete image, provide a reference for style guidance, and let AI complete your vision
          </p>
          
          {/* Demo Preview */}
          {!sourceImage && !referenceImage && !prompt && (
            <Card className="p-6 gradient-card border-border/50 shadow-card max-w-4xl mx-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-primary">AI Completion Example</span>
                </div>
                <img 
                  src={heroDemo} 
                  alt="AI Image Completion Demo"
                  className="w-full rounded-lg shadow-elegant"
                />
                <p className="text-sm text-muted-foreground">
                  See how AI transforms incomplete images into stunning, complete works of art
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* Upload Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <ImageUploadArea
            title="Source Image"
            description="Upload the image you want to complete"
            image={sourceImage}
            onUpload={(files) => handleImageUpload(files, "source")}
            required
          />
          
          <ImageUploadArea
            title="Reference Image"
            description="Upload a reference for style guidance (optional)"
            image={referenceImage}
            onUpload={(files) => handleImageUpload(files, "reference")}
          />
        </div>

        {/* Prompt Section */}
        <Card className="p-6 gradient-card border-border/50">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Describe Your Vision</h3>
            </div>
            
            <Textarea
              placeholder="Describe what you want the completed image to look like... (e.g., 'Complete the landscape with mountains and a sunset sky, making it photorealistic with warm lighting')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px] bg-input border-border/50 focus:border-ring resize-none"
            />
            
            <div className="flex gap-3">
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating || !sourceImage}
                className="gradient-primary hover:shadow-glow transition-glow text-primary-foreground border-0"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Image
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={clearAll}
                className="border-border/50 hover:border-border transition-smooth"
              >
                Clear All
              </Button>
            </div>
          </div>
        </Card>

        {/* Progress */}
        {isGenerating && (
          <Card className="p-6 gradient-card border-border/50">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Generating your image...</span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                AI is analyzing your images and prompt to create the perfect completion
              </p>
            </div>
          </Card>
        )}

        {/* Result */}
        {result && (
          <Card className="p-6 gradient-card border-border/50 shadow-card">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Generated Result</h3>
                </div>
                
                <Button 
                  variant="outline"
                  className="border-border/50 hover:border-border transition-smooth"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
              
              <div className="relative rounded-lg overflow-hidden bg-muted">
                <img 
                  src={result} 
                  alt="AI Generated Result"
                  className="w-full h-auto max-h-96 object-contain"
                />
              </div>
              
              <p className="text-sm text-muted-foreground">
                Your AI-enhanced image is ready! You can download it or start a new project.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};