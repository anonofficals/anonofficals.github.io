import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Lightbulb, Eye, CheckCircle, X, Clock, Send } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import collaborationData from "@/data/collaborationData.json";

const CollaborationSection = () => {
  const [submissions, setSubmissions] = useState(collaborationData);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [reviewComment, setReviewComment] = useState("");

  const handleStatusUpdate = (id: number, newStatus: string) => {
    setSubmissions(prev => 
      prev.map(submission => 
        submission.id === id 
          ? { ...submission, status: newStatus, reviewedBy: "Current User" } as any
          : submission
      )
    );
    
    const statusMessages = {
      "Approved": "Submission approved successfully!",
      "Approved for Funding": "Startup idea approved for funding!",
      "Rejected": "Submission rejected.",
      "Under Review": "Submission moved to under review."
    };
    
    toast.success(statusMessages[newStatus as keyof typeof statusMessages] || "Status updated");
    setShowDetailModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": 
      case "Approved for Funding": 
        return "bg-green-600";
      case "Under Review": 
      case "Pending Review": 
        return "bg-yellow-600";
      case "Rejected": 
        return "bg-red-600";
      default: 
        return "bg-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved": 
      case "Approved for Funding": 
        return <CheckCircle className="w-4 h-4" />;
      case "Rejected": 
        return <X className="w-4 h-4" />;
      default: 
        return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "research_paper" ? <FileText className="w-4 h-4" /> : <Lightbulb className="w-4 h-4" />;
  };

  const researchPapers = submissions.filter(s => s.type === "research_paper");
  const startupIdeas = submissions.filter(s => s.type === "startup_idea");

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{submissions.length}</div>
            <p className="text-sm text-gray-600">Total Submissions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {submissions.filter(s => s.status.includes("Approved")).length}
            </div>
            <p className="text-sm text-gray-600">Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {submissions.filter(s => s.status.includes("Review")).length}
            </div>
            <p className="text-sm text-gray-600">Under Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{researchPapers.length}</div>
            <p className="text-sm text-gray-600">Research Papers</p>
          </CardContent>
        </Card>
      </div>

      {/* Research Papers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Research Paper Submissions
          </CardTitle>
          <CardDescription>Review and manage research paper submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Field</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {researchPapers.map((paper) => (
                <TableRow key={paper.id}>
                  <TableCell className="font-medium max-w-xs">
                    <div className="truncate" title={paper.title}>{paper.title}</div>
                  </TableCell>
                  <TableCell>{paper.author}</TableCell>
                  <TableCell>{paper.institution || "N/A"}</TableCell>
                  <TableCell>{paper.field}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(paper.status)} flex items-center gap-1 w-fit`}>
                      {getStatusIcon(paper.status)}
                      {paper.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(paper.submittedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedSubmission(paper);
                        setShowDetailModal(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Startup Ideas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Startup Idea Submissions
          </CardTitle>
          <CardDescription>Review and manage startup funding applications</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Founder</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Funding</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {startupIdeas.map((startup) => (
                <TableRow key={startup.id}>
                  <TableCell className="font-medium max-w-xs">
                    <div className="truncate" title={startup.title}>{startup.title}</div>
                  </TableCell>
                  <TableCell>{startup.founder}</TableCell>
                  <TableCell>{startup.category}</TableCell>
                  <TableCell>{startup.stage}</TableCell>
                  <TableCell>{startup.fundingRequired || "N/A"}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(startup.status)} flex items-center gap-1 w-fit`}>
                      {getStatusIcon(startup.status)}
                      {startup.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(startup.submittedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedSubmission(startup);
                        setShowDetailModal(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800 border-gray-700">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
          <div className="relative z-50">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center gap-2">
                {selectedSubmission && getTypeIcon(selectedSubmission.type)}
                {selectedSubmission?.title}
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Review submission details and update status
              </DialogDescription>
            </DialogHeader>
            
            {selectedSubmission && (
              <div className="space-y-6 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Submission Details</h3>
                    <div className="space-y-2 text-white">
                      <p><span className="text-gray-400">Author/Founder:</span> {selectedSubmission.author || selectedSubmission.founder}</p>
                      <p><span className="text-gray-400">Email:</span> {selectedSubmission.email}</p>
                      {selectedSubmission.institution && (
                        <p><span className="text-gray-400">Institution:</span> {selectedSubmission.institution}</p>
                      )}
                      {selectedSubmission.company && (
                        <p><span className="text-gray-400">Company:</span> {selectedSubmission.company}</p>
                      )}
                      <p><span className="text-gray-400">Submitted:</span> {new Date(selectedSubmission.submittedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Current Status</h3>
                    <Badge className={`${getStatusColor(selectedSubmission.status)} flex items-center gap-2 w-fit mb-4`}>
                      {getStatusIcon(selectedSubmission.status)}
                      {selectedSubmission.status}
                    </Badge>
                    
                    {selectedSubmission.type === "startup_idea" && (
                      <div className="space-y-2 text-white">
                        <p><span className="text-gray-400">Category:</span> {selectedSubmission.category}</p>
                        <p><span className="text-gray-400">Stage:</span> {selectedSubmission.stage}</p>
                        {selectedSubmission.fundingRequired && (
                          <p><span className="text-gray-400">Funding Required:</span> {selectedSubmission.fundingRequired}</p>
                        )}
                        {selectedSubmission.teamSize && (
                          <p><span className="text-gray-400">Team Size:</span> {selectedSubmission.teamSize}</p>
                        )}
                      </div>
                    )}
                    
                    {selectedSubmission.type === "research_paper" && (
                      <div className="space-y-2 text-white">
                        <p><span className="text-gray-400">Field:</span> {selectedSubmission.field}</p>
                        {selectedSubmission.keywords && (
                          <p><span className="text-gray-400">Keywords:</span> {selectedSubmission.keywords}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {selectedSubmission.type === "research_paper" ? "Abstract" : "Description"}
                  </h3>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-300">
                      {selectedSubmission.abstract || selectedSubmission.description}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Review Actions</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      onClick={() => handleStatusUpdate(selectedSubmission.id, "Approved")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    {selectedSubmission.type === "startup_idea" && (
                      <Button 
                        onClick={() => handleStatusUpdate(selectedSubmission.id, "Approved for Funding")}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Approve for Funding
                      </Button>
                    )}
                    <Button 
                      onClick={() => handleStatusUpdate(selectedSubmission.id, "Rejected")}
                      variant="destructive"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button 
                      onClick={() => handleStatusUpdate(selectedSubmission.id, "Under Review")}
                      variant="outline"
                      className="text-white border-gray-600"
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Mark Under Review
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CollaborationSection;