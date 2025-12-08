import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, MessageSquare, User, Menu, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
const NavBar = () => {
    const location = useLocation();
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const isActive = (path) => {
        return location.pathname === path ? 'text-emerald-600 font-bold bg-emerald-50/50 rounded-lg' : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50/50 rounded-lg transition-all duration-200';
    };
    const handleLogout = () => {
        logout();
        navigate('/login');
    }
    return (
        <nav className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8 mb-8">
            <div className="max-w-7xl mx-auto glass rounded-2xl">
                <div className="flex justify-between h-16 px-4">
                    { }
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                                <span className="text-white font-bold text-xl">S</span>
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 tracking-tight">
                                SkillHub
                            </span>
                        </Link>
                        <div className="hidden md:ml-8 md:flex md:space-x-4 items-center">
                            <Link to="/services" className={`px-3 py-2 text-sm font-medium ${isActive('/services')}`}>
                                Browse Services
                            </Link>
                            {user && user.role === 'freelancer' && (
                                <Link to="/freelancer/dashboard" className={`px-3 py-2 text-sm font-medium ${isActive('/freelancer/dashboard')}`}>
                                    Freelancer
                                </Link>
                            )}
                            {user && user.role === 'client' && (
                                <Link to="/client/dashboard" className={`px-3 py-2 text-sm font-medium ${isActive('/client/dashboard')}`}>
                                    Client
                                </Link>
                            )}
                            {user && user.role === 'admin' && (
                                <Link to="/admin" className={`px-3 py-2 text-sm font-medium ${isActive('/admin')}`}>
                                    Admin
                                </Link>
                            )}
                            <Link to="/payments" className={`px-3 py-2 text-sm font-medium ${isActive('/payments')}`}>
                                Payments
                            </Link>
                        </div>
                    </div>
                    { }
                    <div className="hidden lg:flex flex-1 items-center justify-center px-8">
                        <div className="max-w-md w-full relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                            </div>
                            <input
                                id="search"
                                name="search"
                                className="glass-input block w-full pl-10 pr-3 py-2 rounded-xl text-sm placeholder-gray-500"
                                placeholder="Search services..."
                                type="search"
                            />
                        </div>
                    </div>
                    { }
                    <div className="flex items-center gap-3">
                        {user ? (
                            <>
                                <button className="p-2 rounded-xl text-gray-500 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all duration-200 relative">
                                    <Bell className="h-5 w-5" />
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                                </button>
                                <div className="pl-2 border-l border-gray-200/50 ml-2 flex items-center gap-3">
                                    <div className="hidden md:flex flex-col items-end">
                                        <span className="text-sm font-bold text-gray-800 leading-none">{user.name}</span>
                                        <span className="text-xs text-emerald-500 font-medium capitalize">{user.role}</span>
                                    </div>
                                    <div className="h-10 w-10 bg-gradient-to-tr from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center border-2 border-white shadow-sm">
                                        <span className="text-emerald-600 font-bold text-lg">{user.name.charAt(0)}</span>
                                    </div>
                                    <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-emerald-600 px-3 py-2 transition-colors">Sign In</Link>
                                <Link to="/login" className="glass-button px-5 py-2.5 rounded-xl text-sm font-bold">
                                    Join Now
                                </Link>
                            </div>
                        )}
                        <button className="md:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100">
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default NavBar;