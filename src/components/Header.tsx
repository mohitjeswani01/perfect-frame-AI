import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Settings, HelpCircle, User, LogOut, Sparkles, Crown, CreditCard, Bell } from "lucide-react";
import { toast } from "sonner";
import { SettingsDialog } from "./SettingsDialog";
import { HelpDialog } from "./HelpDialog";

interface HeaderProps {
  onLogout: () => void;
}

export const Header = ({ onLogout }: HeaderProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const handleMenuClick = (action: string) => {
    switch (action) {
      case "Settings":
        setSettingsOpen(true);
        break;
      case "Help":
        setHelpOpen(true);
        break;
      case "Profile":
        toast.success("Profile page coming soon!");
        break;
      case "Upgrade":
        toast.success("Upgrade to Pro for unlimited generations!");
        break;
      case "Billing":
        toast.success("Billing management coming soon!");
        break;
      case "Notifications":
        toast.success("No new notifications");
        break;
      case "Logout":
        toast.success("Signing out...");
        setTimeout(onLogout, 1000);
        break;
      default:
        toast(`${action} clicked`);
    }
  };

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shadow-glow">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-foreground">PerfectFrame AI</h1>
          <p className="text-xs text-muted-foreground">Image Completion Studio</p>
        </div>
      </div>

      {/* User Controls */}
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => handleMenuClick("Notifications")}
          className="hover:bg-muted transition-smooth relative"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => handleMenuClick("Help")}
          className="hover:bg-muted transition-smooth"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => handleMenuClick("Settings")}
          className="hover:bg-muted transition-smooth"
        >
          <Settings className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <div className="px-2 py-1.5 text-sm font-medium">
              <div className="text-foreground">John Doe</div>
              <div className="text-muted-foreground text-xs">john@example.com</div>
            </div>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={() => handleMenuClick("Profile")}>
              <User className="mr-2 h-4 w-4" />
              My Profile
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => handleMenuClick("Upgrade")}>
              <Crown className="mr-2 h-4 w-4 text-yellow-500" />
              Upgrade to Pro
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => handleMenuClick("Billing")}>
              <CreditCard className="mr-2 h-4 w-4" />
              Billing & Usage
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={() => handleMenuClick("Settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => handleMenuClick("Help")}>
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              onClick={() => handleMenuClick("Logout")}
              className="text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Dialogs */}
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      <HelpDialog open={helpOpen} onOpenChange={setHelpOpen} />
    </header>
  );
};