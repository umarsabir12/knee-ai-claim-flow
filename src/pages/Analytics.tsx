import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react";

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Performance Analytics</h1>
        <p className="text-muted-foreground">
          Real-time insights into your RCM workflow performance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Claims Processed
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Processing Time
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 min</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 mr-1 text-green-500" />
              -8% improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Coding Accuracy
            </CardTitle>
            <Badge variant="outline">AI Powered</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.7%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
              +2.1% accuracy boost
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Revenue Impact
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.2M</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
              +18% increase
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Workflow Efficiency</CardTitle>
            <CardDescription>
              End-to-end process performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">AI Medical Coder</span>
              <Badge variant="outline" className="text-green-600">Excellent</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Claim Scrubber</span>
              <Badge variant="outline" className="text-green-600">Excellent</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Denial Management</span>
              <Badge variant="outline" className="text-yellow-600">Good</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quality Indicators</CardTitle>
            <CardDescription>
              Key quality metrics across the RCM workflow
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">First Pass Rate</span>
              <span className="text-sm font-bold">94.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Clean Claims Rate</span>
              <span className="text-sm font-bold">96.8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Denial Rate</span>
              <span className="text-sm font-bold">3.2%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;