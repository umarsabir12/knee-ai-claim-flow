import { AIMedicalCoder } from "@/components/AIMedicalCoder";
import { Brain, FileText, Code2, History, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CodingHistory {
  id: string;
  patientName: string;
  processedAt: string;
  codes: { type: string; code: string; description: string; }[];
  status: 'completed' | 'pending' | 'reviewed';
}

const codingHistory: CodingHistory[] = [
  {
    id: 'COD-2024-0234',
    patientName: 'Jennifer L. (DOB: 08/14/1967)',
    processedAt: '2024-01-18 14:30',
    codes: [
      { type: 'ICD-10', code: 'M17.11', description: 'Unilateral primary osteoarthritis, right knee' },
      { type: 'CPT', code: '20610-RT', description: 'Arthrocentesis, aspiration and/or injection, major joint' }
    ],
    status: 'completed'
  },
  {
    id: 'COD-2024-0235',
    patientName: 'Robert K. (DOB: 11/08/1972)',
    processedAt: '2024-01-18 13:45',
    codes: [
      { type: 'ICD-10', code: 'M17.12', description: 'Unilateral primary osteoarthritis, left knee' },
      { type: 'CPT', code: '29881', description: 'Arthroscopy, knee, surgical; with meniscectomy' }
    ],
    status: 'completed'
  },
  {
    id: 'COD-2024-0236',
    patientName: 'Sarah M. (DOB: 07/22/1958)',
    processedAt: '2024-01-18 12:15',
    codes: [
      { type: 'ICD-10', code: 'M17.11', description: 'Unilateral primary osteoarthritis, right knee' },
      { type: 'ICD-10', code: 'M25.561', description: 'Pain in right knee' }
    ],
    status: 'reviewed'
  }
];

const commonCodes = [
  {
    category: 'ICD-10 Diagnosis Codes',
    codes: [
      { code: 'M17.11', description: 'Unilateral primary osteoarthritis, right knee', frequency: '87%' },
      { code: 'M17.12', description: 'Unilateral primary osteoarthritis, left knee', frequency: '82%' },
      { code: 'M17.0', description: 'Bilateral primary osteoarthritis of knee', frequency: '45%' },
      { code: 'M25.561', description: 'Pain in right knee', frequency: '76%' },
      { code: 'M25.562', description: 'Pain in left knee', frequency: '71%' }
    ]
  },
  {
    category: 'CPT Procedure Codes',
    codes: [
      { code: '20610', description: 'Arthrocentesis, aspiration and/or injection, major joint', frequency: '93%' },
      { code: '29881', description: 'Arthroscopy, knee, surgical; with meniscectomy', frequency: '67%' },
      { code: '27447', description: 'Total knee arthroplasty', frequency: '34%' },
      { code: '29879', description: 'Arthroscopy, knee, surgical; abrasion arthroplasty', frequency: '29%' },
      { code: '29877', description: 'Arthroscopy, knee, surgical; debridement/shaving', frequency: '52%' }
    ]
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-success/10 text-success border-success/20">Completed</Badge>;
    case 'reviewed':
      return <Badge className="bg-clinical-blue/10 text-clinical-blue border-clinical-blue/20">Reviewed</Badge>;
    default:
      return <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
  }
};

const Coding = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">AI Medical Coder</h1>
        <p className="text-muted-foreground">
          Automated ICD-10 and CPT code assignment with AI-powered analysis
        </p>
      </div>

      <Tabs defaultValue="new-coding" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="new-coding" className="flex items-center space-x-2">
            <Brain className="w-4 h-4" />
            <span>New Coding</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center space-x-2">
            <History className="w-4 h-4" />
            <span>History</span>
          </TabsTrigger>
          <TabsTrigger value="common-codes" className="flex items-center space-x-2">
            <Code2 className="w-4 h-4" />
            <span>Common Codes</span>
          </TabsTrigger>
          <TabsTrigger value="bulk-upload" className="flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Bulk Upload</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new-coding">
          <AIMedicalCoder />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="clinical-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <History className="w-5 h-5 text-primary" />
                <span>Coding History</span>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {codingHistory.length} Records
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {codingHistory.map((record) => (
                <Card key={record.id} className="bg-card border border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-mono text-sm font-medium">{record.id}</span>
                          {getStatusBadge(record.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{record.patientName}</p>
                        <p className="text-xs text-muted-foreground">{record.processedAt}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Generated Codes:</h4>
                      <div className="flex flex-wrap gap-2">
                        {record.codes.map((code, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className={code.type === 'ICD-10' 
                              ? 'text-clinical-blue border-clinical-blue/30' 
                              : 'text-clinical-green border-clinical-green/30'
                            }
                          >
                            {code.code} - {code.description}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="common-codes" className="space-y-6">
          {commonCodes.map((category) => (
            <Card key={category.category} className="clinical-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code2 className="w-5 h-5 text-primary" />
                  <span>{category.category}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {category.codes.map((code, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="font-mono">
                          {code.code}
                        </Badge>
                        <span className="text-sm font-medium">{code.description}</span>
                      </div>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      {code.frequency}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="bulk-upload" className="space-y-4">
          <Card className="clinical-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5 text-primary" />
                <span>Bulk Provider Notes Upload</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Upload Provider Notes
                </h3>
                <p className="text-muted-foreground mb-4">
                  Upload CSV, Excel, or text files containing provider notes for batch processing
                </p>
                <Button className="medical-gradient">
                  <Upload className="w-4 h-4 mr-2" />
                  Select Files
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-clinical-blue-light border border-clinical-blue/20 rounded-lg">
                  <div className="text-2xl font-bold text-clinical-blue">0</div>
                  <div className="text-sm text-muted-foreground">Files Queued</div>
                </div>
                <div className="text-center p-4 bg-success/5 border border-success/20 rounded-lg">
                  <div className="text-2xl font-bold text-success">0</div>
                  <div className="text-sm text-muted-foreground">Processed</div>
                </div>
                <div className="text-center p-4 bg-warning/5 border border-warning/20 rounded-lg">
                  <div className="text-2xl font-bold text-warning">0</div>
                  <div className="text-sm text-muted-foreground">Errors</div>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Supported Formats:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• CSV files with provider notes column</li>
                  <li>• Excel files (.xlsx, .xls) with structured data</li>
                  <li>• Plain text files with one note per line</li>
                  <li>• HL7 FHIR formatted files</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Coding;