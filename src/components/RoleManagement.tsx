
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Edit, Trash2, Shield, Crown, UserCheck, User, BookOpen, FileSearch, GraduationCap } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ceo' | 'hr' | 'hod' | 'employee' | 'research-collaborator' | 'auditor' | 'intern';
  department?: string;
  salary?: number;
  joinDate: string;
  status: 'active' | 'inactive';
}

interface RoleManagementProps {
  currentUserRole: string;
  currentUserDepartment?: string;
}

const RoleManagement = ({ currentUserRole, currentUserDepartment }: RoleManagementProps) => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'John CEO', email: 'ceo@company.com', role: 'ceo', joinDate: '2020-01-01', status: 'active' },
    { id: '2', name: 'Sarah HR', email: 'hr@company.com', role: 'hr', joinDate: '2021-03-15', status: 'active' },
    { id: '3', name: 'Mike HOD', email: 'hod@company.com', role: 'hod', department: 'web-mobile', joinDate: '2021-06-01', status: 'active' },
    { id: '4', name: 'Alice Employee', email: 'alice@company.com', role: 'employee', department: 'ai-dev', joinDate: '2022-01-15', status: 'active', salary: 75000 },
    { id: '5', name: 'Dr. Research Smith', email: 'research@company.com', role: 'research-collaborator', joinDate: '2022-06-01', status: 'active' },
    { id: '6', name: 'Audit Johnson', email: 'auditor@company.com', role: 'auditor', joinDate: '2023-01-15', status: 'active' },
    { id: '7', name: 'Intern Davis', email: 'intern@company.com', role: 'intern', department: 'ai-dev', joinDate: '2024-01-01', status: 'active' }
  ]);

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    salary: ''
  });

  const departments = [
    { id: 'web-mobile', name: 'Web/Mobile Development' },
    { id: 'ai-dev', name: 'AI Development' },
    { id: 'robotics', name: 'Robotics' },
    { id: 'networking', name: 'Networking' },
    { id: 'cybersecurity', name: 'Cybersecurity' },
    { id: 'blockchain', name: 'Blockchain' }
  ];

  const canAddRole = (role: string) => {
    if (currentUserRole === 'ceo') return true;
    if (currentUserRole === 'hr') return ['employee', 'intern'].includes(role);
    if (currentUserRole === 'hod') return ['employee', 'intern'].includes(role);
    return false;
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'ceo': return <Crown className="w-4 h-4" />;
      case 'hr': return <UserCheck className="w-4 h-4" />;
      case 'hod': return <Shield className="w-4 h-4" />;
      case 'employee': return <User className="w-4 h-4" />;
      case 'research-collaborator': return <BookOpen className="w-4 h-4" />;
      case 'auditor': return <FileSearch className="w-4 h-4" />;
      case 'intern': return <GraduationCap className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ceo': return 'bg-yellow-600';
      case 'hr': return 'bg-green-600';
      case 'hod': return 'bg-purple-600';
      case 'employee': return 'bg-blue-600';
      case 'research-collaborator': return 'bg-indigo-600';
      case 'auditor': return 'bg-red-600';
      case 'intern': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'research-collaborator': return 'RESEARCH COLLABORATOR';
      default: return role.toUpperCase();
    }
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      toast("Please fill in all required fields");
      return;
    }

    if (!canAddRole(newUser.role)) {
      toast("You don't have permission to add this role");
      return;
    }

    if ((newUser.role === 'hod' || newUser.role === 'employee' || newUser.role === 'intern') && !newUser.department) {
      toast("Please select a department");
      return;
    }

    const user: User = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as any,
      department: newUser.department || undefined,
      salary: newUser.salary ? parseInt(newUser.salary) : undefined,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };

    setUsers(prev => [...prev, user]);
    setNewUser({ name: '', email: '', role: '', department: '', salary: '' });
    setIsAddUserOpen(false);
    toast(`${getRoleDisplayName(newUser.role)} added successfully!`);
  };

  const filteredUsers = users.filter(user => {
    if (currentUserRole === 'ceo') return true;
    if (currentUserRole === 'hod') {
      return user.department === currentUserDepartment || ['hr', 'research-collaborator'].includes(user.role);
    }
    if (currentUserRole === 'hr') {
      return ['employee', 'intern', 'hr'].includes(user.role);
    }
    return false;
  });

  if (['employee', 'research-collaborator', 'auditor', 'intern'].includes(currentUserRole)) {
    return null; // These roles can't manage other roles
  }

  return (
    <Card className="bg-white/10 border-gray-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-white">Role Management</CardTitle>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">Add New User</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">Full Name *</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="role" className="text-white">Role *</Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser(prev => ({ ...prev, role: value }))}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {currentUserRole === 'ceo' && <SelectItem value="hr">HR Manager</SelectItem>}
                      {currentUserRole === 'ceo' && <SelectItem value="hod">Head of Department</SelectItem>}
                      {currentUserRole === 'ceo' && <SelectItem value="research-collaborator">Research Collaborator</SelectItem>}
                      {currentUserRole === 'ceo' && <SelectItem value="auditor">Auditor</SelectItem>}
                      {(currentUserRole === 'ceo' || currentUserRole === 'hr' || currentUserRole === 'hod') && <SelectItem value="employee">Employee</SelectItem>}
                      {(currentUserRole === 'ceo' || currentUserRole === 'hr' || currentUserRole === 'hod') && <SelectItem value="intern">Intern</SelectItem>}
                    </SelectContent>
                  </Select>
                </div>
                {(newUser.role === 'hod' || newUser.role === 'employee' || newUser.role === 'intern') && (
                  <div>
                    <Label htmlFor="department" className="text-white">Department *</Label>
                    <Select value={newUser.department} onValueChange={(value) => setNewUser(prev => ({ ...prev, department: value }))}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        {departments.map(dept => (
                          <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {(newUser.role === 'employee' || newUser.role === 'intern') && (
                  <div>
                    <Label htmlFor="salary" className="text-white">Salary/Stipend</Label>
                    <Input
                      id="salary"
                      type="number"
                      value={newUser.salary}
                      onChange={(e) => setNewUser(prev => ({ ...prev, salary: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder={newUser.role === 'intern' ? "Monthly stipend" : "Annual salary"}
                    />
                  </div>
                )}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddUser}>Add User</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getRoleColor(user.role)}`}>
                  {getRoleIcon(user.role)}
                </div>
                <div>
                  <p className="text-white font-medium">{user.name}</p>
                  <p className="text-gray-300 text-sm">{user.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={getRoleColor(user.role)}>
                      {getRoleDisplayName(user.role)}
                    </Badge>
                    {user.department && (
                      <Badge variant="outline">
                        {departments.find(d => d.id === user.department)?.name}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleManagement;
