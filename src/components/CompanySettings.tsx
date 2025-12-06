
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Settings, Building, Users, Shield, Database, Mail, Bell, Globe } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const CompanySettings = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: "TechCorp Solutions",
    email: "admin@techcorp.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street, Silicon Valley, CA 94000",
    website: "https://techcorp.com",
    description: "Leading technology solutions provider"
  });

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    allowRegistration: true,
    emailNotifications: true,
    smsNotifications: false,
    dataBackup: true,
    auditLogs: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    passwordPolicy: "strong",
    sessionTimeout: "60",
    twoFactorAuth: true,
    ipWhitelist: false
  });

  const handleSaveCompanyInfo = () => {
    toast("Company information updated successfully!");
  };

  const handleSaveSystemSettings = () => {
    toast("System settings updated successfully!");
  };

  const handleSaveSecuritySettings = () => {
    toast("Security settings updated successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Company Information */}
      <Card className="bg-white/10 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Building className="w-5 h-5" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company-name" className="text-white">Company Name</Label>
              <Input
                id="company-name"
                value={companyInfo.name}
                onChange={(e) => setCompanyInfo(prev => ({ ...prev, name: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="company-email" className="text-white">Email</Label>
              <Input
                id="company-email"
                type="email"
                value={companyInfo.email}
                onChange={(e) => setCompanyInfo(prev => ({ ...prev, email: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="company-phone" className="text-white">Phone</Label>
              <Input
                id="company-phone"
                value={companyInfo.phone}
                onChange={(e) => setCompanyInfo(prev => ({ ...prev, phone: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="company-website" className="text-white">Website</Label>
              <Input
                id="company-website"
                value={companyInfo.website}
                onChange={(e) => setCompanyInfo(prev => ({ ...prev, website: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="company-address" className="text-white">Address</Label>
            <Input
              id="company-address"
              value={companyInfo.address}
              onChange={(e) => setCompanyInfo(prev => ({ ...prev, address: e.target.value }))}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label htmlFor="company-description" className="text-white">Description</Label>
            <Textarea
              id="company-description"
              value={companyInfo.description}
              onChange={(e) => setCompanyInfo(prev => ({ ...prev, description: e.target.value }))}
              className="bg-gray-700 border-gray-600 text-white"
              rows={3}
            />
          </div>
          <Button onClick={handleSaveCompanyInfo}>Save Company Information</Button>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card className="bg-white/10 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="w-5 h-5" />
            System Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Maintenance Mode</Label>
                  <p className="text-gray-400 text-sm">Disable site access for maintenance</p>
                </div>
                <Switch
                  checked={systemSettings.maintenanceMode}
                  onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Allow User Registration</Label>
                  <p className="text-gray-400 text-sm">Enable new user signups</p>
                </div>
                <Switch
                  checked={systemSettings.allowRegistration}
                  onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, allowRegistration: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Email Notifications</Label>
                  <p className="text-gray-400 text-sm">Send system notifications via email</p>
                </div>
                <Switch
                  checked={systemSettings.emailNotifications}
                  onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, emailNotifications: checked }))}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">SMS Notifications</Label>
                  <p className="text-gray-400 text-sm">Send notifications via SMS</p>
                </div>
                <Switch
                  checked={systemSettings.smsNotifications}
                  onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, smsNotifications: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Automatic Data Backup</Label>
                  <p className="text-gray-400 text-sm">Daily automated backups</p>
                </div>
                <Switch
                  checked={systemSettings.dataBackup}
                  onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, dataBackup: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Audit Logs</Label>
                  <p className="text-gray-400 text-sm">Track all system activities</p>
                </div>
                <Switch
                  checked={systemSettings.auditLogs}
                  onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, auditLogs: checked }))}
                />
              </div>
            </div>
          </div>
          <Button onClick={handleSaveSystemSettings}>Save System Settings</Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="bg-white/10 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="password-policy" className="text-white">Password Policy</Label>
                <Select value={securitySettings.passwordPolicy} onValueChange={(value) => setSecuritySettings(prev => ({ ...prev, passwordPolicy: value }))}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="weak">Weak (6+ characters)</SelectItem>
                    <SelectItem value="medium">Medium (8+ chars, mixed case)</SelectItem>
                    <SelectItem value="strong">Strong (12+ chars, symbols)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="session-timeout" className="text-white">Session Timeout (minutes)</Label>
                <Input
                  id="session-timeout"
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Two-Factor Authentication</Label>
                  <p className="text-gray-400 text-sm">Require 2FA for all users</p>
                </div>
                <Switch
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">IP Whitelist</Label>
                  <p className="text-gray-400 text-sm">Restrict access to specific IPs</p>
                </div>
                <Switch
                  checked={securitySettings.ipWhitelist}
                  onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, ipWhitelist: checked }))}
                />
              </div>
            </div>
          </div>
          <Button onClick={handleSaveSecuritySettings}>Save Security Settings</Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white/10 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center justify-center gap-2">
              <Database className="w-4 h-4" />
              Backup Database
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2">
              <Users className="w-4 h-4" />
              Export User Data
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2">
              <Globe className="w-4 h-4" />
              System Health Check
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanySettings;
