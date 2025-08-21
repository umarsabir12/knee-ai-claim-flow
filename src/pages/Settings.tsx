import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, User, Bell, Shield, Database } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
        <p className="text-muted-foreground">
          Configure your RCM AI Suite preferences and system settings
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Organization Profile
            </CardTitle>
            <CardDescription>
              Basic information about your healthcare organization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input id="org-name" defaultValue="Arthritis Care RCM" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax-id">Tax ID / NPI</Label>
                <Input id="tax-id" defaultValue="1234567890" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" defaultValue="123 Medical Center Dr, Healthcare City, HC 12345" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              AI Configuration
            </CardTitle>
            <CardDescription>
              Configure AI-powered features and automation settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Auto Medical Coding</Label>
                <p className="text-sm text-muted-foreground">
                  Enable automatic ICD-10 and CPT code suggestions
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Intelligent Claim Scrubbing</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically validate and clean claims before submission
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Smart Denial Detection</Label>
                <p className="text-sm text-muted-foreground">
                  AI-powered prediction and prevention of claim denials
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Manage alert preferences and notification settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates about claim processing and denials
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Real-time Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Instant notifications for critical issues
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Automated weekly performance summaries
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security & Compliance
            </CardTitle>
            <CardDescription>
              HIPAA compliance and security configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">HIPAA Audit Logging</Label>
                <p className="text-sm text-muted-foreground">
                  Track all PHI access and system activities
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Require 2FA for all user accounts
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Data Encryption at Rest</Label>
                <p className="text-sm text-muted-foreground">
                  Encrypt all stored patient and claim data
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;