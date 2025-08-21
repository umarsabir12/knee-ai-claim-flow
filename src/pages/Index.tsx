import { RCMHeader } from "@/components/RCMHeader";
import { WorkflowStatus } from "@/components/WorkflowStatus";
import { AIMedicalCoder } from "@/components/AIMedicalCoder";
import { ClaimScrubber } from "@/components/ClaimScrubber";
import { DenialManagement } from "@/components/DenialManagement";
import { Activity, Brain, Shield } from "lucide-react";
import medicalHero from "@/assets/medical-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <RCMHeader />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${medicalHero})` }}
        ></div>
        <div className="relative bg-gradient-to-r from-clinical-blue/10 via-transparent to-clinical-green/10">
          <div className="container mx-auto px-6 py-16">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                AI-Driven Revenue Cycle Management
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Automated medical coding, claim scrubbing, and denial management 
                for arthritis care providers. Streamline your RCM workflow with 
                advanced AI technology.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3 p-4 clinical-card">
                  <Brain className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">AI Medical Coding</h3>
                    <p className="text-sm text-muted-foreground">Automated ICD-10 & CPT assignment</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 clinical-card">
                  <Shield className="w-8 h-8 text-success" />
                  <div>
                    <h3 className="font-semibold text-foreground">Claim Validation</h3>
                    <p className="text-sm text-muted-foreground">Real-time scrubbing & compliance</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 clinical-card">
                  <Activity className="w-8 h-8 text-warning" />
                  <div>
                    <h3 className="font-semibold text-foreground">Denial Management</h3>
                    <p className="text-sm text-muted-foreground">Intelligent corrective actions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <main className="container mx-auto px-6 py-8 space-y-8">
        <WorkflowStatus />
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <AIMedicalCoder />
          <ClaimScrubber />
        </div>
        
        <DenialManagement />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 AI RCM Suite - Healthcare Revenue Cycle Management Platform</p>
            <p className="mt-2">HIPAA Compliant | SOC 2 Certified | Medical AI Technology</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;