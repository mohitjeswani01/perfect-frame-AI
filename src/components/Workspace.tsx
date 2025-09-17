import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, Image as ImageIcon, Wand2, Download, RefreshCw, Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";
import { ImageUploadArea } from "./ImageUploadArea";
import { WelcomeCards } from "./WelcomeCards";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  type: "source" | "reference";
}

interface WorkspaceProps {
  onViewGallery: () => void;
}

export const Workspace = ({ onViewGallery }: WorkspaceProps) => {
  const [sourceImage, setSourceImage] = useState<UploadedImage | null>(null);
  const [referenceImage, setReferenceImage] = useState<UploadedImage | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [hasStartedProject, setHasStartedProject] = useState(false);

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
        setHasStartedProject(true);
        toast.success("Source image uploaded successfully");
      } else {
        setReferenceImage(uploadedImage);
        setHasStartedProject(true);
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
    setHasStartedProject(false);
    toast("Workspace cleared");
  };

  const handleDownload = () => {
    if (result) {
      // Create download link
      const link = document.createElement('a');
      link.href = result;
      link.download = 'perfectframe-ai-result.jpg';
      link.click();
      toast.success("Image downloaded successfully!");
    }
  };

  const showWelcome = !hasStartedProject && !sourceImage && !referenceImage;

  return (
    <div className="h-full flex flex-col">
      {/* Welcome Section - Only show if no project started */}
      {showWelcome && (
        <div className="flex-1 overflow-auto">
          <WelcomeCards onStartProject={() => setHasStartedProject(true)} onViewGallery={onViewGallery} />
        </div>
      )}

      {/* Main Chat Interface - Always visible at bottom or full height */}
      <div className={`${showWelcome ? 'h-auto' : 'flex-1'} flex flex-col`}>
        {/* AI Processing Status */}
        {isGenerating && (
          <div className="p-4 sm:p-6 pb-0">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-primary">AI is working on your image...</span>
                </div>
                <Progress value={progress} className="w-full" />
                <p className="text-xs text-muted-foreground mt-2">
                  This may take 30-60 seconds depending on complexity
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results Section */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 space-y-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Generated Result */}
              {result && (
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Generated Result
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-square max-w-md mx-auto rounded-lg overflow-hidden shadow-card">
                      <img
                        src={result}
                        alt="AI Generated Result"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex gap-2 justify-center flex-wrap">
                      <Button onClick={handleDownload} variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button onClick={handleGenerate} variant="outline">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Regenerate
                      </Button>
                      <Button onClick={clearAll} variant="outline">
                        Clear All
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Input Section - Always at bottom */}
        <div className="border-t border-border bg-card/50 backdrop-blur-sm">
          <div className="p-4 sm:p-6">
            <div className="max-w-4xl mx-auto space-y-4">
              {/* Image Uploads */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ImageUploadArea
                  title="Source Image"
                  description="Your incomplete image"
                  image={sourceImage}
                  onUpload={(files) => handleImageUpload(files, "source")}
                  required
                  compact
                />
                <ImageUploadArea
                  title="Reference Image"
                  description="Style reference (optional)"
                  image={referenceImage}
                  onUpload={(files) => handleImageUpload(files, "reference")}
                  compact
                />
              </div>

              {/* Prompt Input */}
              <div className="space-y-3">
                <Textarea
                  placeholder="Describe how you want to complete your image... e.g., 'Complete this landscape with sunset lighting and vibrant colors'"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-20 resize-none bg-background border-border/50 focus:border-primary transition-smooth"
                />
                
                <div className="flex gap-2 flex-wrap">
                  <Button
                    onClick={handleGenerate}
                    disabled={!sourceImage || !prompt.trim() || isGenerating}
                    className="gradient-primary hover:opacity-90 text-primary-foreground font-semibold transition-smooth shadow-elegant"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate Image
                      </>
                    )}
                  </Button>
                  
                  {(sourceImage || referenceImage || prompt) && (
                    <Button 
                      variant="outline" 
                      onClick={clearAll}
                      className="border-border/50 hover:border-border transition-smooth"
                    >
                      Clear All
                    </Button>
                  )}
                </div>

                {/* Quick Examples */}
                {!sourceImage && (
                  <div className="flex gap-2 flex-wrap">
                    <button 
                      onClick={() => setPrompt("Complete this portrait with photorealistic details")}
                      className="text-xs px-3 py-1 rounded-full bg-muted/50 hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground"
                    >
                      Portrait enhancement
                    </button>
                    <button 
                      onClick={() => setPrompt("Transform this sketch into vibrant digital artwork")}
                      className="text-xs px-3 py-1 rounded-full bg-muted/50 hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground"
                    >
                      Artistic style
                    </button>
                    <button 
                      onClick={() => setPrompt("Complete this landscape with dramatic sunset lighting")}
                      className="text-xs px-3 py-1 rounded-full bg-muted/50 hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground"
                    >
                      Landscape completion
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};