import { useState, useEffect } from 'react';
import { Chat } from './Chat';
import { socket } from '../../utils/socket'; // Import socket

export const ChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);

  useEffect(() => {
    socket.on('chatJoined', ({ chatId }) => {
      console.log('Chat joined:', chatId);
      setChatId(chatId);
      setIsChatOpen(true);
    });

    return () => {
      socket.off('chatJoined');
    };
  }, []);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#0078FF',
          color: '#fff',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        💬
      </div>
      {isChatOpen && chatId && <Chat chatId={chatId} />}
    </>
  );
};
