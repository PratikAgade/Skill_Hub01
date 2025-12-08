import React from 'react';
import { Clock, DollarSign, MapPin, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
const ProjectCard = ({ id, title, description, budget, type, postedTime, location, skills = [], proposalsCount }) => {
    return (
        <div className="glass-card p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <Link to={`/projects/${id}`}>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors leading-tight">
                            {title}
                        </h3>
                    </Link>
                    <div className="flex items-center text-xs font-medium text-gray-500 mt-2 space-x-3">
                        <span className="flex items-center bg-gray-100/50 px-2 py-1 rounded-md"><Clock className="w-3.5 h-3.5 mr-1" /> {postedTime}</span>
                        <span className="flex items-center bg-gray-100/50 px-2 py-1 rounded-md"><MapPin className="w-3.5 h-3.5 mr-1" /> {location}</span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">₹{budget}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{type}</div>
                </div>
            </div>
            <p className="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed">
                {description}
            </p>
            {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                    {skills.map((skill, index) => (
                        <span key={index} className="px-2.5 py-1 bg-emerald-50/50 border border-emerald-100 text-emerald-700 text-xs font-semibold rounded-lg">
                            {skill}
                        </span>
                    ))}
                </div>
            )}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100/50">
                <div className="text-sm text-gray-500">
                    <span className="font-bold text-gray-900">{proposalsCount}</span> Proposals
                </div>
                <div className="flex items-center gap-3">
                    <button className="text-gray-400 hover:text-red-500 hover:scale-110 transition-all">
                        <span className="sr-only">Like</span>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                    <button className="glass-button px-5 py-2 rounded-xl text-sm font-bold">
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ProjectCard;