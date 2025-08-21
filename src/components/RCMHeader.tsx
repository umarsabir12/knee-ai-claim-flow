import { Activity, Brain, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const RCMHeader = () => {
  return (
    <header className="bg-card border-b border-border medical-shadow">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 medical-gradient rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">RCM AI Suite</h1>
                <p className="text-sm text-muted-foreground">Arthritis Care Revenue Management</p>
              </div>
            </div>
          </div>
          
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