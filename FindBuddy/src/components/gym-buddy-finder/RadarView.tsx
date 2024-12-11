import { FC, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface User {
  id: string;
  location: {
    latitude: number;
    longitude: number;
  };
  profile: {
    workoutType: string;
    experienceLevel: string;
  };
}

interface RadarViewProps {
  currentLocation: GeolocationPosition;
  nearbyUsers: User[];
  onUserSelect: (userId: string) => void;
}

export const RadarView: FC<RadarViewProps> = ({
  currentLocation,
  nearbyUsers,
  onUserSelect,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.offsetWidth / 2;
      const centerY = canvas.offsetHeight / 2;
      const maxRadius = Math.min(centerX, centerY) - 20;

      // Draw radar circles
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (maxRadius * i) / 3, 0, Math.PI * 2);
        ctx.strokeStyle = '#2563EB';
        ctx.globalAlpha = 0.2;
        ctx.stroke();
      }

      // Draw scanning line
      const scanAngle = (Date.now() % 3000) / 3000 * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(scanAngle) * maxRadius,
        centerY + Math.sin(scanAngle) * maxRadius
      );
      ctx.strokeStyle = '#3B82F6';
      ctx.globalAlpha = 0.6;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw users
      nearbyUsers.forEach((user, index) => {
        const angle = (index / nearbyUsers.length) * Math.PI * 2;
        const distance = calculateDistance(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude,
          user.location.latitude,
          user.location.longitude
        );

        // Scale distance to radius (max 5km = max radius)
        const radius = Math.min(distance / 5, 1) * maxRadius;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        // Draw user dot
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#3B82F6';
        ctx.globalAlpha = 1;
        ctx.fill();

        // Draw user label
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '12px sans-serif';
        ctx.fillText(user.profile.workoutType, x + 10, y);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentLocation, nearbyUsers]);

  return (
    <div className="relative w-full h-full min-h-[400px] bg-gray-900 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        onClick={(e) => {
          const rect = canvasRef.current?.getBoundingClientRect();
          if (!rect) return;

          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          // Find clicked user
          nearbyUsers.forEach(user => {
            // Simple distance check for demo
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const distance = Math.sqrt(
              Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
            );

            if (distance < 10) {
              onUserSelect(user.id);
            }
          });
        }}
      />
      
      {/* User list */}
      <div className="absolute bottom-4 left-4 right-4 bg-gray-800 bg-opacity-80 rounded-lg p-4">
        <h3 className="text-white mb-2">Nearby Gym Buddies</h3>
        <div className="space-y-2">
          {nearbyUsers.map(user => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between bg-gray-700 p-2 rounded-lg cursor-pointer hover:bg-gray-600"
              onClick={() => onUserSelect(user.id)}
            >
              <div>
                <div className="text-white">{user.profile.workoutType}</div>
                <div className="text-sm text-gray-400">{user.profile.experienceLevel}</div>
              </div>
              <div className="text-blue-400">
                {calculateDistance(
                  currentLocation.coords.latitude,
                  currentLocation.coords.longitude,
                  user.location.latitude,
                  user.location.longitude
                ).toFixed(1)}km away
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(value: number): number {
  return (value * Math.PI) / 180;
} 