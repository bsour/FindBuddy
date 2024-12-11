import { useState, useEffect, useCallback } from 'react';
import { webRTCService } from '@/services/webRTC';

export const usePeerConnection = () => {
  const [nearbyUsers, setNearbyUsers] = useState<any[]>([]);
  const [connections, setConnections] = useState<Map<string, any>>(new Map());

  useEffect(() => {
    const handlePeerConnected = (event: CustomEvent) => {
      setNearbyUsers(webRTCService.getNearbyUsers());
    };

    const handlePeerDisconnected = (event: CustomEvent) => {
      setNearbyUsers(webRTCService.getNearbyUsers());
    };

    window.addEventListener('peer-connected', handlePeerConnected as EventListener);
    window.addEventListener('peer-disconnected', handlePeerDisconnected as EventListener);

    return () => {
      window.removeEventListener('peer-connected', handlePeerConnected as EventListener);
      window.removeEventListener('peer-disconnected', handlePeerDisconnected as EventListener);
    };
  }, []);

  const connectToPeer = async (peerId: string) => {
    try {
      await webRTCService.broadcastPresence({
        id: peerId,
        // Add any additional user info here
      });
    } catch (error) {
      console.error('Failed to connect to peer:', error);
    }
  };

  const sendMessage = async (peerId: string, message: string) => {
    try {
      await webRTCService.sendMessage(peerId, message);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return {
    nearbyUsers,
    connections,
    connectToPeer,
    sendMessage,
  };
}; 