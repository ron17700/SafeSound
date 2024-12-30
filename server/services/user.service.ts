import User, {IUser} from '../models/user.model';

export const UserService = {

    async getUserById(userId: string) {
        const user: IUser | null = await User.findById(userId);
        return user;
    },

    async updateProfile(userId: string, userData: Partial<IUser> & { file: string }) {
        return User.findByIdAndUpdate(userId, {
            profileImage: userData.file,
            userName: userData.userName,
        }, { new: true });
    }
};
