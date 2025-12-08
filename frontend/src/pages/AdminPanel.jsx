import React from 'react';
import { Users, Shield, Flag, CheckCircle, XCircle, Search } from 'lucide-react';
import StatCard from '../components/StatCard';
const AdminPanel = () => {
    const users = [
        { id: 1, name: "Alex Chen", email: "alex@example.com", role: "Freelancer", status: "Active", joined: "2021-10-12" },
        { id: 2, name: "Sarah Jenkins", email: "sarah@example.com", role: "Client", status: "Pending", joined: "2023-01-15" },
        { id: 3, name: "Mike Ross", email: "mike@example.com", role: "Freelancer", status: "Banned", joined: "2022-05-20" },
        { id: 4, name: "TechStart Inc.", email: "contact@techstart.io", role: "Client", status: "Active", joined: "2023-02-10" },
    ];
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
                <div className="flex gap-2">
                    <button className="bg-white border border-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition">Settings</button>
                </div>
            </div>
            { }
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Users"
                    value="2,450"
                    change="120"
                    color="emerald"
                    icon={Users}
                />
                <StatCard
                    title="Active Disputes"
                    value="5"
                    change="2"
                    changeType="negative"
                    color="red"
                    icon={Flag}
                />
                <StatCard
                    title="Pending Approvals"
                    value="18"
                    change="5"
                    changeType="neutral"
                    color="amber"
                    icon={Shield}
                />
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h2 className="text-lg font-bold text-gray-900">User Management</h2>
                    <div className="relative w-full sm:w-64">
                        <input type="text" placeholder="Search users..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-emerald-500 focus:border-emerald-500" />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Joined</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-medium text-gray-900">{user.name}</div>
                                            <div className="text-gray-500 text-xs">{user.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'Freelancer' ? 'bg-emerald-50 text-emerald-600' : 'bg-teal-50 text-teal-600'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`flex items-center gap-1.5 font-medium ${user.status === 'Active' ? 'text-green-600' :
                                            user.status === 'Pending' ? 'text-orange-500' : 'text-red-500'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-600' :
                                                user.status === 'Pending' ? 'bg-orange-500' : 'bg-red-500'
                                                }`}></span>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {user.joined}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-1 rounded text-green-600 hover:bg-green-50" title="Approve">
                                                <CheckCircle className="w-5 h-5" />
                                            </button>
                                            <button className="p-1 rounded text-red-600 hover:bg-red-50" title="Ban">
                                                <XCircle className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                    <span>Showing 4 of 2450 users</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border rounded hover:bg-gray-50">Prev</button>
                        <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminPanel;