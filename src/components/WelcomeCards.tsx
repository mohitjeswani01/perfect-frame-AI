import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  Wand2, 
  Sparkles, 
  Image, 
  Palette, 
  Zap,
  ArrowRight,
  Plus
} from "lucide-react";
import { toast } from "sonner";

export const WelcomeCards = () => {
  const handleStartProject = () => {
    toast.success("Let's create something amazing!");
  };

  const handleViewExample = (example: string) => {
    toast.success(`Viewing ${example} example`);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 space-y-8">
      {/* Welcome Header */}
      <div className="text-center space-y-4 max-w-2xl">
        <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-glow mx-auto">
          <Sparkles className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Let's Complete Images Together
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Transform your incomplete images into masterpieces with the power of AI. 
          Upload your source and reference images, then watch the magic happen.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Start New Project Card */}
        <Card className="gradient-card border-border/50 hover:border-primary/30 transition-smooth group">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-smooth">
              <Plus className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-foreground">Start New Project</h3>
              <p className="text-muted-foreground">
                Begin your AI image completion journey. Upload your images and let our AI work its magic.
              </p>
            </div>
            <Button 
              onClick={handleStartProject}
              size="lg" 
              className="w-full gradient-primary hover:opacity-90 text-primary-foreground font-semibold transition-smooth shadow-elegant"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Images
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Quick Examples Card */}
        <Card className="gradient-card border-border/50 hover:border-primary/30 transition-smooth group">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto group-hover:bg-accent/30 transition-smooth">
              <Image className="w-10 h-10 text-accent-foreground" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-foreground">Quick Examples</h3>
              <p className="text-muted-foreground">
                Explore different AI completion techniques with our curated examples and tutorials.
              </p>
            </div>
            <Button 
              onClick={() => handleViewExample("Gallery")}
              variant="outline" 
              size="lg" 
              className="w-full border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-smooth"
            >
              <Palette className="w-5 h-5 mr-2" />
              View Gallery
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Feature Highlights */}
      <div className="grid sm:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="text-center space-y-3 p-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mx-auto">
            <Wand2 className="w-6 h-6 text-orange-400" />
          </div>
          <h4 className="font-semibold text-foreground">Style Transfer</h4>
          <p className="text-sm text-muted-foreground">
            Apply artistic styles from reference images to your incomplete artwork
          </p>
        </div>

        <div className="text-center space-y-3 p-4">
          <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6 text-rose-400" />
          </div>
          <h4 className="font-semibold text-foreground">Smart Completion</h4>
          <p className="text-sm text-muted-foreground">
            AI intelligently fills missing parts while maintaining visual coherence
          </p>
        </div>

        <div className="text-center space-y-3 p-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto">
            <Zap className="w-6 h-6 text-blue-400" />
          </div>
          <h4 className="font-semibold text-foreground">Lightning Fast</h4>
          <p className="text-sm text-muted-foreground">
            Get professional results in seconds with our optimized AI pipeline
          </p>
        </div>
      </div>

      {/* Tips */}
      <div className="text-center max-w-xl">
        <p className="text-sm text-muted-foreground">
          <strong>Pro tip:</strong> For best results, use high-quality reference images that match 
          the style or content you want to achieve in your final image.
        </p>
      </div>
    </div>
  );
};