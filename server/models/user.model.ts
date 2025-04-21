import mongoose, { Schema, Document, Model } from 'mongoose';
import {IDevice} from "./device.model";

export interface IUser extends Document {
    email: string;
    userName: string;
    password: string;
    refreshToken: string | null;
    devices: IDevice[];
    profileImage?: string;
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
    favRecords: string[];
}

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: [true, 'Email is required!'],
            unique: true,
            match: [/\S+@\S+\.\S+/, 'Invalid email format!'],
        },
        userName: {
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
            select: false,
        },
        devices: [{
            type: Schema.Types.ObjectId,
            ref: 'Device'
        }],
        profileImage: {
            type: String,
            default: 'default-files/default-profile-image.jpg',
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        favRecords: [String],
    },
    {
        timestamps: true,
    }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
