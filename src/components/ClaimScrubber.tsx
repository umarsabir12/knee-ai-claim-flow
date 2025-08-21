import { useState, useEffect } from "react";
import { Shield, CheckCircle, AlertTriangle, Clock, FileCheck, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

interface ClaimValidation {
  id: string;
  patientName: string;
  codes: string[];
  status: 'validated' | 'flagged' | 'processing';
  issues: string[];
  payerRules: string;
}

const claimValidations: ClaimValidation[] = [
  {
    id: 'CLM-2024-0847',
    patientName: 'John D. (DOB: 03/15/1965)',
    codes: ['M17.11', '20610-RT'],
    status: 'validated',
    issues: [],
    payerRules: 'Medicare - Passed all CCI edits'
  },
  {
    id: 'CLM-2024-0848',
    patientName: 'Sarah M. (DOB: 07/22/1958)',
    codes: ['M17.12', '29881'],
    status: 'flagged',
    issues: ['Missing pre-authorization', 'Requires additional documentation'],
    payerRules: 'Blue Cross - LCD verification needed'
  },
  {
    id: 'CLM-2024-0849',
    patientName: 'Robert K. (DOB: 11/08/1972)',
    codes: ['M17.11', 'M17.12', '20610-50'],
    status: 'processing',
    issues: [],
    payerRules: 'Aetna - Running CCI edits'
  }
];

const getStatusIcon = (status: ClaimValidation['status']) => {
  switch (status) {
    case 'validated':
      return <CheckCircle className="w-4 h-4 text-success" />;
    case 'flagged':
      return <AlertTriangle className="w-4 h-4 text-warning" />;
    case 'processing':
      return <Clock className="w-4 h-4 text-primary animate-spin" />;
  }
};

const getStatusBadge = (status: ClaimValidation['status']) => {
  switch (status) {
    case 'validated':
      return <Badge className="bg-success/10 text-success border-success/20">Ready for Submission</Badge>;
    case 'flagged':
      return <Badge className="bg-warning/10 text-warning border-warning/20">Requires Revision</Badge>;
    case 'processing':
      return <Badge className="bg-primary/10 text-primary border-primary/20">Processing</Badge>;
  }
};

export const ClaimScrubber = () => {
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasIncomingClaim, setHasIncomingClaim] = useState(false);
  const [claimReady, setClaimReady] = useState(false);
  const [incomingCodes, setIncomingCodes] = useState(null);
  
  const validatedCount = claimValidations.filter(c => c.status === 'validated').length;
  const flaggedCount = claimValidations.filter(c => c.status === 'flagged').length;
  const processingCount = claimValidations.filter(c => c.status === 'processing').length;

  useEffect(() => {
    if (location.state?.codes) {
      setIncomingCodes(location.state);
      setHasIncomingClaim(true);
      // Auto-process the incoming claim
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setClaimReady(true);
      }, 2000);
    }
  }, [location.state]);

  const handleSubmitClaim = () => {
    alert('Claim submitted to insurance successfully!');
    setClaimReady(false);
    setHasIncomingClaim(false);
    setIncomingCodes(null);
  };

  return (
    <div className="space-y-6">
      {/* Incoming Claim from AI Coder */}
      {hasIncomingClaim && (
        <Card className="clinical-card border-2 border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileCheck className="w-5 h-5 text-primary" />
              <span>Incoming Claim from AI Medical Coder</span>
              {claimReady ? (
                <Badge className="bg-success/10 text-success border-success/20">Ready for Submission</Badge>
              ) : (
                <Badge className="bg-clinical-blue/10 text-clinical-blue border-clinical-blue/20">Processing</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {incomingCodes && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-clinical-blue" />
                    ICD-10 Codes
                  </h4>
                  <div className="space-y-2">
                    {incomingCodes.codes.filter(code => code.type === 'ICD-10').map((code, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-clinical-blue-light rounded">
                        <div>
                          <Badge variant="outline" className="text-clinical-blue border-clinical-blue mr-2">
                            {code.code}
                          </Badge>
                          <span className="text-sm">{code.description}</span>
                        </div>
                        <CheckCircle className="w-4 h-4 text-success" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2 flex items-center">
                    <FileCheck className="w-4 h-4 mr-2 text-clinical-green" />
                    CPT Codes
                  </h4>
                  <div className="space-y-2">
                    {incomingCodes.codes.filter(code => code.type === 'CPT').map((code, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-clinical-green-light rounded">
                        <div>
                          <Badge variant="outline" className="text-clinical-green border-clinical-green mr-2">
                            {code.code}
                          </Badge>
                          {code.modifier && (
                            <Badge variant="secondary" className="text-xs mr-2">
                              {code.modifier}
                            </Badge>
                          )}
                          <span className="text-sm">{code.description}</span>
                        </div>
                        <CheckCircle className="w-4 h-4 text-success" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {isProcessing && (
              <div className="flex items-center justify-center p-6 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <span className="text-sm text-muted-foreground">Validating claim against payer rules...</span>
                </div>
              </div>
            )}

            {claimReady && (
              <div className="space-y-4">
                <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="font-medium text-success">Claim Validation Complete</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <span className="ml-2 font-medium text-success">Ready for Submission</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Payer Rules:</span>
                      <span className="ml-2 font-medium text-success">All Passed</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Estimated Reimbursement:</span>
                      <span className="ml-2 font-medium text-primary">$1,247.50</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button variant="outline">
                    Review Details
                  </Button>
                  <Button onClick={handleSubmitClaim} className="medical-gradient">
                    <Send className="w-4 h-4 mr-2" />
                    Submit to Insurance
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

    <Card className="clinical-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-primary" />
            <span>AI Claim Scrubber</span>
          </div>
          <Badge className="bg-primary/10 text-primary border-primary/20">Real-time Validation</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-success/5 border border-success/20 rounded-lg">
            <div className="text-2xl font-bold text-success">{validatedCount}</div>
            <div className="text-sm text-muted-foreground">Ready for Submission</div>
          </div>
          <div className="text-center p-4 bg-warning/5 border border-warning/20 rounded-lg">
            <div className="text-2xl font-bold text-warning">{flaggedCount}</div>
            <div className="text-sm text-muted-foreground">Requires Revision</div>
          </div>
          <div className="text-center p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="text-2xl font-bold text-primary">{processingCount}</div>
            <div className="text-sm text-muted-foreground">Currently Processing</div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Recent Claim Validations</h3>
          {claimValidations.map((claim) => (
            <Card key={claim.id} className="bg-card border border-border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-mono text-sm font-medium">{claim.id}</span>
                      {getStatusIcon(claim.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{claim.patientName}</p>
                  </div>
                  {getStatusBadge(claim.status)}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <FileCheck className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Codes:</span>
                    <div className="flex space-x-1">
                      {claim.codes.map((code, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {code}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Payer Rules: </span>
                    {claim.payerRules}
                  </div>
                  
                  {claim.issues.length > 0 && (
                    <div className="bg-warning/5 border border-warning/20 rounded p-3">
                      <h4 className="text-sm font-medium text-warning mb-2">Issues Found:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {claim.issues.map((issue, index) => (
                          <li key={index} className="text-sm text-muted-foreground">{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {claim.status === 'processing' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Validation Progress</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button className="w-full medical-gradient">
          <Shield className="w-4 h-4 mr-2" />
          Run Batch Validation
        </Button>
      </CardContent>
    </Card>
    </div>
  );
};