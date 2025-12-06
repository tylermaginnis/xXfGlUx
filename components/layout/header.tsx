'use client';

import Link from 'next/link';
import { useAuth } from '../providers/auth-provider';
import { useRouter } from 'next/navigation';

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="border-b border-border bg-secondary">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          AccessVLX
        </Link>

        <nav className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
              {user?.role === 'MEMBER' && (
                <Link href="/dashboard/bookings" className="text-foreground hover:text-primary transition-colors">
                  Bookings
                </Link>
              )}
              {user?.role === 'PARTNER' && (
                <Link href="/dashboard/benefits" className="text-foreground hover:text-primary transition-colors">
                  Benefits
                </Link>
              )}
              {user?.role === 'ADMIN' && (
                <Link href="/dashboard/admin" className="text-foreground hover:text-primary transition-colors">
                  Admin
                </Link>
              )}
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{user?.email}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-foreground hover:text-primary transition-colors"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="text-foreground hover:text-primary transition-colors">
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}






