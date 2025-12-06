import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { 
  FileText, FolderOpen, BarChart3, Plus, Edit, Eye, 
  Calendar, Tag, TrendingUp 
} from "lucide-react";
import { opensourceProjects } from "@/data/opensourceProjects";
import { blogPosts, BlogPost } from "@/data/opensourceBlog";

const ContentManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState("blogs");
  const [blogs, setBlogs] = useState<BlogPost[]>(blogPosts);
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
  });

  const handleAddBlog = () => {
    if (!newBlog.title.trim() || !newBlog.content.trim()) {
      toast({ title: "Error", description: "Title and content are required", variant: "destructive" });
      return;
    }

    const blog: BlogPost = {
      id: (blogs.length + 1).toString(),
      title: newBlog.title,
      excerpt: newBlog.excerpt || newBlog.content.substring(0, 150) + "...",
      content: newBlog.content,
      author: "Content Manager",
      authorAvatar: "https://github.com/ghost.png",
      date: new Date().toISOString().split('T')[0],
      readTime: `${Math.ceil(newBlog.content.split(' ').length / 200)} min read`,
      category: newBlog.category || "General",
      tags: newBlog.tags.split(',').map(t => t.trim()).filter(Boolean),
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    };

    setBlogs([blog, ...blogs]);
    setNewBlog({ title: "", excerpt: "", content: "", category: "", tags: "" });
    setShowAddBlog(false);
    toast({ title: "Success", description: "Blog post created successfully" });
  };

  const stats = [
    { label: "Published Blogs", value: blogs.length, icon: FileText, color: "text-green-400" },
    { label: "Active Projects", value: opensourceProjects.length, icon: FolderOpen, color: "text-purple-400" },
    { label: "Total Views", value: "12.5K", icon: Eye, color: "text-blue-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Content Manager Dashboard</h1>
          <p className="text-gray-400">Manage blogs and projects</p>
        </div>
        <Badge className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
          <FileText className="w-4 h-4 mr-1" /> Content Manager
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10">
          <TabsTrigger value="blogs" className="data-[state=active]:bg-white/10">
            <FileText className="w-4 h-4 mr-2" /> Blogs
          </TabsTrigger>
          <TabsTrigger value="projects" className="data-[state=active]:bg-white/10">
            <FolderOpen className="w-4 h-4 mr-2" /> Projects
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-white/10">
            <BarChart3 className="w-4 h-4 mr-2" /> Analytics
          </TabsTrigger>
        </TabsList>

        {/* Blogs Tab */}
        <TabsContent value="blogs" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Manage Blog Posts</h2>
            <Dialog open={showAddBlog} onOpenChange={setShowAddBlog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" /> New Blog Post
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-white">Create New Blog Post</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label className="text-white">Title</Label>
                    <Input
                      value={newBlog.title}
                      onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                      placeholder="Enter blog title"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Excerpt</Label>
                    <Input
                      value={newBlog.excerpt}
                      onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                      placeholder="Brief description"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Content</Label>
                    <Textarea
                      value={newBlog.content}
                      onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                      placeholder="Write your blog content..."
                      className="bg-white/10 border-white/20 text-white min-h-32"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white">Category</Label>
                      <Select
                        value={newBlog.category}
                        onValueChange={(value) => setNewBlog({ ...newBlog, category: value })}
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Community">Community</SelectItem>
                          <SelectItem value="Tutorial">Tutorial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-white">Tags (comma-separated)</Label>
                      <Input
                        value={newBlog.tags}
                        onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
                        placeholder="react, typescript, open-source"
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddBlog} className="w-full">
                    Publish Blog Post
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
                    <TableHead className="text-gray-400">Title</TableHead>
                    <TableHead className="text-gray-400">Category</TableHead>
                    <TableHead className="text-gray-400">Date</TableHead>
                    <TableHead className="text-gray-400">Read Time</TableHead>
                    <TableHead className="text-gray-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs.map((blog) => (
                    <TableRow key={blog.id} className="border-white/10">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-12 h-8 rounded object-cover"
                          />
                          <p className="text-white font-medium">{blog.title}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-white border-white/20">
                          {blog.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-400">{blog.date}</TableCell>
                      <TableCell className="text-gray-400">{blog.readTime}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-white border-white/20">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-white border-white/20">
                            <Edit className="w-4 h-4" />
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

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Manage Projects</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> Add Project
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {opensourceProjects.map((project) => (
              <Card key={project.id} className="bg-black/40 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">{project.name}</CardTitle>
                    <Badge className="bg-blue-500/20 text-blue-300">{project.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {project.languages.slice(0, 2).map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs text-gray-300 border-gray-600">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm" variant="outline" className="text-white border-white/20">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card className="bg-black/40 backdrop-blur-xl border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Content Analytics</CardTitle>
              <CardDescription className="text-gray-400">View-only analytics for your content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="text-gray-400 text-sm">Total Blog Views</p>
                  <p className="text-3xl font-bold text-white">12,547</p>
                  <p className="text-green-400 text-sm">+15% this month</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="text-gray-400 text-sm">Avg. Read Time</p>
                  <p className="text-3xl font-bold text-white">4.2 min</p>
                  <p className="text-green-400 text-sm">+8% this month</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="text-gray-400 text-sm">Project Stars</p>
                  <p className="text-3xl font-bold text-white">8,234</p>
                  <p className="text-green-400 text-sm">+22% this month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagerDashboard;
