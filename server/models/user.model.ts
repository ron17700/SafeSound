import mongoose, { Schema, Document, Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

export interface IUser extends Document {
    userId: string;
    email: string;
    password: string;
    refreshToken: string | null;
    profileImage?: string;
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema= new Schema<IUser>(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required!'],
            unique: true,
            match: [/\S+@\S+\.\S+/, 'Invalid email format!'],
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

UserSchema.pre('save', function (next) {
    if (!this.userId) {
        this.userId = uuid();
    }
    next();
});

const User: Model<IUser> = mongoose.model('User', UserSchema);

export default User;
