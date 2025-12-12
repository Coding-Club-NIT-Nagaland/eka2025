import React from 'react';
import { Calendar, Users, Clock } from 'lucide-react';

const Dashboard = () => {
  // Mock data - replace with actual data from your API
  const stats = [
    { name: 'Total Events', value: '24', icon: <Calendar className="w-8 h-8" />, color: 'bg-blue-500' },
    { name: 'Team Members', value: '15', icon: <Users className="w-8 h-8" />, color: 'bg-green-500' },
    { name: 'Upcoming Events', value: '8', icon: <Clock className="w-8 h-8" />, color: 'bg-yellow-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.color} text-white mr-4`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-500 text-sm">{stat.name}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center border-b border-gray-100 pb-3">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">New event added: Workshop {item}</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
