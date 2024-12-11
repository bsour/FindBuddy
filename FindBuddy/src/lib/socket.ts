import { io } from 'socket.io-client';

// Create socket instance
export const socket = io(import.meta.env.VITE_WEBSOCKET_URL || 'http://localhost:3001', {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Track connection status
let isConnected = false;

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
  isConnected = true;
  
  // Immediately request current metrics
  socket.emit('metrics:request');
});

socket.on('connect_error', (error) => {
  console.error('WebSocket connection error:', error);
  isConnected = false;
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected from WebSocket server:', reason);
  isConnected = false;
});

// Export connection status checker
export const isSocketConnected = () => isConnected; 