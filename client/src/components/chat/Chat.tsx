import { useState, useEffect } from 'react';
import { socket } from '../../utils/socket';

export const Chat = () => {
  const [messages, setMessages] = useState<{ _id?: string; senderId: string; content: string; status?: string; timestamp?: Date }[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatId] = useState('12345'); // Replace with dynamic chat ID

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on('messageStatusUpdated', ({ messageId, status }) => {
      setMessages((prev) =>
        prev.map((msg) => (msg._id === messageId ? { ...msg, status } : msg))
      );
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('messageStatusUpdated');
    };
  }, []);

  const sendMessage = () => {
    const messageData = {
      chatId,
      senderId: 'user-id',
      content: newMessage,
    };

    socket.emit('sendMessage', messageData);
    setMessages((prev) => [
      ...prev,
      { ...messageData, timestamp: new Date(), status: 'sent' },
    ]);
    setNewMessage('');
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '90px',
        right: '20px',
        width: '300px',
        maxHeight: '400px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          background: '#0078FF',
          color: '#fff',
          padding: '10px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Chat
      </div>
      <div
        style={{
          flex: 1,
          padding: '10px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              alignSelf:
                message.senderId === 'user-id' ? 'flex-end' : 'flex-start',
              background:
                message.senderId === 'user-id' ? '#0078FF' : '#F0F0F0',
              color: message.senderId === 'user-id' ? '#fff' : '#000',
              borderRadius: '12px',
              padding: '8px 12px',
              margin: '5px 0',
              maxWidth: '70%',
            }}
          >
            <p style={{ margin: 0 }}>{message.content}</p>
            <small
              style={{ fontSize: '10px', display: 'block', textAlign: 'right' }}
            >
              {message.status === 'read' ? '✓✓ Read' : '✓ Sent'}
            </small>
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          borderTop: '1px solid #ddd',
          padding: '10px',
        }}
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            padding: '8px',
            borderRadius: '4px',
            background: '#F9F9F9',
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: '8px',
            background: '#0078FF',
            color: '#fff',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};
