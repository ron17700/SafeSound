import User, {IUser} from '../models/user.model';
import DeviceModel from "../models/device.model";

export const DeviceTokenService = {
    async getDeviceTokenById(userId: string) {
        const user: IUser | null = await User.findById(userId);
        return user?.devices;
    },

    async addDeviceToken(userId: string, token: string) {
        const device = await DeviceModel.findOneAndUpdate(
            { deviceToken: token },
            { deviceToken: token },
            { upsert: true, new: true }
        );

        await User.findByIdAndUpdate(
            userId,
            { $addToSet: { devices: device._id } },
            { new: true }
        );

        return device;
    },

};
