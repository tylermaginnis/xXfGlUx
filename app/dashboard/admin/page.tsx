'use client';

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/auth/protected-route';
import api from '@/lib/api';

function AdminDashboardContent() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/user/admin/dashboard');
        setStats(response.data);
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">System overview and management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-secondary border border-border rounded-lg p-6">
          <h3 className="text-sm text-muted-foreground mb-2">Total Members</h3>
          <p className="text-3xl font-bold text-primary">
            {stats?.stats?.totalMembers || 0}
          </p>
        </div>
        <div className="bg-secondary border border-border rounded-lg p-6">
          <h3 className="text-sm text-muted-foreground mb-2">Total Partners</h3>
          <p className="text-3xl font-bold text-primary">
            {stats?.stats?.totalPartners || 0}
          </p>
        </div>
        <div className="bg-secondary border border-border rounded-lg p-6">
          <h3 className="text-sm text-muted-foreground mb-2">Total Bookings</h3>
          <p className="text-3xl font-bold text-primary">
            {stats?.stats?.totalBookings || 0}
          </p>
        </div>
      </div>

      {/* Management Links */}
      <div className="bg-secondary border border-border rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/dashboard/admin/members"
            className="border border-border rounded p-4 hover:border-primary transition-colors"
          >
            <h3 className="font-semibold mb-2">Member Management</h3>
            <p className="text-sm text-muted-foreground">
              Manage members, credits, and memberships
            </p>
          </a>
          <a
            href="/dashboard/admin/partners"
            className="border border-border rounded p-4 hover:border-primary transition-colors"
          >
            <h3 className="font-semibold mb-2">Partner Management</h3>
            <p className="text-sm text-muted-foreground">
              Manage partners and benefits
            </p>
          </a>
          <a
            href="/dashboard/admin/bookings"
            className="border border-border rounded p-4 hover:border-primary transition-colors"
          >
            <h3 className="font-semibold mb-2">Booking Oversight</h3>
            <p className="text-sm text-muted-foreground">
              View and manage all bookings
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}






