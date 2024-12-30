import User, {IUser} from '../models/user.model';
import {Record} from '../models/record.model';

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
    },

    async addRecordToFavorite(userId: string, recordId: string) {
        return User.findByIdAndUpdate(userId, { $push: { favRecords: recordId } }, { new: true });
    },

    async getFavoriteRecords(userId: string) {
        const user = await User.findById(userId).select('favRecords');
        if (!user) {
            throw new Error('User not found');
        }
        return Record.find({_id: {$in: user.favRecords}});
    }
};
