import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Image, Clock, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Project {
  id: string;
  name: string;
  timestamp: string;
  preview: string;
  starred: boolean;
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Sunset Landscape Enhancement",
    timestamp: "2 hours ago",
    preview: "Enhanced mountain sunset with improved colors and lighting",
    starred: true
  },
  {
    id: "2", 
    name: "Portrait Background Completion",
    timestamp: "1 day ago",
    preview: "Professional headshot with completed background scenery",
    starred: false
  },
  {
    id: "3",
    name: "Architecture Photo Restoration",
    timestamp: "3 days ago", 
    preview: "Historic building restoration with missing elements completed",
    starred: true
  },
  {
    id: "4",
    name: "Product Photography Enhancement",
    timestamp: "1 week ago",
    preview: "E-commerce product image with enhanced background and lighting",
    starred: false
  }
];

interface ProjectSidebarProps {
  onViewGallery: () => void;
  selectedProjectId: string;
  onProjectChange: (projectId: string) => void;
}

export const ProjectSidebar = ({ onViewGallery, selectedProjectId, onProjectChange }: ProjectSidebarProps) => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  const handleNewProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: `Project ${projects.length + 1}`,
      timestamp: "Just now",
      preview: "New AI image completion project",
      starred: false
    };
    
    setProjects([newProject, ...projects]);
    onProjectChange(newProject.id);
    
    toast("New project started", {
      description: "Ready to create amazing AI-enhanced images!"
    });
  };

  const toggleStar = (projectId: string) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, starred: !p.starred } : p
    ));
  };

  const deleteProject = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId));
    toast("Project deleted", { description: "Project removed from history" });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border space-y-3">
        <Button 
          onClick={handleNewProject}
          className="w-full gradient-primary hover:shadow-glow transition-glow text-primary-foreground border-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
        
        <Button 
          onClick={onViewGallery}
          variant="outline"
          className="w-full border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-smooth"
        >
          <Image className="w-4 h-4 mr-2" />
          View Gallery
        </Button>
      </div>

      {/* Projects List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          <div className="px-2 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Recent Projects
          </div>
          
          <div className="space-y-2">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => onProjectChange(project.id)}
                className={`group relative p-3 rounded-lg border cursor-pointer transition-smooth ${
                  selectedProjectId === project.id
                    ? "bg-accent border-ring shadow-card"
                    : "bg-card/50 border-border/50 hover:bg-card hover:border-border"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Image className="w-4 h-4 text-primary shrink-0" />
                    <h3 className="font-medium text-sm text-foreground truncate">
                      {project.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-smooth ml-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(project.id);
                      }}
                      className="h-6 w-6"
                    >
                      <Star className={`w-3 h-3 ${
                        project.starred ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                      }`} />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProject(project.id);
                      }}
                      className="h-6 w-6 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {project.preview}
                </p>
                
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {project.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};