
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  User, Mail, Phone, Building, Calendar, MapPin, Clock, 
  Monitor, Settings, LogOut, Shield, Globe, Edit, Save, 
  Camera, Briefcase, GraduationCap, Award, Heart, Home,
  FileText, UserCheck, CreditCard, Lock
} from "lucide-react";
import { useUserContext } from "@/contexts/UserContext";

interface EnhancedProfilePageProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnhancedProfilePage: React.FC<EnhancedProfilePageProps> = ({ isOpen, onClose }) => {
  const { user, loginHistory, currentSession, logout } = useUserContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    firstName: user?.firstName || user?.name?.split(' ')[0] || '',
    lastName: user?.lastName || user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: user?.phone || '+1-555-0123',
    address: user?.address || '123 Tech Street, Silicon Valley, CA 94301',
    emergencyContact: user?.emergencyContact || '+1-555-0124',
    dateOfBirth: user?.dateOfBirth || '1990-01-01',
    nationality: user?.nationality || 'American',
    employeeId: user?.employeeId || 'EMP001',
    department: user?.department || 'web-mobile',
    position: user?.position || 'Senior Developer',
    manager: user?.manager || 'John Smith',
    startDate: user?.startDate || '2024-01-15',
    education: user?.education || 'Master of Computer Science',
    skills: user?.skills || ['React', 'TypeScript', 'Node.js'],
    languages: user?.languages || ['English', 'Spanish'],
    bio: user?.bio || 'Passionate software developer with expertise in modern web technologies.'
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ceo': return 'bg-yellow-600';
      case 'hr': return 'bg-green-600';
      case 'hod': return 'bg-purple-600';
      case 'employee': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const getDepartmentName = (deptId: string) => {
    const departments: Record<string, string> = {
      'web-mobile': 'Web/Mobile Development',
      'ai-dev': 'AI Development',
      'robotics': 'Robotics',
      'networking': 'Networking',
      'cybersecurity': 'Cybersecurity',
      'blockchain': 'Blockchain'
    };
    return departments[deptId] || 'General';
  };

  const formatDateTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving profile:', editedProfile);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  if (!user) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sliding Panel */}
      <div className={`
        fixed top-0 right-0 h-full w-[32rem] bg-gray-900/95 backdrop-blur-xl border-l border-gray-700 z-50
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Complete Profile</h2>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <Button variant="ghost" size="sm" onClick={handleSave}>
                  <Save className="w-4 h-4" />
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4" />
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={onClose}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Profile Picture & Basic Info */}
          <Card className="bg-gray-800/50 border-gray-600">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <Button size="sm" className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full p-0 bg-blue-600">
                    <Camera className="w-3 h-3" />
                  </Button>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={getRoleColor(user.role)}>
                      {user.role.toUpperCase()}
                    </Badge>
                    {user.department && (
                      <Badge variant="outline" className="border-gray-500 text-gray-300">
                        {getDepartmentName(user.department)}
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {editedProfile.firstName} {editedProfile.lastName}
                  </h3>
                  <p className="text-gray-400">{editedProfile.position}</p>
                </div>
              </div>
              
              {isEditing && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-gray-300">First Name</Label>
                    <Input
                      value={editedProfile.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Last Name</Label>
                    <Input
                      value={editedProfile.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="bg-gray-800/50 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <div className="flex-1">
                    <Label className="text-gray-300">Email</Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    ) : (
                      <p className="text-white">{editedProfile.email}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <div className="flex-1">
                    <Label className="text-gray-300">Phone</Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    ) : (
                      <p className="text-white">{editedProfile.phone}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Home className="w-4 h-4 text-gray-400 mt-1" />
                  <div className="flex-1">
                    <Label className="text-gray-300">Address</Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    ) : (
                      <p className="text-white">{editedProfile.address}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Heart className="w-4 h-4 text-gray-400" />
                  <div className="flex-1">
                    <Label className="text-gray-300">Emergency Contact</Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.emergencyContact}
                        onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    ) : (
                      <p className="text-white">{editedProfile.emergencyContact}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div className="flex-1">
                    <Label className="text-gray-300">Date of Birth</Label>
                    {isEditing ? (
                      <Input
                        type="date"
                        value={editedProfile.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    ) : (
                      <p className="text-white">{new Date(editedProfile.dateOfBirth).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <div className="flex-1">
                    <Label className="text-gray-300">Nationality</Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.nationality}
                        onChange={(e) => handleInputChange('nationality', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    ) : (
                      <p className="text-white">{editedProfile.nationality}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card className="bg-gray-800/50 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Professional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-4 h-4 text-gray-400" />
                  <div className="flex-1">
                    <Label className="text-gray-300">Employee ID</Label>
                    <p className="text-white">{editedProfile.employeeId}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Building className="w-4 h-4 text-gray-400" />
                  <div className="flex-1">
                    <Label className="text-gray-300">Department</Label>
                    <p className="text-white">{getDepartmentName(editedProfile.department)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <UserCheck className="w-4 h-4 text-gray-400" />
                  <div className="flex-1">
                    <Label className="text-gray-300">Manager</Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.manager}
                        onChange={(e) => handleInputChange('manager', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    ) : (
                      <p className="text-white">{editedProfile.manager}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div className="flex-1">
                    <Label className="text-gray-300">Start Date</Label>
                    <p className="text-white">{new Date(editedProfile.startDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-4 h-4 text-gray-400" />
                  <div className="flex-1">
                    <Label className="text-gray-300">Education</Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.education}
                        onChange={(e) => handleInputChange('education', e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    ) : (
                      <p className="text-white">{editedProfile.education}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Session */}
          {currentSession && (
            <Card className="bg-gray-800/50 border-gray-600">
              <CardHeader>
                <CardTitle className="text-white text-sm flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-green-400" />
                  Current Session
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-white">Started: {formatDateTime(currentSession.sessionStart)}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Monitor className="w-4 h-4 text-gray-400" />
                  <span className="text-white">Last Activity: {formatDateTime(currentSession.lastActivity)}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <Badge className="bg-green-600 text-xs">Active Session</Badge>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Actions */}
          <div className="space-y-2">
            <Button size="sm" variant="outline" className="w-full justify-start">
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </Button>
            <Button size="sm" variant="outline" className="w-full justify-start">
              <Lock className="w-4 h-4 mr-2" />
              Privacy Settings
            </Button>
            <Button size="sm" variant="outline" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Download Profile Data
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={logout}
              className="w-full justify-start border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnhancedProfilePage;
