import { Buffer } from 'buffer';

export class P2PService {
  private localProfile: any = null;
  private activeUsers: Map<string, any> = new Map();

  constructor() {
    // Check for existing users every second
    setInterval(() => {
      this.checkLocalStorage();
      if (this.localProfile) {
        this.updatePresence();
      }
    }, 1000);

    // Cleanup on window close
    window.addEventListener('beforeunload', () => {
      if (this.localProfile) {
        localStorage.removeItem(`user-${this.localProfile.id}`);
      }
    });
  }

  private checkLocalStorage() {
    const now = Date.now();
    const users = new Map();

    // Scan localStorage for users
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('user-')) {
        try {
          const userData = JSON.parse(localStorage.getItem(key) || '{}');
          if (now - userData.lastSeen < 10000) { // 10 seconds timeout
            users.set(userData.id, userData);
          } else {
            localStorage.removeItem(key);
          }
        } catch (e) {
          localStorage.removeItem(key);
        }
      }
    }

    // Update active users and trigger events
    for (const [id, user] of users) {
      if (!this.activeUsers.has(id) && id !== this.localProfile?.id) {
        window.dispatchEvent(new CustomEvent('peer-connected', { 
          detail: { peerId: id }
        }));
      }
    }

    for (const [id] of this.activeUsers) {
      if (!users.has(id)) {
        window.dispatchEvent(new CustomEvent('peer-disconnected', { 
          detail: { peerId: id }
        }));
      }
    }

    this.activeUsers = users;
  }

  private updatePresence() {
    if (!this.localProfile) return;
    
    const presenceData = {
      ...this.localProfile,
      lastSeen: Date.now()
    };
    
    localStorage.setItem(
      `user-${this.localProfile.id}`, 
      JSON.stringify(presenceData)
    );
  }

  async broadcastPresence(profile: any) {
    console.log('Broadcasting presence with profile:', profile);
    
    this.localProfile = {
      ...profile,
      id: crypto.randomUUID(),
      lastSeen: Date.now()
    };

    this.updatePresence();
    return this.localProfile.id;
  }

  getNearbyUsers() {
    return Array.from(this.activeUsers.values())
      .filter(user => user.id !== this.localProfile?.id)
      .map(user => ({
        id: user.id,
        location: user.location,
        profile: {
          workoutType: user.workoutType,
          experienceLevel: user.experienceLevel,
        },
        lastSeen: user.lastSeen
      }));
  }

  sendMessage(peerId: string, message: string) {
    // For now, just store messages in localStorage
    const chatKey = `chat-${[this.localProfile.id, peerId].sort().join('-')}`;
    const messages = JSON.parse(localStorage.getItem(chatKey) || '[]');
    messages.push({
      sender: this.localProfile.id,
      message,
      timestamp: Date.now()
    });
    localStorage.setItem(chatKey, JSON.stringify(messages));
    
    // Trigger message event
    window.dispatchEvent(new CustomEvent('new-message', {
      detail: { peerId, message }
    }));
  }
}

export const webRTCService = new P2PService(); 