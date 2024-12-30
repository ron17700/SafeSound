import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, {IUser} from '../models/user.model';

interface RegisterData {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    age: number;
    file?: string;
}

interface LoginData {
    email: string;
    password: string;
}

export const AuthService = {
    async register({username, email, password, firstName, lastName, age, file}: RegisterData) {
        const existUser = await User.exists({email});
        if (existUser) {
            throw new Error('Invalid credentials');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({username, email, password: hashedPassword, firstName, lastName, age, image: file});

        await newUser.save();
        return {status: 201, data: {message: 'User registered successfully', newUser}};
    },

    async login({email, password}: LoginData) {
        const user: IUser | null = await User.findOne({email}).select('+password').exec();
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const accessToken = jwt.sign({
            userId: user._id,
            userName: user.userName,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage
        }, process.env.JWT_SECRET!, {expiresIn: process.env.JWT_EXPIRES_IN});
        const refreshToken = jwt.sign({userId: user._id}, process.env.JWT_REFRESH_SECRET!, {expiresIn: process.env.JWT_REFRESH_EXPIRES_IN});

        user.refreshToken = refreshToken;
        await user.save();

        return {status: 200, data: {message: 'Login successful', accessToken, refreshToken}};
    },

    async logout(userId: string) {
        const user: IUser | null = await User.findById(userId).select('+refreshToken').exec();

        if (!user) {
            throw new Error('Invalid token');
        }

        user.refreshToken = null;
        await user.save();

        return {status: 200, data: {message: 'Logged out successfully'}};
    },

    async refreshToken(refreshToken: string) {
        const decodedToken: any = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
        const user: IUser | null = await User.findById(decodedToken.userId).select('+refreshToken').exec();

        if (!user || user.refreshToken !== refreshToken) {
            throw new Error('Invalid refresh token');
        }

        const newAccessToken = jwt.sign({
            userId: user._id,
            userName: user.userName,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage
        }, process.env.JWT_SECRET!, {expiresIn: process.env.JWT_EXPIRES_IN});
        return {status: 200, data: {accessToken: newAccessToken}};
    }
};
