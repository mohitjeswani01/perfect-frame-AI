import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Heart, Eye } from "lucide-react";

interface GalleryImage {
  id: string;
  title: string;
  before: string;
  after: string;
  prompt: string;
  style: string;
}

const mockGalleryImages: GalleryImage[] = [
  {
    id: "1",
    title: "Portrait Enhancement",
    before: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    after: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face&brightness=1.2&contrast=1.1",
    prompt: "Complete this portrait with photorealistic details, maintaining natural skin tones and lighting",
    style: "Photorealistic"
  },
  {
    id: "2", 
    title: "Landscape Completion",
    before: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
    after: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&saturation=1.3",
    prompt: "Complete this landscape scene with dramatic sunset lighting and enhanced atmospheric depth",
    style: "Cinematic"
  },
  {
    id: "3",
    title: "Artistic Style Transfer",
    before: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop",
    after: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop&hue=45",
    prompt: "Transform this sketch into a vibrant digital artwork with bold colors and modern artistic style",
    style: "Digital Art"
  },
  {
    id: "4",
    title: "Architecture Enhancement",
    before: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=300&h=300&fit=crop",
    after: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=300&h=300&fit=crop&contrast=1.2",
    prompt: "Complete this architectural shot with enhanced details and perfect lighting",
    style: "Architectural"
  },
  {
    id: "5",
    title: "Nature Scene",
    before: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop",
    after: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop&saturation=1.2",
    prompt: "Enhance this forest scene with magical lighting and atmospheric effects",
    style: "Fantasy"
  },
  {
    id: "6",
    title: "Urban Photography",
    before: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=300&h=300&fit=crop",
    after: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=300&h=300&fit=crop&brightness=1.1",
    prompt: "Complete this urban scene with vibrant city lights and dynamic atmosphere",
    style: "Urban"
  }
];

interface GalleryProps {
  onBack: () => void;
}

export const Gallery = ({ onBack }: GalleryProps) => {
  return (
    <div className="h-full overflow-auto">
      <div className="p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">AI Gallery</h1>
              <p className="text-muted-foreground">Explore amazing AI-completed images</p>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockGalleryImages.map((image) => (
              <Card key={image.id} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
                <CardContent className="p-4">
                  {/* Before/After Images */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Before</p>
                        <div className="aspect-square rounded-lg overflow-hidden">
                          <img
                            src={image.before}
                            alt={`${image.title} - Before`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-primary uppercase tracking-wide">After</p>
                        <div className="aspect-square rounded-lg overflow-hidden">
                          <img
                            src={image.after}
                            alt={`${image.title} - After`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground">{image.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {image.style}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {image.prompt}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};