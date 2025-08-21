import { AlertTriangle, TrendingDown, RefreshCw, FileText, BarChart3, Download, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import jsPDF from 'jspdf';

interface Denial {
  id: string;
  patientName: string;
  originalCodes: string[];
  denialCode: string;
  denialReason: string;
  suggestedAction: string;
  correctiveCodes?: string[];
  status: 'analyzing' | 'ready-for-resubmission' | 'appeal-required';
  dateReceived: string;
}

const denials: Denial[] = [
  {
    id: 'DEN-2024-0156',
    patientName: 'Michael R. (DOB: 04/12/1969)',
    originalCodes: ['M17.11', '29881'],
    denialCode: 'CO-16',
    denialReason: 'Claim lacks information or has submission error',
    suggestedAction: 'Add modifier -LT to specify laterality',
    correctiveCodes: ['M17.11', '29881-LT'],
    status: 'ready-for-resubmission',
    dateReceived: '2024-01-15'
  },
  {
    id: 'DEN-2024-0157',
    patientName: 'Lisa T. (DOB: 09/30/1962)',
    originalCodes: ['M17.12', '20610'],
    denialCode: 'CO-197',
    denialReason: 'Precertification/authorization/notification absent',
    suggestedAction: 'Obtain pre-authorization and resubmit with auth number',
    status: 'appeal-required',
    dateReceived: '2024-01-14'
  },
  {
    id: 'DEN-2024-0158',
    patientName: 'David L. (DOB: 12/05/1975)',
    originalCodes: ['M17.11', 'M17.12', '29881'],
    denialCode: 'CO-11',
    denialReason: 'The diagnosis is inconsistent with the procedure',
    suggestedAction: 'AI analyzing medical records for appropriate diagnosis code',
    status: 'analyzing',
    dateReceived: '2024-01-16'
  }
];

const denialTrends = [
  { category: 'Missing Authorization', count: 12, percentage: 35 },
  { category: 'Coding Errors', count: 8, percentage: 24 },
  { category: 'Medical Necessity', count: 7, percentage: 21 },
  { category: 'Eligibility Issues', count: 4, percentage: 12 },
  { category: 'Duplicate Claims', count: 3, percentage: 8 }
];

const getStatusIcon = (status: Denial['status']) => {
  switch (status) {
    case 'ready-for-resubmission':
      return <RefreshCw className="w-4 h-4 text-success" />;
    case 'appeal-required':
      return <FileText className="w-4 h-4 text-warning" />;
    case 'analyzing':
      return <AlertTriangle className="w-4 h-4 text-primary animate-pulse" />;
  }
};

const getStatusBadge = (status: Denial['status']) => {
  switch (status) {
    case 'ready-for-resubmission':
      return <Badge className="bg-success/10 text-success border-success/20">Ready to Resubmit</Badge>;
    case 'appeal-required':
      return <Badge className="bg-warning/10 text-warning border-warning/20">Appeal Required</Badge>;
    case 'analyzing':
      return <Badge className="bg-primary/10 text-primary border-primary/20">AI Analyzing</Badge>;
  }
};

export const DenialManagement = () => {
  const [insuranceResponse, setInsuranceResponse] = useState('');
  const [selectedDenialId, setSelectedDenialId] = useState<string | null>(null);
  const [isRescrubbing, setIsRescrubbing] = useState<string | null>(null);
  
  const readyToResubmit = denials.filter(d => d.status === 'ready-for-resubmission').length;
  const needsAppeal = denials.filter(d => d.status === 'appeal-required').length;
  const analyzing = denials.filter(d => d.status === 'analyzing').length;

  const handleRescrub = async (denialId: string) => {
    if (!insuranceResponse.trim()) return;
    
    setIsRescrubbing(denialId);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRescrubbing(null);
    setInsuranceResponse('');
    setSelectedDenialId(null);
  };

  const generateClaimPDF = (denial: Denial) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('Medical Claim Resubmission', 20, 20);
    
    // Claim details
    doc.setFontSize(12);
    doc.text(`Claim ID: ${denial.id}`, 20, 40);
    doc.text(`Patient: ${denial.patientName}`, 20, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 60);
    
    // Original codes
    doc.text('Original Codes:', 20, 80);
    denial.originalCodes.forEach((code, index) => {
      doc.text(`- ${code}`, 30, 90 + (index * 10));
    });
    
    // Corrective codes
    if (denial.correctiveCodes) {
      doc.text('Corrective Codes:', 20, 110 + (denial.originalCodes.length * 10));
      denial.correctiveCodes.forEach((code, index) => {
        doc.text(`- ${code}`, 30, 120 + (denial.originalCodes.length * 10) + (index * 10));
      });
    }
    
    // Action taken
    doc.text('Corrective Action:', 20, 150 + (denial.originalCodes.length * 10));
    doc.text(denial.suggestedAction, 20, 160 + (denial.originalCodes.length * 10));
    
    return doc;
  };

  const handleDownload = (denial: Denial) => {
    const doc = generateClaimPDF(denial);
    doc.save(`resubmission-${denial.id}.pdf`);
  };

  const handleView = (denial: Denial) => {
    const doc = generateClaimPDF(denial);
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
  };

  return (
    <Card className="clinical-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingDown className="w-5 h-5 text-danger" />
          <span>AI Denial Management</span>
          <Badge className="bg-danger/10 text-danger border-danger/20">
            {denials.length} Active Denials
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="denials" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="denials">Active Denials</TabsTrigger>
            <TabsTrigger value="analytics">Trend Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="denials" className="space-y-4">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-success/5 border border-success/20 rounded-lg">
                <div className="text-2xl font-bold text-success">{readyToResubmit}</div>
                <div className="text-sm text-muted-foreground">Ready to Resubmit</div>
              </div>
              <div className="text-center p-4 bg-warning/5 border border-warning/20 rounded-lg">
                <div className="text-2xl font-bold text-warning">{needsAppeal}</div>
                <div className="text-sm text-muted-foreground">Appeal Required</div>
              </div>
              <div className="text-center p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="text-2xl font-bold text-primary">{analyzing}</div>
                <div className="text-sm text-muted-foreground">AI Analyzing</div>
              </div>
            </div>

            <div className="space-y-4">
              {denials.map((denial) => (
                <Card key={denial.id} className="bg-card border border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-mono text-sm font-medium">{denial.id}</span>
                          {getStatusIcon(denial.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{denial.patientName}</p>
                      </div>
                      {getStatusBadge(denial.status)}
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-danger/5 border border-danger/20 rounded p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <AlertTriangle className="w-4 h-4 text-danger" />
                          <span className="text-sm font-medium text-danger">
                            Denial Code: {denial.denialCode}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{denial.denialReason}</p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium">Original Codes: </span>
                        <div className="flex space-x-1 mt-1">
                          {denial.originalCodes.map((code, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {code}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-clinical-blue-light border border-clinical-blue/20 rounded p-3">
                        <h4 className="text-sm font-medium text-clinical-blue mb-1">
                          AI Suggested Action:
                        </h4>
                        <p className="text-sm text-foreground">{denial.suggestedAction}</p>
                        
                        {denial.correctiveCodes && (
                          <div className="mt-2">
                            <span className="text-xs text-muted-foreground">Corrective Codes: </span>
                            <div className="flex space-x-1 mt-1">
                              {denial.correctiveCodes.map((code, index) => (
                                <Badge key={index} className="bg-success/10 text-success border-success/20 text-xs">
                                  {code}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Insurance Response Input */}
                      {selectedDenialId === denial.id && (
                        <div className="space-y-3 mt-4 p-4 bg-muted/50 border border-border rounded-lg">
                          <label className="text-sm font-medium text-foreground">
                            Insurance Company Response:
                          </label>
                          <Textarea 
                            placeholder="Enter the insurance company's response or denial explanation..."
                            value={insuranceResponse}
                            onChange={(e) => setInsuranceResponse(e.target.value)}
                            className="min-h-[100px]"
                          />
                          <div className="flex space-x-2">
                            <Button 
                              onClick={() => handleRescrub(denial.id)}
                              disabled={!insuranceResponse.trim() || isRescrubbing === denial.id}
                              className="flex-1"
                            >
                              {isRescrubbing === denial.id ? (
                                <>
                                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                  Rescrubbing...
                                </>
                              ) : (
                                <>
                                  <RefreshCw className="w-4 h-4 mr-2" />
                                  Rescrub Claim
                                </>
                              )}
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                setSelectedDenialId(null);
                                setInsuranceResponse('');
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}

                      {denial.status === 'ready-for-resubmission' && (
                        <div className="flex space-x-2">
                          <Button 
                            onClick={() => handleView(denial)}
                            variant="outline" 
                            className="flex-1"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Claim
                          </Button>
                          <Button 
                            onClick={() => handleDownload(denial)}
                            className="flex-1 success-gradient"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      )}
                      
                      {denial.status === 'appeal-required' && selectedDenialId !== denial.id && (
                        <Button 
                          onClick={() => setSelectedDenialId(denial.id)}
                          variant="outline" 
                          className="w-full"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Enter Insurance Response
                        </Button>
                      )}

                      {denial.status === 'analyzing' && selectedDenialId !== denial.id && (
                        <Button 
                          onClick={() => setSelectedDenialId(denial.id)}
                          variant="outline" 
                          className="w-full"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Add Insurance Response
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Denial Trend Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {denialTrends.map((trend, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{trend.category}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{trend.count} claims</span>
                        <Badge variant="outline">{trend.percentage}%</Badge>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${trend.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h4 className="text-sm font-medium text-primary mb-2">AI Insights</h4>
                  <p className="text-sm text-muted-foreground">
                    Authorization-related denials have increased 15% this month. 
                    Consider implementing pre-authorization workflow automation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};