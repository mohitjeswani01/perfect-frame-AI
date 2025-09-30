import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Paperclip, X, Wand2, Download, RefreshCw, Sparkles, User } from "lucide-react";
import { toast } from "sonner";
import { WelcomeCards } from "./WelcomeCards";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  prompt?: string;
  images?: UploadedImage[];
  result?: string;
  timestamp: Date;
}

interface WorkspaceProps {
  onViewGallery: () => void;
}

export const Workspace = ({ onViewGallery }: WorkspaceProps) => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [hasStartedProject, setHasStartedProject] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    
    fileArray.forEach(file => {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload only image files");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadedImage: UploadedImage = {
          id: Math.random().toString(36).substring(7),
          file,
          preview: e.target?.result as string,
        };

        setUploadedImages(prev => [...prev, uploadedImage]);
        setHasStartedProject(true);
        toast.success("Image uploaded");
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const removeImage = (id: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  };

  const handleGenerate = async () => {
    if (uploadedImages.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    if (!prompt.trim()) {
      toast.error("Please enter a description prompt");
      return;
    }

    // Add user message to chat
    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      type: "user",
      prompt: prompt,
      images: [...uploadedImages],
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setUploadedImages([]);
    setPrompt("");
    setIsGenerating(true);
    setProgress(0);

    // Scroll to bottom
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);

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
        // Add AI response to chat
        const aiMessage: ChatMessage = {
          id: Math.random().toString(36).substring(7),
          type: "ai",
          result: userMessage.images![0].preview, // Mock result
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsGenerating(false);
        setProgress(0);
        toast.success("Image generation completed!");
        
        // Scroll to bottom
        setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      }, 500);
    }, 3000);
  };

  const handleDownload = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'perfectframe-ai-result.jpg';
    link.click();
    toast.success("Image downloaded successfully!");
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageUpload(e.target.files);
    }
  };

  const showWelcome = !hasStartedProject && messages.length === 0;

  return (
    <div className="h-full flex flex-col">
      {/* Welcome Section - Only show if no project started */}
      {showWelcome && (
        <div className="flex-1 overflow-auto">
          <WelcomeCards onStartProject={() => setHasStartedProject(true)} onViewGallery={onViewGallery} />
        </div>
      )}

      {/* Main Chat Interface */}
      <div className={`${showWelcome ? 'h-auto' : 'flex-1'} flex flex-col min-h-0`}>
        {/* Chat Messages - Scrollable */}
        {messages.length > 0 && (
          <div className="flex-1 overflow-y-auto min-h-0 p-4 sm:p-6 space-y-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message) => (
                <div key={message.id} className="space-y-4">
                  {/* User Message */}
                  {message.type === "user" && (
                    <div className="flex gap-3 justify-end">
                      <div className="max-w-[80%] space-y-3">
                        {/* User Images */}
                        {message.images && message.images.length > 0 && (
                          <div className="flex gap-2 flex-wrap justify-end">
                            {message.images.map((img) => (
                              <div key={img.id} className="relative w-32 h-32 rounded-lg overflow-hidden border border-border shadow-sm">
                                <img
                                  src={img.preview}
                                  alt="Uploaded"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                        {/* User Prompt */}
                        {message.prompt && (
                          <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-3">
                            <p className="text-sm">{message.prompt}</p>
                          </div>
                        )}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  )}

                  {/* AI Message */}
                  {message.type === "ai" && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div className="max-w-[80%]">
                        <Card className="border-primary/20">
                          <CardContent className="p-4 space-y-3">
                            {message.result && (
                              <>
                                <div className="aspect-square max-w-md rounded-lg overflow-hidden">
                                  <img
                                    src={message.result}
                                    alt="AI Generated"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button 
                                    onClick={() => handleDownload(message.result!)} 
                                    variant="outline" 
                                    size="sm"
                                  >
                                    <Download className="mr-2 h-3 w-3" />
                                    Download
                                  </Button>
                                </div>
                              </>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* AI Processing Status */}
              {isGenerating && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <Card className="border-primary/20 bg-primary/5 max-w-md">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-primary">AI is working on your image...</span>
                      </div>
                      <Progress value={progress} className="w-full" />
                      <p className="text-xs text-muted-foreground mt-2">
                        This may take 30-60 seconds
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          </div>
        )}

        {/* Input Section - Always visible at bottom */}
        <div className="border-t border-border bg-card/50 backdrop-blur-sm shrink-0">
          <div className="p-3 sm:p-4">
            <div className="max-w-4xl mx-auto">
              {/* Image Previews */}
              {uploadedImages.length > 0 && (
                <div className="mb-3 flex gap-2 flex-wrap">
                  {uploadedImages.map((img) => (
                    <div key={img.id} className="relative w-16 h-16 rounded-lg overflow-hidden border border-border group">
                      <img
                        src={img.preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeImage(img.id)}
                        className="absolute top-1 right-1 w-5 h-5 bg-background/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Input Bar */}
              <div className="flex gap-2 items-end">
                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                {/* Attachment Button */}
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleFileButtonClick}
                  className="shrink-0 h-11 w-11 border-border/50 hover:border-primary transition-smooth"
                >
                  <Paperclip className="h-5 w-5" />
                </Button>

                {/* Prompt Input */}
                <div className="flex-1">
                  <Textarea
                    placeholder="Describe how you want to complete your images..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (uploadedImages.length > 0 && prompt.trim() && !isGenerating) {
                          handleGenerate();
                        }
                      }
                    }}
                    className="min-h-[44px] max-h-32 resize-none bg-background border-border/50 focus:border-primary transition-smooth py-3"
                    rows={1}
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={uploadedImages.length === 0 || !prompt.trim() || isGenerating}
                  className="shrink-0 h-11 gradient-primary hover:opacity-90 text-primary-foreground font-semibold transition-smooth shadow-elegant"
                >
                  <Wand2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Quick Examples - Only show when no images uploaded */}
              {uploadedImages.length === 0 && messages.length === 0 && (
                <div className="mt-3 flex gap-2 flex-wrap">
                  <button 
                    onClick={() => setPrompt("Complete this portrait with photorealistic details")}
                    className="text-xs px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground"
                  >
                    Portrait enhancement
                  </button>
                  <button 
                    onClick={() => setPrompt("Transform this sketch into vibrant digital artwork")}
                    className="text-xs px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground"
                  >
                    Artistic style
                  </button>
                  <button 
                    onClick={() => setPrompt("Complete this landscape with dramatic sunset lighting")}
                    className="text-xs px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground"
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
  );
};