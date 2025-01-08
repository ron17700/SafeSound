import { Server, Socket } from 'socket.io';
import Chat, {IChat} from '../models/chat.model';
import Message from "../models/message.model";

export const setupSocketHandlers = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log('a user connected');

        socket.on('joinChat', async ({ userId, targetUserId }) => {
            let chat: IChat | null = await Chat.findOne({ participants: { $all: [userId, targetUserId] } })
                .populate({
                    path: 'messages',
                    populate: {
                        path: 'sender',
                        select: 'userName profileImage',
                    },
                }).exec()

            if (!chat) {
                chat = await Chat.create({
                    participants: [userId, targetUserId],
                    messages: [],
                })
            }

            socket.join(chat._id.toString());
            socket.emit('chatJoined', { chatId: chat._id.toString() });

            if (userId !== targetUserId) {
                chat.messages.forEach((message) => {
                    if (message.sender === targetUserId) {
                        message.status = 'read'; // Mark only the other user's messages as read
                    }
                });

                await chat.save();
                io.to(chat._id.toString()).emit('messageStatusUpdated', chat.messages);
            }
        });

        socket.on('sendMessage', async ({ chatId, senderId, content }) => {
            const message = new Message({
                sender: senderId,
                content: content,
            });
            await message.save();

            try {
                const updatedChat = await Chat.findByIdAndUpdate(
                    chatId,
                    {
                        $push: { messages: message },
                        lastMessage: content,
                        lastUpdated: new Date(),
                    },
                    { new: true }
                );

                if (updatedChat) {
                    // Emit the message to the recipients and immediately include the status
                    io.to(chatId).emit('receiveMessage', message);

                    io.to(chatId).emit('messageStatusUpdated', {
                        messageId: message._id,
                        status: 'sent',
                    });
                } else {
                    socket.emit('error', 'Chat not found');
                }
            } catch (error) {
                socket.emit('error', 'Error sending message');
            }
        });

        socket.on('getMessages', async ({ chatId }) => {
            try {
                const chat: IChat | null = await Chat.findById(chatId)
                    .populate({
                        path: 'messages',
                        populate: {
                            path: 'sender',
                            select: 'userName profileImage',
                        },
                    }).exec();
                if (chat) {
                    socket.emit('messages', chat.messages);
                } else {
                    socket.emit('error', 'Chat not found');
                }
            } catch (error) {
                socket.emit('error', 'Error fetching messages');
            }
        });

        // Mark a message as read
        socket.on('markAsRead', async ({ chatId, messageId }) => {
            try {
                const chat: IChat | null = await Chat.findById(chatId)
                    .populate({
                        path: 'messages',
                        populate: {
                            path: 'sender',
                            select: 'userName profileImage',
                        },
                    }).exec();
                if (!chat) {
                    return socket.emit('error', 'Chat not found');
                }

                const message = chat.messages.find(message => message._id === messageId);
                if (message) {
                    message.status = 'read';
                    await chat.save();

                    io.to(chatId).emit('messageStatusUpdated', { messageId, status: 'read' });
                } else {
                    socket.emit('error', 'Message not found');
                }
            } catch (error) {
                socket.emit('error', 'Error updating message status');
            }
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};
