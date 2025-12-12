import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, Calendar, BarChart2, Settings, PlusCircle } from 'lucide-react';

// Protected Route Wrapper
const withAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Check if user is authenticated
      const authStatus = localStorage.getItem('isAdminAuthenticated');
      if (authStatus !== 'true') {
        navigate('/admin/login');
      } else {
        setIsAuthenticated(true);
      }
      setLoading(false);
    }, [navigate]);

    const handleLogout = () => {
      localStorage.removeItem('isAdminAuthenticated');
      navigate('/admin/login');
    };

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="animate-pulse text-white">Loading...</div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} onLogout={handleLogout} />;
  };
};

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  // Mock data
  const stats = [
    { name: 'Total Visitors', value: '2,458', change: '+12%', changeType: 'increase' },
    { name: 'Events', value: '24', change: '+4', changeType: 'increase' },
    { name: 'Active Users', value: '1,234', change: '+12.5%', changeType: 'increase' },
    { name: 'Revenue', value: '$12,450', change: '+8.2%', changeType: 'increase' },
  ];

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'added a new event', time: '5 min ago' },
    { id: 2, user: 'Jane Smith', action: 'updated event details', time: '1 hour ago' },
    { id: 3, user: 'Alex Johnson', action: 'uploaded new images', time: '2 hours ago' },
    { id: 4, user: 'Sarah Williams', action: 'replied to a message', time: '3 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Ekarikthin Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={onLogout}
                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 h-screen sticky top-0 border-r border-gray-700">
          <nav className="p-4">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <BarChart2 className="w-5 h-5 mr-3" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'events' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <Calendar className="w-5 h-5 mr-3" />
                Events
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'users' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <Users className="w-5 h-5 mr-3" />
                Users
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'settings' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 hover:border-emerald-500/30 transition-colors">
                  <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                  <div className="mt-2 flex items-baseline">
                    <p className="text-2xl font-semibold text-white">{stat.value}</p>
                    <span className={`ml-2 text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">Recent Activity</h3>
                <button className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center">
                  <PlusCircle className="w-4 h-4 mr-1" />
                  Add New
                </button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start pb-4 border-b border-gray-700/50 last:border-0 last:pb-0">
                    <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-medium flex-shrink-0">
                      {activity.user.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium">
                        <span className="text-white">{activity.user}</span>{' '}
                        <span className="text-gray-400">{activity.action}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default withAuth(AdminDashboard);
