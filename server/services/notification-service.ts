import admin from "firebase-admin";
import User from "../models/user.model";
import { IChunkScheme} from "../models/chunk.model";
import {IDevice} from "../models/device.model";

export const NotificationService = {
    sendMessages: async (userId: string, chunk: IChunkScheme): Promise<void> => {
        const user = await User.findById(userId).populate<{devices: IDevice[]}>('devices');

        if (!user || !user.devices || user.devices.length === 0) {
            console.log('No devices found for user:', userId);
            return;
        }

        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        for (const device of user.devices) {
            const deviceToken = device.deviceToken; // or whatever field holds the device token

            if (deviceToken) {
                await NotificationService.sendMessage(deviceToken, {
                    title: 'We have identified a new audio that contains bad content',
                    body: chunk.summary
                });
            }
        }
    },

    sendMessage: async (deviceToken: string, notification: {title: string, body: string}): Promise<any> => {
        const message = {
            notification: {
                title: notification.title,
                body: notification.body
            },
            token: deviceToken
        };

        try {
            const response = await admin.messaging().send(message);
            console.log('Successfully sent message:', response);
            return response;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }
};