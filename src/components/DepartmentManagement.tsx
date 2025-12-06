
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Building, Users, DollarSign, TrendingUp, Edit, Trash2, Plus, Target } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([
    { 
      id: 1, 
      name: 'Web/Mobile Development', 
      code: 'web-mobile',
      employees: 45, 
      budget: 4200000, 
      revenue: 4200000,
      growth: 15.2,
      hod: 'Mike Johnson',
      projects: 12,
      status: 'active'
    },
    { 
      id: 2, 
      name: 'AI Development', 
      code: 'ai-dev',
      employees: 32, 
      budget: 3800000, 
      revenue: 3800000,
      growth: 22.1,
      hod: 'Sarah Chen',
      projects: 8,
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Robotics', 
      code: 'robotics',
      employees: 28, 
      budget: 2900000, 
      revenue: 2900000,
      growth: 8.7,
      hod: 'David Kumar',
      projects: 6,
      status: 'active'
    },
    { 
      id: 4, 
      name: 'Networking', 
      code: 'networking',
      employees: 22, 
      budget: 2100000, 
      revenue: 2100000,
      growth: 11.3,
      hod: 'Lisa Wang',
      projects: 4,
      status: 'active'
    },
    { 
      id: 5, 
      name: 'Cybersecurity', 
      code: 'cybersecurity',
      employees: 25, 
      budget: 1800000, 
      revenue: 1800000,
      growth: 18.5,
      hod: 'Robert Smith',
      projects: 7,
      status: 'active'
    },
    { 
      id: 6, 
      name: 'Blockchain', 
      code: 'blockchain',
      employees: 18, 
      budget: 1400000, 
      revenue: 1400000,
      growth: 25.8,
      hod: 'Anna Davis',
      projects: 5,
      status: 'active'
    }
  ]);

  const [isAddDeptOpen, setIsAddDeptOpen] = useState(false);
  const [newDept, setNewDept] = useState({
    name: '',
    code: '',
    budget: '',
    hod: ''
  });

  const handleAddDepartment = () => {
    if (!newDept.name || !newDept.code || !newDept.budget) {
      toast("Please fill in all required fields");
      return;
    }

    const department = {
      id: Date.now(),
      name: newDept.name,
      code: newDept.code,
      employees: 0,
      budget: parseInt(newDept.budget),
      revenue: 0,
      growth: 0,
      hod: newDept.hod || 'Not Assigned',
      projects: 0,
      status: 'active'
    };

    setDepartments(prev => [...prev, department]);
    setNewDept({ name: '', code: '', budget: '', hod: '' });
    setIsAddDeptOpen(false);
    toast("Department created successfully!");
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-600' : 'bg-red-600';
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 15) return 'text-green-400';
    if (growth > 10) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white flex items-center gap-2">
              <Building className="w-5 h-5" />
              Department Management
            </CardTitle>
            <Dialog open={isAddDeptOpen} onOpenChange={setIsAddDeptOpen}>
              <DialogTrigger asChild>
                <Button >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Department
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
                <DialogHeader>
                  <DialogTitle className="text-white">Create New Department</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="dept-name" className="text-white">Department Name *</Label>
                    <Input
                      id="dept-name"
                      value={newDept.name}
                      onChange={(e) => setNewDept(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="e.g., Machine Learning"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dept-code" className="text-white">Department Code *</Label>
                    <Input
                      id="dept-code"
                      value={newDept.code}
                      onChange={(e) => setNewDept(prev => ({ ...prev, code: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="e.g., ml-dev"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dept-budget" className="text-white">Initial Budget *</Label>
                    <Input
                      id="dept-budget"
                      type="number"
                      value={newDept.budget}
                      onChange={(e) => setNewDept(prev => ({ ...prev, budget: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Annual budget in USD"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dept-hod" className="text-white">Head of Department</Label>
                    <Input
                      id="dept-hod"
                      value={newDept.hod}
                      onChange={(e) => setNewDept(prev => ({ ...prev, hod: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="HOD Name (optional)"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddDeptOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddDepartment}>Create Department</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {departments.map((dept) => (
              <Card key={dept.id} className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white text-lg">{dept.name}</CardTitle>
                      <p className="text-gray-400 text-sm">Code: {dept.code}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={getStatusColor(dept.status)}>
                        {dept.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 ">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <div>
                        <p className="text-white font-bold">{dept.employees}</p>
                        <p className="text-gray-400 text-xs">Employees</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-purple-400" />
                      <div>
                        <p className="text-white font-bold">{dept.projects}</p>
                        <p className="text-gray-400 text-xs">Projects</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <div>
                        <p className="text-white font-bold">${(dept.budget / 1000000).toFixed(1)}M</p>
                        <p className="text-gray-400 text-xs">Budget</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-yellow-400" />
                      <div>
                        <p className={`font-bold ${getGrowthColor(dept.growth)}`}>{dept.growth}%</p>
                        <p className="text-gray-400 text-xs">Growth</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gray-600">
                    <p className="text-gray-300 text-sm">
                      <span className="font-medium">HOD:</span> {dept.hod}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentManagement;
