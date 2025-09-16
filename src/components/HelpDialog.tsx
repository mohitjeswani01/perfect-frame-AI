import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  HelpCircle, 
  BookOpen, 
  MessageCircle, 
  Mail, 
  ExternalLink,
  Zap,
  Image,
  Wand2,
  Upload,
  Download,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const HelpDialog = ({ open, onOpenChange }: HelpDialogProps) => {
  const handleContactSupport = () => {
    toast.success("Opening support chat...");
  };

  const handleOpenGuide = (guide: string) => {
    toast.success(`Opening ${guide} guide...`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <HelpCircle className="h-5 w-5 text-primary" />
            Help & Support
          </DialogTitle>
          <DialogDescription>
            Learn how to make the most of PerfectFrame AI
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Start */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="h-4 w-4" />
                Quick Start Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Upload Your Images</h4>
                    <p className="text-sm text-muted-foreground">
                      Upload an incomplete image and a reference image for style guidance
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Write Your Prompt</h4>
                    <p className="text-sm text-muted-foreground">
                      Describe what you want to achieve with detailed instructions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Generate & Download</h4>
                    <p className="text-sm text-muted-foreground">
                      Let AI work its magic and download your completed image
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-4 w-4" />
                Feature Guides
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4"
                onClick={() => handleOpenGuide("Image Upload")}
              >
                <div className="flex items-center gap-3">
                  <Upload className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">Image Upload Best Practices</p>
                    <p className="text-sm text-muted-foreground">Learn about supported formats and optimal sizes</p>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4"
                onClick={() => handleOpenGuide("AI Prompting")}
              >
                <div className="flex items-center gap-3">
                  <Wand2 className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">Writing Effective Prompts</p>
                    <p className="text-sm text-muted-foreground">Tips for getting the best AI results</p>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4"
                onClick={() => handleOpenGuide("Image Processing")}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">Understanding AI Processing</p>
                    <p className="text-sm text-muted-foreground">How our AI completes and enhances images</p>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4"
                onClick={() => handleOpenGuide("Export Options")}
              >
                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">Export & Download Options</p>
                    <p className="text-sm text-muted-foreground">Different formats and quality settings</p>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageCircle className="h-4 w-4" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-1">What image formats are supported?</h4>
                  <p className="text-sm text-muted-foreground">
                    We support JPG, PNG, WebP, and TIFF formats up to 50MB in size.
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-1">How long does processing take?</h4>
                  <p className="text-sm text-muted-foreground">
                    Most images are processed within 30-60 seconds, depending on complexity and server load.
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-1">Can I use my own AI models?</h4>
                  <p className="text-sm text-muted-foreground">
                    Currently, we use our proprietary AI models. Custom model support is coming soon.
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-1">Is there a mobile app?</h4>
                  <p className="text-sm text-muted-foreground">
                    The web app is fully responsive and works great on mobile devices. Native apps are in development.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Mail className="h-4 w-4" />
                Need More Help?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              
              <div className="grid gap-2">
                <Button onClick={handleContactSupport} className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Live Chat
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                
                <Button variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Help Center
                </Button>
              </div>

              <div className="pt-2 text-center">
                <p className="text-xs text-muted-foreground">
                  Average response time: Less than 2 hours
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};