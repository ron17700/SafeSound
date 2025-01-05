import { useState, useEffect } from 'react';
import { socket } from '../../utils/socket';
import api from '../../api/apiService';

export const Chat = ({ chatId }: { chatId: string }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const userId = localStorage.getItem('userId'); // Get the logged-in user ID

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    const fetchMessages = async () => {
      try {
        const response = await api.get(`/chat/messages/${chatId}`);
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    return () => {
      socket.off('receiveMessage');
    };
  }, [chatId]);

  const sendMessage = () => {
    if (!userId || !newMessage.trim()) return;

    const messageData = {
      chatId,
      senderId: userId,
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
                message.senderId === userId ? 'flex-end' : 'flex-start',
              background: message.senderId === userId ? '#0078FF' : '#F0F0F0',
              color: message.senderId === userId ? '#fff' : '#000',
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
