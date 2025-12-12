import { Outlet, Link } from 'react-router-dom';
import { LogOut, LayoutDashboard, Calendar, Users, Settings } from 'lucide-react';

const AdminLayout = () => {
  const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          <Link 
            to="/admin" 
            className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link 
            to="/admin/events" 
            className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <Calendar className="w-5 h-5 mr-3" />
            Events
          </Link>
          <Link 
            to="/admin/members" 
            className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <Users className="w-5 h-5 mr-3" />
            Members
          </Link>
          <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
            <button 
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-gray-800 rounded-md"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
