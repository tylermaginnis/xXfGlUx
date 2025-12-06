// Mock API for standalone frontend development
import { User } from './auth';

// Booking types
export interface Booking {
  id: string;
  userId: string;
  venueName: string;
  venueType: 'restaurant' | 'nightclub' | 'hotel' | 'spa' | 'event';
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  specialRequests?: string;
  conciergeNotes?: string;
  createdAt: string;
  confirmedAt?: string;
}

// Mock bookings database
const mockBookings: Booking[] = [
  {
    id: 'BK001',
    userId: '0', // Demo user
    venueName: 'Michelin Star at The Bellagio',
    venueType: 'restaurant',
    date: '2025-12-15',
    time: '19:00',
    guests: 4,
    status: 'confirmed',
    specialRequests: 'Window table with strip view, celebrating anniversary',
    conciergeNotes: 'Premium champagne arranged, reserved best table',
    createdAt: '2025-12-01T10:30:00Z',
    confirmedAt: '2025-12-01T11:15:00Z',
  },
  {
    id: 'BK002',
    userId: '0',
    venueName: 'XS Nightclub at Encore',
    venueType: 'nightclub',
    date: '2025-12-20',
    time: '22:00',
    guests: 8,
    status: 'confirmed',
    specialRequests: 'VIP table near DJ booth',
    conciergeNotes: 'Table 12 reserved, bottle service confirmed',
    createdAt: '2025-11-28T15:20:00Z',
    confirmedAt: '2025-11-28T16:00:00Z',
  },
  {
    id: 'BK003',
    userId: '0',
    venueName: 'The Cosmopolitan Penthouse Suite',
    venueType: 'hotel',
    date: '2025-12-18',
    time: '15:00',
    guests: 2,
    status: 'pending',
    specialRequests: 'Early check-in if possible, roses in room',
    createdAt: '2025-12-05T09:00:00Z',
  },
  {
    id: 'BK004',
    userId: '0',
    venueName: 'Spa at Aria',
    venueType: 'spa',
    date: '2025-11-30',
    time: '14:00',
    guests: 2,
    status: 'completed',
    specialRequests: 'Couples massage, aromatherapy',
    conciergeNotes: 'Premium treatment selected',
    createdAt: '2025-11-20T12:00:00Z',
    confirmedAt: '2025-11-20T13:30:00Z',
  },
  {
    id: 'BK005',
    userId: '0',
    venueName: 'Private Poker Room at Wynn',
    venueType: 'event',
    date: '2025-12-22',
    time: '20:00',
    guests: 10,
    status: 'confirmed',
    specialRequests: '$500 minimum buy-in, premium cocktail service',
    conciergeNotes: 'High roller room secured, dealer arranged',
    createdAt: '2025-12-02T18:00:00Z',
    confirmedAt: '2025-12-02T19:30:00Z',
  },
  {
    id: 'BK006',
    userId: '0',
    venueName: 'Gordon Ramsay Hell\'s Kitchen',
    venueType: 'restaurant',
    date: '2025-11-25',
    time: '18:30',
    guests: 6,
    status: 'completed',
    specialRequests: 'Chef\'s table experience',
    conciergeNotes: 'Arranged meet and greet with chef',
    createdAt: '2025-11-10T14:00:00Z',
    confirmedAt: '2025-11-10T15:00:00Z',
  },
];

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

  // Booking methods
  async getBookings(userId: string): Promise<Booking[]> {
    await delay();
    return mockBookings
      .filter(booking => booking.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async getBooking(bookingId: string): Promise<Booking | null> {
    await delay();
    return mockBookings.find(booking => booking.id === bookingId) || null;
  },

  async createBooking(bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking> {
    await delay(500);
    
    const newBooking: Booking = {
      ...bookingData,
      id: `BK${String(mockBookings.length + 1).padStart(3, '0')}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    mockBookings.push(newBooking);
    return newBooking;
  },

  async cancelBooking(bookingId: string): Promise<Booking> {
    await delay(300);
    
    const booking = mockBookings.find(b => b.id === bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }
    
    booking.status = 'cancelled';
    return booking;
  },
};

export const isMockMode = process.env.NEXT_PUBLIC_MOCK_API === 'true';

