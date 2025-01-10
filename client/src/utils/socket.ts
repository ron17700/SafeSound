import { io } from 'socket.io-client';
import { API_BASE_URL } from '../api/apiService';

export const socket = io(API_BASE_URL);
