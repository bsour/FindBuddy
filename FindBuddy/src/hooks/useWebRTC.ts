import { useEffect, useState } from 'react';
import { webRTCService } from '@/services/webRTC';

export const useWebRTC = () => {
  const [nearbyUsers, setNearbyUsers] = useState<any[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connected'>('disconnected');

  useEffect(() => {
    const handlePeerConnected = () => {
      setNearbyUsers(webRTCService.getNearbyUsers());
      setConnectionStatus('connected');
    };

    const handlePeerDisconnected = () => {
      setNearbyUsers(webRTCService.getNearbyUsers());
    };

    window.addEventListener('peer-connected', handlePeerConnected as EventListener);
    window.addEventListener('peer-disconnected', handlePeerDisconnected as EventListener);

    // Initial check
    setNearbyUsers(webRTCService.getNearbyUsers());

    return () => {
      window.removeEventListener('peer-connected', handlePeerConnected as EventListener);
      window.removeEventListener('peer-disconnected', handlePeerDisconnected as EventListener);
    };
  }, []);

  return {
    nearbyUsers,
    connectionStatus,
    broadcastPresence: webRTCService.broadcastPresence.bind(webRTCService),
    sendMessage: webRTCService.sendMessage.bind(webRTCService),
  };
};