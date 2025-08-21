import { WorkflowStatus } from "@/components/WorkflowStatus";
import { Activity, Brain, Shield, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const todayStats = {
    totalClaims: 247,
    coded: 189,
    validated: 156,
    submitted: 134,
    denials: 8,
    revenue: 45750
  };

  const recentActivity = [
    {
      id: 1,
      action: "AI Coded 15 new claims",
      time: "2 minutes ago",
      icon: Brain,
      status: "success"
    },
    {
      id: 2,
      action: "Claim validation completed",
      time: "5 minutes ago", 
      icon: Shield,
      status: "success"
    },
    {
      id: 3,
      action: "Denial received - requires attention",
      time: "12 minutes ago",
      icon: TrendingUp,
      status: "warning"
    },
    {
      id: 4,
      action: "Batch submission sent to Medicare",
      time: "1 hour ago",
      icon: CheckCircle,
      status: "success"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">RCM Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time overview of your revenue cycle management workflow
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Claims</p>
                <p className="text-2xl font-bold text-foreground">{todayStats.totalClaims}</p>
              </div>
              <Activity className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AI Coded</p>
                <p className="text-2xl font-bold text-clinical-blue">{todayStats.coded}</p>
              </div>
              <Brain className="w-8 h-8 text-clinical-blue" />
            </div>
          </CardContent>
        </Card>

        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Validated</p>
                <p className="text-2xl font-bold text-success">{todayStats.validated}</p>
              </div>
              <Shield className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Submitted</p>
                <p className="text-2xl font-bold text-clinical-green">{todayStats.submitted}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-clinical-green" />
            </div>
          </CardContent>
        </Card>

        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Denials</p>
                <p className="text-2xl font-bold text-warning">{todayStats.denials}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold text-foreground">${todayStats.revenue.toLocaleString()}</p>
              </div>
              <div className="w-8 h-8 medical-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">$</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workflow Status */}
      <WorkflowStatus />

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="clinical-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <activity.icon className={`w-5 h-5 ${
                  activity.status === 'success' ? 'text-success' : 
                  activity.status === 'warning' ? 'text-warning' : 'text-primary'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="clinical-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start medical-gradient" size="lg">
              <Brain className="w-5 h-5 mr-3" />
              Process New Provider Notes
            </Button>
            <Button className="w-full justify-start" variant="outline" size="lg">
              <Shield className="w-5 h-5 mr-3" />
              Run Batch Validation
            </Button>
            <Button className="w-full justify-start" variant="outline" size="lg">
              <CheckCircle className="w-5 h-5 mr-3" />
              Submit Ready Claims
            </Button>
            <Button className="w-full justify-start" variant="outline" size="lg">
              <TrendingUp className="w-5 h-5 mr-3" />
              Review Pending Denials
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Indicators */}
      <Card className="clinical-card">
        <CardHeader>
          <CardTitle>Today's Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">94.2%</div>
              <div className="text-sm text-muted-foreground">Coding Accuracy</div>
              <Badge className="mt-2 bg-success/10 text-success border-success/20">
                +2.1% vs yesterday
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-clinical-blue mb-2">87.8%</div>
              <div className="text-sm text-muted-foreground">First Pass Rate</div>
              <Badge className="mt-2 bg-clinical-blue/10 text-clinical-blue border-clinical-blue/20">
                +1.5% vs yesterday
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-clinical-green mb-2">2.1 days</div>
              <div className="text-sm text-muted-foreground">Avg Processing Time</div>
              <Badge className="mt-2 bg-clinical-green/10 text-clinical-green border-clinical-green/20">
                -0.3 days vs yesterday
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning mb-2">3.2%</div>
              <div className="text-sm text-muted-foreground">Denial Rate</div>
              <Badge className="mt-2 bg-warning/10 text-warning border-warning/20">
                -0.8% vs yesterday
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;