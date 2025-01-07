import mongoose, {Document, Model, Schema} from 'mongoose';
import {IUser} from "./user.model";
import {IMessage} from "./message.model";

export interface IChat extends Document {
    _id: Schema.Types.ObjectId;
    participants: Array<IUser>;
    messages: Array<IMessage>,
    lastMessage: string
    lastUpdated: Date;
}

const ChatSchema = new mongoose.Schema<IChat>({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    lastMessage: { type: String },
    lastUpdated: { type: Date, default: Date.now },
});

const Chat: Model<IChat> = mongoose.model('Chat', ChatSchema);

export default Chat;

