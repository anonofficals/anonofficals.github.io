import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LogOut, User } from "lucide-react";
import { useNavigation } from "@/contexts/NavigationContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { setDirection } = useNavigation();

  const isActive = (path: string) => location.pathname === path;

  const navLinkClasses = (path: string) =>
    `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActive(path)
      ? "text-blue-400 bg-gray-800"
      : "text-white/90 hover:text-white hover:bg-gray-700"
    }`;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // ✅ Centralized nav items config
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const pageOrder = ["/", "/about", "/contact"];

  const handleNavClick = (targetPath: string) => {
    const currentIndex = pageOrder.indexOf(location.pathname);
    const targetIndex = pageOrder.indexOf(targetPath);

    if (targetIndex > currentIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    toast("Logged out successfully");
    setIsMobileMenuOpen(false);
  };

  const getDashboardPath = () => {
    if (!user) return "/dashboard";
    const primaryRole = Array.isArray(user.roles) ? user.roles[0] : 'client';
    switch (primaryRole) {
      case "ceo":
        return "/dashboard";
      case "hr":
        return "/dashboard/hr";
      case "hod":
        return "/dashboard/hod";
      case "employee":
        return "/dashboard/employee";
      case "student":
        return "/dashboard/student";
      default:
        return "/dashboard";
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="container-custom py-4 flex justify-between items-center px-4 lg:px-0">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3"
          onClick={() => handleNavClick("/")}
        >
          <img
            src={logo}
            alt="Anon Logo"
            className="h-12 md:h-12 object-contain"
            loading="lazy"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              aria-current={isActive(item.path) ? "page" : undefined}
              className={`relative px-6 py-3 text-sm font-semibold transition-all duration-300 rounded-xl ${isActive(item.path)
                ? "text-white shadow-lg"
                : "text-white/90 hover:text-white hover:shadow-lg"
                } group`}
              onClick={() => handleNavClick(item.path)}
            >
              {item.name}
              {!isActive(item.path) && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-fuchsia-600 to-blue-700 transition-all duration-300 group-hover:w-full"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <Link
                to={getDashboardPath()}
                className="relative group text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-6 h-6 mr-2" />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-fuchsia-600 to-blue-700 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          ) : (
            <Link
              to="/auth"
              className="relative group text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300"
            >
              Login
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-fuchsia-600 to-blue-700 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 rounded-lg text-gray-300 hover:bg-white/20"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black/30 backdrop-blur-xl border-t border-white/10">
          <nav className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${navLinkClasses(item.path)} block`}
                onClick={() => handleNavClick(item.path)}
              >
                {item.name}
              </Link>
            ))}

            {user?.roles?.includes("student") && (
              <Link
                to="/internship-apply"
                className={`${navLinkClasses("/internship-apply")} block`}
                onClick={() => handleNavClick("/internship-apply")}
              >
                Apply for Internship
              </Link>
            )}

            {user ? (
              <div className="pt-4 border-t border-white/20 space-y-2">
                <div className="flex items-center space-x-2 text-white px-4 py-2">
                  <User size={20} />
                  <span>{user.name}</span>
                </div>
                <Link
                  to={getDashboardPath()}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="w-full bg-transparent items-center justify-center">
                    <User className="w-4 h-4 mr-2" /> Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full border-white/30 text-white hover:bg-white/20 bg-white/10 backdrop-blur"
                >
                  <LogOut className="mr-2 w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="pt-4 border-t border-white/20 space-y-2">
                <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-blue-600/80 hover:bg-blue-700/80 text-white backdrop-blur">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
