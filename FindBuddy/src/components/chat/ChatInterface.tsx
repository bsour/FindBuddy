import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { webRTCService } from '@/services/webRTC';

interface ChatProps {
  peerId: string;
  peerProfile: any;
  onClose: () => void;
}

export const Chat: FC<ChatProps> = ({ peerId, peerProfile, onClose }) => {
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'me' | 'peer' }>>([]);
  const [input, setInput] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');

  useEffect(() => {
    // Listen for incoming messages
    const handleMessage = (event: CustomEvent) => {
      if (event.detail.peerId === peerId) {
        setMessages(prev => [...prev, { text: event.detail.message, sender: 'peer' }]);
      }
    };

    window.addEventListener('p2p-message', handleMessage as EventListener);
    return () => window.removeEventListener('p2p-message', handleMessage as EventListener);
  }, [peerId]);

  const handleSend = async () => {
    if (!input.trim()) return;
    try {
      await webRTCService.sendMessage(peerId, input);
      setMessages(prev => [...prev, { text: input, sender: 'me' }]);
      setInput('');
    } catch (error) {
      setConnectionStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 w-80 bg-white dark:bg-space-gray rounded-lg shadow-lg"
    >
      <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <div>
          <h3 className="font-bold">{peerProfile.name}</h3>
          <span className="text-sm text-gray-500">
            {connectionStatus === 'connected' ? 'Connected' : 
             connectionStatus === 'connecting' ? 'Connecting...' : 
             'Connection error'}
          </span>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <span className="sr-only">Close</span>
          ×
        </button>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[80%] ${
              msg.sender === 'me'
                ? 'ml-auto bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="p-4 border-t dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </motion.div>
  );
}; 