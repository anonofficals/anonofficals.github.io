
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, Mail, Phone, Building, Calendar, MapPin, Clock, 
  Monitor, Settings, LogOut, Shield, Globe 
} from "lucide-react";
import { useUserContext } from "@/contexts/UserContext";

interface ProfilePageProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ isOpen, onClose }) => {
  const { user, loginHistory, currentSession, logout } = useUserContext();

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
        fixed top-0 right-0 h-full w-96 bg-gray-900/95 backdrop-blur-xl border-l border-gray-700 z-50
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Profile</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
          
          {/* User Info Card */}
          <Card className="bg-gray-800/50 border-gray-600">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white text-lg">
                    {user.name || user.email?.split('@')[0]}
                  </CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={getRoleColor(user.role)}>
                      {user.role.toUpperCase()}
                    </Badge>
                    {user.department && (
                      <Badge variant="outline" className="border-gray-500 text-gray-300">
                        {getDepartmentName(user.department)}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-white text-sm">{user.email}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-white text-sm">{user.phone || "+1-555-0123"}</span>
              </div>
              
              {user.department && (
                <div className="flex items-center space-x-3">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className="text-white text-sm">{getDepartmentName(user.department)}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-white text-sm">Joined: {user.joinDate || "Jan 2024"}</span>
              </div>
            </CardContent>
          </Card>
          
          {/* Current Session */}
          {currentSession && (
            <Card className="bg-gray-800/50 border-gray-600">
              <CardHeader className="pb-3">
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
          
          {/* Login History */}
          <Card className="bg-gray-800/50 border-gray-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm">Recent Login History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {loginHistory.filter(entry => entry.userId === user.email).slice(0, 5).map((entry, index) => (
                <div key={index} className="border-b border-gray-700 pb-2 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-white text-xs font-medium">
                        {formatDateTime(entry.loginTime)}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <MapPin className="w-3 h-3" />
                        <span>{entry.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <Monitor className="w-3 h-3" />
                        <span>{entry.device}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">{entry.ipAddress}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          {/* Actions */}
          <div className="space-y-2">
            <Button size="sm" variant="outline" className="w-full justify-start">
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
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

export default ProfilePage;
