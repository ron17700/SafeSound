import mongoose, {Document, Model} from "mongoose";
import {IUser} from "./user.model";

const MessageStatus = Object.freeze({
    SENT: 'sent',
    READ: 'read',
});

export interface IMessage extends Document {
    sender: IUser;
    content: string,
    status: string
    createdAt: Date;
}

const MessageSchema = new mongoose.Schema<IMessage>({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    content: {type: String, required: true},
    status: {type: String, default: MessageStatus.SENT, enum: Object.values(MessageStatus)}
}, {
    timestamps: true
});

const Message: Model<IMessage> = mongoose.model('Message', MessageSchema);

export default  Message;