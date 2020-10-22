import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
    name: String,
    price: Number,
    weight: Number,
    description: String
}, {
    timestamps: true
});

export default mongoose.model('Product', ProductSchema);