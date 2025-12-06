'use client';

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/auth/protected-route';
import api from '@/lib/api';
import Link from 'next/link';

function PartnerDashboardContent() {
  const [partner, setPartner] = useState<any>(null);
  const [benefits, setBenefits] = useState<any[]>([]);
  const [redemptions, setRedemptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [partnerRes, benefitsRes, redemptionsRes] = await Promise.all([
          api.get('/partner/profile'),
          api.get('/partner/benefits'),
          api.get('/partner/redemptions'),
        ]);
        setPartner(partnerRes.data);
        setBenefits(benefitsRes.data);
        setRedemptions(redemptionsRes.data);
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
        <h1 className="text-3xl font-bold mb-2">Partner Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, {partner?.name || 'Partner'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-secondary border border-border rounded-lg p-6">
          <h3 className="text-sm text-muted-foreground mb-2">Total Benefits</h3>
          <p className="text-3xl font-bold text-primary">{benefits.length}</p>
        </div>
        <div className="bg-secondary border border-border rounded-lg p-6">
          <h3 className="text-sm text-muted-foreground mb-2">Active Benefits</h3>
          <p className="text-3xl font-bold text-primary">
            {benefits.filter((b) => b.isActive).length}
          </p>
        </div>
        <div className="bg-secondary border border-border rounded-lg p-6">
          <h3 className="text-sm text-muted-foreground mb-2">Total Redemptions</h3>
          <p className="text-3xl font-bold text-primary">{redemptions.length}</p>
        </div>
      </div>

      {/* Benefits Management */}
      <div className="bg-secondary border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Benefits</h2>
          <Link
            href="/dashboard/benefits/new"
            className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
          >
            Create Benefit
          </Link>
        </div>

        {benefits.length === 0 ? (
          <p className="text-muted-foreground">No benefits yet</p>
        ) : (
          <div className="space-y-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                className="border border-border rounded p-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.pointsRequired} points • {benefit.category || 'Uncategorized'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      benefit.isActive
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-gray-500/20 text-gray-500'
                    }`}
                  >
                    {benefit.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <Link
                    href={`/dashboard/benefits/${benefit.id}`}
                    className="text-primary hover:underline text-sm"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Redemptions */}
      <div className="bg-secondary border border-border rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Redemptions</h2>
        {redemptions.length === 0 ? (
          <p className="text-muted-foreground">No redemptions yet</p>
        ) : (
          <div className="space-y-4">
            {redemptions.slice(0, 5).map((redemption) => (
              <div
                key={redemption.id}
                className="border border-border rounded p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{redemption.benefit?.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {redemption.member?.email}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {redemption.redeemedAt
                        ? new Date(redemption.redeemedAt).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PartnerDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['PARTNER']}>
      <PartnerDashboardContent />
    </ProtectedRoute>
  );
}






