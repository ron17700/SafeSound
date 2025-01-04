import { useState } from 'react';
import { Chat } from './Chat';

export const ChatButton = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

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
            {isChatOpen && <Chat />}
        </>
    );
};
