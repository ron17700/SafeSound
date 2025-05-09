import { useState, useEffect, useRef } from 'react';
import { socket } from '../../utils/socket';
import { UserProfile } from '../user/UserProfilePage';
import {
  ChatBody,
  ChatFooter,
  ChatHeader,
  ChatWrapper,
  MessageContentWrapper,
  MessageDateWrapper,
  MessageText,
  MessageTimestamp,
  MessageWrapper,
} from '../shared/styles/wrappers';
import {
  CloseButton,
  GoBackButton,
  SendButton,
} from '../shared/styles/buttons';
import { InputField } from '../shared/styles/inputs';

interface Message {
  _id: string;
  sender: UserProfile;
  status: string;
  content: string;
  createdAt: Date;
}

export const Chat = ({
  chatId,
  selectedUserName,
  onClose,
  onGoBack,
}: {
  chatId: string;
  selectedUserName: string;
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
        if (message.sender._id !== userId && message.status !== 'read') {
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

      if (message.sender._id !== userId) {
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
    <ChatWrapper>
      <ChatHeader>
        <GoBackButton onClick={onGoBack}>←</GoBackButton>
        <span>{selectedUserName}</span>
        <CloseButton onClick={onClose}>✕</CloseButton>
      </ChatHeader>

      <ChatBody>
        {messages.map((message, index) => {
          const messageDate = formatDate(message.createdAt);
          return (
            <div key={index}>
              {index === 0 ||
              formatDate(messages[index - 1].createdAt) !== messageDate ? (
                <MessageDateWrapper>{messageDate}</MessageDateWrapper>
              ) : null}
              <MessageWrapper isCurrentUser={message.sender._id === userId}>
                <MessageContentWrapper
                  isCurrentUser={message.sender._id === userId}
                  onClick={() => markAsRead(message._id)}
                >
                  <MessageText>{message.content}</MessageText>
                  <MessageTimestamp>
                    {message.sender._id === userId && (
                      <>{message.status === 'read' ? '✓✓' : '✓'}</>
                    )}
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </MessageTimestamp>
                </MessageContentWrapper>
              </MessageWrapper>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </ChatBody>

      <ChatFooter>
        <InputField
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <SendButton onClick={sendMessage}>Send</SendButton>
      </ChatFooter>
    </ChatWrapper>
  );
};
