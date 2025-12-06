import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LayoutDashboard, 
  FolderKanban, 
  FileText, 
  Settings, 
  BarChart3,
  Users,
  Image,
  Globe,
  Bell,
  Shield
} from 'lucide-react';
import Overview from './Overview';
import ManageProjects from './ManageProjects';
import ManageBlogs from './ManageBlogs';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'blogs', label: 'Blogs', icon: FileText },
    { id: 'content', label: 'Content', icon: Globe },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'media', label: 'Media', icon: Image },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your website content, projects, and settings</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm font-medium">System Online</span>
            </div>
          </div>
        </div>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto p-1 bg-black/40 border border-gray-800 rounded-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-400 hover:text-white transition-all"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <div className="mt-6">
            <TabsContent value="overview" className="mt-0">
              <Overview />
            </TabsContent>

            <TabsContent value="projects" className="mt-0">
              <ManageProjects />
            </TabsContent>

            <TabsContent value="blogs" className="mt-0">
              <ManageBlogs />
            </TabsContent>

            <TabsContent value="content" className="mt-0">
              <ContentManagement />
            </TabsContent>

            <TabsContent value="users" className="mt-0">
              <UserManagement />
            </TabsContent>

            <TabsContent value="media" className="mt-0">
              <MediaManagement />
            </TabsContent>

            <TabsContent value="analytics" className="mt-0">
              <AnalyticsDashboard />
            </TabsContent>

            <TabsContent value="settings" className="mt-0">
              <SettingsPanel />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

// Content Management Component
const ContentManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Content Management</h2>
          <p className="text-gray-400 mt-1">Manage pages, sections, and site-wide content</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Home Page', description: 'Edit homepage content', icon: Globe },
          { title: 'About Page', description: 'Manage about section', icon: FileText },
          { title: 'Projects Page', description: 'Configure projects display', icon: FolderKanban },
          { title: 'Blog Page', description: 'Blog settings and layout', icon: FileText },
          { title: 'Contact Page', description: 'Contact information', icon: Users },
          { title: 'Footer', description: 'Footer links and content', icon: Settings },
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index} className="bg-[#1a1a1a] border-gray-800 hover:border-purple-500/50 transition-all cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">{item.title}</CardTitle>
                </div>
                <CardDescription className="text-gray-400">{item.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// User Management Component
const UserManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <p className="text-gray-400 mt-1">Manage users, roles, and permissions</p>
        </div>
      </div>

      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Users</CardTitle>
          <CardDescription>View and manage all users</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">User management interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

// Media Management Component
const MediaManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Media Library</h2>
          <p className="text-gray-400 mt-1">Upload and manage images, videos, and files</p>
        </div>
      </div>

      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Media Files</CardTitle>
          <CardDescription>Upload and organize your media</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center">
            <Image className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-2">Drag and drop files here or click to upload</p>
            <p className="text-gray-500 text-sm">Supports: JPG, PNG, GIF, MP4, PDF</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Analytics Dashboard Component
const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics</h2>
          <p className="text-gray-400 mt-1">Track website performance and user engagement</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Views', value: '45.2K', change: '+12.5%', color: 'text-blue-400' },
          { title: 'Unique Visitors', value: '12.8K', change: '+8.2%', color: 'text-green-400' },
          { title: 'Page Views', value: '89.4K', change: '+15.3%', color: 'text-purple-400' },
          { title: 'Avg. Session', value: '3m 24s', change: '+5.1%', color: 'text-orange-400' },
        ].map((stat, index) => (
          <Card key={index} className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <p className="text-green-500 text-sm">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Settings Panel Component
const SettingsPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <p className="text-gray-400 mt-1">Configure website settings and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="w-5 h-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-400">Site name, description, and basic configuration</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-400">Security and authentication settings</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

