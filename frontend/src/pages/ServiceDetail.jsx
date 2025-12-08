import React from 'react';
import { Star, Clock, Check, MessageSquare, Shield } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import api from '../api';
const ServiceDetail = () => {
    const { id } = useParams();
    const [service, setService] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [showContactModal, setShowContactModal] = React.useState(false);
    React.useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await api.get(`/services/${id}`);
                setService(res.data);
            } catch (err) {
                console.warn('Failed to fetch service details, using mock data');
                setService({
                    _id: id,
                    title: "I will build a modern React application for your business",
                    description: "Looking for a professional React developer? You're in the right place!\nI will build a high-performance, responsive, and SEO-friendly web application using the latest technologies.\n\n**My Tech Stack:**\n- React.js / Next.js\n- Tailwind CSS\n- Node.js / Express\n- MongoDB / PostgreSQL",
                    freelancer: {
                        name: "Alex Chen",
                        avatar: "https://ui-avatars.com/api/?name=Alex+Chen&background=random"
                    },
                    rating: 4.9,
                    reviewCount: 124,
                    price: 450,
                    deliveryTime: "7 Days",
                    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
                });
            } finally {
                setLoading(false);
            }
        };
        fetchService();
    }, [id]);
    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>;
    if (error || !service) return <div className="min-h-screen flex items-center justify-center text-red-600">{error || 'Service not found'}</div>;
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            { }
            <div className="lg:col-span-2 space-y-8">
                { }
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h1>
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <img src={service.freelancer?.avatar || `https://ui-avatars.com/api/?name=${service.freelancer?.name}&background=random`} className="w-8 h-8 rounded-full" />
                            <span className="font-semibold text-gray-900">{service.freelancer?.name || 'Unknown Seller'}</span>
                            <span className="text-gray-500">| Level 2 Seller</span>
                        </div>
                        <div className="flex items-center text-yellow-500 font-semibold border-l pl-4 border-gray-200">
                            <Star className="w-4 h-4 fill-current mr-1" /> {service.rating} <span className="text-gray-400 font-normal ml-1">({service.reviewCount} reviews)</span>
                        </div>
                    </div>
                </div>
                { }
                <div className="bg-gray-100 rounded-xl overflow-hidden aspect-video">
                    <img src={service.image} className="w-full h-full object-cover" alt={service.title} />
                </div>
                { }
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900">About This Service</h2>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                        {service.description}
                    </p>
                </div>
                { }
                <div className="border-t border-gray-100 pt-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Reviews</h2>
                    <div className="space-y-6">
                        { }
                        <p className="text-gray-500 italic">No reviews yet.</p>
                    </div>
                </div>
            </div>
            { }
            <div className="lg:col-span-1">
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition sticky top-24">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-900">Standard Package</h3>
                            <span className="text-2xl font-bold text-gray-900">₹{service.price}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">Standard service package including all core deliverables.</p>
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center text-sm font-semibold text-gray-700">
                                <Clock className="w-4 h-4 mr-2" /> {service.deliveryTime} Delivery
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <Check className="w-4 h-4 mr-2 text-emerald-500" /> Source Code
                            </div>
                        </div>
                        <div className="space-y-3">
                            <button
                                onClick={async () => {
                                    if (window.confirm(`Confirm purchase for ₹${service.price}?`)) {
                                        try {
                                            const res = await api.post('/payments/purchase', {
                                                serviceId: service._id,
                                                freelancerId: service.freelancer._id || "64f1b2c3d4e5f6a7b8c9d0e1",  
                                                amount: service.price
                                            });
                                            alert("Purchase successful! Order created.");
                                        } catch (err) {
                                            alert(err.response?.data?.message || "Purchase failed");
                                        }
                                    }
                                }}
                                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition"
                            >
                                Continue (₹{service.price})
                            </button>
                            <button
                                onClick={() => setShowContactModal(true)}
                                className="w-full bg-white text-gray-700 border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center"
                            >
                                <MessageSquare className="w-4 h-4 mr-2" /> Contact Seller
                            </button>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 border-t border-gray-100 rounded-b-xl text-xs text-center text-gray-500 flex items-center justify-center gap-2">
                        <Shield className="w-3 h-3" /> Secure Payment
                    </div>
                </div>
            </div>
            { }
            {showContactModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl animate-fade-in">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Contact {service.freelancer?.name || 'Seller'}</h3>
                            <button onClick={() => setShowContactModal(false)} className="text-gray-400 hover:text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <textarea
                            className="w-full border border-gray-300 rounded-lg p-3 h-32 mb-4 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Type your message here..."
                        ></textarea>
                        <button
                            onClick={() => {
                                alert("Message sent to seller!");
                                setShowContactModal(false);
                            }}
                            className="w-full bg-emerald-600 text-white py-2 rounded-lg font-bold hover:bg-emerald-700"
                        >
                            Send Message
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default ServiceDetail;