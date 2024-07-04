import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    "first_name": { type: String},
    "last_name": { type: String },
    "username": { type: String, required: true },
    "phone": { type: String},
    "email": { type: String, required: true },
    "profile": { type: String},
    "cover": { type: String},
    "razorpayId": { type: String},
    "razorpaySecret": { type: String},
    "createdAt": { type: Date, default: Date.now },
    "updatedAt": { type: Date, default: Date.now }
});

export default mongoose.models.User || model("User", UserSchema);

