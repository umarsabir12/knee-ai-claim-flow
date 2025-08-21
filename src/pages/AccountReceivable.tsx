import { DollarSign, Clock, AlertCircle, CheckCircle, TrendingUp, Eye, Download, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import jsPDF from 'jspdf';

const arMetrics = {
  totalAR: "$124,580",
  current: "$89,240",
  aging30: "$18,750",
  aging60: "$10,890",
  aging90: "$5,700",
  daysOutstanding: "28.5",
  collectionRate: "94.2%"
};

const aging = [
  { period: "0-30 days", amount: 89240, percentage: 71.6, color: "success" },
  { period: "31-60 days", amount: 18750, percentage: 15.1, color: "warning" },
  { period: "61-90 days", amount: 10890, percentage: 8.7, color: "danger" },
  { period: "90+ days", amount: 5700, percentage: 4.6, color: "destructive" }
];

const outstandingClaims = [
  {
    id: 'AR-2024-0234',
    patient: 'Michael R.',
    amount: '$485.00',
    age: 23,
    payer: 'Blue Cross Blue Shield',
    status: 'pending',
    lastAction: 'Submitted 23 days ago'
  },
  {
    id: 'AR-2024-0235',
    patient: 'Jennifer L.',
    amount: '$750.00',
    age: 45,
    payer: 'Medicare',
    status: 'follow-up',
    lastAction: 'Follow-up sent 5 days ago'
  },
  {
    id: 'AR-2024-0236',
    patient: 'David K.',
    amount: '$325.00',
    age: 67,
    payer: 'Aetna',
    status: 'escalated',
    lastAction: 'Escalated to supervisor'
  },
  {
    id: 'AR-2024-0237',
    patient: 'Sarah M.',
    amount: '$920.00',
    age: 12,
    payer: 'United Healthcare',
    status: 'pending',
    lastAction: 'Submitted 12 days ago'
  }
];

const paymentPlans = [
  {
    id: 'PP-2024-089',
    patient: 'Robert T.',
    totalAmount: '$1,250.00',
    monthlyPayment: '$125.00',
    remainingBalance: '$875.00',
    nextDue: '2024-02-15',
    status: 'active'
  },
  {
    id: 'PP-2024-090',
    patient: 'Maria G.',
    totalAmount: '$650.00',
    monthlyPayment: '$65.00',
    remainingBalance: '$325.00',
    nextDue: '2024-02-20',
    status: 'active'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <Clock className="w-4 h-4 text-warning" />;
    case 'follow-up':
      return <AlertCircle className="w-4 h-4 text-primary" />;
    case 'escalated':
      return <AlertCircle className="w-4 h-4 text-danger" />;
    case 'active':
      return <CheckCircle className="w-4 h-4 text-success" />;
    default:
      return <Clock className="w-4 h-4 text-muted-foreground" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
    case 'follow-up':
      return <Badge className="bg-primary/10 text-primary border-primary/20">Follow-up</Badge>;
    case 'escalated':
      return <Badge className="bg-danger/10 text-danger border-danger/20">Escalated</Badge>;
    case 'active':
      return <Badge className="bg-success/10 text-success border-success/20">Active</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const AccountReceivable = () => {
  const handleGenerateStatement = (claim: any) => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Account Statement', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Claim ID: ${claim.id}`, 20, 40);
    doc.text(`Patient: ${claim.patient}`, 20, 50);
    doc.text(`Amount: ${claim.amount}`, 20, 60);
    doc.text(`Age: ${claim.age} days`, 20, 70);
    doc.text(`Payer: ${claim.payer}`, 20, 80);
    doc.text(`Status: ${claim.status.toUpperCase()}`, 20, 90);
    doc.text(`Last Action: ${claim.lastAction}`, 20, 100);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 120);
    
    doc.save(`statement-${claim.id}.pdf`);
  };

  const handleViewStatement = (claim: any) => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Account Statement', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Claim ID: ${claim.id}`, 20, 40);
    doc.text(`Patient: ${claim.patient}`, 20, 50);
    doc.text(`Amount: ${claim.amount}`, 20, 60);
    doc.text(`Age: ${claim.age} days`, 20, 70);
    doc.text(`Payer: ${claim.payer}`, 20, 80);
    doc.text(`Status: ${claim.status.toUpperCase()}`, 20, 90);
    doc.text(`Last Action: ${claim.lastAction}`, 20, 100);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 120);
    
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Account Receivable</h1>
        <p className="text-muted-foreground">
          Monitor outstanding claims, aging analysis, and payment collections
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total A/R</p>
                <p className="text-2xl font-bold text-foreground">{arMetrics.totalAR}</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current</p>
                <p className="text-2xl font-bold text-success">{arMetrics.current}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">31-60 Days</p>
                <p className="text-2xl font-bold text-warning">{arMetrics.aging30}</p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">61-90 Days</p>
                <p className="text-2xl font-bold text-danger">{arMetrics.aging60}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-danger" />
            </div>
          </CardContent>
        </Card>

        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">90+ Days</p>
                <p className="text-2xl font-bold text-destructive">{arMetrics.aging90}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Avg Days Outstanding</p>
              <p className="text-xl font-bold text-clinical-blue">{arMetrics.daysOutstanding}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="clinical-card">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Collection Rate</p>
              <p className="text-xl font-bold text-success">{arMetrics.collectionRate}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="aging-analysis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="aging-analysis" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Aging Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="outstanding-claims" className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Outstanding Claims</span>
          </TabsTrigger>
          <TabsTrigger value="payment-plans" className="flex items-center space-x-2">
            <CreditCard className="w-4 h-4" />
            <span>Payment Plans</span>
          </TabsTrigger>
          <TabsTrigger value="collections" className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4" />
            <span>Collections</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="aging-analysis" className="space-y-4">
          <Card className="clinical-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>A/R Aging Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aging.map((period, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{period.period}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        ${period.amount.toLocaleString()}
                      </span>
                      <Badge variant="outline">{period.percentage}%</Badge>
                    </div>
                  </div>
                  <Progress value={period.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outstanding-claims" className="space-y-4">
          <Card className="clinical-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-warning" />
                  <span>Outstanding Claims</span>
                </div>
                <Badge className="bg-warning/10 text-warning border-warning/20">
                  {outstandingClaims.length} Claims
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {outstandingClaims.map((claim) => (
                <Card key={claim.id} className="bg-card border border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-mono text-sm font-medium">{claim.id}</span>
                          {getStatusIcon(claim.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">Patient: {claim.patient}</p>
                        <p className="text-xs text-muted-foreground">Payer: {claim.payer}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">{claim.amount}</p>
                        <p className="text-sm text-muted-foreground">{claim.age} days old</p>
                        {getStatusBadge(claim.status)}
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 border border-border rounded p-2 mb-3">
                      <p className="text-sm text-muted-foreground">{claim.lastAction}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewStatement(claim)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        className="medical-gradient"
                        onClick={() => handleGenerateStatement(claim)}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Statement
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment-plans" className="space-y-4">
          <Card className="clinical-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-success" />
                <span>Active Payment Plans</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentPlans.map((plan) => (
                <Card key={plan.id} className="bg-card border border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-mono text-sm font-medium">{plan.id}</span>
                          {getStatusIcon(plan.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">Patient: {plan.patient}</p>
                        <p className="text-xs text-muted-foreground">Next Due: {plan.nextDue}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">{plan.remainingBalance}</p>
                        <p className="text-sm text-muted-foreground">of {plan.totalAmount}</p>
                        {getStatusBadge(plan.status)}
                      </div>
                    </div>
                    
                    <div className="bg-success/5 border border-success/20 rounded p-2 mb-3">
                      <p className="text-sm text-success">Monthly Payment: {plan.monthlyPayment}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View Plan
                      </Button>
                      <Button size="sm" className="success-gradient">
                        <CreditCard className="w-4 h-4 mr-1" />
                        Process Payment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collections" className="space-y-4">
          <Card className="clinical-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-clinical-green" />
                <span>Collections Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-success/5 border border-success/20 rounded-lg">
                  <div className="text-3xl font-bold text-success mb-1">$47,250</div>
                  <div className="text-sm text-muted-foreground">Collected This Month</div>
                </div>
                <div className="text-center p-4 bg-clinical-blue/5 border border-clinical-blue/20 rounded-lg">
                  <div className="text-3xl font-bold text-clinical-blue mb-1">94.2%</div>
                  <div className="text-sm text-muted-foreground">Collection Rate</div>
                </div>
                <div className="text-center p-4 bg-warning/5 border border-warning/20 rounded-lg">
                  <div className="text-3xl font-bold text-warning mb-1">28.5</div>
                  <div className="text-sm text-muted-foreground">Avg Days to Collect</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Collections This Week</span>
                  <span className="text-sm font-medium">$12,450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Average Claim Value</span>
                  <span className="text-sm font-medium">$485</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Bad Debt Write-offs</span>
                  <span className="text-sm font-medium">$1,250</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Net Collection Rate</span>
                  <span className="text-sm font-medium">89.3%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountReceivable;