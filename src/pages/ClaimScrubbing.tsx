import { ClaimScrubber } from "@/components/ClaimScrubber";
import { Shield, FileCheck, AlertTriangle, Settings, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

const validationRules = [
  {
    category: "Medicare Rules",
    rules: [
      { name: "CCI Edits", description: "Correct Coding Initiative edits", active: true, critical: true },
      { name: "LCD Compliance", description: "Local Coverage Determination rules", active: true, critical: true },
      { name: "NCD Verification", description: "National Coverage Determination check", active: true, critical: true },
      { name: "Modifier Requirements", description: "Required modifier validation", active: true, critical: false }
    ]
  },
  {
    category: "Commercial Payers",
    rules: [
      { name: "Pre-authorization Check", description: "Verify authorization requirements", active: true, critical: true },
      { name: "Eligibility Verification", description: "Patient eligibility validation", active: true, critical: true },
      { name: "Benefit Coverage", description: "Service coverage validation", active: true, critical: false },
      { name: "Copay Calculation", description: "Patient responsibility calculation", active: false, critical: false }
    ]
  },
  {
    category: "General Edits",
    rules: [
      { name: "Code Compatibility", description: "ICD-10 and CPT compatibility check", active: true, critical: true },
      { name: "Medical Necessity", description: "Medical necessity validation", active: true, critical: true },
      { name: "Duplicate Check", description: "Duplicate claim detection", active: true, critical: false },
      { name: "Age/Gender Edits", description: "Age and gender specific validations", active: true, critical: false }
    ]
  }
];

const scrubberMetrics = {
  totalProcessed: 1847,
  passedValidation: 1523,
  flaggedForReview: 234,
  criticalErrors: 90,
  avgProcessingTime: "1.3s",
  accuracyRate: "96.8%"
};

const ClaimScrubbing = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">AI Claim Scrubber</h1>
        <p className="text-muted-foreground">
          Real-time claim validation with payer-specific rules and compliance checking
        </p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Processed</p>
                <p className="text-2xl font-bold text-foreground">{scrubberMetrics.totalProcessed}</p>
              </div>
              <FileCheck className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Validated</p>
                <p className="text-2xl font-bold text-success">{scrubberMetrics.passedValidation}</p>
              </div>
              <Shield className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Flagged</p>
                <p className="text-2xl font-bold text-warning">{scrubberMetrics.flaggedForReview}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Errors</p>
                <p className="text-2xl font-bold text-danger">{scrubberMetrics.criticalErrors}</p>
              </div>
              <div className="w-8 h-8 bg-danger rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">!</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Processing Time</p>
              <p className="text-xl font-bold text-clinical-blue">{scrubberMetrics.avgProcessingTime}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Accuracy</p>
              <p className="text-xl font-bold text-clinical-green">{scrubberMetrics.accuracyRate}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active-scrubbing" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active-scrubbing" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Active Scrubbing</span>
          </TabsTrigger>
          <TabsTrigger value="validation-rules" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Validation Rules</span>
          </TabsTrigger>
          <TabsTrigger value="batch-processing" className="flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>Batch Processing</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active-scrubbing">
          <ClaimScrubber />
        </TabsContent>

        <TabsContent value="validation-rules" className="space-y-6">
          {validationRules.map((category) => (
            <Card key={category.category} className="clinical-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-primary" />
                  <span>{category.category}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.rules.map((rule, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Switch checked={rule.active} />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-foreground">{rule.name}</span>
                          {rule.critical && (
                            <Badge variant="destructive" className="text-xs">Critical</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{rule.description}</p>
                      </div>
                    </div>
                    <Badge 
                      className={rule.active 
                        ? "bg-success/10 text-success border-success/20" 
                        : "bg-muted text-muted-foreground"
                      }
                    >
                      {rule.active ? "Active" : "Disabled"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          <Card className="clinical-card">
            <CardHeader>
              <CardTitle>Rule Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-success/5 border border-success/20 rounded-lg">
                  <div className="text-2xl font-bold text-success">23</div>
                  <div className="text-sm text-muted-foreground">Active Rules</div>
                </div>
                <div className="text-center p-4 bg-warning/5 border border-warning/20 rounded-lg">
                  <div className="text-2xl font-bold text-warning">156</div>
                  <div className="text-sm text-muted-foreground">Catches Today</div>
                </div>
                <div className="text-center p-4 bg-clinical-blue/5 border border-clinical-blue/20 rounded-lg">
                  <div className="text-2xl font-bold text-clinical-blue">98.7%</div>
                  <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                </div>
                <div className="text-center p-4 bg-clinical-green/5 border border-clinical-green/20 rounded-lg">
                  <div className="text-2xl font-bold text-clinical-green">$12,450</div>
                  <div className="text-sm text-muted-foreground">Prevented Denials</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="batch-processing" className="space-y-4">
          <Card className="clinical-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-primary" />
                <span>Batch Claim Processing</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-6 border-2 border-dashed border-clinical-blue/30 rounded-lg">
                  <FileCheck className="w-12 h-12 text-clinical-blue mx-auto mb-3" />
                  <h3 className="font-medium text-foreground mb-2">Queue Claims</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add claims to processing queue
                  </p>
                  <Button variant="outline">
                    Add to Queue
                  </Button>
                </div>
                
                <div className="text-center p-6 border-2 border-dashed border-success/30 rounded-lg">
                  <Zap className="w-12 h-12 text-success mx-auto mb-3" />
                  <h3 className="font-medium text-foreground mb-2">Process Batch</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Run validation on queued claims
                  </p>
                  <Button className="success-gradient">
                    Start Processing
                  </Button>
                </div>
                
                <div className="text-center p-6 border-2 border-dashed border-warning/30 rounded-lg">
                  <AlertTriangle className="w-12 h-12 text-warning mx-auto mb-3" />
                  <h3 className="font-medium text-foreground mb-2">Review Results</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Review flagged claims
                  </p>
                  <Button variant="outline">
                    View Results
                  </Button>
                </div>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h4 className="font-medium text-foreground mb-4">Processing Status</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Claims in Queue</span>
                    <Badge className="bg-primary/10 text-primary border-primary/20">47</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Currently Processing</span>
                    <Badge className="bg-clinical-blue/10 text-clinical-blue border-clinical-blue/20">12</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Completed Today</span>
                    <Badge className="bg-success/10 text-success border-success/20">234</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Estimated Time Remaining</span>
                    <span className="text-sm font-medium">~4 minutes</span>
                  </div>
                </div>
              </div>

              <Button className="w-full medical-gradient" size="lg">
                <Zap className="w-5 h-5 mr-2" />
                Start Emergency Batch Processing
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClaimScrubbing;