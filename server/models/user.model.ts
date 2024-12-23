import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    email: string;
    userName: string;
    password: string;
    refreshToken: string | null;
    profileImage?: string;
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema= new Schema<IUser>(
    {
        email: {
            type: String,
            required: [true, 'Email is required!'],
            unique: true,
            match: [/\S+@\S+\.\S+/, 'Invalid email format!'],
        },
        userName:{
            type: String,
        },
        password: {
            type: String,
            required: [true, 'Password is required!'],
            minlength: [6, 'Password should be at least 6 characters long!'],
            select: false,
        },
        refreshToken: {
            type: String,
            select: false
        },
        profileImage: {
            type: String,
            default: null,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
    },
    {
        timestamps: true
    }
);

const User: Model<IUser> = mongoose.model('User', UserSchema);

export default User;
