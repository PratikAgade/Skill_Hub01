import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
const StatCard = ({ title, value, change, changeType = 'positive', icon: Icon, color = 'emerald' }) => {
    const isPositive = changeType === 'positive';
    const colorClasses = {
        emerald: 'bg-emerald-500/10 text-emerald-600',
        teal: 'bg-teal-500/10 text-teal-600',
        cyan: 'bg-cyan-500/10 text-cyan-600',
        amber: 'bg-amber-500/10 text-amber-600',
        green: 'bg-green-500/10 text-green-600',
        blue: 'bg-blue-500/10 text-blue-600',
        purple: 'bg-purple-500/10 text-purple-600',
        orange: 'bg-orange-500/10 text-orange-600',
        indigo: 'bg-indigo-500/10 text-indigo-600',  
    };
    return (
        <div className="glass-card p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                    <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
                </div>
                <div className={`p-4 rounded-2xl ${colorClasses[color] || colorClasses['emerald']} backdrop-blur-sm`}>
                    {Icon && <Icon className="w-6 h-6" />}
                </div>
            </div>
            {change && (
                <div className="mt-4 flex items-center">
                    <span className={`flex items-center text-sm font-bold ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                        {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                        {change}
                    </span>
                    <span className="text-sm text-gray-400 ml-2 font-medium">vs last month</span>
                </div>
            )}
        </div>
    );
};
export default StatCard;