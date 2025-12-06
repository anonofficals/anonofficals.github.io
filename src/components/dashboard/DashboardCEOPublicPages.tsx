import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Code, 
  FileText, 
  Users, 
  Briefcase, 
  Gamepad2, 
  Save,
  Eye,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const DashboardCEOPublicPages = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveContent = async (pageType: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to save content
      // await fetch(`/api/pages/${pageType}`, { method: 'PUT', ... })
      
      toast({
        title: "Content Updated",
        description: `${pageType} page has been updated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Public Pages Management</h2>
        <Button variant="outline" size="sm">
          <Eye className="w-4 h-4 mr-2" />
          Preview All Pages
        </Button>
      </div>

      <Tabs defaultValue="devlab" className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="devlab">
            <Code className="w-4 h-4 mr-2" />
            Dev Lab
          </TabsTrigger>
          <TabsTrigger value="research">
            <FileText className="w-4 h-4 mr-2" />
            Research
          </TabsTrigger>
          <TabsTrigger value="collaboration">
            <Briefcase className="w-4 h-4 mr-2" />
            Collaboration
          </TabsTrigger>
          <TabsTrigger value="careers">
            <Users className="w-4 h-4 mr-2" />
            Careers
          </TabsTrigger>
          <TabsTrigger value="arcadeum">
            <Gamepad2 className="w-4 h-4 mr-2" />
            Arcadeum
          </TabsTrigger>
        </TabsList>

        <TabsContent value="devlab" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dev Lab Content</CardTitle>
              <CardDescription>Manage AI/ML, Robotics, and Blockchain project content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Page Title</Label>
                <Input placeholder="Dev Lab - Innovation Hub" />
              </div>
              <div className="space-y-2">
                <Label>Hero Description</Label>
                <Textarea 
                  placeholder="Explore our cutting-edge development projects..."
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleSaveContent('devlab')} disabled={isLoading}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="research" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Research Content</CardTitle>
              <CardDescription>Manage research papers and publications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Page Title</Label>
                <Input placeholder="Research & Publications" />
              </div>
              <div className="space-y-2">
                <Label>Introduction</Label>
                <Textarea 
                  placeholder="Our research focuses on..."
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleSaveContent('research')} disabled={isLoading}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collaboration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Collaboration Content</CardTitle>
              <CardDescription>Manage collaboration opportunities and partnerships</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Page Title</Label>
                <Input placeholder="Collaboration Opportunities" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  placeholder="Partner with us on innovative projects..."
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleSaveContent('collaboration')} disabled={isLoading}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="careers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Career Hub Content</CardTitle>
              <CardDescription>Manage internships and career opportunities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Page Title</Label>
                <Input placeholder="Career Opportunities" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  placeholder="Join our team and make an impact..."
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleSaveContent('careers')} disabled={isLoading}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="arcadeum" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Arcadeum Content</CardTitle>
              <CardDescription>Manage game challenges and content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Page Title</Label>
                <Input placeholder="Arcadeum - Game Challenges" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  placeholder="Test your skills with our challenges..."
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleSaveContent('arcadeum')} disabled={isLoading}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
