const mongoose = require('mongoose');
const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    deliveryTime: { type: String, required: true },  
    image: { type: String, default: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" },
    freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Service', serviceSchema);