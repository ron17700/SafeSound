import { Server, Socket } from 'socket.io';
import Chat from '../models/chat.model';
import mongoose from 'mongoose';

export const setupSocketHandlers = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log('a user connected');

        // Handle user joining a chat
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

            // If the user joining is not the sender of the messages, mark their messages as read
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

        // Handle sending a message
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
                    // Emit the message to the recipients and immediately include the status
                    io.to(chatId).emit('receiveMessage', message);

                    // Emit the status change immediately for the sender
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

        // Get all messages in a chat
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

        // Mark a message as read
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
