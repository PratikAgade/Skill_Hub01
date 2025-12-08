import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
const ReviewModal = ({ isOpen, onClose }) => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl transform transition-all scale-100">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">Rate your experience</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-8 text-center space-y-6">
                    <div className="space-y-2">
                        <p className="font-medium text-gray-900">How would you rate the service provided?</p>
                        <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    onClick={() => setRating(star)}
                                    className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                                >
                                    <Star
                                        className={`w-10 h-10 ${(hoveredRating || rating) >= star
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="text-left">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Write a review (Optional)</label>
                        <textarea
                            rows={4}
                            className="w-full rounded-lg border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 resize-none text-sm"
                            placeholder="Share your experience working with this freelancer..."
                        ></textarea>
                    </div>
                </div>
                <div className="p-6 bg-gray-50 rounded-b-2xl border-t border-gray-100 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition">Cancel</button>
                    <button
                        onClick={onClose}
                        disabled={rating === 0}
                        className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ReviewModal;