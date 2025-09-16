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

export const Workspace = () => {
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

  // Show welcome cards if no project has been started
  if (!hasStartedProject && !sourceImage && !referenceImage) {
    return <WelcomeCards />;
  }

  return (
    <div className="h-full overflow-auto">
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

      <div className="p-4 sm:p-6 space-y-6">
        <div className="max-w-6xl mx-auto space-y-6">
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

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column - Input Controls */}
            <div className="space-y-6">
              {/* Source Image Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Source Image
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageUploadArea
                    title="Upload your incomplete image"
                    description="The image you want to complete or enhance"
                    image={sourceImage}
                    onUpload={(files) => handleImageUpload(files, "source")}
                    required
                  />
                </CardContent>
              </Card>

              {/* Reference Image Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-accent-foreground" />
                    Reference Image
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageUploadArea
                    title="Upload reference for style/content"
                    description="An example of the desired style or content"
                    image={referenceImage}
                    onUpload={(files) => handleImageUpload(files, "reference")}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right Column - AI Prompt & Generation */}
            <div className="space-y-6">
              {/* AI Prompt */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5 text-primary" />
                    AI Prompt
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Describe what you want to achieve... e.g., 'Complete this landscape painting in the style of Van Gogh, add vibrant colors and swirling patterns in the sky'"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-32 resize-none bg-background border-border/50 focus:border-primary transition-smooth"
                  />
                  
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      onClick={handleGenerate}
                      disabled={!sourceImage || !prompt.trim() || isGenerating}
                      className="flex-1 min-w-[200px] gradient-primary hover:opacity-90 text-primary-foreground font-semibold transition-smooth shadow-elegant"
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
                    
                    <Button 
                      variant="outline" 
                      onClick={clearAll}
                      className="border-border/50 hover:border-border transition-smooth"
                    >
                      Clear All
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Be specific about style, colors, and details for best results
                  </p>
                </CardContent>
              </Card>

              {/* Quick Prompt Examples */}
              <Card className="bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-base">Example Prompts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <button 
                      onClick={() => setPrompt("Complete this portrait with photorealistic details, maintaining natural skin tones and lighting")}
                      className="text-left w-full p-3 rounded-md hover:bg-muted/50 transition-smooth border border-transparent hover:border-border/50"
                    >
                      <span className="font-medium text-primary">"</span>Complete this portrait with photorealistic details, maintaining natural skin tones and lighting<span className="font-medium text-primary">"</span>
                    </button>
                    <button 
                      onClick={() => setPrompt("Transform this sketch into a vibrant digital artwork with bold colors and modern artistic style")}
                      className="text-left w-full p-3 rounded-md hover:bg-muted/50 transition-smooth border border-transparent hover:border-border/50"
                    >
                      <span className="font-medium text-primary">"</span>Transform this sketch into a vibrant digital artwork with bold colors and modern artistic style<span className="font-medium text-primary">"</span>
                    </button>
                    <button 
                      onClick={() => setPrompt("Complete this landscape scene with dramatic sunset lighting and enhanced atmospheric depth")}
                      className="text-left w-full p-3 rounded-md hover:bg-muted/50 transition-smooth border border-transparent hover:border-border/50"
                    >
                      <span className="font-medium text-primary">"</span>Complete this landscape scene with dramatic sunset lighting and enhanced atmospheric depth<span className="font-medium text-primary">"</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};