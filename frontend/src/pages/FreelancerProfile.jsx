import React from 'react';
import { MapPin, Star, Clock, Globe, MessageSquare, Check, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
const FreelancerProfile = () => {
    const featuredServices = Array.from({ length: 2 }).map((_, i) => ({
        id: i + 1,
        title: ["I will build a modern React application for your business", "I will design a stunning logo"][i],
        author: "Alex Chen",
        rating: 5.0,
        reviews: 42,
        price: 250,
        image: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600", "https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&q=80&w=600"][i]
    }));
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            { }
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center">
                    <div className="relative inline-block mb-4">
                        <img src="https://ui-avatars.com/api/?name=Alex+Chen&background=random" className="w-32 h-32 rounded-full mx-auto" />
                        <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white"></div>
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">Alex Chen</h1>
                    <p className="text-gray-500 mb-4">Full Stack Developer</p>
                    <div className="flex justify-center items-center gap-1 mb-6">
                        <span className="flex items-center text-yellow-500 font-bold"><Star className="w-4 h-4 fill-current mr-1" /> 4.9</span>
                        <span className="text-gray-400">(124 reviews)</span>
                    </div>
                    <button className="w-full bg-emerald-600 text-white rounded-lg py-2 font-medium hover:bg-emerald-700 transition mb-3">Contact Me</button>
                    <button className="w-full bg-white text-gray-700 border border-gray-300 rounded-lg py-2 font-medium hover:bg-gray-50 transition">Get a Quote</button>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <ul className="space-y-4 text-sm text-gray-600">
                        <li className="flex items-center justify-between">
                            <span className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> From</span>
                            <span className="font-semibold text-gray-900">United States</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="flex items-center"><Clock className="w-4 h-4 mr-2" /> Member Since</span>
                            <span className="font-semibold text-gray-900">Oct 2021</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="flex items-center"><MessageSquare className="w-4 h-4 mr-2" /> Avg. Response</span>
                            <span className="font-semibold text-gray-900">1 Hour</span>
                        </li>
                    </ul>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {['React', 'Node.js', 'Typescript', 'Tailwind', 'MongoDB', 'AWS'].map(skill => (
                            <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">{skill}</span>
                        ))}
                    </div>
                </div>
            </div>
            { }
            <div className="lg:col-span-3 space-y-8">
                { }
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Hello! I'm Alex, a passionate Full Stack Developer with over 5 years of experience building web applications.
                        I specialize in the MERN stack (MongoDB, Express, React, Node.js) and love creating clean, efficient, and scalable code.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Whether you need a simple landing page or a complex SaaS platform, I can help turn your vision into reality. Let's work together!
                    </p>
                </div>
                { }
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Portfolio</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[1, 2].map(i => (
                            <div key={i} className="group cursor-pointer">
                                <div className="relative aspect-video bg-gray-200 rounded-xl overflow-hidden mb-3">
                                    <img src={`https://images.unsplash.com/photo-${i === 1 ? '1460925895917-afdab827c52f' : '1551288049-bebda4e38f71'}?auto=format&fit=crop&q=80&w=600`} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                        <ExternalLink className="text-white w-8 h-8" />
                                    </div>
                                </div>
                                <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition">E-commerce Dashboard UI</h3>
                                <p className="text-sm text-gray-500">Web Development</p>
                            </div>
                        ))}
                    </div>
                </div>
                { }
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">My Services</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {featuredServices.map(service => (
                            <ServiceCard key={service.id} {...service} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FreelancerProfile;