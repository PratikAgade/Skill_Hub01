import React from 'react';
import { DollarSign, FileText, Star, Briefcase, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
const FreelancerDashboard = () => {
    const [stats, setStats] = React.useState({
        earnings: 0,
        activeProjects: 0,
        proposalsSent: 0,
        successScore: 100
    });
    const [activeProjectsList, setActiveProjectsList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const headers = { Authorization: `Bearer ${token}` };
                const [statsRes, projectsRes] = await Promise.all([
                    fetch('/api/dashboard/freelancer/stats', { headers }),
                    fetch('/api/dashboard/freelancer/active-projects', { headers })
                ]);
                if (statsRes.ok) {
                    const statsData = await statsRes.json();
                    setStats(statsData);
                }
                if (projectsRes.ok) {
                    const projectsData = await projectsRes.json();
                    setActiveProjectsList(projectsData);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);
    if (loading) return <div>Loading dashboard...</div>;
    return (
        <div className="space-y-8">
            { }
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Dashboard</h1>
                    <p className="text-slate-500 mt-2 text-lg">Here's what's happening with your projects.</p>
                </div>
                <Link to="/payments" className="glass-button px-6 py-3 rounded-xl font-bold transition text-slate-700 hover:text-emerald-700">
                    Withdraw Funds
                </Link>
            </div>
            { }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Earnings"
                    value={`₹${stats.earnings}`}
                    change="12%"
                    color="emerald"
                    icon={DollarSign}
                />
                <StatCard
                    title="Active Projects"
                    value={stats.activeProjects}
                    change="0"
                    changeType="neutral"
                    color="teal"
                    icon={Briefcase}
                />
                <StatCard
                    title="Proposals Sent"
                    value={stats.proposalsSent}
                    change="5%"
                    changeType="positive"
                    color="cyan"
                    icon={FileText}
                />
                <StatCard
                    title="Success Score"
                    value={`${stats.successScore}%`}
                    change="2%"
                    color="amber"
                    icon={Star}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                { }
                <div className="lg:col-span-2 space-y-8">
                    { }
                    <div className="glass-card p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-bold text-slate-800">Earnings Overview</h3>
                            <select className="glass-input border-none text-sm text-slate-600 focus:ring-0">
                                <option>Last 6 Months</option>
                                <option>Last Year</option>
                            </select>
                        </div>
                        <div className="h-64 flex items-center justify-center bg-emerald-50/30 rounded-2xl border-2 border-dashed border-emerald-100/50">
                            <div className="text-center text-emerald-300">
                                <TrendingUp className="w-10 h-10 mx-auto mb-3 opacity-50" />
                                <span className="font-medium">Chart Visualization Placeholder</span>
                            </div>
                        </div>
                    </div>
                    { }
                    <div className="glass-card overflow-hidden">
                        <div className="p-6 border-b border-gray-100/50 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-800">Active Projects</h3>
                            <a href="#" className="text-emerald-600 text-sm font-bold hover:text-emerald-700">View All</a>
                        </div>
                        <div className="divide-y divide-gray-100/50">
                            {activeProjectsList.length > 0 ? (
                                activeProjectsList.map((project) => (
                                    <div key={project._id} className="p-6 hover:bg-white/40 transition duration-200">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-slate-800 mb-1 text-lg">{project.title}</h4>
                                                <p className="text-sm text-slate-500 font-medium">Due: {project.dueDate} • Client: {project.client}</p>
                                            </div>
                                            <span className="px-3 py-1 rounded-lg text-xs font-bold bg-teal-500/10 text-teal-600 border border-teal-500/20">
                                                {project.status}
                                            </span>
                                        </div>
                                        <div className="mt-5">
                                            <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                                                <span>Progress</span>
                                                <span>{project.progress}%</span>
                                            </div>
                                            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                                <div className="bg-gradient-to-r from-teal-500 to-emerald-600 h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-slate-500">
                                    No active projects. Start by sending proposals to open jobs!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                { }
                <div className="space-y-8">
                    { }
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-5">Quick Actions</h3>
                        <div className="space-y-3">
                            {['Find New Work', 'Update Profile', 'View Analytics'].map((action) => (
                                <button key={action} className="w-full text-left px-4 py-3.5 rounded-xl border border-transparent bg-white/50 hover:bg-white hover:border-emerald-100 hover:shadow-md transition-all duration-200 flex items-center group">
                                    <span className="text-sm font-semibold text-slate-700 group-hover:text-emerald-600">{action}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    { }
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-5">Recent Activity</h3>
                        <ul className="space-y-6">
                            {[1, 2, 3, 4].map((i) => (
                                <li key={i} className="flex gap-4 relative">
                                    <div className="absolute left-[5px] top-3 bottom-[-24px] w-0.5 bg-gray-100/50 last:hidden"></div>
                                    <div className="w-3 h-3 mt-1.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50 flex-shrink-0 z-10"></div>
                                    <div>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            <span className="font-bold text-slate-900">New proposal</span> received for "Mobile App UI"
                                        </p>
                                        <span className="text-xs font-medium text-slate-400 mt-1 block">2 hours ago</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FreelancerDashboard;