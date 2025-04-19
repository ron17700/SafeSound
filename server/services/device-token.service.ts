import User from '../models/user.model';
import DeviceModel from "../models/device.model";

export const DeviceTokenService = {
    async removeDeviceToken(userId: string, token: string) {
        const device = await DeviceModel.findOne({ deviceToken: token });

        if (!device) {
            return null;
        }

        await User.findByIdAndUpdate(
            userId,
            { $pull: { devices: device._id } },
            { new: true }
        );

        await DeviceModel.findByIdAndDelete(device._id);

        return device;
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
