import { FC, useEffect, useState } from "react";
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

  return (
    <div className="min-h-screen bg-white dark:bg-space-black text-gray-900 dark:text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side */}
          <div className="space-y-8">
            <h1 className="text-6xl font-display font-bold tracking-wider leading-tight">
              FIND YOUR<br />
              PERFECT<br />
              <span className="bg-gradient-to-r from-neon-mint to-blue-400 bg-clip-text text-transparent">
                GYM BUDDY
              </span>
            </h1>

            {/* Dynamic recent match notification */}
            {activeChats > 0 && (
              <div className="flex items-center gap-4">
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
              </div>
            )}

            <button className="btn-primary dark:hover:bg-neon-mint/90 group flex items-center gap-2">
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
            </button>
          </div>

          {/* Right side */}
          <div className="relative">
            <div className="absolute top-4 right-4 text-sm dark:text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{onlineUsers}+ active users nearby</span>
              </div>
              <div className="mt-1">
                {activeChats > 0 
                  ? `${activeChats} matches in progress`
                  : 'Ready to match'}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section - Metrics */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 rounded-2xl bg-gray-100 dark:bg-space-gray p-8">
          {/* Live matching section */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-2">LIVE MATCHING</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {onlineUsers === 1 
                ? '1 person looking for a workout partner'
                : `${onlineUsers} people looking for workout partners`} right now
            </p>
          </div>

          {/* Active conversations section */}
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
                        animationDelay: `${i * 200}ms`
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
                    ? '1 active conversation'
                    : `${activeChats} active conversations`}
                </span>
              )}
            </div>
          </div>

          {/* Activity level section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium dark:text-gray-300">Current Activity</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {activityLevel > 75 ? "Very Active" : 
                 activityLevel > 50 ? "Active" :
                 activityLevel > 25 ? "Moderate" : "Quiet"}
              </span>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-space-black rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-neon-mint to-blue-400 transition-all duration-1000 ease-in-out"
                style={{ 
                  width: `${activityLevel}%`,
                  animation: 'pulse 2s infinite'
                }}
              />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {peakUsersToday > 0 && (
                `Peak today: ${peakUsersToday} ${peakUsersToday === 1 ? 'user' : 'users'} online`
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
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
