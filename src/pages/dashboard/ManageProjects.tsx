import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Search, Edit, Trash2, Github, ExternalLink, X, Save } from 'lucide-react';
import { projects } from '@/data/projects';
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl: string;
  demoUrl?: string;
  stats: {
    stars: number;
    forks: number;
    issues: number;
  };
  documentation?: string;
}

const ManageProjects = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectList, setProjectList] = useState<Project[]>(projects);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    tags: '',
    image: '',
    githubUrl: '',
    demoUrl: '',
    stars: '0',
    forks: '0',
    issues: '0',
    documentation: ''
  });

  const filteredProjects = projectList.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        id: project.id,
        title: project.title,
        description: project.description,
        tags: project.tags.join(', '),
        image: project.image,
        githubUrl: project.githubUrl,
        demoUrl: project.demoUrl || '',
        stars: project.stats.stars.toString(),
        forks: project.stats.forks.toString(),
        issues: project.stats.issues.toString(),
        documentation: project.documentation || ''
      });
    } else {
      setEditingProject(null);
      setFormData({
        id: '',
        title: '',
        description: '',
        tags: '',
        image: '',
        githubUrl: '',
        demoUrl: '',
        stars: '0',
        forks: '0',
        issues: '0',
        documentation: ''
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProject(null);
  };

  const handleSave = () => {
    if (!formData.title || !formData.description || !formData.githubUrl) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    const projectData: Project = {
      id: editingProject?.id || formData.title.toLowerCase().replace(/\s+/g, '-'),
      title: formData.title,
      description: formData.description,
      tags: tagsArray,
      image: formData.image || 'https://images.unsplash.com/photo-1558494949-efc5e60dc54f?auto=format&fit=crop&q=80&w=800',
      githubUrl: formData.githubUrl,
      demoUrl: formData.demoUrl || undefined,
      stats: {
        stars: parseInt(formData.stars) || 0,
        forks: parseInt(formData.forks) || 0,
        issues: parseInt(formData.issues) || 0,
      },
      documentation: formData.documentation || undefined
    };

    if (editingProject) {
      setProjectList(projectList.map(p => p.id === editingProject.id ? projectData : p));
      toast({
        title: "Project Updated",
        description: `${projectData.title} has been updated successfully.`,
      });
    } else {
      setProjectList([...projectList, projectData]);
      toast({
        title: "Project Created",
        description: `${projectData.title} has been created successfully.`,
      });
    }

    handleCloseDialog();
  };

  const handleDelete = (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjectList(projectList.filter(p => p.id !== projectId));
      toast({
        title: "Project Deleted",
        description: "The project has been deleted successfully.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Projects</h1>
          <p className="text-gray-400 mt-1">Create, edit, and manage your open source projects.</p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={() => handleOpenDialog()}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 bg-[#1a1a1a] p-4 rounded-lg border border-gray-800">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-900/50 border-gray-700 text-white pl-10 focus:border-purple-500"
          />
        </div>
        <div className="text-sm text-gray-400">
          {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800 hover:bg-transparent">
              <TableHead className="text-gray-400">Project Name</TableHead>
              <TableHead className="text-gray-400">Description</TableHead>
              <TableHead className="text-gray-400">Tags</TableHead>
              <TableHead className="text-gray-400">Stats</TableHead>
              <TableHead className="text-gray-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-400 py-8">
                  No projects found
                </TableCell>
              </TableRow>
            ) : (
              filteredProjects.map((project) => (
                <TableRow key={project.id} className="border-gray-800 hover:bg-white/5">
                  <TableCell className="font-medium text-white">
                    <div className="flex items-center gap-3">
                      <img src={project.image} alt={project.title} className="w-10 h-10 rounded object-cover" />
                      <div>
                        <div className="font-semibold">{project.title}</div>
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-gray-500 hover:text-purple-400 flex items-center gap-1"
                        >
                          <Github className="w-3 h-3" />
                          View on GitHub
                        </a>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300 text-sm max-w-md">
                    <div className="line-clamp-2">{project.description}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="outline" className="border-gray-700 text-gray-400 text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 2 && (
                        <Badge variant="outline" className="border-gray-700 text-gray-400 text-xs">
                          +{project.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1"><span className="text-yellow-500">★</span> {project.stats.stars}</span>
                      <span className="flex items-center gap-1"><span className="text-blue-500">⑂</span> {project.stats.forks}</span>
                      <span className="flex items-center gap-1"><span className="text-red-500">!</span> {project.stats.issues}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-400 hover:text-yellow-400"
                        onClick={() => handleOpenDialog(project)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-400 hover:text-red-400"
                        onClick={() => handleDelete(project.id)}
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
        <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingProject ? 'Edit Project' : 'Create New Project'}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {editingProject ? 'Update project information' : 'Add a new project to your portfolio'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., My Awesome Project"
                className="bg-gray-900/50 border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the project"
                className="bg-gray-900/50 border-gray-700 text-white min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL *</Label>
                <Input
                  id="githubUrl"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/username/repo"
                  className="bg-gray-900/50 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demoUrl">Demo URL (Optional)</Label>
                <Input
                  id="demoUrl"
                  value={formData.demoUrl}
                  onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                  placeholder="https://demo.example.com"
                  className="bg-gray-900/50 border-gray-700 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="React, TypeScript, Node.js"
                className="bg-gray-900/50 border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="bg-gray-900/50 border-gray-700 text-white"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stars">Stars</Label>
                <Input
                  id="stars"
                  type="number"
                  value={formData.stars}
                  onChange={(e) => setFormData({ ...formData, stars: e.target.value })}
                  className="bg-gray-900/50 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="forks">Forks</Label>
                <Input
                  id="forks"
                  type="number"
                  value={formData.forks}
                  onChange={(e) => setFormData({ ...formData, forks: e.target.value })}
                  className="bg-gray-900/50 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="issues">Issues</Label>
                <Input
                  id="issues"
                  type="number"
                  value={formData.issues}
                  onChange={(e) => setFormData({ ...formData, issues: e.target.value })}
                  className="bg-gray-900/50 border-gray-700 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="documentation">Documentation (Markdown)</Label>
              <Textarea
                id="documentation"
                value={formData.documentation}
                onChange={(e) => setFormData({ ...formData, documentation: e.target.value })}
                placeholder="# Project Documentation..."
                className="bg-gray-900/50 border-gray-700 text-white min-h-[200px] font-mono text-sm"
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
              {editingProject ? 'Update' : 'Create'} Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageProjects;
