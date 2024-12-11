import { useState, useEffect } from 'react';
import { socket } from '@/lib/socket';

interface LiveMetrics {
  onlineUsers: number;
  activeChats: number;
  peakUsersToday: number;
}

export const useOnlineUsers = () => {
  const [metrics, setMetrics] = useState<LiveMetrics>({
    onlineUsers: 1,
    activeChats: 0,
    peakUsersToday: 1
  });

  useEffect(() => {
    // When this user connects
    socket.on('connect', () => {
      // Emit that we have a new user
      socket.emit('user:join');
    });

    // Listen for users count updates
    socket.on('metrics:update', (data: LiveMetrics) => {
      setMetrics(data);
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off('connect');
      socket.off('metrics:update');
      socket.emit('user:leave');
    };
  }, []);

  return metrics;
}; 