import React from 'react';
import { Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
const ServiceCard = ({ id, title, author, rating, reviews, price, image, avatar }) => {
    return (
        <div className="group glass-card overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            { }
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600"}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <button className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 hover:scale-110 transition-all shadow-lg active:scale-95">
                    <Heart className="w-4 h-4" />
                </button>
            </div>
            { }
            <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-0.5 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500">
                        <img
                            src={avatar || `https://ui-avatars.com/api/?name=${author}&background=random`}
                            alt={author}
                            className="w-7 h-7 rounded-full border-2 border-white"
                        />
                    </div>
                    <span className="text-sm font-medium text-gray-600">{author}</span>
                    <div className="ml-auto flex items-center bg-yellow-400/10 px-2 py-1 rounded-lg text-yellow-600 text-xs font-bold backdrop-blur-sm">
                        <Star className="w-3 h-3 fill-current mr-1" />
                        {rating} <span className="text-gray-400 font-normal ml-1">({reviews})</span>
                    </div>
                </div>
                <Link to={`/services/${id}`}>
                    <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 hover:text-emerald-600 transition-colors leading-snug group-hover:text-emerald-600">
                        {title}
                    </h3>
                </Link>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100/50">
                    <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Starting at</div>
                    <div className="text-xl font-extrabold text-emerald-600 bg-emerald-50/50 px-2 py-1 rounded-lg">${price}</div>
                </div>
            </div>
        </div>
    );
};
export default ServiceCard;