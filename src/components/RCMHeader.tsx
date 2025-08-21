import { Activity, Brain, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const RCMHeader = () => {
  return (
    <header className="bg-card border-b border-border medical-shadow">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">AI Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-success" />
                  <span className="text-sm font-medium text-foreground">HIPAA Compliant</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="default" className="medical-gradient">
                <TrendingUp className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>
        </div>
    </header>
  );
};