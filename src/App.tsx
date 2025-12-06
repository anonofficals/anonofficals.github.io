import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';

// Public Pages
import Index from './pages/Index';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Documentation from './pages/Documentation';
import Blog from './pages/Blog';
import ReadBlog from './pages/ReadBlog';
import Community from './pages/Community';
import Contributions from './pages/Contributions';
import Contributors from './pages/Contributors';
import ReadDocs from "./pages/ReadDocs";
import ContributionGuide from './pages/ContributionGuide';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Donate from './pages/Donate';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';

// Contexts
import { UserProvider } from './contexts/UserContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { NavigationProvider } from './contexts/NavigationContext';
import { AuthProvider } from './contexts/AuthContext';

// Dashboard Pages
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import ManageBlogs from './pages/dashboard/ManageBlogs';
import ManageProjects from './pages/dashboard/ManageProjects';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavigationProvider>
          <UserProvider>
            <NotificationProvider>
              <Routes>
                {/* Public Routes with PublicLayout */}
                <Route path="/" element={<PublicLayout />}>
                  <Route index element={<Index />} />
                  <Route path="about" element={<About />} />

                  {/* Projects */}
                  <Route path="projects" element={<Projects />} />
                  <Route path="projects/:id" element={<ProjectDetail />} />
                  <Route path="projects/:id/docs" element={<ReadDocs />} />

                  {/* Documentation */}
                  <Route path="docs" element={<Documentation />} />

                  {/* Blog */}
                  <Route path="blog" element={<Blog />} />
                  <Route path="blogs/:id" element={<ReadBlog />} />

                  {/* Community */}
                  <Route path="community" element={<Community />} />
                  <Route path="contributions" element={<Contributions />} />
                  <Route path="contributors" element={<Contributors />} />
                  <Route path="contribution-guide" element={<ContributionGuide />} />

                  {/* Contact & Donate */}
                  <Route path="contact" element={<Contact />} />
                  <Route path="donate" element={<Donate />} />

                  {/* Legal */}
                  <Route path="privacy-policy" element={<PrivacyPolicy />} />

                  {/* Auth */}
                  <Route path="auth" element={<Auth />} />
                  <Route path="login" element={<Auth />} />
                  <Route path="signup" element={<Auth />} />
                  <Route path="register" element={<Auth />} />
                </Route>

                {/* Private Routes with PrivateLayout */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<Overview />} />
                  <Route path="blogs" element={<ManageBlogs />} />
                  <Route path="projects" element={<ManageProjects />} />
                  {/* Add other dashboard routes here if needed */}
                </Route>

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </NotificationProvider>
          </UserProvider>
        </NavigationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
