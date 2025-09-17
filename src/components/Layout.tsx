import { useState } from "react";
import { ProjectSidebar } from "./ProjectSidebar";
import { Workspace } from "./Workspace";
import { Gallery } from "./Gallery";
import { Header } from "./Header";
import { Login } from "./Login";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<"workspace" | "gallery">("workspace");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSidebarOpen(true); // Reset sidebar state
    setCurrentView("workspace");
  };

  const handleViewGallery = () => {
    setCurrentView("gallery");
  };

  const handleBackToWorkspace = () => {
    setCurrentView("workspace");
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen w-full bg-background overflow-hidden">
      <Header onLogout={handleLogout} />
      
      <div className="flex h-[calc(100vh-4rem)] w-full relative">
        {/* Sidebar Overlay */}
        <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] sidebar-bg border-r border-border transition-all duration-300 z-40 ${
          sidebarOpen ? "w-80 translate-x-0" : "w-80 -translate-x-full"
        } overflow-hidden shadow-2xl`}>
          <ProjectSidebar onViewGallery={handleViewGallery} />
        </div>

        {/* Backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 top-16"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 relative w-full">
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

          {/* Content */}
          <div className="h-full gradient-workspace">
            {currentView === "gallery" ? (
              <Gallery onBack={handleBackToWorkspace} />
            ) : (
              <Workspace onViewGallery={handleViewGallery} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};