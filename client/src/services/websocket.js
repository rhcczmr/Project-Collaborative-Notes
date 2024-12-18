import io from 'socket.io-client';

const SERVER_URL = 'http://192.168.204.137:3001';

const socket = io(SERVER_URL, {
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 20000,
  forceNew: true
});

// Debug logs
socket.on('connect', () => {
  console.log('Connected to server:', socket.id);
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
  // Try polling if websocket fails
  if (socket.io.opts.transports.includes('websocket')) {
    console.log('Falling back to polling transport');
    socket.io.opts.transports = ['polling'];
  }
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
});

socket.on('error', (error) => {
  console.error('Socket error:', error);
});

export default socket;