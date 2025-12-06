import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  Banknote,
  FolderOpen,
  FileText,
  GraduationCap,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Settings,
  BarChart3,
  MessageSquare,
  Bell,
  UserCheck,
  Target,
  UsersIcon,
  Building,
  Shield,
  ClipboardList,
  Briefcase,
  UserPlus,
  BookOpen,
  Upload,
  FileSearch,
  Download,
  TrendingUp,
  Award,
  Brain,
  DollarSign,
  Edit3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

interface DashboardSidebarProps {
  userRole: string;
  userDepartment?: string;
}

const DashboardSidebar = ({ userRole, userDepartment }: DashboardSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getRoleSidebarItems = () => {
    return [
      { icon: LayoutGrid, label: "Overview", path: "/dashboard" },
      { icon: FolderOpen, label: "Projects", path: "/dashboard/projects" },
      { icon: MessageSquare, label: "Messages", path: "/dashboard/messages" },
      { icon: Settings, label: "Settings", path: "/dashboard/settings" },
    ];
  };

  const sidebarItems = getRoleSidebarItems();

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast("Logged out successfully");
    navigate("/");
  };

  const isActive = (path: string) => {
    if (path === "/dashboard" || path === "/dashboard/") {
      return location.pathname === "/dashboard" || location.pathname === "/dashboard/";
    }
    return location.pathname.startsWith(path);
  };

  const SidebarContent = () => (
    <div className="flex flex-col bg-black/40 backdrop-blur-xl border border-gray-700/50 rounded-xl overflow-hidden shadow-2xl h-full">
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${isActive(item.path)
                ? "bg-blue-600/80 text-white shadow-lg backdrop-blur-sm"
                : "text-gray-300 hover:text-white hover:bg-gray-700/50"
              }`}
            onClick={() => setIsMobileOpen(false)}
          >
            <item.icon size={20} />
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700/50">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={`w-full justify-start text-gray-300 hover:text-white hover:bg-red-600/20 ${isCollapsed ? "px-3" : ""
            }`}
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 text-white bg-black/50 backdrop-blur-md hover:bg-black/70"
      >
        <Menu size={24} />
      </Button>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative w-64 h-full p-4">
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </Button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar (starts under TopBar) */}
      <div
        className={`hidden lg:flex fixed left-0 top-16 h-[calc(100vh-4rem)] z-30 ${isCollapsed ? "w-20" : "w-72"
          } transition-all duration-300 p-4`}
      >
        <SidebarContent />
      </div>

      {/* Spacer for fixed sidebar */}
      <div
        className={`hidden lg:block ${isCollapsed ? "w-20" : "w-72"
          } transition-all duration-300 flex-shrink-0`}
      />
    </>
  );
};

export default DashboardSidebar;