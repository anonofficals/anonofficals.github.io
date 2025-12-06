
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FolderOpen, Plus, Edit, Trash2, Calendar, DollarSign, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React and Node.js",
      client: "TechCorp Inc.",
      status: "In Progress",
      priority: "High",
      startDate: "2024-01-15",
      endDate: "2024-06-15",
      budget: 75000,
      spent: 35000,
      teamSize: 8,
      technologies: "React, Node.js, MongoDB, AWS",
      progress: 65,
      category: "Web Development",
      projectManager: "Sarah Johnson",
      objectives: "Build a scalable e-commerce platform with modern UI/UX and robust backend",
      deliverables: "Frontend app, Backend API, Admin dashboard, Mobile app",
      risks: "Timeline constraints, Third-party API dependencies",
      milestones: "Design phase completed, Backend 80% done, Frontend 70% done"
    },
    {
      id: 2,
      name: "AI Chatbot Integration",
      description: "Customer service chatbot using NLP and machine learning",
      client: "ServiceMax Ltd.",
      status: "Planning",
      priority: "Medium",
      startDate: "2024-03-01",
      endDate: "2024-08-01",
      budget: 45000,
      spent: 5000,
      teamSize: 5,
      technologies: "Python, TensorFlow, FastAPI, Docker",
      progress: 15,
      category: "AI/ML",
      projectManager: "Mike Chen",
      objectives: "Develop intelligent chatbot to handle 80% of customer inquiries automatically",
      deliverables: "NLP model, Chat interface, Admin panel, Integration APIs",
      risks: "Model accuracy requirements, Training data quality",
      milestones: "Requirements gathered, Data collection in progress"
    },
    {
      id: 3,
      name: "Mobile Banking App",
      description: "Secure mobile banking application with biometric authentication",
      client: "SecureBank",
      status: "Completed",
      priority: "High",
      startDate: "2023-09-01",
      endDate: "2024-01-15",
      budget: 120000,
      spent: 115000,
      teamSize: 12,
      technologies: "React Native, Node.js, PostgreSQL, AWS",
      progress: 100,
      category: "Mobile Development",
      projectManager: "Lisa Wang",
      objectives: "Create secure, user-friendly mobile banking app with advanced security features",
      deliverables: "iOS app, Android app, Backend services, Security documentation",
      risks: "Security compliance, App store approval",
      milestones: "All milestones completed successfully"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    client: "",
    status: "Planning",
    priority: "Medium",
    startDate: "",
    endDate: "",
    budget: "",
    teamSize: "",
    technologies: "",
    category: "Web Development",
    projectManager: "",
    objectives: "",
    deliverables: "",
    risks: "",
    milestones: ""
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProject = () => {
    if (editingProject) {
      setProjects(projects.map(p =>
        p.id === editingProject.id
          ? {
              ...editingProject,
              ...formData,
              budget: parseInt(formData.budget) || 0,
              teamSize: parseInt(formData.teamSize) || 0,
              spent: editingProject.spent,
              progress: editingProject.progress
            }
          : p
      ));
      toast({
        title: "Success",
        description: "Project updated successfully!",
      });
    } else {
      const newProject = {
        id: Date.now(),
        ...formData,
        budget: parseInt(formData.budget) || 0,
        teamSize: parseInt(formData.teamSize) || 0,
        spent: 0,
        progress: 0
      };
      setProjects([...projects, newProject]);
      toast({
        title: "Success",
        description: "Project added successfully!",
      });
    }
    
    setShowAddForm(false);
    setEditingProject(null);
    setFormData({
      name: "",
      description: "",
      client: "",
      status: "Planning",
      priority: "Medium",
      startDate: "",
      endDate: "",
      budget: "",
      teamSize: "",
      technologies: "",
      category: "Web Development",
      projectManager: "",
      objectives: "",
      deliverables: "",
      risks: "",
      milestones: ""
    });
  };

  const handleEditProject = (project: any) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      client: project.client || "",
      status: project.status,
      priority: project.priority,
      startDate: project.startDate || "",
      endDate: project.endDate || "",
      budget: project.budget?.toString() || "",
      teamSize: project.teamSize?.toString() || "",
      technologies: project.technologies || "",
      category: project.category || "Web Development",
      projectManager: project.projectManager || "",
      objectives: project.objectives || "",
      deliverables: project.deliverables || "",
      risks: project.risks || "",
      milestones: project.milestones || ""
    });
    setShowAddForm(true);
  };

  const handleDeleteProject = (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter(p => p.id !== id));
      toast({
        title: "Success",
        description: "Project deleted successfully!",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-600";
      case "In Progress": return "bg-blue-600";
      case "Planning": return "bg-yellow-600";
      case "On Hold": return "bg-orange-600";
      case "Cancelled": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-red-400";
      case "Medium": return "text-yellow-400";
      case "Low": return "text-green-400";
      default: return "text-gray-400";
    }
  };

  const totalBudget = projects.reduce((sum, p) => sum + (p.budget || 0), 0);
  const totalSpent = projects.reduce((sum, p) => sum + (p.spent || 0), 0);
  const totalTeamMembers = projects.reduce((sum, p) => sum + (p.teamSize || 0), 0);

  return (
    <div className="space-y-6">
      <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5" />
                Project Management
              </CardTitle>
              <CardDescription>Manage company projects and development tasks</CardDescription>
            </div>
            <Button onClick={() => {
              setEditingProject(null);
              setFormData({
                name: "",
                description: "",
                client: "",
                status: "Planning",
                priority: "Medium",
                startDate: "",
                endDate: "",
                budget: "",
                teamSize: "",
                technologies: "",
                category: "Web Development",
                projectManager: "",
                objectives: "",
                deliverables: "",
                risks: "",
                milestones: ""
              });
              setShowAddForm(true);
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Project Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">{projects.length}</div>
                <p className="text-sm text-white">Total Projects</p>
              </CardContent>
            </Card>
            <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {projects.filter(p => p.status === "Completed").length}
                </div>
                <p className="text-sm text-white">Completed</p>
              </CardContent>
            </Card>
            <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-600">
                  ${totalBudget.toLocaleString()}
                </div>
                <p className="text-sm text-white">Total Budget</p>
              </CardContent>
            </Card>
            <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-600">{totalTeamMembers}</div>
                <p className="text-sm text-white">Team Members</p>
              </CardContent>
            </Card>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-semibold">{project.name}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{project.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{project.client || "Internal"}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </span>
                  </TableCell>
                  <TableCell>${(project.budget || 0).toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${project.progress || 0}%` }}
                        />
                      </div>
                      <span className="text-sm">{project.progress || 0}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{project.teamSize || 0}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditProject(project)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteProject(project.id)}
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

      {/* Add/Edit Project Modal */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black/40 backdrop-blur-xl border border-gray-700/50">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
          <div className="relative z-50">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingProject ? "Edit Project" : "Add New Project"}
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                {editingProject ? "Update project details" : "Add comprehensive project information"}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 mt-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="projectName" className="text-white">Project Name *</Label>
                    <Input 
                      id="projectName" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter project name" 
                      className="bg-black/40 backdrop-blur-xl border border-gray-700/50"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="client" className="text-white">Client</Label>
                    <Input 
                      id="client" 
                      name="client"
                      value={formData.client}
                      onChange={handleInputChange}
                      placeholder="Enter client name" 
                      className="bg-black/40 backdrop-blur-xl border border-gray-700/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-white">Category *</Label>
                    <select 
                      name="category" 
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-black/40 backdrop-blur-xl border border-gray-700/50 text-white"
                      required
                    >
                      <option>Web Development</option>
                      <option>Mobile Development</option>
                      <option>AI/ML</option>
                      <option>Data Science</option>
                      <option>DevOps</option>
                      <option>UI/UX Design</option>
                      <option>Consulting</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="projectManager" className="text-white">Project Manager</Label>
                    <Input 
                      id="projectManager" 
                      name="projectManager"
                      value={formData.projectManager}
                      onChange={handleInputChange}
                      placeholder="Enter project manager name" 
                      className="bg-black/40 backdrop-blur-xl border border-gray-700/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status" className="text-white">Status *</Label>
                    <select 
                      name="status" 
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-black/40 backdrop-blur-xl border border-gray-700/50"
                      required
                    >
                      <option>Planning</option>
                      <option>In Progress</option>
                      <option>On Hold</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="priority" className="text-white">Priority *</Label>
                    <select 
                      name="priority" 
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-black/40 backdrop-blur-xl border border-gray-700/50"
                      required
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="description" className="text-white">Description *</Label>
                    <Textarea 
                      id="description" 
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter project description..." 
                      className="bg-black/40 backdrop-blur-xl border border-gray-700/50"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Timeline & Budget */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Timeline & Budget</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate" className="text-white">Start Date</Label>
                    <Input 
                      id="startDate" 
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="bg-black/40 backdrop-blur-xl border border-gray-700/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate" className="text-white">End Date</Label>
                    <Input 
                      id="endDate" 
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="bg-black/40 backdrop-blur-xl border border-gray-700/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="budget" className="text-white">Budget ($)</Label>
                    <Input 
                      id="budget" 
                      name="budget"
                      type="number"
                      value={formData.budget}
                      onChange={handleInputChange}
                      placeholder="Enter budget amount" 
                      className="bg-black/40 backdrop-blur-xl border border-gray-700/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="teamSize" className="text-white">Team Size</Label>
                    <Input 
                      id="teamSize" 
                      name="teamSize"
                      type="number"
                      value={formData.teamSize}
                      onChange={handleInputChange}
                      placeholder="Enter team size" 
                      className="bg-black/40 backdrop-blur-xl border border-gray-700/50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="technologies" className="text-white">Technologies</Label>
                    <Input 
                      id="technologies" 
                      name="technologies"
                      value={formData.technologies}
                      onChange={handleInputChange}
                      placeholder="Enter technologies used (comma separated)" 
                      className="bg-black/40 backdrop-blur-xl border border-gray-700/50"
                    />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Project Details</h3>
                <div>
                  <Label htmlFor="objectives" className="text-white">Objectives</Label>
                  <Textarea 
                    id="objectives" 
                    name="objectives"
                    value={formData.objectives}
                    onChange={handleInputChange}
                    placeholder="Describe project objectives..." 
                    className="bg-black/40 backdrop-blur-xl border border-gray-700/50 text-white min-h-[80px]"
                  />
                </div>
                <div>
                  <Label htmlFor="deliverables" className="text-white">Deliverables</Label>
                  <Textarea 
                    id="deliverables" 
                    name="deliverables"
                    value={formData.deliverables}
                    onChange={handleInputChange}
                    placeholder="List key deliverables..." 
                    className="bg-black/40 backdrop-blur-xl border border-gray-700/50 text-white min-h-[80px]"
                  />
                </div>
                <div>
                  <Label htmlFor="risks" className="text-white">Risks & Challenges</Label>
                  <Textarea 
                    id="risks" 
                    name="risks"
                    value={formData.risks}
                    onChange={handleInputChange}
                    placeholder="Identify potential risks and challenges..." 
                    className="bg-black/40 backdrop-blur-xl border border-gray-700/50 text-white min-h-[80px]"
                  />
                </div>
                <div>
                  <Label htmlFor="milestones" className="text-white">Milestones</Label>
                  <Textarea 
                    id="milestones" 
                    name="milestones"
                    value={formData.milestones}
                    onChange={handleInputChange}
                    placeholder="List key milestones and current status..." 
                    className="bg-black/40 backdrop-blur-xl border border-gray-700/50 text-white min-h-[80px]"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6 pt-4 border-t border-gray-700">
              <Button onClick={handleSaveProject} className="bg-blue-600 hover:bg-blue-700">
                {editingProject ? "Update Project" : "Save Project"}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddForm(false)}
                className="border-gray-600 text-white hover:bg-gray-700"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsSection;
