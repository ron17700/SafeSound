import { Server, Socket } from 'socket.io';
import Chat from '../models/chat.model';

export const setupSocketHandlers = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log('a user connected');

        // Handle user joining a chat
        socket.on('joinChat', async ({ userId, targetUserId }) => {
            let chat = await Chat.findOne({ participants: { $all: [userId, targetUserId] } });

            if (!chat) {
                // If chat doesn't exist, create one
                chat = await Chat.create({
                    participants: [userId, targetUserId],
                    messages: [],
                });
            }

            socket.join(chat._id.toString());  // User joins the room for this chat
            socket.emit('chatJoined', { chatId: chat._id.toString() });  // Emit the chat ID to the client
        });

        // Handle sending a message
        socket.on('sendMessage', async ({ chatId, senderId, content }) => {
            const message = { sender: senderId, content, timestamp: new Date(), status: 'sent' };

            try {
                const updatedChat = await Chat.findByIdAndUpdate(
                    chatId,
                    { $push: { messages: message },
                        lastMessage: content,
                        lastUpdated: new Date(),
                    },
                    { new: true }
                );

                if (updatedChat) {
                    io.to(chatId).emit('receiveMessage', message);
                } else {
                    socket.emit('error', 'Chat not found');
                }
            } catch (error) {
                socket.emit('error', 'Error sending message');
            }
        });

        // Handle marking a message as read
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
