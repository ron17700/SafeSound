import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import { AddressInfo } from 'net';
import { io as Client, Socket as ClientSocket } from 'socket.io-client';
import mongoose from 'mongoose';
import { setupSocketHandlers } from '../../socket/socket-handlers';
import Chat from '../../models/chat.model';
import Message from '../../models/message.model';

describe('Socket Handlers', () => {
    let io: Server, serverSocket: Socket, clientSocket: ClientSocket;

    beforeAll((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);
        setupSocketHandlers(io);
        httpServer.listen(() => {
            const port = (httpServer.address() as AddressInfo).port;
            clientSocket = Client(`http://localhost:${port}`);
            io.on('connection', (socket: Socket) => {
                serverSocket = socket;
            });
            clientSocket.on('connect', done);
        });
    });

    afterAll(() => {
        io.close();
        clientSocket.close();
    });

    beforeEach(async () => {
        await Chat.deleteMany({});
        await Message.deleteMany({});
    });

    it('should join chat and mark messages as read', (done) => {
        const userId = new mongoose.Types.ObjectId();
        const targetUserId = new mongoose.Types.ObjectId();

        clientSocket.emit('joinChat', { userId, targetUserId });

        serverSocket.on('chatJoined', async ({ chatId }: { chatId: mongoose.Types.ObjectId }) => {
            const chat = await Chat.findById(chatId).populate('messages');
            expect(chat).not.toBeNull();
            expect(chat?.participants).toContainEqual(userId);
            expect(chat?.participants).toContainEqual(targetUserId);
            done();
        });
    });

    it('should send message and update chat', (done) => {
        const userId = new mongoose.Types.ObjectId();
        const targetUserId = new mongoose.Types.ObjectId();
        const content = 'Hello';

        Chat.create({ participants: [userId, targetUserId], messages: [] }).then((chat) => {
            clientSocket.emit('sendMessage', { chatId: chat._id, senderId: userId, content });

            serverSocket.on('receiveMessage', async (message: { content: string }) => {
                expect(message.content).toBe(content);
                const updatedChat = await Chat.findById(chat._id).populate('messages');
                expect(updatedChat?.messages.length).toBe(1);
                expect(updatedChat?.lastMessage).toBe(content);
                done();
            });
        });
    });

    it('should get messages', (done) => {
        const userId = new mongoose.Types.ObjectId();
        const targetUserId = new mongoose.Types.ObjectId();
        const content = 'Hello';

        Chat.create({ participants: [userId, targetUserId], messages: [] }).then((chat) => {
            Message.create({ sender: userId, content }).then((message) => {
                chat.messages.push(message);
                chat.save().then(() => {
                    clientSocket.emit('getMessages', { chatId: chat._id });

                    serverSocket.on('messages', (messages: { content: string }[]) => {
                        expect(messages.length).toBe(1);
                        expect(messages[0].content).toBe(content);
                        done();
                    });
                });
            });
        });
    });

    it('should mark message as read', (done) => {
        const userId = new mongoose.Types.ObjectId();
        const targetUserId = new mongoose.Types.ObjectId();
        const content = 'Hello';

        Chat.create({ participants: [userId, targetUserId], messages: [] }).then((chat) => {
            Message.create({ sender: userId, content }).then((message) => {
                chat.messages.push(message);
                chat.save().then(() => {
                    clientSocket.emit('markAsRead', { chatId: chat._id, messageId: message._id });

                    serverSocket.on('messageStatusUpdated', async ({ messageId, status }: { messageId: mongoose.Types.ObjectId, status: string }) => {
                        expect(status).toBe('read');
                        const updatedMessage = await Message.findById(messageId);
                        expect(updatedMessage?.status).toBe('read');
                        done();
                    });
                });
            });
        });
    });
});
