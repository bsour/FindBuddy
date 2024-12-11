import { useState, useEffect } from "react";
import { webRTCService } from "@/services/webRTC";

interface Metrics {
  totalUsers: number;
  activeUsers: number;
}

export const useOnlineUsers = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    totalUsers: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    const updateMetrics = () => {
      const nearbyUsers = webRTCService.getNearbyUsers();
      setMetrics({
        totalUsers: nearbyUsers.length + 1, // +1 for current user
        activeUsers: nearbyUsers.length + 1,
      });
    };

    // Update metrics when peers connect/disconnect
    window.addEventListener('peer-connected', updateMetrics);
    window.addEventListener('peer-disconnected', updateMetrics);

    // Initial metrics
    updateMetrics();

    // Periodic updates
    const interval = setInterval(updateMetrics, 5000);

    return () => {
      window.removeEventListener('peer-connected', updateMetrics);
      window.removeEventListener('peer-disconnected', updateMetrics);
      clearInterval(interval);
    };
  }, []);

  return metrics;
}; 