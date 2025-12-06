
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, Star, Phone, Mail } from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  position: string;
  email: string;
  phone?: string;
  performance: number;
  status: 'Active' | 'On Leave' | 'Inactive';
  projects?: number;
  tasksCompleted?: number;
  rating?: number;
  salary?: number;
}

interface StaffCardProps {
  member: StaffMember;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  showSalary?: boolean;
}

const StaffCard = ({ member, onView, onEdit, onDelete, showSalary = false }: StaffCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-600";
      case "On Leave": return "bg-yellow-600";
      case "Inactive": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "text-green-400";
    if (performance >= 80) return "text-blue-400";
    if (performance >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="p-3 sm:p-4 rounded-lg bg-gray-800/50 border border-gray-600">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
        {/* Member Info */}
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm sm:text-base">
                {member.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-white font-semibold text-sm sm:text-base truncate">{member.name}</h4>
              <p className="text-gray-300 text-xs sm:text-sm truncate">{member.position}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Mail className="w-3 h-3 text-gray-400" />
                <p className="text-gray-400 text-xs truncate">{member.email}</p>
              </div>
            </div>
            <Badge className={getStatusColor(member.status)}>
              {member.status}
            </Badge>
          </div>
          
          {/* Stats Grid - Responsive */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 text-xs sm:text-sm">
            <div>
              <p className="text-gray-400">Performance</p>
              <p className={`font-bold ${getPerformanceColor(member.performance)}`}>
                {member.performance}%
              </p>
            </div>
            {member.projects !== undefined && (
              <div>
                <p className="text-gray-400">Projects</p>
                <p className="text-white font-medium">{member.projects}</p>
              </div>
            )}
            {member.tasksCompleted !== undefined && (
              <div>
                <p className="text-gray-400">Tasks Done</p>
                <p className="text-white font-medium">{member.tasksCompleted}</p>
              </div>
            )}
            {member.rating !== undefined && (
              <div>
                <p className="text-gray-400">Rating</p>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <p className="text-white font-medium">{member.rating}</p>
                </div>
              </div>
            )}
            {showSalary && member.salary && (
              <div>
                <p className="text-gray-400">Salary</p>
                <p className="text-white font-medium">${member.salary.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button size="sm" variant="outline" onClick={() => onView?.(member.id)}>
            <Eye className="w-4 h-4" />
            <span className="sr-only">View</span>
          </Button>
          <Button size="sm" variant="outline" onClick={() => onEdit?.(member.id)}>
            <Edit className="w-4 h-4" />
            <span className="sr-only">Edit</span>
          </Button>
          {onDelete && (
            <Button size="sm" variant="outline" onClick={() => onDelete(member.id)}>
              <Trash2 className="w-4 h-4" />
              <span className="sr-only">Delete</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffCard;
