import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Search, Edit, Trash2, Eye, Save, Calendar, User } from 'lucide-react';
import blogData from "@/data/blogData.json";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Blog {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  content: string;
  readTime: string;
  tags: string[];
}

const ManageBlogs = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [blogList, setBlogList] = useState<Blog[]>(blogData as Blog[]);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    excerpt: '',
    image: '',
    content: '',
    readTime: '5 min read',
    tags: ''
  });

  const categories = ['All', 'Programming', 'Web Development', 'Systems Programming', 'Backend Development', 'Mobile Development', 'DevOps', 'Database', 'Security', 'Frontend Development'];

  const filteredBlogs = blogList.filter(blog => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || blog.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleOpenDialog = (blog?: Blog) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title,
        author: blog.author,
        date: blog.date,
        category: blog.category,
        excerpt: blog.excerpt,
        image: blog.image,
        content: blog.content,
        readTime: blog.readTime,
        tags: blog.tags.join(', ')
      });
    } else {
      setEditingBlog(null);
      setFormData({
        title: '',
        author: '',
        date: new Date().toISOString().split('T')[0],
        category: '',
        excerpt: '',
        image: '',
        content: '',
        readTime: '5 min read',
        tags: ''
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingBlog(null);
  };

  const handleSave = () => {
    if (!formData.title || !formData.author || !formData.category || !formData.content) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    const blogData: Blog = {
      id: editingBlog?.id || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      title: formData.title,
      author: formData.author,
      date: formData.date,
      category: formData.category,
      excerpt: formData.excerpt || formData.content.substring(0, 150) + '...',
      image: formData.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop',
      content: formData.content,
      readTime: formData.readTime,
      tags: tagsArray
    };

    if (editingBlog) {
      setBlogList(blogList.map(b => b.id === editingBlog.id ? blogData : b));
      toast({
        title: "Blog Updated",
        description: `${blogData.title} has been updated successfully.`,
      });
    } else {
      setBlogList([...blogList, blogData]);
      toast({
        title: "Blog Created",
        description: `${blogData.title} has been created successfully.`,
      });
    }

    handleCloseDialog();
  };

  const handleDelete = (blogId: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setBlogList(blogList.filter(b => b.id !== blogId));
      toast({
        title: "Blog Deleted",
        description: "The blog post has been deleted successfully.",
      });
    }
  };

  const handlePublish = (blogId: string) => {
    toast({
      title: "Blog Published",
      description: "The blog post has been published successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Blogs</h1>
          <p className="text-gray-400 mt-1">Create, edit, and manage your blog posts.</p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={() => handleOpenDialog()}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Post
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#1a1a1a] p-4 rounded-lg border border-gray-800">
        <div className="relative flex-1 max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-900/50 border-gray-700 text-white pl-10 focus:border-purple-500"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[200px] bg-gray-900/50 border-gray-700 text-white">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-gray-800">
            {categories.map(cat => (
              <SelectItem key={cat} value={cat === 'All' ? 'all' : cat} className="text-white">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="text-sm text-gray-400">
          {filteredBlogs.length} post{filteredBlogs.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800 hover:bg-transparent">
              <TableHead className="text-gray-400">Title</TableHead>
              <TableHead className="text-gray-400">Category</TableHead>
              <TableHead className="text-gray-400">Author</TableHead>
              <TableHead className="text-gray-400">Date</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBlogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-400 py-8">
                  No blog posts found
                </TableCell>
              </TableRow>
            ) : (
              filteredBlogs.map((blog) => (
                <TableRow key={blog.id} className="border-gray-800 hover:bg-white/5">
                  <TableCell className="font-medium text-white max-w-md">
                    <div className="flex items-center gap-3">
                      <img src={blog.image} alt={blog.title} className="w-12 h-12 rounded object-cover" />
                      <div>
                        <div className="font-semibold line-clamp-1">{blog.title}</div>
                        <div className="text-xs text-gray-500 line-clamp-1 mt-1">{blog.excerpt}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-purple-900/30 text-purple-300 border-purple-700/50">
                      {blog.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      {blog.author}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      {new Date(blog.date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                      Published
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-400 hover:text-blue-400"
                        onClick={() => window.open(`/blogs/${blog.id}`, '_blank')}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-400 hover:text-yellow-400"
                        onClick={() => handleOpenDialog(blog)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-400 hover:text-red-400"
                        onClick={() => handleDelete(blog.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {editingBlog ? 'Update blog post information' : 'Write a new blog post'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Blog post title"
                  className="bg-gray-900/50 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Author name"
                  className="bg-gray-900/50 border-gray-700 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Publish Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="bg-gray-900/50 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-gray-800">
                    {categories.filter(c => c !== 'All').map(cat => (
                      <SelectItem key={cat} value={cat} className="text-white">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="readTime">Read Time</Label>
                <Input
                  id="readTime"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  placeholder="5 min read"
                  className="bg-gray-900/50 border-gray-700 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief description of the blog post"
                className="bg-gray-900/50 border-gray-700 text-white min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Featured Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="bg-gray-900/50 border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="React, JavaScript, Tutorial"
                className="bg-gray-900/50 border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content (Markdown) *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="# Your Blog Content Here..."
                className="bg-gray-900/50 border-gray-700 text-white min-h-[400px] font-mono text-sm"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog} className="border-gray-700 text-gray-300">
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {editingBlog ? 'Update' : 'Create'} Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageBlogs;
