import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import DashboardTopBar from "@/components/DashboardTopBar";
import DashboardSidebar from "@/components/DashboardSidebar";
import images from "@/constants/images";

// Define user type
interface User {
  id: string;
  name: string;
  role: string;
  department?: string;
}

const PrivateLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  const backgroundMap: Record<string, { desktop: string; mobile: string }> = {
    "/dashboard": { desktop: images.universal, mobile: images.universalMobile },
    // add more routes if needed
  };

  // Detect screen resize and update state
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute background only when route or screen size changes
  const backgroundImage = useMemo(() => {
    let matchedRoute = Object.keys(backgroundMap).find((route) =>
      location.pathname.startsWith(route)
    );

    if (!matchedRoute) matchedRoute = "/dashboard";

    return isMobile
      ? backgroundMap[matchedRoute].mobile
      : backgroundMap[matchedRoute].desktop;
  }, [location.pathname, isMobile]);

  // Load user data
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/auth");
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat relative transition-all duration-500 ease-in-out"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 z-0" />

      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <DashboardTopBar user={user} />
      </div>

      {/* Sidebar */}
      <DashboardSidebar userRole={user.role} userDepartment={user.department} />

      {/* Main Content */}
      <main className="pt-16 p-6 overflow-y-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PrivateLayout;
