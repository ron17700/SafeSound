import { useState, useEffect, useRef } from 'react';
import { socket } from '../../utils/socket';

interface Message {
  _id: string;
  sender: string;
  status: string;
  content:string
  timestamp: Date;
}

export const Chat = ({
  chatId,
  onClose,
  onGoBack,
}: {
  chatId: string;
  onClose: () => void;
  onGoBack: () => void;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const userId = localStorage.getItem('userId');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sentMessagesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!chatId || !userId) return;

    socket.emit('getMessages', { chatId });

    socket.on('messages', (fetchedMessages) => {
      setMessages(fetchedMessages);

      const updatedMessages = fetchedMessages.map((message: Message) => {
        if (message.sender !== userId && message.status !== 'read') {
          socket.emit('markAsRead', { chatId, messageId: message._id });
          return { ...message, status: 'read' };
        }
        return message;
      });

      setMessages(updatedMessages);
    });

    socket.on('receiveMessage', (message: Message) => {
      setMessages((prevMessages) => {
        if (!prevMessages.some((msg) => msg._id === message._id)) {
          return [...prevMessages, message];
        }
        return prevMessages;
      });
    });

    socket.on('messageStatusUpdated', ({ messageId, status }) => {
      setMessages((prev) =>
        prev.map((msg) => (msg._id === messageId ? { ...msg, status } : msg))
      );
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('messages');
      socket.off('messageStatusUpdated');
    };
  }, [chatId, userId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = () => {
    const messageData = {
      chatId,
      senderId: userId,
      content: newMessage,
    };

    if (!sentMessagesRef.current.has(newMessage)) {
      sentMessagesRef.current.add(newMessage);
    }

    socket.emit('sendMessage', messageData, (responseMessage: { _id: string }) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === responseMessage._id ? { ...msg, status: 'read' } : msg
        )
      );
    });

    setNewMessage('');
  };

  const markAsRead = (messageId: string) => {
    socket.emit('markAsRead', { chatId, messageId });
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
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#0078FF',
          color: '#fff',
          padding: '10px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        <span>Chat</span>
        <button
          onClick={onGoBack}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          ←
        </button>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>
      </div>
      <div
        style={{
          flex: 1,
          padding: '10px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              alignSelf: message.sender === userId ? 'flex-end' : 'flex-start',
              background: message.sender === userId ? '#0078FF' : '#F0F0F0',
              color: message.sender === userId ? '#fff' : '#000',
              borderRadius: '12px',
              padding: '8px 12px',
              margin: '5px 0',
              maxWidth: '70%',
            }}
            onClick={() => markAsRead(message._id)}
          >
            <p style={{ margin: 0 }}>{message.content}</p>
            {message.sender === userId && (
              <small
                style={{
                  fontSize: '10px',
                  display: 'block',
                  textAlign: 'right',
                }}
              >
                {message.status === 'read' ? '✓✓ Read' : '✓ Sent'}
              </small>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
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
