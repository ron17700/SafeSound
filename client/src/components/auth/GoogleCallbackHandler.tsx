import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {parseAccessTokenToPayload} from "../../logic/user";

interface GoogleCallbackHandlerProps {
    handleAccessToken: (token: string) => void;
}

const GoogleCallbackHandler: React.FC<GoogleCallbackHandlerProps> = ({ handleAccessToken }) => {
    const navigate = useNavigate();
    const hasProcessed = React.useRef(false);

    const saveTokens = (accessToken: string, refreshToken: string) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem(
            'userId',
            parseAccessTokenToPayload(accessToken).userId
        );
    };

    useEffect(() => {
        if (hasProcessed.current) return;
        hasProcessed.current = true;
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');

        if (storedAccessToken && storedRefreshToken) {
            console.log('Tokens already available, skipping callback processing...');
            navigate('/');
        } else {
            console.log('Processing Google callback...');

            const queryParams = new URLSearchParams(window.location.search);
            const accessToken = queryParams.get('accessToken');
            const refreshToken = queryParams.get('refreshToken');

            if (accessToken && refreshToken) {
                saveTokens(accessToken, refreshToken);
                handleAccessToken(accessToken);
                navigate('/');
            } else {
                console.error('Tokens not found in query parameters');
                navigate('/login');
            }
        }
    });

    return <div>Authenticating...</div>;
};

export default GoogleCallbackHandler;