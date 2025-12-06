import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import images from "@/constants/images";

const PublicLayout = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size (mobile vs desktop)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Background map (desktop vs mobile)
  const backgroundMap: Record<string, { desktop: string; mobile: string }> = {
    "/": { desktop: images.home, mobile: images.homeMobile },
    "/features": { desktop: images.features, mobile: images.featuresMobile },
    "/contact": { desktop: images.contact, mobile: images.contactMobile },
    "/auth": { desktop: images.universal, mobile: images.universalMobile },
    "/about": { desktop: images.universal, mobile: images.universalMobile },
    "/artificial-intelligence": { desktop: images.universal, mobile: images.universalMobile },
    "/robotics-systems": { desktop: images.universal, mobile: images.universalMobile },
    "/space-projects": { desktop: images.universal, mobile: images.universalMobile },
    "/web-development": { desktop: images.universal, mobile: images.universalMobile },
    "/internships": { desktop: images.universal, mobile: images.universalMobile },
    "/portfolio": { desktop: images.universal, mobile: images.universalMobile },
    "/dev-lab": { desktop: images.universal, mobile: images.universalMobile },
    "/dev-team": { desktop: images.universal, mobile: images.universalMobile },
  };

  // Get current background
  const currentBg =
    backgroundMap[location.pathname] || { desktop: images.universal, mobile: images.universalMobile };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat relative transition-all duration-500 ease-in-out"
      style={{
        backgroundImage: `url(${isMobile ? currentBg.mobile : currentBg.desktop})`,
      }}
    >
      <div className="absolute inset-0 bg-black/40 z-1" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 z-2" />
      <div className="relative z-10">
        <Navigation />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PublicLayout;
