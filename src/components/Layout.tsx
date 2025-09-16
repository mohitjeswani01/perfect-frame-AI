import { useState } from "react";
import { ProjectSidebar } from "./ProjectSidebar";
import { Workspace } from "./Workspace";
import { Header } from "./Header";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen w-full bg-background overflow-hidden">
      <Header />
      
      <div className="flex h-[calc(100vh-4rem)] w-full">
        {/* Sidebar */}
        <div className={`sidebar-bg border-r border-border transition-smooth ${
          sidebarOpen ? "w-80" : "w-0"
        } overflow-hidden`}>
          <ProjectSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 relative">
          {/* Sidebar Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-4 left-4 z-10 bg-card/80 backdrop-blur-sm border border-border/50 hover:bg-card shadow-card transition-smooth"
          >
            {sidebarOpen ? (
              <PanelLeftClose className="h-4 w-4" />
            ) : (
              <PanelLeftOpen className="h-4 w-4" />
            )}
          </Button>

          {/* Workspace */}
          <div className="h-full gradient-workspace">
            <Workspace />
          </div>
        </div>
      </div>
    </div>
  );
};