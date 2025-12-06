'use client';

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { useAuth } from '@/components/providers/auth-provider';
import { Card3D } from '@/components/membership/card-3d';
import api from '@/lib/api';
import Link from 'next/link';

function MemberDashboardContent() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [walletRes, bookingsRes] = await Promise.all([
          api.get('/wallet'),
          api.get('/bookings'),
        ]);
        setWallet(walletRes.data);
        setBookings(bookingsRes.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Member Dashboard</h1>
        <p className="text-muted-foreground">Manage your wallet and bookings</p>
      </div>

      {/* Digital Membership Card */}
      {user?.tier && (
        <div className="bg-secondary border border-border rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Your Membership Card</h2>
          <div className="flex justify-center">
            <Card3D
              tier={user.tier}
              memberName={memberName}
              memberId={memberId}
              interactive={true}
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Click the card to flip it • Hover to see 3D effect
          </p>
        </div>
      )}

      {/* Wallet Section */}
      <div className="bg-secondary border border-border rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Wallet</h2>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-4xl font-bold text-primary">
            {wallet?.balance || 0}
          </span>
          <span className="text-muted-foreground">points</span>
        </div>
        <Link
          href="/dashboard/wallet/topup"
          className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
        >
          Add Points
        </Link>
      </div>

      {/* Recent Bookings */}
      <div className="bg-secondary border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Recent Bookings</h2>
          <Link
            href="/dashboard/bookings"
            className="text-primary hover:underline"
          >
            View All
          </Link>
        </div>

        {bookings.length === 0 ? (
          <p className="text-muted-foreground">No bookings yet</p>
        ) : (
          <div className="space-y-4">
            {bookings.slice(0, 5).map((booking) => (
              <div
                key={booking.id}
                className="border border-border rounded p-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold">{booking.benefit?.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Status: {booking.status}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Browse Benefits */}
      <div className="bg-secondary border border-border rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Browse Benefits</h2>
        <Link
          href="/dashboard/benefits"
          className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
        >
          Explore Benefits
        </Link>
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

