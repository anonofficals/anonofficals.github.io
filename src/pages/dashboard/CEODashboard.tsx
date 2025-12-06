import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { 
  Users, FileText, FolderOpen, BarChart3, Settings, Plus, 
  Trash2, Edit, UserPlus, Shield, Activity, TrendingUp 
} from "lucide-react";
import { contributors, Contributor, CONTRIBUTOR_BADGES } from "@/data/contributors";
import { getGitHubAvatarUrl } from "@/services/githubService";
import { opensourceProjects } from "@/data/opensourceProjects";
import { blogPosts } from "@/data/opensourceBlog";

const CEODashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [contributorList, setContributorList] = useState<Contributor[]>(contributors);
  const [showAddContributor, setShowAddContributor] = useState(false);
  const [newContributor, setNewContributor] = useState({
    githubUsername: "",
    role: "contributor" as const,
    badges: [] as string[],
  });

  const handleAddContributor = () => {
    if (!newContributor.githubUsername.trim()) {
      toast({ title: "Error", description: "GitHub username is required", variant: "destructive" });
      return;
    }

    const contributor: Contributor = {
      id: Date.now().toString(),
      githubUsername: newContributor.githubUsername,
      role: newContributor.role,
      contributions: 0,
      badges: newContributor.badges,
      joinedDate: new Date().toISOString().split('T')[0],
      isActive: true,
    };

    setContributorList([...contributorList, contributor]);
    setNewContributor({ githubUsername: "", role: "contributor", badges: [] });
    setShowAddContributor(false);
    toast({ title: "Success", description: "Contributor added successfully" });
  };

  const handleDeleteContributor = (id: string) => {
    setContributorList(contributorList.filter(c => c.id !== id));
    toast({ title: "Deleted", description: "Contributor removed" });
  };

  const stats = [
    { label: "Total Contributors", value: contributorList.length, icon: Users, color: "text-blue-400" },
    { label: "Published Blogs", value: blogPosts.length, icon: FileText, color: "text-green-400" },
    { label: "Active Projects", value: opensourceProjects.length, icon: FolderOpen, color: "text-purple-400" },
    { label: "Total Contributions", value: contributorList.reduce((sum, c) => sum + c.contributions, 0), icon: Activity, color: "text-orange-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">CEO Dashboard</h1>
          <p className="text-gray-400">Manage your organization</p>
        </div>
        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
          <Shield className="w-4 h-4 mr-1" /> CEO Access
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white/10">
            <BarChart3 className="w-4 h-4 mr-2" /> Overview
          </TabsTrigger>
          <TabsTrigger value="contributors" className="data-[state=active]:bg-white/10">
            <Users className="w-4 h-4 mr-2" /> Contributors
          </TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-white/10">
            <FileText className="w-4 h-4 mr-2" /> Content
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-white/10">
            <Settings className="w-4 h-4 mr-2" /> Settings
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="bg-black/40 backdrop-blur-xl border border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-3xl font-bold text-white mt-4">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/40 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contributorList.slice(0, 5).map((contributor) => (
                    <div key={contributor.id} className="flex items-center gap-3">
                      <img
                        src={getGitHubAvatarUrl(contributor.githubUsername, 40)}
                        alt={contributor.githubUsername}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="text-white font-medium">{contributor.name || contributor.githubUsername}</p>
                        <p className="text-gray-400 text-sm">{contributor.contributions} contributions</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => { setActiveTab("contributors"); setShowAddContributor(true); }}
                >
                  <UserPlus className="w-4 h-4 mr-2" /> Add New Contributor
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" /> Create Blog Post
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FolderOpen className="w-4 h-4 mr-2" /> Add New Project
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Contributors Tab */}
        <TabsContent value="contributors" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Manage Contributors</h2>
            <Dialog open={showAddContributor} onOpenChange={setShowAddContributor}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" /> Add Contributor
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Add New Contributor</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label className="text-white">GitHub Username</Label>
                    <Input
                      value={newContributor.githubUsername}
                      onChange={(e) => setNewContributor({ ...newContributor, githubUsername: e.target.value })}
                      placeholder="e.g., octocat"
                      className="bg-white/10 border-white/20 text-white"
                    />
                    <p className="text-gray-400 text-xs mt-1">Profile image and name will be fetched from GitHub</p>
                  </div>
                  <div>
                    <Label className="text-white">Role</Label>
                    <Select
                      value={newContributor.role}
                      onValueChange={(value: any) => setNewContributor({ ...newContributor, role: value })}
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contributor">Contributor</SelectItem>
                        <SelectItem value="content_manager">Content Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddContributor} className="w-full">
                    Add Contributor
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="bg-black/40 backdrop-blur-xl border border-white/10">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="text-gray-400">Contributor</TableHead>
                    <TableHead className="text-gray-400">Role</TableHead>
                    <TableHead className="text-gray-400">Contributions</TableHead>
                    <TableHead className="text-gray-400">Badges</TableHead>
                    <TableHead className="text-gray-400">Joined</TableHead>
                    <TableHead className="text-gray-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contributorList.map((contributor) => (
                    <TableRow key={contributor.id} className="border-white/10">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={getGitHubAvatarUrl(contributor.githubUsername, 40)}
                            alt={contributor.githubUsername}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="text-white font-medium">{contributor.name || contributor.githubUsername}</p>
                            <p className="text-gray-400 text-sm">@{contributor.githubUsername}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-white border-white/20">
                          {contributor.role === 'content_manager' ? 'Content Manager' : 'Contributor'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white">{contributor.contributions}</TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {contributor.badges.slice(0, 2).map((badge) => (
                            <Badge key={badge} className="bg-blue-500/20 text-blue-300 text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-400">{contributor.joinedDate}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-white border-white/20">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeleteContributor(contributor.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/40 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="w-5 h-5" /> Blog Posts
                </CardTitle>
                <CardDescription className="text-gray-400">Manage all blog content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {blogPosts.slice(0, 5).map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{post.title}</p>
                        <p className="text-gray-400 text-sm">{post.category}</p>
                      </div>
                      <Button size="sm" variant="outline" className="text-white border-white/20">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FolderOpen className="w-5 h-5" /> Projects
                </CardTitle>
                <CardDescription className="text-gray-400">Manage all projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {opensourceProjects.slice(0, 5).map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{project.name}</p>
                        <p className="text-gray-400 text-sm">{project.category}</p>
                      </div>
                      <Button size="sm" variant="outline" className="text-white border-white/20">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="bg-black/40 backdrop-blur-xl border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Organization Settings</CardTitle>
              <CardDescription className="text-gray-400">Manage your organization settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white">Organization Name</Label>
                <Input 
                  defaultValue="Anon Open Source" 
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white">GitHub Organization</Label>
                <Input 
                  defaultValue="anon-opensource" 
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CEODashboard;
