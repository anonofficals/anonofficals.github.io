import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { FolderOpen, Eye, CheckCircle, XCircle, Clock } from "lucide-react";

const SubmittedProjectsSection = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "AI-Powered Analytics Dashboard",
      submitter: "John Doe",
      email: "john@example.com",
      department: "AI/ML",
      description: "Advanced analytics dashboard using machine learning algorithms",
      techStack: "Python, TensorFlow, React, Node.js",
      submittedDate: "2024-01-15",
      status: "Pending Review",
      budget: 15000,
      timeline: "3 months"
    },
    {
      id: 2,
      title: "Blockchain Supply Chain",
      submitter: "Sarah Johnson",
      email: "sarah@example.com",
      department: "Blockchain",
      description: "Decentralized supply chain management system",
      techStack: "Solidity, Web3.js, React, MongoDB",
      submittedDate: "2024-01-20",
      status: "Under Review",
      budget: 25000,
      timeline: "6 months"
    },
    {
      id: 3,
      title: "IoT Smart City Platform",
      submitter: "Mike Chen",
      email: "mike@example.com",
      department: "IoT",
      description: "Comprehensive IoT platform for smart city management",
      techStack: "Arduino, Raspberry Pi, Node.js, MongoDB",
      submittedDate: "2024-01-25",
      status: "Approved",
      budget: 30000,
      timeline: "8 months"
    }
  ]);

  const [user] = useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });

  const updateProjectStatus = (projectId: number, newStatus: string) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId 
          ? { ...project, status: newStatus }
          : project
      )
    );
    toast(`Project ${newStatus.toLowerCase()} successfully`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-600";
      case "Rejected": return "bg-red-600";
      case "Under Review": return "bg-yellow-600";
      case "Pending Review": return "bg-blue-600";
      default: return "bg-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved": return <CheckCircle className="w-4 h-4" />;
      case "Rejected": return <XCircle className="w-4 h-4" />;
      case "Under Review": return <Clock className="w-4 h-4" />;
      case "Pending Review": return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  // Filter projects based on user role
  const filteredProjects = user?.role === "CEO" 
    ? projects 
    : projects.filter(project => project.department === user?.department);

  return (
    <div className="space-y-6">
      <Card className="bg-transparent backdrop-blur-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5" />
                Submitted Projects
              </CardTitle>
              <CardDescription>
                {user?.role === "CEO" 
                  ? "Review and manage all submitted project proposals" 
                  : `Manage ${user?.department || "department"} project submissions`
                }
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Project Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-transparent backdrop-blur-md">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {filteredProjects.length}
                </div>
                <p className="text-sm text-white">Total Submissions</p>
              </CardContent>
            </Card>
            <Card className="bg-transparent backdrop-blur-md">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {filteredProjects.filter(p => p.status === "Approved").length}
                </div>
                <p className="text-sm text-white">Approved</p>
              </CardContent>
            </Card>
            <Card className="bg-transparent backdrop-blur-md">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-yellow-600">
                  {filteredProjects.filter(p => p.status === "Under Review" || p.status === "Pending Review").length}
                </div>
                <p className="text-sm text-white">Under Review</p>
              </CardContent>
            </Card>
            <Card className="bg-transparent backdrop-blur-md">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-600">
                  ${filteredProjects.reduce((sum, p) => sum + (p.budget || 0), 0).toLocaleString()}
                </div>
                <p className="text-sm text-white">Total Budget</p>
              </CardContent>
            </Card>
          </div>

          {/* Projects Table */}
          {filteredProjects.length === 0 ? (
            <Card className="bg-white/5 border-white/10">
              <CardContent className="py-8 text-center">
                <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No project submissions yet.</p>
              </CardContent>
            </Card>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Title</TableHead>
                  <TableHead>Submitter</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold">{project.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{project.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{project.submitter}</div>
                        <div className="text-sm text-gray-500">{project.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-500/20 text-blue-300">
                        {project.department}
                      </Badge>
                    </TableCell>
                    <TableCell>${project.budget?.toLocaleString()}</TableCell>
                    <TableCell>{project.timeline}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(project.status)} flex items-center gap-1`}>
                        {getStatusIcon(project.status)}
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" title="View Details">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {(project.status === "Pending Review" || project.status === "Under Review") && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-green-600 hover:text-green-700"
                              onClick={() => updateProjectStatus(project.id, "Approved")}
                              title="Approve Project"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => updateProjectStatus(project.id, "Rejected")}
                              title="Reject Project"
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmittedProjectsSection;