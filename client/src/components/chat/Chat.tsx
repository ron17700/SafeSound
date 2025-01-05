import { useState, useEffect, useRef } from 'react';
import { socket } from '../../utils/socket';
import { Box } from '@mui/material';

interface Message {
  _id: string;
  sender: string;
  status: string;
  content: string;
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

      if (message.sender !== userId) {
        socket.emit('markAsRead', { chatId, messageId: message._id });
      }
    });

    socket.on('messageStatusUpdated', ({ messageId, status }) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === messageId ? { ...msg, status } : msg
        )
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

    socket.emit(
      'sendMessage',
      messageData,
      (responseMessage: { _id: string }) => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === responseMessage._id ? { ...msg, status: 'read' } : msg
          )
        );
      }
    );

    setNewMessage('');
  };

  const markAsRead = (messageId: string) => {
    socket.emit('markAsRead', { chatId, messageId });
  };

  const formatDate = (timestamp: Date) => {
    return new Date(timestamp).toLocaleDateString([], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '90px',
        right: '20px',
        width: '400px',
        maxHeight: '500px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#4A969D',
          color: '#fff',
          padding: '10px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        <button
          onClick={onGoBack}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            marginRight: 'auto', 
          }}
        >
          ←
        </button>
        <span style={{ alignSelf: 'center' }}>Chat</span>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            marginLeft: '8px',
          }}
        >
          ✕
        </button>
      </div>

      <Box
        sx={{
          flex: 1,
          padding: '10px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        {messages.map((message, index) => {
          const messageDate = formatDate(message.timestamp);
          return (
            <div key={index}>
              {index === 0 ||
              formatDate(messages[index - 1].timestamp) !== messageDate ? (
                <div
                  style={{
                    textAlign: 'center',
                    fontSize: '12px',
                    marginBottom: '8px',
                    color: '#888',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  {messageDate}
                </div>
              ) : null}
              <div
                style={{
                  display: 'flex',
                  justifyContent:
                    message.sender === userId ? 'flex-end' : 'flex-start',
                  marginBottom: '5px',
                }}
              >
                <div
                  style={{
                    background:
                      message.sender === userId ? '#103A49' : '#F0F0F0',
                    color: message.sender === userId ? '#fff' : '#000',
                    borderRadius: '12px',
                    padding: '8px 12px',
                    maxWidth: '70%',
                    wordWrap: 'break-word',
                  }}
                  onClick={() => markAsRead(message._id)}
                >
                  <p style={{ margin: 0 }}>{message.content}</p>
                  <small
                    style={{
                      fontSize: '10px',
                      display: 'block',
                      textAlign: 'right',
                    }}
                  >
                    {message.status === 'read' ? '✓✓' : '✓'}
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </small>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </Box>

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
            background: '#103A49',
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
