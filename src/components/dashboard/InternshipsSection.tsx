
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Plus, Edit, Trash2, Eye, Users } from "lucide-react";
import InternDetailModal from "@/components/InternDetailModal";
import internsData from "@/data/interns.json";

const InternshipsSection = () => {
  const [internships, setInternships] = useState<any[]>([]);
  const [user] = useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });

  const [applications, setApplications] = useState(internsData);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    department: user?.department || "",
    duration: "",
    positions: "",
    startDate: "",
    endDate: "",
    description: ""
  });

  const updateApplicationStatus = (applicationId: string, newStatus: string) => {
    setApplications(prev => 
      prev.map(app => 
        app.applicationId === applicationId 
          ? { ...app, status: newStatus }
          : app
      )
    );
    toast(`Application ${newStatus.toLowerCase()} successfully`);
  };

  const deleteIntern = (applicationId: string) => {
    setApplications(prev => 
      prev.filter(app => app.applicationId !== applicationId)
    );
    toast("Intern deleted successfully");
  };

  const viewInternDetail = (intern: any) => {
    setSelectedIntern(intern);
    setShowDetailModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-600";
      case "Closed": return "bg-red-600";
      case "Accepted": return "bg-green-600";
      case "Rejected": return "bg-red-600";
      case "Under Review": return "bg-yellow-600";
      case "Published": return "bg-blue-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Internship Management
              </CardTitle>
              <CardDescription>Manage internship programs and applications</CardDescription>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="w-4 h-4 mr-2" />
              Post Internship
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Post New Internship</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="internshipTitle">Internship Title</Label>
                    <Input 
                      id="internshipTitle" 
                      name="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Enter internship title" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input 
                      id="department" 
                      name="department"
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      placeholder="Enter department" 
                      disabled={user?.role !== "CEO"}
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input 
                      id="duration" 
                      name="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="e.g., 3 months" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="positions">Number of Positions</Label>
                    <Input 
                      id="positions" 
                      name="positions"
                      value={formData.positions}
                      onChange={(e) => setFormData({...formData, positions: e.target.value})}
                      type="number" 
                      placeholder="Enter number of positions" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input 
                      id="startDate" 
                      name="startDate"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      type="date" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input 
                      id="endDate" 
                      name="endDate"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      type="date" 
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Internship description and requirements..." 
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={() => {
                    const newInternship = {
                      id: Date.now(),
                      ...formData,
                      positions: parseInt(formData.positions) || 0,
                      applicants: 0,
                      status: "Active"
                    };
                    setInternships([...internships, newInternship]);
                    setFormData({
                      title: "",
                      department: user?.department || "",
                      duration: "",
                      positions: "",
                      startDate: "",
                      endDate: "",
                      description: ""
                    });
                    setShowAddForm(false);
                    toast("Internship posted successfully!");
                  }}>Post Internship</Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Internship Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-transparent backdrop-blur-md">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {internships.filter(i => i.status === "Active").length}
                </div>
                <p className="text-sm text-white">Active Internships</p>
              </CardContent>
            </Card>
            <Card className="bg-transparent backdrop-blur-md">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {internships.reduce((sum, i) => sum + (i.applicants || 0), 0)}
                </div>
                <p className="text-sm text-white">Total Applications</p>
              </CardContent>
            </Card>
            <Card className="bg-transparent backdrop-blur-md">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-600">
                  {applications.filter(a => a.status === "Accepted").length}
                </div>
                <p className="text-sm text-white">Selected Interns</p>
              </CardContent>
            </Card>
            <Card className="bg-transparent backdrop-blur-md">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-600">
                  {internships.filter(i => i.status === "Completed").length}
                </div>
                <p className="text-sm text-white">Completed Programs</p>
              </CardContent>
            </Card>
          </div>

          {/* Active Internships */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">
              {user?.role === "CEO" ? "All Internships" : `${user?.department || "Department"} Internships`}
            </h3>
            {internships.length === 0 ? (
              <Card className="bg-white/5 border-white/10">
                <CardContent className="py-8 text-center">
                  <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No internships posted yet. Click "Post Internship" to add one.</p>
                </CardContent>
              </Card>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Positions</TableHead>
                    <TableHead>Students Applied</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {internships
                    .filter(internship => user?.role === "CEO" || internship.department === user?.department)
                    .map((internship) => (
                    <TableRow key={internship.id}>
                      <TableCell className="font-medium">{internship.title}</TableCell>
                      <TableCell>{internship.department}</TableCell>
                      <TableCell>{internship.duration}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span>{internship.positions}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {internship.applicants || 0} Students
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(internship.status)}>
                          {internship.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setInternships(internships.filter(i => i.id !== internship.id));
                              toast("Internship deleted successfully!");
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          {/* Recent Applications */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Intern Applications</h3>
            {loading ? (
              <div className="text-center py-4">Loading applications...</div>
            ) : (
              <Table>
                 <TableHeader>
                   <TableRow>
                     <TableHead>Application ID</TableHead>
                     <TableHead>Applicant Name</TableHead>
                     <TableHead>Email</TableHead>
                     <TableHead>Program</TableHead>
                     <TableHead>University</TableHead>
                     <TableHead>Status</TableHead>
                     <TableHead>Applied Date</TableHead>
                     <TableHead>Actions</TableHead>
                   </TableRow>
                 </TableHeader>
                <TableBody>
                   {applications.length === 0 ? (
                     <TableRow>
                       <TableCell colSpan={8} className="text-center py-4">
                         No applications found
                       </TableCell>
                     </TableRow>
                   ) : (
                     applications.map((application) => (
                       <TableRow key={application.applicationId}>
                         <TableCell className="font-mono text-sm">{application.applicationId}</TableCell>
                         <TableCell className="font-medium">{application.name}</TableCell>
                         <TableCell className="text-blue-600">{application.email}</TableCell>
                         <TableCell>{application.program}</TableCell>
                         <TableCell>{application.university}</TableCell>
                         <TableCell>
                           <Badge className={getStatusColor(application.status)}>
                             {application.status}
                           </Badge>
                         </TableCell>
                         <TableCell>{application.submittedDate}</TableCell>
                         <TableCell>
                           <div className="flex gap-2">
                             <Button 
                               size="sm" 
                               variant="outline" 
                               title="View Details"
                               onClick={() => viewInternDetail(application)}
                             >
                               <Eye className="w-4 h-4" />
                             </Button>
                             {application.status === 'Under Review' && (
                               <>
                                 <Button 
                                   size="sm" 
                                   variant="outline"
                                   className="text-green-600 hover:text-green-700"
                                   onClick={() => updateApplicationStatus(application.applicationId, 'Accepted')}
                                   title="Accept Application"
                                 >
                                   ✓
                                 </Button>
                                 <Button 
                                   size="sm" 
                                   variant="outline"
                                   className="text-red-600 hover:text-red-700"
                                   onClick={() => updateApplicationStatus(application.applicationId, 'Rejected')}
                                   title="Reject Application"
                                 >
                                   ✗
                                 </Button>
                               </>
                             )}
                             {application.status === 'Accepted' && (
                               <Button 
                                 size="sm" 
                                 variant="outline"
                                 className="text-blue-600 hover:text-blue-700"
                                 onClick={() => updateApplicationStatus(application.applicationId, 'Published')}
                                 title="Publish Result"
                               >
                                 Publish
                               </Button>
                             )}
                           </div>
                         </TableCell>
                       </TableRow>
                     ))
                   )}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>

      <InternDetailModal
        intern={selectedIntern}
        open={showDetailModal}
        onOpenChange={setShowDetailModal}
        onDelete={deleteIntern}
      />
    </div>
  );
};

export default InternshipsSection;
