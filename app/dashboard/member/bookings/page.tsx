'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { mockApi, type Booking } from '@/lib/mock-api';
import Link from 'next/link';

const venueTypeColors = {
  restaurant: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  nightclub: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  hotel: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  spa: 'bg-green-500/10 text-green-500 border-green-500/20',
  event: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
};

const statusColors = {
  pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  confirmed: 'bg-green-500/10 text-green-500 border-green-500/20',
  completed: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
};

const venueTypeIcons = {
  restaurant: '🍽️',
  nightclub: '🎉',
  hotel: '🏨',
  spa: '💆',
  event: '🎭',
};

export default function MemberBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  useEffect(() => {
    if (user?.id) {
      loadBookings();
    }
  }, [user]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await mockApi.getBookings(user!.id);
      setBookings(data);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await mockApi.cancelBooking(bookingId);
      await loadBookings();
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      alert('Failed to cancel booking');
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const isUpcoming = (booking: Booking) => {
    return new Date(booking.date) >= new Date() && booking.status !== 'cancelled' && booking.status !== 'completed';
  };

  const isPast = (booking: Booking) => {
    return new Date(booking.date) < new Date() || booking.status === 'completed' || booking.status === 'cancelled';
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'upcoming') return isUpcoming(booking);
    if (filter === 'past') return isPast(booking);
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-muted-foreground">Manage your exclusive venue reservations</p>
        </div>
        <Link
          href="/dashboard/member/bookings/new"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          + New Booking
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            filter === 'all'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          All ({bookings.length})
        </button>
        <button
          onClick={() => setFilter('upcoming')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            filter === 'upcoming'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Upcoming ({bookings.filter(isUpcoming).length})
        </button>
        <button
          onClick={() => setFilter('past')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            filter === 'past'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Past ({bookings.filter(isPast).length})
        </button>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-secondary border border-border rounded-lg p-12 text-center">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold mb-2">No bookings found</h3>
          <p className="text-muted-foreground mb-6">
            {filter === 'all' 
              ? "You haven't made any bookings yet"
              : filter === 'upcoming'
              ? "You don't have any upcoming bookings"
              : "You don't have any past bookings"
            }
          </p>
          <Link
            href="/dashboard/member/bookings/new"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Make Your First Booking
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-secondary border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{venueTypeIcons[booking.venueType]}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{booking.venueName}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${venueTypeColors[booking.venueType]}`}>
                        {booking.venueType.charAt(0).toUpperCase() + booking.venueType.slice(1)}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${statusColors[booking.status]}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Booking ID: {booking.id}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Date</div>
                  <div className="font-medium">{formatDate(booking.date)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Time</div>
                  <div className="font-medium">{formatTime(booking.time)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Guests</div>
                  <div className="font-medium">{booking.guests} {booking.guests === 1 ? 'person' : 'people'}</div>
                </div>
              </div>

              {booking.specialRequests && (
                <div className="mb-4">
                  <div className="text-xs text-muted-foreground mb-1">Special Requests</div>
                  <div className="text-sm bg-background/50 p-3 rounded border border-border">
                    {booking.specialRequests}
                  </div>
                </div>
              )}

              {booking.conciergeNotes && (
                <div className="mb-4">
                  <div className="text-xs text-muted-foreground mb-1">Concierge Notes</div>
                  <div className="text-sm bg-primary/5 p-3 rounded border border-primary/20">
                    ✨ {booking.conciergeNotes}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground">
                  Created {new Date(booking.createdAt).toLocaleDateString()}
                  {booking.confirmedAt && ` • Confirmed ${new Date(booking.confirmedAt).toLocaleDateString()}`}
                </div>
                <div className="flex gap-2">
                  {booking.status === 'pending' && (
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="px-4 py-2 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-sm font-medium"
                    >
                      Cancel Booking
                    </button>
                  )}
                  {booking.status === 'confirmed' && isUpcoming(booking) && (
                    <>
                      <button className="px-4 py-2 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium">
                        Modify
                      </button>
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="px-4 py-2 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-sm font-medium"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <button className="px-4 py-2 rounded bg-secondary border border-border hover:border-primary/50 transition-colors text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

