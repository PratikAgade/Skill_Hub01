import React from 'react';
import { Search, Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import api from '../api';
const BrowseServices = () => {
    const [allServices, setAllServices] = React.useState([]);
    const [displayedServices, setDisplayedServices] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [categoryFilter, setCategoryFilter] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 6;
    React.useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            const mockServices = Array.from({ length: 18 }).map((_, i) => ({
                _id: i + 1,
                title: ["I will build a modern React application for your business", "I will design a stunning logo for your brand", "I will write SEO optimized content for your blog", "I will create a mobile app UI/UX design", "I will fix your WordPress bugs and errors", "I will create social media posts for your business"][i % 6],
                freelancer: {
                    name: ["Alex Chen", "Sarah Jenkins", "Mike Ross", "Emma Wilson", "David Lee", "Lisa Wong"][i % 6],
                    avatar: `https://ui-avatars.com/api/?name=${["Alex Chen", "Sarah Jenkins", "Mike Ross", "Emma Wilson", "David Lee", "Lisa Wong"][i % 6]}&background=random`
                },
                rating: [4.9, 4.8, 5.0, 4.7, 4.9, 4.6][i % 6],
                reviewCount: [124, 89, 212, 45, 156, 32][i % 6],
                price: [450, 150, 80, 300, 50, 25][i % 6],
                image: [
                    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/330849591/original/d2c745ded610f2cedf12498becf046fa7d2d32bb/do-modern-professional-logo-design-for-your-business.jpg",
                    "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/373069490/original/3a63d14e3e6e91351afaf77503097c9f97920aa4/increase-domain-rating-ahrefs-dr-by-using-high-quality-backlinks.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/274345024/original/e169ff321bea27cdf0be11ab3ea4c2233bf1b41c/design-eye-catching-app-screenshots-for-play-or-app-store.png",
                    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600",
                    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600"
                ][i % 6]
            }));
            try {
                const params = {};
                if (searchTerm) params.search = searchTerm;
                if (categoryFilter) params.category = categoryFilter;
                const res = await api.get('/services', { params });
                if (res.data && res.data.length > 0) {
                    setAllServices(res.data);
                } else {
                    console.warn("No services found from API, using mock data");
                    setAllServices(mockServices);
                }
            } catch (err) {
                console.warn("Failed to fetch services, using mock data", err);
                setAllServices(mockServices);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
        setCurrentPage(1);
    }, [searchTerm, categoryFilter]);
    React.useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDisplayedServices(allServices.slice(startIndex, endIndex));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage, allServices]);
    const totalPages = Math.ceil(allServices.length / itemsPerPage);
    return (
        <div className="space-y-12">
            { }
            <div className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 shadow-2xl">
                { }
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-400 rounded-full mix-blend-multiply filter blur-[120px] opacity-50 animate-blob"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-50 animate-blob animation-delay-2000"></div>
                </div>
                { }
                <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight drop-shadow-lg">
                        Find Your <span className="text-green-200">Perfect Professional</span>
                    </h1>
                    <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto">
                        Connect with top-rated freelancers for your next big project.
                    </p>
                    { }
                    <div className="relative max-w-2xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search services (e.g. Web Design)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-14 pr-6 py-5 rounded-2xl text-lg text-white placeholder-white/60 bg-green-800/40 backdrop-blur-md border border-green-300/30 focus:ring-4 focus:ring-green-300/40 shadow-xl"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute left-5 top-1/2 transform -translate-y-1/2 text-green-200 w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
                        </svg>
                    </div>
                    { }
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-green-100 pt-4">
                        <span className="font-semibold text-white">Popular:</span>
                        {["Web Design", "Logo Design", "WordPress", "Video Editing"].map((tag) => (
                            <button
                                key={tag}
                                className="px-4 py-2 rounded-full bg-green-700/50 hover:bg-green-600 text-white transition-colors shadow-md"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                { }
                <aside className="w-full lg:w-72 flex-shrink-0 glass-card p-6 space-y-8 sticky top-24">
                    <div className="flex items-center justify-between lg:hidden mb-4">
                        <button className="flex items-center gap-2 text-slate-700 bg-white/50 px-4 py-2 rounded-lg border border-white/20">
                            <Filter className="w-4 h-4" /> Filters
                        </button>
                    </div>
                    <div className="hidden lg:block space-y-8">
                        <div>
                            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-lg">
                                <SlidersHorizontal className="w-5 h-5 text-emerald-600" /> Filters
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-sm font-bold text-slate-700 mb-3 block uppercase tracking-wider">Category</label>
                                    <div className="space-y-2.5">
                                        {['Development', 'Design', 'Writing', 'Marketing', 'Business'].map(cat => (
                                            <label key={cat} className="flex items-center group cursor-pointer">
                                                <div className="relative flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 bg-white/50 transition-all checked:border-emerald-600 checked:bg-emerald-600 hover:border-emerald-400"
                                                        checked={categoryFilter === cat}
                                                        onChange={() => setCategoryFilter(categoryFilter === cat ? '' : cat)}
                                                    />
                                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                                                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="20 6 9 17 4 12" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <span className="ml-3 text-slate-600 group-hover:text-emerald-600 transition-colors font-medium">{cat}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                                <div>
                                    <label className="text-sm font-bold text-slate-700 mb-3 block uppercase tracking-wider">Price Range</label>
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">₹</span>
                                            <input type="number" placeholder="Min" className="w-full bg-white/50 border border-slate-200 rounded-xl py-2 pl-8 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                                        </div>
                                        <span className="text-slate-400 font-medium">-</span>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">₹</span>
                                            <input type="number" placeholder="Max" className="w-full bg-white/50 border border-slate-200 rounded-xl py-2 pl-8 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
                { }
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6 glass-card px-6 py-4">
                        <p className="text-slate-600 font-medium"><span className="font-bold text-slate-900">{allServices.length}</span> services available</p>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-500 font-medium">Sort by:</span>
                            <div className="relative">
                                <select className="appearance-none bg-transparent font-bold text-slate-800 pr-8 focus:outline-none cursor-pointer">
                                    <option>Recommended</option>
                                    <option>Best Selling</option>
                                    <option>Newest Arrivals</option>
                                </select>
                                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {displayedServices.map((service, index) => (
                                <ServiceCard
                                    key={service._id || service.id || index}
                                    {...service}
                                    id={service._id || service.id}
                                    author={service.freelancer?.name || service.author || 'Unknown'}
                                    avatar={service.freelancer?.avatar || service.avatar}
                                />
                            ))}
                        </div>
                    )}
                    {!loading && allServices.length === 0 && (
                        <div className="text-center py-20 px-4 glass-card mt-6">
                            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No services found</h3>
                            <p className="text-slate-500 max-w-sm mx-auto">Try adjusting your search terms or filters to find what you're looking for.</p>
                        </div>
                    )}
                    {allServices.length > 0 && totalPages > 1 && (
                        <div className="mt-12 flex justify-center">
                            <nav className="inline-flex rounded-xl shadow-sm bg-white/50 backdrop-blur-sm p-1">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${currentPage === i + 1 ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-emerald-600'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default BrowseServices;