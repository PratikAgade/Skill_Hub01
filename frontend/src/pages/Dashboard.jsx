import { useEffect, useState } from 'react';

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);



  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      {user && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome, {user.name}!</h2>
          <div className="space-y-2">
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Role:</span> {user.role}</p>
            <p><span className="font-semibold">User ID:</span> {user.id}</p>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Welcome to SkillHub! 🎉</h3>
        <p className="text-gray-700 mb-4">
          You're successfully logged in. Start exploring freelance opportunities or offer your skills to other students.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold text-gray-800 mb-2">Browse Services</h4>
            <p className="text-sm text-gray-600">Find talented students for your projects</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold text-gray-800 mb-2">Offer Services</h4>
            <p className="text-sm text-gray-600">Share your skills and earn money</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold text-gray-800 mb-2">Manage Projects</h4>
            <p className="text-sm text-gray-600">Track your ongoing work</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
