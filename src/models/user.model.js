import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
}, {
    timestamps: true
})

export default mongoose.model('User', UserSchema);