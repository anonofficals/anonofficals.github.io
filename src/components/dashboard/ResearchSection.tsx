import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Plus, Edit, Trash2, Eye, Upload, Calendar } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const ResearchSection = () => {
  const [papers, setPapers] = useState([
    {
      id: 1,
      title: "Advanced Machine Learning Techniques in Modern Applications",
      author: "Dr. John Smith",
      coAuthors: "Dr. Jane Doe, Prof. Mike Johnson",
      field: "AI/ML",
      status: "Published",
      publishDate: "2024-01-10",
      journal: "International Journal of AI Research",
      volume: "Vol. 15, Issue 3",
      pages: "45-67",
      doi: "10.1234/ijar.2024.001",
      keywords: "machine learning, neural networks, deep learning",
      downloads: 1245,
      citations: 23,
      abstract: "This paper explores cutting-edge machine learning algorithms and their applications in real-world scenarios, focusing on neural networks and deep learning methodologies.",
      methodology: "We employed a mixed-methods approach combining quantitative analysis with experimental validation.",
      results: "Our findings demonstrate a 23% improvement in accuracy compared to existing methods.",
      conclusions: "The proposed algorithm shows significant promise for real-world deployment."
    },
    {
      id: 2,
      title: "Blockchain Integration in Healthcare Systems",
      author: "Dr. Sarah Johnson",
      coAuthors: "Dr. Robert Chen, Dr. Lisa Wang",
      field: "Blockchain",
      status: "Under Review",
      publishDate: "2024-01-15",
      journal: "Healthcare Technology Review",
      volume: "Pending",
      pages: "Pending",
      doi: "Pending",
      keywords: "blockchain, healthcare, security, privacy",
      downloads: 0,
      citations: 0,
      abstract: "A comprehensive study on implementing blockchain technology for secure healthcare data management and patient privacy protection.",
      methodology: "Case study analysis of three major healthcare institutions implementing blockchain solutions.",
      results: "Initial results show 40% reduction in data breaches and improved patient trust.",
      conclusions: "Blockchain technology presents a viable solution for healthcare data security challenges."
    },
    {
      id: 3,
      title: "Quantum Computing Applications in Cryptography",
      author: "Dr. Mike Wilson",
      coAuthors: "Prof. Emily Davis, Dr. Alex Thompson",
      field: "Quantum Computing",
      status: "Draft",
      publishDate: "",
      journal: "Quantum Research Quarterly",
      volume: "TBD",
      pages: "TBD",
      doi: "TBD",
      keywords: "quantum computing, cryptography, security, algorithms",
      downloads: 0,
      citations: 0,
      abstract: "Exploring the potential of quantum computing in enhancing cryptographic security measures and the implications for current encryption standards.",
      methodology: "Theoretical analysis combined with quantum simulation experiments.",
      results: "Preliminary findings suggest quantum algorithms can break current encryption in polynomial time.",
      conclusions: "Urgent need for post-quantum cryptographic standards development."
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPaper, setEditingPaper] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    coAuthors: "",
    field: "AI/ML",
    status: "Draft",
    journal: "",
    volume: "",
    pages: "",
    doi: "",
    keywords: "",
    abstract: "",
    methodology: "",
    results: "",
    conclusions: ""
  });

  useEffect(() => {
    localStorage.setItem("researchPapers", JSON.stringify(papers));
    // Also update the research data files for public viewing
    updatePublicResearchData(papers);
  }, [papers]);

  const updatePublicResearchData = (updatedPapers: any[]) => {
    // This would ideally update the public research data
    // For now, we'll just log it as it would require backend integration
    console.log("Research papers updated for public viewing:", updatedPapers.filter(p => p.status === "Published"));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSavePaper = () => {
    if (editingPaper) {
      setPapers(papers.map(p => 
        p.id === editingPaper.id 
          ? { 
              ...editingPaper, 
              ...formData, 
              id: editingPaper.id,
              downloads: editingPaper.downloads,
              citations: editingPaper.citations,
              publishDate: formData.status === "Published" ? new Date().toISOString().split('T')[0] : editingPaper.publishDate
            }
          : p
      ));
      toast("Research paper updated successfully!");
    } else {
      const newPaper = {
        id: Date.now(),
        ...formData,
        downloads: 0,
        citations: 0,
        publishDate: formData.status === "Published" ? new Date().toISOString().split('T')[0] : ""
      };
      setPapers([...papers, newPaper]);
      toast("Research paper added successfully!");
    }
    
    setShowAddForm(false);
    setEditingPaper(null);
    setFormData({
      title: "",
      author: "",
      coAuthors: "",
      field: "AI/ML",
      status: "Draft",
      journal: "",
      volume: "",
      pages: "",
      doi: "",
      keywords: "",
      abstract: "",
      methodology: "",
      results: "",
      conclusions: ""
    });
  };

  const handleEditPaper = (paper: any) => {
    setEditingPaper(paper);
    setFormData({
      title: paper.title,
      author: paper.author,
      coAuthors: paper.coAuthors || "",
      field: paper.field,
      status: paper.status,
      journal: paper.journal || "",
      volume: paper.volume || "",
      pages: paper.pages || "",
      doi: paper.doi || "",
      keywords: paper.keywords || "",
      abstract: paper.abstract,
      methodology: paper.methodology || "",
      results: paper.results || "",
      conclusions: paper.conclusions || ""
    });
    setShowAddForm(true);
  };

  const handleDeletePaper = (id: number) => {
    if (confirm("Are you sure you want to delete this research paper?")) {
      setPapers(papers.filter(p => p.id !== id));
      toast("Research paper deleted successfully!");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published": return "bg-green-600";
      case "Under Review": return "bg-yellow-600";
      case "Draft": return "bg-gray-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-transparent backdrop-blur-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Research Papers Management
              </CardTitle>
              <CardDescription>Manage research publications and academic papers</CardDescription>
            </div>
            <Button onClick={() => {
              setEditingPaper(null);
              setFormData({
                title: "",
                author: "",
                coAuthors: "",
                field: "AI/ML",
                status: "Draft",
                journal: "",
                volume: "",
                pages: "",
                doi: "",
                keywords: "",
                abstract: "",
                methodology: "",
                results: "",
                conclusions: ""
              });
              setShowAddForm(true);
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Paper
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Research Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-transparent backdrop-blur-md">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">{papers.length}</div>
                <p className="text-sm text-white">Total Papers</p>
              </CardContent>
            </Card>
            <Card className="bg-transparent backdrop-blur-md">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {papers.filter(p => p.status === "Published").length}
                </div>
                <p className="text-sm text-white">Published</p>
              </CardContent>
            </Card>
            <Card className="bg-transparent backdrop-blur-md">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-yellow-600">
                  {papers.filter(p => p.status === "Under Review").length}
                </div>
                <p className="text-sm text-white">Under Review</p>
              </CardContent>
            </Card>
            <Card className="bg-transparent backdrop-blur-md">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-600">
                  {papers.reduce((sum, p) => sum + p.downloads, 0).toLocaleString()}
                </div>
                <p className="text-sm text-white">Total Downloads</p>
              </CardContent>
            </Card>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Field</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Journal</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Citations</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {papers.map((paper) => (
                <TableRow key={paper.id}>
                  <TableCell className="font-medium max-w-xs">
                    <div className="truncate" title={paper.title}>{paper.title}</div>
                  </TableCell>
                  <TableCell>{paper.author}</TableCell>
                  <TableCell>{paper.field}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(paper.status)}>
                      {paper.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{paper.journal || "N/A"}</TableCell>
                  <TableCell>{paper.downloads}</TableCell>
                  <TableCell>{paper.citations}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditPaper(paper)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeletePaper(paper.id)}
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

      {/* Add/Edit Paper Modal */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-transparent backdrop-blur-md border-gray-700">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xl border border-gray-700/50 z-40" />
          <div className="relative z-50">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingPaper ? "Edit Research Paper" : "Add New Research Paper"}
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                {editingPaper ? "Update research paper details" : "Add comprehensive research paper information"}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 mt-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="paperTitle" className="text-white">Paper Title *</Label>
                    <Input 
                      id="paperTitle" 
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter paper title" 
                      className="bg-transparent border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="author" className="text-white">Primary Author *</Label>
                    <Input 
                      id="author" 
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="Enter primary author name" 
                      className="bg-transparent border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="coAuthors" className="text-white">Co-Authors</Label>
                    <Input 
                      id="coAuthors" 
                      name="coAuthors"
                      value={formData.coAuthors}
                      onChange={handleInputChange}
                      placeholder="Enter co-authors (comma separated)" 
                      className="bg-transparent backdrop-blur-md border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="field" className="text-white">Research Field *</Label>
                    <select 
                      name="field" 
                      value={formData.field}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-transparent backdrop-blur-md border-gray-600 text-white"
                      required
                    >
                      <option>AI/ML</option>
                      <option>Blockchain</option>
                      <option>Quantum Computing</option>
                      <option>Cybersecurity</option>
                      <option>Data Science</option>
                      <option>IoT</option>
                      <option>Software Engineering</option>
                      <option>Computer Vision</option>
                      <option>Natural Language Processing</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="status" className="text-white">Status *</Label>
                    <select 
                      name="status" 
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-transparent backdrop-blur-md border-gray-600 text-white"
                      required
                    >
                      <option>Draft</option>
                      <option>Under Review</option>
                      <option>Published</option>
                      <option>Rejected</option>
                      <option>Accepted</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Publication Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Publication Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="journal" className="text-white">Journal/Conference</Label>
                    <Input 
                      id="journal" 
                      name="journal"
                      value={formData.journal}
                      onChange={handleInputChange}
                      placeholder="Enter journal or conference name" 
                      className="bg-transparent backdrop-blur-md border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="volume" className="text-white">Volume/Issue</Label>
                    <Input 
                      id="volume" 
                      name="volume"
                      value={formData.volume}
                      onChange={handleInputChange}
                      placeholder="e.g., Vol. 15, Issue 3" 
                      className="bg-transparent backdrop-blur-md border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pages" className="text-white">Pages</Label>
                    <Input 
                      id="pages" 
                      name="pages"
                      value={formData.pages}
                      onChange={handleInputChange}
                      placeholder="e.g., 45-67" 
                      className="bg-transparent backdrop-blur-md border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="doi" className="text-white">DOI</Label>
                    <Input 
                      id="doi" 
                      name="doi"
                      value={formData.doi}
                      onChange={handleInputChange}
                      placeholder="Enter DOI" 
                      className="bg-transparent backdrop-blur-md border-gray-600 text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="keywords" className="text-white">Keywords</Label>
                    <Input 
                      id="keywords" 
                      name="keywords"
                      value={formData.keywords}
                      onChange={handleInputChange}
                      placeholder="Enter keywords (comma separated)" 
                      className="bg-transparent backdrop-blur-md border-gray-600 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Research Content */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Research Content</h3>
                <div>
                  <Label htmlFor="abstract" className="text-white">Abstract *</Label>
                  <Textarea 
                    id="abstract" 
                    name="abstract"
                    value={formData.abstract}
                    onChange={handleInputChange}
                    placeholder="Enter paper abstract..." 
                    className="bg-transparent backdrop-blur-md border-gray-600 text-white min-h-[100px]"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="methodology" className="text-white">Methodology</Label>
                  <Textarea 
                    id="methodology" 
                    name="methodology"
                    value={formData.methodology}
                    onChange={handleInputChange}
                    placeholder="Describe research methodology..." 
                    className="bg-transparent backdrop-blur-md border-gray-600 text-white min-h-[80px]"
                  />
                </div>
                <div>
                  <Label htmlFor="results" className="text-white">Results</Label>
                  <Textarea 
                    id="results" 
                    name="results"
                    value={formData.results}
                    onChange={handleInputChange}
                    placeholder="Describe key results and findings..." 
                    className="bg-transparent backdrop-blur-md border-gray-600 text-white min-h-[80px]"
                  />
                </div>
                <div>
                  <Label htmlFor="conclusions" className="text-white">Conclusions</Label>
                  <Textarea 
                    id="conclusions" 
                    name="conclusions"
                    value={formData.conclusions}
                    onChange={handleInputChange}
                    placeholder="Describe conclusions and future work..." 
                    className="bg-transparent backdrop-blur-md border-gray-600 text-white min-h-[80px]"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6 pt-4 border-t border-gray-700">
              <Button onClick={handleSavePaper} className="bg-blue-600 hover:bg-blue-700">
                {editingPaper ? "Update Paper" : "Save Paper"}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddForm(false)}
                className="border-gray-600 text-white hover:bg-transparent backdrop-blur-md"
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

export default ResearchSection;
