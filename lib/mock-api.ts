// Mock API for standalone frontend development
import { User } from './auth';

// Mock users database
const mockUsers: { [email: string]: { password: string; user: User } } = {
  // Easy demo account - just type "demo" / "demo"
  'demo': {
    password: 'demo',
    user: {
      id: '0',
      email: 'demo',
      role: 'MEMBER',
      tier: 'GOLD',
      firstName: 'Demo',
      lastName: 'User',
    },
  },
  'admin@vlc.com': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@vlc.com',
      role: 'ADMIN',
      firstName: 'Admin',
      lastName: 'User',
    },
  },
  'partner@vlc.com': {
    password: 'partner123',
    user: {
      id: '2',
      email: 'partner@vlc.com',
      role: 'PARTNER',
      firstName: 'Partner',
      lastName: 'User',
    },
  },
  'member@vlc.com': {
    password: 'member123',
    user: {
      id: '3',
      email: 'member@vlc.com',
      role: 'MEMBER',
      tier: 'GOLD',
      firstName: 'Gold',
      lastName: 'Member',
    },
  },
  'black@vlc.com': {
    password: 'black123',
    user: {
      id: '4',
      email: 'black@vlc.com',
      role: 'MEMBER',
      tier: 'BLACK',
      firstName: 'Black',
      lastName: 'Member',
    },
  },
};

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  async login(email: string, password: string) {
    await delay();
    
    const userRecord = mockUsers[email];
    if (!userRecord || userRecord.password !== password) {
      throw new Error('Invalid credentials');
    }
    
    const token = btoa(`${email}:${Date.now()}`);
    return {
      access_token: token,
      user: userRecord.user,
    };
  },

  async logout() {
    await delay(100);
    return { success: true };
  },

  async getCurrentUser(token: string): Promise<User | null> {
    await delay(100);
    
    if (!token) return null;
    
    try {
      const decoded = atob(token);
      const email = decoded.split(':')[0];
      return mockUsers[email]?.user || null;
    } catch {
      return null;
    }
  },

  async signUp(data: { email: string; password: string; firstName?: string; lastName?: string; tier?: 'GOLD' | 'BLACK' }) {
    await delay();
    
    if (mockUsers[data.email]) {
      throw new Error('Email already exists');
    }
    
    const newUser: User = {
      id: String(Object.keys(mockUsers).length + 1),
      email: data.email,
      role: 'MEMBER',
      tier: data.tier || 'GOLD',
      firstName: data.firstName,
      lastName: data.lastName,
    };
    
    mockUsers[data.email] = {
      password: data.password,
      user: newUser,
    };
    
    const token = btoa(`${data.email}:${Date.now()}`);
    return {
      access_token: token,
      user: newUser,
    };
  },
};

export const isMockMode = process.env.NEXT_PUBLIC_MOCK_API === 'true';

