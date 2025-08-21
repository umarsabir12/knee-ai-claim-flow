import { DenialManagement as DenialManagementComponent } from "@/components/DenialManagement";
import { TrendingDown, RefreshCw, FileText, BarChart3, AlertTriangle, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const denialMetrics = {
  totalDenials: 89,
  readyForResubmission: 34,
  needsAppeal: 18,
  analyzing: 12,
  resolved: 25,
  avgResolutionTime: "3.2 days",
  successRate: "87.5%"
};

const denialCategories = [
  { name: "Authorization Missing", count: 23, trend: "+12%", color: "warning" },
  { name: "Coding Errors", count: 18, trend: "-8%", color: "danger" },
  { name: "Medical Necessity", count: 15, trend: "+5%", color: "clinical-blue" },
  { name: "Eligibility Issues", count: 12, trend: "-15%", color: "success" },
  { name: "Duplicate Claims", count: 8, trend: "-22%", color: "muted" },
  { name: "Other", count: 13, trend: "+3%", color: "accent" }
];

const resubmissionQueue = [
  {
    id: 'RSB-2024-0089',
    patient: 'Michael R.',
    originalDenial: 'CO-16 - Lacks information',
    action: 'Added laterality modifier',
    priority: 'high',
    estimatedValue: '$485'
  },
  {
    id: 'RSB-2024-0090', 
    patient: 'Jennifer L.',
    originalDenial: 'CO-197 - Missing authorization',
    action: 'Authorization obtained',
    priority: 'medium',
    estimatedValue: '$750'
  },
  {
    id: 'RSB-2024-0091',
    patient: 'David K.',
    originalDenial: 'CO-11 - Diagnosis inconsistent',
    action: 'Updated diagnosis code',
    priority: 'low',
    estimatedValue: '$325'
  }
];

const appealTemplates = [
  {
    name: "Medical Necessity Appeal",
    description: "Template for medical necessity denials with clinical documentation",
    useCount: 47,
    successRate: "92%"
  },
  {
    name: "Authorization Appeal", 
    description: "Template for retroactive authorization requests",
    useCount: 23,
    successRate: "78%"
  },
  {
    name: "Coding Appeal",
    description: "Template for incorrect coding determination appeals", 
    useCount: 31,
    successRate: "84%"
  }
];

const DenialManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">AI Denial Management</h1>
        <p className="text-muted-foreground">
          Intelligent denial analysis, corrective actions, and automated resubmission preparation
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Denials</p>
                <p className="text-2xl font-bold text-foreground">{denialMetrics.totalDenials}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-danger" />
            </div>
          </CardContent>
        </Card>

        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ready</p>
                <p className="text-2xl font-bold text-success">{denialMetrics.readyForResubmission}</p>
              </div>
              <RefreshCw className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Appeals</p>
                <p className="text-2xl font-bold text-warning">{denialMetrics.needsAppeal}</p>
              </div>
              <FileText className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Analyzing</p>
                <p className="text-2xl font-bold text-primary">{denialMetrics.analyzing}</p>
              </div>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold text-clinical-green">{denialMetrics.resolved}</p>
              </div>
              <Target className="w-8 h-8 text-clinical-green" />
            </div>
          </CardContent>
        </Card>

        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Avg Resolution</p>
              <p className="text-xl font-bold text-clinical-blue">{denialMetrics.avgResolutionTime}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-xl font-bold text-success">{denialMetrics.successRate}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active-denials" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active-denials" className="flex items-center space-x-2">
            <TrendingDown className="w-4 h-4" />
            <span>Active Denials</span>
          </TabsTrigger>
          <TabsTrigger value="resubmission-queue" className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Resubmission Queue</span>
          </TabsTrigger>
          <TabsTrigger value="appeal-center" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Appeal Center</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active-denials">
          <DenialManagementComponent />
        </TabsContent>

        <TabsContent value="resubmission-queue" className="space-y-4">
          <Card className="clinical-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RefreshCw className="w-5 h-5 text-success" />
                  <span>Resubmission Queue</span>
                </div>
                <Badge className="bg-success/10 text-success border-success/20">
                  {resubmissionQueue.length} Ready
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {resubmissionQueue.map((item) => (
                <Card key={item.id} className="bg-card border border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-mono text-sm font-medium">{item.id}</span>
                          <Badge 
                            className={
                              item.priority === 'high' ? 'bg-danger/10 text-danger border-danger/20' :
                              item.priority === 'medium' ? 'bg-warning/10 text-warning border-warning/20' :
                              'bg-muted text-muted-foreground'
                            }
                          >
                            {item.priority} priority
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Patient: {item.patient}</p>
                        <p className="text-xs text-muted-foreground">Value: {item.estimatedValue}</p>
                      </div>
                      <Button className="success-gradient">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Resubmit
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="bg-danger/5 border border-danger/20 rounded p-2">
                        <p className="text-sm font-medium text-danger">Original Denial:</p>
                        <p className="text-sm text-muted-foreground">{item.originalDenial}</p>
                      </div>
                      <div className="bg-success/5 border border-success/20 rounded p-2">
                        <p className="text-sm font-medium text-success">Corrective Action:</p>
                        <p className="text-sm text-muted-foreground">{item.action}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button className="w-full medical-gradient" size="lg">
                <RefreshCw className="w-5 h-5 mr-2" />
                Process All Resubmissions ({resubmissionQueue.length} claims)
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appeal-center" className="space-y-4">
          <Card className="clinical-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-warning" />
                <span>Appeal Letter Templates</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {appealTemplates.map((template, index) => (
                <Card key={index} className="bg-card border border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground mb-1">{template.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Used {template.useCount} times</span>
                          <span>Success rate: {template.successRate}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm" className="medical-gradient">
                          Use Template
                        </Button>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-success h-2 rounded-full transition-all duration-300"
                        style={{ width: template.successRate }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="clinical-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span>Denial Categories Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {denialCategories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{category.name}</span>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        className={
                          category.trend.startsWith('+') 
                            ? 'bg-danger/10 text-danger border-danger/20' 
                            : 'bg-success/10 text-success border-success/20'
                        }
                      >
                        {category.trend}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{category.count} cases</span>
                    </div>
                  </div>
                  <Progress value={(category.count / denialMetrics.totalDenials) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="clinical-card">
              <CardHeader>
                <CardTitle>Resolution Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-success/5 border border-success/20 rounded-lg">
                  <div className="text-3xl font-bold text-success mb-1">{denialMetrics.successRate}</div>
                  <div className="text-sm text-muted-foreground">Overall Success Rate</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Resolution Time</span>
                    <span className="text-sm font-medium">{denialMetrics.avgResolutionTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Appeals Won</span>
                    <span className="text-sm font-medium">78.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Resubmission Success</span>
                    <span className="text-sm font-medium">94.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="clinical-card">
              <CardHeader>
                <CardTitle>Financial Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-clinical-green/5 border border-clinical-green/20 rounded-lg">
                  <div className="text-3xl font-bold text-clinical-green mb-1">$47,250</div>
                  <div className="text-sm text-muted-foreground">Recovered This Month</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Claim Value</span>
                    <span className="text-sm font-medium">$485</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Revenue at Risk</span>
                    <span className="text-sm font-medium">$12,850</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Recovery Rate</span>
                    <span className="text-sm font-medium">89.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DenialManagement;