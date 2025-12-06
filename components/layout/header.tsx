'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../providers/auth-provider';

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="border-b border-border bg-secondary sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary" onClick={closeMobileMenu}>
            AccessVLX
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
                {user?.role === 'MEMBER' && (
                  <Link href="/dashboard/member/bookings" className="text-foreground hover:text-primary transition-colors">
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
                <Link href="/membership" className="text-foreground hover:text-primary transition-colors">
                  Membership
                </Link>
                <Link href="/how-it-works" className="text-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
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

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              // X icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-4">
              {isAuthenticated ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="text-foreground hover:text-primary transition-colors py-2"
                    onClick={closeMobileMenu}
                  >
                    Dashboard
                  </Link>
                  {user?.role === 'MEMBER' && (
                    <Link 
                      href="/dashboard/member/bookings" 
                      className="text-foreground hover:text-primary transition-colors py-2"
                      onClick={closeMobileMenu}
                    >
                      Bookings
                    </Link>
                  )}
                  {user?.role === 'PARTNER' && (
                    <Link 
                      href="/dashboard/benefits" 
                      className="text-foreground hover:text-primary transition-colors py-2"
                      onClick={closeMobileMenu}
                    >
                      Benefits
                    </Link>
                  )}
                  {user?.role === 'ADMIN' && (
                    <Link 
                      href="/dashboard/admin" 
                      className="text-foreground hover:text-primary transition-colors py-2"
                      onClick={closeMobileMenu}
                    >
                      Admin
                    </Link>
                  )}
                  <div className="border-t border-border pt-4 mt-2">
                    <div className="text-sm text-muted-foreground mb-3">{user?.email}</div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-foreground hover:text-primary transition-colors py-2"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    href="/membership" 
                    className="text-foreground hover:text-primary transition-colors py-2"
                    onClick={closeMobileMenu}
                  >
                    Membership
                  </Link>
                  <Link 
                    href="/how-it-works" 
                    className="text-foreground hover:text-primary transition-colors py-2"
                    onClick={closeMobileMenu}
                  >
                    How It Works
                  </Link>
                  <Link 
                    href="/login" 
                    className="text-foreground hover:text-primary transition-colors py-2"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-primary text-primary-foreground px-4 py-3 rounded hover:bg-primary/90 transition-colors text-center"
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}






