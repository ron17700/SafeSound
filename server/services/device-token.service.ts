import User, {IUser} from '../models/user.model';

export const DeviceTokenService = {
    async getDeviceTokenById(userId: string) {
        const user: IUser | null = await User.findById(userId);
        return user?.devices;
    },

    async addDeviceToken(userId: string, deviceToken: string) {
        return User.findByIdAndUpdate(
            userId,
            {$push: {devices: deviceToken}},
            {new: true}
        );
    },

};
