
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate("/");
  };

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access a non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col" style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      
      <div className="flex-1 flex items-center justify-center backdrop-blur-sm p-8">
        <div className="bg-white/10 backdrop-blur-xl w-[90%] md:w-[50%] max-w-2xl rounded-lg shadow-2xl border border-white/20 flex flex-col items-center justify-center p-8">
          <div className="flex flex-col items-center">
            <AlertTriangle size={70} className="text-red-400 mb-4" />
            <h2 className="text-2xl font-bold text-center mb-4 text-white">
              Oops! It looks like you've encountered a 404 error.
            </h2>
            <p className="text-center text-gray-300 mb-8">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
          </div>
          <button
            onClick={handleHomeRedirect}
            className="px-6 py-3 bg-blue-600/80 text-white rounded-lg hover:bg-blue-700/80 transition backdrop-blur"
          >
            Go to Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
