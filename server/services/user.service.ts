import User, {IUser} from '../models/user.model';
import {Record} from '../models/record.model';

export const UserService = {
    async getAllUsers() {
        return User.find();
    },
    
    async getUserById(userId: string) {
        const user: IUser | null = await User.findById(userId);
        return user;
    },

    async getUserByEmail(email: string) {
        const user: IUser | null = await User.findOne({email}).select('+password').exec();
        return user;
    },

    async updateProfile(userId: string, userData: Partial<IUser> & { file: string }) {
        return User.findByIdAndUpdate(userId, {
            profileImage: userData.file,
            userName: userData.userName,
        }, { new: true });
    },

    async addRecordToFavorite(userId: string, recordId: string) {
        const user = await User.findById(userId).select('favRecords');
        if (!user) {
            throw new Error('User not found');
        }

        const updateOperation = user.favRecords.includes(recordId)
            ? { $pull: { favRecords: recordId } }
            : { $push: { favRecords: recordId } };

        return User.findByIdAndUpdate(userId, updateOperation, { new: true });
    },

    async getFavoriteRecords(userId: string) {
        const user = await User.findById(userId).select('favRecords');
        if (!user) {
            throw new Error('User not found');
        }
        return Record.find({_id: {$in: user.favRecords}});
    }
};
