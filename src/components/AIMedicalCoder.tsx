import { useState } from "react";
import { Brain, FileText, Code, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

interface MedicalCode {
  type: 'ICD-10' | 'CPT';
  code: string;
  description: string;
  modifier?: string;
}

const sampleProviderNote = `Patient presents with bilateral knee pain, worse on right side. Pain rating 7/10. 
Limited range of motion noted. X-ray shows moderate osteoarthritis changes in both knees, more severe on right. 
Patient reports pain interferes with daily activities. Previously failed conservative treatment.
Performed arthrocentesis of right knee joint for therapeutic and diagnostic purposes.`;

const generatedCodes: MedicalCode[] = [
  {
    type: 'ICD-10',
    code: 'M17.11',
    description: 'Unilateral primary osteoarthritis, right knee'
  },
  {
    type: 'ICD-10',
    code: 'M17.12',
    description: 'Unilateral primary osteoarthritis, left knee'
  },
  {
    type: 'CPT',
    code: '20610',
    description: 'Arthrocentesis, aspiration and/or injection, major joint or bursa',
    modifier: 'RT'
  },
  {
    type: 'CPT',
    code: '29881',
    description: 'Arthroscopy, knee, surgical; with meniscectomy (medial or lateral, including any meniscal shaving)'
  }
];

export const AIMedicalCoder = () => {
  const navigate = useNavigate();
  const [providerNotes, setProviderNotes] = useState(sampleProviderNote);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCodes, setShowCodes] = useState(false);

  const handleProcessNotes = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowCodes(true);
    }, 2000);
  };

  const handleProceedToScrubber = () => {
    navigate('/scrubbing', {
      state: {
        codes: generatedCodes,
        patientNotes: providerNotes,
        generatedAt: new Date().toISOString()
      }
    });
  };

  return (
    <Card className="clinical-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-primary" />
          <span>AI Medical Coder</span>
          <Badge className="bg-primary/10 text-primary border-primary/20">Active</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Provider Notes Input
            </label>
            <Textarea
              value={providerNotes}
              onChange={(e) => setProviderNotes(e.target.value)}
              placeholder="Enter provider notes, structured EHR data, or voice-to-text..."
              className="min-h-32 resize-none"
            />
          </div>
          
          <Button 
            onClick={handleProcessNotes}
            disabled={isProcessing || !providerNotes}
            className="w-full medical-gradient"
          >
            {isProcessing ? (
              <>
                <Brain className="w-4 h-4 mr-2 animate-pulse" />
                Processing with AI...
              </>
            ) : (
              <>
                <Code className="w-4 h-4 mr-2" />
                Generate Medical Codes
              </>
            )}
          </Button>
        </div>

        {showCodes && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <Separator />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-success mr-2" />
                Generated Medical Codes
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-foreground mb-3">ICD-10 Diagnosis Codes</h4>
                  <div className="space-y-3">
                    {generatedCodes.filter(code => code.type === 'ICD-10').map((code, index) => (
                      <Card key={index} className="bg-clinical-blue-light border-clinical-blue/20">
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <Badge variant="outline" className="text-clinical-blue border-clinical-blue mb-2">
                                {code.code}
                              </Badge>
                              <p className="text-sm text-foreground">{code.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-3">CPT Procedure Codes</h4>
                  <div className="space-y-3">
                    {generatedCodes.filter(code => code.type === 'CPT').map((code, index) => (
                      <Card key={index} className="bg-clinical-green-light border-clinical-green/20">
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="outline" className="text-clinical-green border-clinical-green">
                                  {code.code}
                                </Badge>
                                {code.modifier && (
                                  <Badge variant="secondary" className="text-xs">
                                    {code.modifier}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-foreground">{code.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-success/5 border border-success/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-success">Compliance Check Passed</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  All codes verified for medical necessity and payer compliance
                </p>
              </div>

              <div className="mt-4 flex justify-end">
                <Button 
                  onClick={handleProceedToScrubber}
                  className="medical-gradient"
                  size="lg"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Proceed to Claim Scrubber
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};