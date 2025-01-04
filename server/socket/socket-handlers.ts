// server/socketHandlers.ts
import { Server, Socket } from 'socket.io';
import Chat from '../models/chat.model';

export const setupSocketHandlers = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log('a user connected');

        socket.on('sendMessage', async ({ chatId, senderId, content }) => {
            const newMessage = {
                sender: senderId,
                content,
                timestamp: new Date(),
                status: 'sent',
            };

            try {
                const updatedChat = await Chat.findByIdAndUpdate(
                    chatId,
                    {
                        $push: { messages: newMessage },
                        lastMessage: content,
                        lastUpdated: new Date(),
                    },
                    { new: true }
                );

                if (updatedChat) {
                    io.to(chatId).emit('receiveMessage', newMessage);
                } else {
                    socket.emit('error', 'Chat not found');
                }
            } catch (error) {
                socket.emit('error', 'Error sending message');
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
