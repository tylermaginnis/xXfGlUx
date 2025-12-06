'use client';

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { useAuth } from '@/components/providers/auth-provider';
import { Card3D } from '@/components/membership/card-3d';
import { mockApi, type Booking } from '@/lib/mock-api';
import Link from 'next/link';

function MemberDashboardContent() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.id) {
          const bookingsData = await mockApi.getBookings(user.id);
          setBookings(bookingsData);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  // Format member name
  const memberName = user?.firstName && user?.lastName
    ? `${user.firstName} ${user.lastName}`.toUpperCase()
    : user?.email?.split('@')[0].toUpperCase() || 'MEMBER NAME';

  // Format member ID (first 12 characters of user ID, formatted as XXXX XXXX XXXX)
  const formatMemberId = (id: string) => {
    const cleaned = id.replace(/-/g, '').substring(0, 12);
    return cleaned.match(/.{1,4}/g)?.join(' ') || 'XXXX XXXX XXXX';
  };
  const memberId = user?.id ? formatMemberId(user.id) : 'XXXX XXXX XXXX';

  const upcomingBookings = bookings.filter(b => 
    new Date(b.date) >= new Date() && b.status !== 'cancelled' && b.status !== 'completed'
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Member Dashboard</h1>
        <p className="text-muted-foreground">Manage your membership and bookings</p>
      </div>

      {/* Digital Membership Card */}
      {user?.tier && (
        <div className="bg-secondary border border-border rounded-lg p-4 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-center">Your Membership Card</h2>
          <div className="flex justify-center px-2">
            <Card3D
              tier={user.tier}
              memberName={memberName}
              memberId={memberId}
              interactive={true}
            />
          </div>
          <p className="text-center text-xs md:text-sm text-muted-foreground mt-4">
            Click the card to flip it • Hover to see 3D effect
          </p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-secondary border border-border rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-2">Membership Tier</div>
          <div className="text-2xl font-bold text-primary">{user?.tier || 'GOLD'}</div>
        </div>
        <div className="bg-secondary border border-border rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-2">Total Bookings</div>
          <div className="text-2xl font-bold">{bookings.length}</div>
        </div>
        <div className="bg-secondary border border-border rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-2">Upcoming</div>
          <div className="text-2xl font-bold text-green-500">{upcomingBookings.length}</div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-secondary border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Recent Bookings</h2>
          <Link
            href="/dashboard/member/bookings"
            className="text-primary hover:underline font-medium"
          >
            View All →
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📅</div>
            <p className="text-muted-foreground mb-4">No bookings yet</p>
            <Link
              href="/dashboard/member/bookings/new"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
            >
              Make Your First Booking
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.slice(0, 3).map((booking) => (
              <div
                key={booking.id}
                className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">
                      {booking.venueType === 'restaurant' && '🍽️'}
                      {booking.venueType === 'nightclub' && '🎉'}
                      {booking.venueType === 'hotel' && '🏨'}
                      {booking.venueType === 'spa' && '💆'}
                      {booking.venueType === 'event' && '🎭'}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{booking.venueName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(booking.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })} • {booking.time}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-500/10 text-green-500'
                            : booking.status === 'pending'
                            ? 'bg-yellow-500/10 text-yellow-500'
                            : booking.status === 'completed'
                            ? 'bg-blue-500/10 text-blue-500'
                            : 'bg-red-500/10 text-red-500'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{booking.guests} guests</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-secondary border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Make a Booking</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Reserve exclusive venues and experiences
          </p>
          <Link
            href="/dashboard/member/bookings/new"
            className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors font-medium"
          >
            New Booking
          </Link>
        </div>
        <div className="bg-secondary border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Concierge Support</h3>
          <p className="text-sm text-muted-foreground mb-4">
            24/7 personalized assistance available
          </p>
          <a
            href="mailto:josh@accessVLX.com"
            className="inline-block bg-secondary border border-primary text-primary px-4 py-2 rounded hover:bg-primary/10 transition-colors font-medium"
          >
            Contact Concierge
          </a>
        </div>
      </div>
    </div>
  );
}

export default function MemberDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['MEMBER']}>
      <MemberDashboardContent />
    </ProtectedRoute>
  );
}

