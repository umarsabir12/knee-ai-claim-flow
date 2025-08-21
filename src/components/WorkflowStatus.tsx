import { CheckCircle, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WorkflowStep {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'pending' | 'flagged';
  count?: number;
  description: string;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: '1',
    title: 'AI Medical Coder',
    status: 'completed',
    count: 47,
    description: 'Provider notes processed & coded'
  },
  {
    id: '2',
    title: 'Claim Scrubber',
    status: 'in-progress',
    count: 12,
    description: 'Claims being validated'
  },
  {
    id: '3',
    title: 'Submission Ready',
    status: 'completed',
    count: 35,
    description: 'Claims ready for payers'
  },
  {
    id: '4',
    title: 'Denial Management',
    status: 'flagged',
    count: 8,
    description: 'Requires attention'
  }
];

const getStatusIcon = (status: WorkflowStep['status']) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-5 h-5 text-success" />;
    case 'in-progress':
      return <Clock className="w-5 h-5 text-primary animate-spin" />;
    case 'flagged':
      return <AlertTriangle className="w-5 h-5 text-warning" />;
    default:
      return <Clock className="w-5 h-5 text-muted-foreground" />;
  }
};

const getStatusBadge = (status: WorkflowStep['status']) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-success/10 text-success border-success/20">Complete</Badge>;
    case 'in-progress':
      return <Badge className="bg-primary/10 text-primary border-primary/20">Processing</Badge>;
    case 'flagged':
      return <Badge className="bg-warning/10 text-warning border-warning/20">Attention</Badge>;
    default:
      return <Badge variant="secondary">Pending</Badge>;
  }
};

export const WorkflowStatus = () => {
  return (
    <Card className="clinical-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>RCM Workflow Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {workflowSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="relative">
                <Card className="clinical-card hover:elevated-shadow transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      {getStatusIcon(step.status)}
                      {getStatusBadge(step.status)}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm">{step.title}</h3>
                      {step.count && (
                        <div className="text-2xl font-bold text-foreground">{step.count}</div>
                      )}
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {index < workflowSteps.length - 1 && (
                <ArrowRight className="w-5 h-5 text-muted-foreground mx-4 hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};