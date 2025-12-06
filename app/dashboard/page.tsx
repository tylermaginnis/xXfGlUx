'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDashboard = async () => {
      try {
        let endpoint = '/user/dashboard';
        if (user.role === 'PARTNER') {
          endpoint = '/user/partner/dashboard';
        } else if (user.role === 'ADMIN') {
          endpoint = '/user/admin/dashboard';
        }

        const response = await api.get(endpoint);
        setDashboardData(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [user]);

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>;
  }

  // Redirect based on role
  if (user?.role === 'MEMBER') {
    router.push('/dashboard/member');
    return null;
  } else if (user?.role === 'PARTNER') {
    router.push('/dashboard/partner');
    return null;
  } else if (user?.role === 'ADMIN') {
    router.push('/dashboard/admin');
    return null;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p>Welcome, {user?.email}</p>
    </div>
  );
}






