import { Server, Socket } from 'socket.io';
import Chat from '../models/chat.model';
import mongoose from 'mongoose';

export const setupSocketHandlers = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log('a user connected');

        socket.on('joinChat', async ({ userId, targetUserId }) => {
            let chat = await Chat.findOne({ participants: { $all: [userId, targetUserId] } });

            if (!chat) {
                chat = await Chat.create({
                    participants: [userId, targetUserId],
                    messages: [],
                });
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
            const message = { _id: new mongoose.Types.ObjectId(), sender: senderId, content, timestamp: new Date(), status: 'sent' };

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
                const chat = await Chat.findById(chatId);
                if (chat) {
                    socket.emit('messages', chat.messages);
                } else {
                    socket.emit('error', 'Chat not found');
                }
            } catch (error) {
                socket.emit('error', 'Error fetching messages');
            }
        });

        socket.on('markAsRead', async ({ chatId, messageId }) => {
            try {
                const chat = await Chat.findById(chatId);
                if (!chat) {
                    return socket.emit('error', 'Chat not found');
                }

                const message = chat.messages.id(messageId);
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
