import { FC } from "react";
import { motion } from "framer-motion";
import { useOnlineUsers } from "@/hooks/useOnlineUsers"; // Custom hook for real-time users

interface LiveMetrics {
  onlineUsers: number;
  activeChats: number;
  peakUsersToday: number;
}

export const Hero: FC = () => {
  const { onlineUsers, activeChats, peakUsersToday } = useOnlineUsers();

  // Calculate the "busy-ness" percentage based on current online users
  const activityLevel = Math.min((onlineUsers / 100) * 100, 100);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white dark:bg-space-black text-gray-900 dark:text-white pt-20"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side */}
          <motion.div 
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-6xl font-display font-bold tracking-wider leading-tight"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                FIND YOUR
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                PERFECT
              </motion.span>
              <br />
              <motion.span 
                className="bg-gradient-to-r from-neon-mint to-blue-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                GYM BUDDY
              </motion.span>
            </motion.h1>

            {/* Dynamic recent match notification with animation */}
            {activeChats > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-space-gray/50 rounded-xl backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                </div>
                <div>
                  <div className="font-medium dark:text-white">
                    New match found!
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Just now • Looking for partner
                  </div>
                </div>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary dark:hover:bg-neon-mint/90 group flex items-center gap-2"
            >
              FIND NEARBY BUDDIES
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.button>
          </motion.div>

          {/* Right side - Add floating elements */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="relative"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-4 right-4 p-4 bg-white/10 dark:bg-space-gray/30 backdrop-blur-lg rounded-xl"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{onlineUsers}+ active users nearby</span>
              </div>
              <div className="mt-1">
                {activeChats > 0
                  ? `${activeChats} matches in progress`
                  : "Ready to match"}
              </div>
            </motion.div>
            
            {/* Add decorative elements */}
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-neon-mint/20 to-blue-400/20 rounded-full blur-3xl"
            />
          </motion.div>
        </div>

        {/* Bottom section - Metrics with animations */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 rounded-2xl bg-gray-100/50 dark:bg-space-gray/50 backdrop-blur-lg p-8"
        >
          {/* Live matching section */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-2xl font-display font-bold mb-2">
              LIVE MATCHING
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {onlineUsers === 1
                ? "1 person looking for a workout partner"
                : `${onlineUsers} people looking for workout partners`}{" "}
              right now
            </p>
          </motion.div>

          {/* Active conversations section */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex -space-x-2">
                  {activeChats > 0 ? (
                    [...Array(Math.min(activeChats, 3))].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full animate-pulse"
                        style={{
                          backgroundColor: `hsl(${i * 120}, 70%, 50%)`,
                          animationDelay: `${i * 200}ms`,
                        }}
                      />
                    ))
                  ) : (
                    <div className="text-sm">Waiting for matches...</div>
                  )}
                </div>
                {activeChats > 0 && (
                  <span>
                    {activeChats === 1
                      ? "1 active conversation"
                      : `${activeChats} active conversations`}
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Activity level section */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium dark:text-gray-300">
                  Current Activity
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {activityLevel > 75
                    ? "Very Active"
                    : activityLevel > 50
                    ? "Active"
                    : activityLevel > 25
                    ? "Moderate"
                    : "Quiet"}
                </span>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-space-black rounded-full overflow-hidden">
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1 }}
                  style={{ width: `${activityLevel}%` }}
                  className="h-full bg-gradient-to-r from-neon-mint to-blue-400"
                />
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {peakUsersToday > 0 &&
                  `Peak today: ${peakUsersToday} ${
                    peakUsersToday === 1 ? "user" : "users"
                  } online`}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Example of the custom hook (create in hooks/useOnlineUsers.ts)
/*
import { useState, useEffect } from 'react';

export const useOnlineUsers = () => {
  const [metrics, setMetrics] = useState({
    onlineUsers: 0,
    activeChats: 0,
    peakUsersToday: 0
  });

  useEffect(() => {
    // Connect to WebSocket here
    const socket = new WebSocket('your-websocket-url');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMetrics(data);
    };

    return () => socket.close();
  }, []);

  return metrics;
};
*/

export default Hero;
