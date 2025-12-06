import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardTopBar from "@/components/DashboardTopBar";
import images from "@/constants/images";

interface DashboardLayoutProps {
  children?: React.ReactNode;
  title?: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isLoading, setIsLoading] = useState(true);

  // Mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Authentication check
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/auth");
      return;
    }
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setIsLoading(false);
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user");
      navigate("/auth");
    }
  }, [navigate]);

  // Background mapping with route-based logic
  const backgroundMap: Record<string, { desktop: string; mobile: string }> = {
    "/dashboard": { desktop: images.universal, mobile: images.universalMobile },
  };

  const getBackgroundImage = () => {
    let matchedRoute = backgroundMap[location.pathname];
    if (matchedRoute) {
      return isMobile ? matchedRoute.mobile : matchedRoute.desktop;
    }

    const routeKeys = Object.keys(backgroundMap).sort((a, b) => b.length - a.length);
    for (const route of routeKeys) {
      if (location.pathname.startsWith(route)) {
        matchedRoute = backgroundMap[route];
        return isMobile ? matchedRoute.mobile : matchedRoute.desktop;
      }
    }
    return isMobile ? images.universalMobile : images.universal;
  };

  if (isLoading || !user) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-white bg-cover bg-center bg-fixed transition-all duration-500"
        style={{ backgroundImage: `url(${getBackgroundImage()})` }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 z-0" />
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const backgroundImage = getBackgroundImage();

  return (
    <div
      className="min-h-screen flex bg-cover bg-center bg-fixed bg-no-repeat relative transition-all duration-500 ease-in-out"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Sidebar */}
      <div className="w-72 fixed top-0 left-0 bottom-0 z-40">
        <DashboardSidebar userRole={user.role} userDepartment={user.department} />
      </div>

      {/* Main Area */}
      <div className="flex-1 ml-72 flex flex-col relative z-10">
        {/* Top Bar */}
        <div className="fixed top-0 left-72 right-0 z-50">
          <DashboardTopBar user={user} title={title} />
        </div>

        {/* Page Content */}
        <main className="pt-16 p-6 overflow-y-auto">
          {children || <Outlet />}
        </main>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 z-0" />
    </div>
  );
};

export default DashboardLayout;
