import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Palette, 
  Zap, 
  Shield, 
  Monitor
} from "lucide-react";
import { toast } from "sonner";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  const [settings, setSettings] = useState({
    notifications: true,
    autoSave: true,
    highQuality: false,
    darkMode: true,
    imageQuality: [85],
  });

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark' || savedTheme === null; // Default to dark
    setSettings(prev => ({ ...prev, darkMode: isDark }));
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    // Handle dark mode toggle
    if (key === 'darkMode') {
      document.documentElement.classList.toggle('dark', value);
      localStorage.setItem('theme', value ? 'dark' : 'light');
    }
    
    toast.success("Settings updated");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Palette className="h-5 w-5 text-primary" />
            Settings
          </DialogTitle>
          <DialogDescription>
            Customize your PerfectFrame AI experience
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Monitor className="h-4 w-4" />
                General
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Use dark theme for better focus</p>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => updateSetting('darkMode', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Auto-save Projects</p>
                  <p className="text-sm text-muted-foreground">Automatically save your work</p>
                </div>
                <Switch
                  checked={settings.autoSave}
                  onCheckedChange={(checked) => updateSetting('autoSave', checked)}
                />
              </div>

            </CardContent>
          </Card>

          {/* AI Processing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="h-4 w-4" />
                AI Processing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">High Quality Mode</p>
                  <p className="text-sm text-muted-foreground">Enhanced AI processing (slower)</p>
                </div>
                <Switch
                  checked={settings.highQuality}
                  onCheckedChange={(checked) => updateSetting('highQuality', checked)}
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="font-medium">Output Quality</p>
                  <p className="text-sm text-muted-foreground">
                    Compression level: {settings.imageQuality[0]}%
                  </p>
                </div>
                <Slider
                  value={settings.imageQuality}
                  onValueChange={(value) => updateSetting('imageQuality', value)}
                  max={100}
                  min={50}
                  step={5}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-4 w-4" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive app notifications</p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => updateSetting('notifications', checked)}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy Policy
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => {
            toast.success("Settings saved successfully!");
            onOpenChange(false);
          }}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};