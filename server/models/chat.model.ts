import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, enum: ['sent', 'read'], default: 'sent' },
});

const ChatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [MessageSchema],
    lastMessage: { type: String },
    lastUpdated: { type: Date, default: Date.now },
});

const Chat = mongoose.model('Chat', ChatSchema);
export default Chat;
