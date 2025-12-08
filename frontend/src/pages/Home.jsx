import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
const Home = () => {
    return (
        <div className="space-y-24 pb-20">
            { }
            <section className="text-center py-32 px-4 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/30 rounded-full blur-[100px] animate-blob -z-10"></div>
                <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-emerald-500/30 rounded-full blur-[80px] animate-blob animation-delay-2000 -z-10"></div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-800 mb-8 leading-tight">
                    Find the perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">freelance talent</span><br />
                    for your business
                </h1>
                <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Work with key talent and get things done. Join millions of businesses and pros on SkillHub.
                </p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                    <Link to="/services" className="px-10 py-4 glass-button rounded-xl font-bold text-lg flex items-center justify-center">
                        Find Talent
                    </Link>
                    <Link to="/freelancer/dashboard" className="px-10 py-4 bg-white/50 border border-white/40 text-emerald-700 rounded-xl font-bold text-lg hover:bg-white/80 transition backdrop-blur-sm shadow-sm flex items-center justify-center">
                        Find Work
                    </Link>
                </div>
            </section>
            { }
            <section className="glass -mx-4 sm:-mx-6 lg:-mx-8 py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-10">Trusted by leading companies</p>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-60 mix-blend-multiply">
                        <span className="text-3xl font-black text-slate-400">Google</span>
                        <span className="text-3xl font-black text-slate-400">Netflix</span>
                        <span className="text-3xl font-black text-slate-400">Airbnb</span>
                        <span className="text-3xl font-black text-slate-400">Meta</span>
                    </div>
                </div>
            </section>
            { }
            <section className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-4">
                <div className="space-y-8">
                    <h2 className="text-4xl font-bold text-slate-800 leading-tight">A whole world of freelance talent at your fingertips</h2>
                    <div className="space-y-6">
                        {[
                            "Proof of quality",
                            "No cost until you hire",
                            "Safe and secure payments"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 glass-card hover:bg-white/60 transition-colors">
                                <CheckCircle className="text-emerald-500 w-7 h-7 flex-shrink-0" />
                                <span className="text-xl font-medium text-slate-700">{item}</span>
                            </div>
                        ))}
                    </div>
                    <div className="pt-6">
                        <Link to="/services" className="text-emerald-600 font-bold text-lg hover:underline flex items-center gap-2 group">
                            Browse Services <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
                <div className="relative group">
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                        alt="Team working"
                        className="rounded-3xl shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500 border-4 border-white/50"
                    />
                    { }
                    <div className="absolute -bottom-10 -left-10 glass p-8 rounded-2xl shadow-xl max-w-xs hidden md:block animate-bounce-slow">
                        <p className="font-bold text-slate-800 mb-3 text-lg">I am looking for work</p>
                        <Link to="/freelancer/dashboard" className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1">
                            Go to Freelancer Dashboard <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default Home;