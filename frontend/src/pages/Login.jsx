import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'client' });
    const { login, register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        let res;
        if (isLogin) {
            res = await login(formData.email, formData.password);
        } else {
            res = await register(formData.name, formData.email, formData.password, formData.role);
        }
        if (res.success) {
            navigate(isLogin ? (formData.role === 'freelancer' ? '/freelancer/dashboard' : '/client/dashboard') : '/');
        } else {
            setError(res.message || 'An error occurred');
        }
    };
    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 glass p-10 rounded-3xl relative">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
                <div className="relative">
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-slate-800">
                        {isLogin ? 'Welcome Back' : 'Join SkillHub'}
                    </h2>
                    <p className="mt-3 text-center text-sm text-slate-500">
                        {isLogin ? 'Sign in to access your dashboard' : 'Start your journey with us today'}
                    </p>
                    <div className="mt-4 flex justify-center">
                        <button onClick={() => setIsLogin(!isLogin)} className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm transition-colors">
                            {isLogin ? 'Create a new account' : 'Already have an account? Sign in'}
                        </button>
                    </div>
                </div>
                {error && <div className="bg-red-500/10 border border-red-500/20 text-red-600 p-4 rounded-xl text-sm font-medium backdrop-blur-sm">{error}</div>}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label htmlFor="name" className="sr-only">Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="glass-input block w-full px-4 py-3 rounded-xl placeholder-gray-400 text-slate-900"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        )}
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="glass-input block w-full px-4 py-3 rounded-xl placeholder-gray-400 text-slate-900"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="glass-input block w-full px-4 py-3 rounded-xl placeholder-gray-400 text-slate-900"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">I want to:</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'client' })}
                                    className={`py-2 px-4 rounded-xl text-sm font-medium border transition-all ${formData.role === 'client' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white/50 border-transparent text-gray-500 hover:bg-white/80'}`}
                                >
                                    Hire Talent
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'freelancer' })}
                                    className={`py-2 px-4 rounded-xl text-sm font-medium border transition-all ${formData.role === 'freelancer' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white/50 border-transparent text-gray-500 hover:bg-white/80'}`}
                                >
                                    Find Work
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-lg shadow-emerald-500/30 transition-all active:scale-[0.98]"
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;