import { Link } from "react-router-dom";
import { Award, Shield, Github, Twitter, Linkedin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-gray-800/50 py-12 bg-black/20 backdrop-blur-lg">
      <div className="container-responsive">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img
                src={logo}
                alt="Anon Logo"
                className="h-8 object-contain"
              />
              <span className="text-xl font-bold text-white tracking-wider">
                ᴀɴᴏɴ
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Pioneering the future of decentralized technology through open-source innovation. Secure, scalable, and community-driven.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/AnonOSS" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://X.com/AnonOSS" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/projects" className="hover:text-white transition-colors">Projects</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
              <li><Link to="/contribution-guide" className="hover:text-white transition-colors">Contribution Guide</Link></li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mt-4">
              <Shield className="w-4 h-4" />
              <span>Secure & Encrypted</span>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Anon Open Source. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
