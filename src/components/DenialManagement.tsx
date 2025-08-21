import { AlertTriangle, TrendingDown, RefreshCw, FileText, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const readyToResubmit = denials.filter(d => d.status === 'ready-for-resubmission').length;
  const needsAppeal = denials.filter(d => d.status === 'appeal-required').length;
  const analyzing = denials.filter(d => d.status === 'analyzing').length;

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
                      
                      {denial.status === 'ready-for-resubmission' && (
                        <Button className="w-full success-gradient">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Prepare Resubmission
                        </Button>
                      )}
                      
                      {denial.status === 'appeal-required' && (
                        <Button variant="outline" className="w-full">
                          <FileText className="w-4 h-4 mr-2" />
                          Generate Appeal Letter
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