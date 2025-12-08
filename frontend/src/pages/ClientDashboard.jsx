import React from 'react';
import { DollarSign, Briefcase, Users, Plus, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import api from '../api';
const ClientDashboard = () => {
    const [projects, setProjects] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('/projects/my-projects');
                setProjects(res.data);
            } catch (err) {
                console.error("Failed to fetch client projects", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
        fetchProjects();
    }, []);
    const handleDelete = async (projectId) => {
        if (window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
            try {
                await api.delete(`/projects/${projectId}`);
                setProjects(projects.filter(p => p._id !== projectId));
            } catch (err) {
                alert("Failed to delete project");
            }
        }
    };
    return (
        <div className="space-y-8">
            { }
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
                    <p className="text-gray-500 mt-1">Manage your postings and hires from here.</p>
                </div>
                <Link to="/client/post-project" className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition shadow-sm flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Post a Job
                </Link>
            </div>
            { }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Spent"
                    value="₹45,200"
                    change="8%"
                    color="emerald"
                    icon={CreditCard}
                />
                <StatCard
                    title="Active Jobs"
                    value="3"
                    change="1"
                    changeType="positive"
                    color="teal"
                    icon={Briefcase}
                />
                <StatCard
                    title="New Proposals"
                    value="12"
                    change="3"
                    changeType="positive"
                    color="amber"
                    icon={Users}
                />
                <StatCard
                    title="Avg. Hourly Rate"
                    value="₹45.00"
                    change="0%"
                    changeType="neutral"
                    color="cyan"
                    icon={DollarSign}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                { }
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900">Your Job Postings</h3>
                            <div className="flex gap-2">
                                <button className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">All</button>
                                { }
                            </div>
                        </div>
                        {loading ? (
                            <div className="p-12 flex justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                            </div>
                        ) : projects.length === 0 ? (
                            <div className="p-12 text-center text-gray-500">
                                <p>You haven't posted any jobs yet.</p>
                                <Link to="/client/post-project" className="text-emerald-600 font-bold hover:underline mt-2 inline-block">Post a Job</Link>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {projects.map((project) => (
                                    <div key={project._id} className="p-6 hover:bg-gray-50 transition">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-gray-900 text-lg">{project.title}</h4>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'open' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-600'}`}>
                                                {project.status || 'Open'}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                                            <span>Posted {new Date(project.createdAt).toLocaleDateString()}</span>
                                            <span>•</span>
                                            <span>{project.budgetType === 'hourly' ? 'Hourly' : 'Fixed'} - ₹{project.budget}</span>
                                            <span>•</span>
                                            <span>{project.duration}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex -space-x-2">
                                                { }
                                                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-400">
                                                    ?
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <button onClick={() => handleDelete(project._id)} className="text-red-500 text-sm font-medium hover:text-red-700 hover:underline">
                                                    Delete
                                                </button>
                                                <Link to={`/client/edit-project/${project._id}`} className="text-gray-600 text-sm font-medium hover:text-emerald-600 hover:underline">
                                                    Update
                                                </Link>
                                                <Link to={`/projects/${project._id}`} className="text-emerald-600 text-sm font-medium hover:underline">
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
                            <button className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition">View All Jobs</button>
                        </div>
                    </div>
                </div>
                { }
                <div className="space-y-6">
                    { }
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Active Hires</h3>
                            <button className="text-emerald-600 text-sm hover:underline">View All</button>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <img src={`https://ui-avatars.com/api/?name=Freelancer+${i}&background=random`} alt="Freelancer" className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Sarah Jenkins</p>
                                        <p className="text-xs text-gray-500">UX Designer • ₹65/hr</p>
                                    </div>
                                    <button className="ml-auto text-gray-400 hover:text-emerald-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8 8 0 01-8-8 8 8 0 018-8c0 4.418 3.582 8 8 8z" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ClientDashboard;