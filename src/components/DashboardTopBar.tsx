import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, User } from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";
import { useUserContext } from "@/contexts/UserContext";
import NotificationPanel from "./NotificationPanel";
import logo from "@/assets/logo.png";
interface DashboardTopBarProps {
  user: any;
  title?: string;
}

const DashboardTopBar = ({ user, title }: DashboardTopBarProps) => {
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();
  const { logout } = useUserContext();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ceo":
        return "bg-yellow-600";
      case "hr":
        return "bg-green-600";
      case "hod":
        return "bg-purple-600";
      case "employee":
        return "bg-blue-600";
      default:
        return "bg-gray-600";
    }
  };

  const getDepartmentName = (deptId: string) => {
    const departments: Record<string, string> = {
      "web-mobile": "Web/Mobile Dev",
      "ai-dev": "AI Development",
      robotics: "Robotics",
      networking: "Networking",
      cybersecurity: "Cybersecurity",
      blockchain: "Blockchain",
    };
    return departments[deptId] || "";
  };

  const handleProfileClick = () => {
    navigate("/dashboard/profile");
  };

  return (
    <>
      <header className="bg-black/20 backdrop-blur-xl border-b border-white/10 px-6 py-4 w-full z-50">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src={logo}
                alt="Anon Logo"
                className="h-4 md:h-8 object-contain"
                loading="lazy"
              />
              <span className="text-sm md:text-base font-semibold text-white">
                Anon
              </span>
            </Link>
          </div>

          {/* Title + Role */}
          <div>
            <div className="flex items-center space-x-2 mt-1">
              <Badge className={getRoleColor(user.role)}>
                {user.role.toUpperCase()}
              </Badge>
              {/* Show department ONLY if not CEO or Client */}
              {user.department &&
                user.role !== "ceo" &&
                user.role !== "client" && (
                  <Badge
                    variant="outline"
                    className="border-white/30 text-white"
                  >
                    {getDepartmentName(user.department)}
                  </Badge>
                )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative flex items-center justify-center text-white hover:bg-white/20"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-red-600">
                  {unreadCount}
                </Badge>
              )}
            </Button>

            {/* User Profile */}
            <Button
              variant="ghost"
              size="icon"
              className="flex items-center justify-center rounded-full text-white hover:bg-white/20"
              onClick={handleProfileClick}
            >
              <User className="w-5 h-5" />
            </Button>
          </div>

        </div>
      </header>

      {/* Sliding Notifications Panel */}
      <NotificationPanel
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </>
  );
};

export default DashboardTopBar;
