'use client';

import { Header } from '@/components/layout/header';
import { Card3D } from '@/components/membership/card-3d';
import Link from 'next/link';

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center">Membership Comparison</h1>
          <p className="text-xl text-muted-foreground mb-12 text-center">
            Choose the membership tier that's right for you
          </p>

          {/* Digital Card Showcase */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Your Digital Membership Card</h2>
            <p className="text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
              Each membership tier comes with a stunning 3D digital card. Hover to see the interactive effect, 
              or click to flip and view the back.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-center text-primary">Gold Card</h3>
                <Card3D
                  tier="GOLD"
                  memberName="JOHN DOE"
                  memberId="1234 5678 9012"
                  interactive={true}
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-center text-primary">Black Card</h3>
                <Card3D
                  tier="BLACK"
                  memberName="JANE SMITH"
                  memberId="9876 5432 1098"
                  interactive={true}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Gold Tier */}
            <div className="bg-secondary border-2 border-border rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-2 text-primary">Gold</h2>
              <p className="text-4xl font-bold mb-2">$1,199.99</p>
              <p className="text-muted-foreground mb-8">per year</p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <div>
                    <strong>Access to all partner benefits</strong>
                    <p className="text-sm text-muted-foreground">
                      Browse and book from our entire network of luxury partners
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <div>
                    <strong>Digital wallet with points system</strong>
                    <p className="text-sm text-muted-foreground">
                      Manage your points and transactions easily
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <div>
                    <strong>Priority customer support</strong>
                    <p className="text-sm text-muted-foreground">
                      Get help when you need it with dedicated support
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <div>
                    <strong>QR code redemption</strong>
                    <p className="text-sm text-muted-foreground">
                      Easy booking and redemption process
                    </p>
                  </div>
                </li>
              </ul>

              <Link
                href="/signup?tier=GOLD"
                className="block w-full bg-primary text-primary-foreground text-center py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Choose Gold
              </Link>
            </div>

            {/* Black Tier */}
            <div className="bg-secondary border-2 border-primary rounded-lg p-8 relative">
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-semibold">
                PREMIUM
              </div>
              <h2 className="text-3xl font-bold mb-2 text-primary">Black</h2>
              <p className="text-4xl font-bold mb-2">$2,399.99</p>
              <p className="text-muted-foreground mb-8">per year</p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <div>
                    <strong>Everything in Gold, plus:</strong>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <div>
                    <strong>Exclusive Black-tier benefits</strong>
                    <p className="text-sm text-muted-foreground">
                      Access to premium experiences reserved for Black members
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <div>
                    <strong>VIP concierge service</strong>
                    <p className="text-sm text-muted-foreground">
                      Personal concierge to assist with bookings and requests
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <div>
                    <strong>Priority booking access</strong>
                    <p className="text-sm text-muted-foreground">
                      First access to new benefits and limited availability experiences
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <div>
                    <strong>Enhanced point allocation</strong>
                    <p className="text-sm text-muted-foreground">
                      More points and better value on bookings
                    </p>
                  </div>
                </li>
              </ul>

              <Link
                href="/signup?tier=BLACK"
                className="block w-full bg-primary text-primary-foreground text-center py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Choose Black
              </Link>
            </div>
          </div>

          <div className="bg-secondary border border-border rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Can I upgrade my membership later?</h3>
                <p className="text-muted-foreground">
                  Yes, you can upgrade from Gold to Black at any time. Contact our support team for assistance.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How do I add more points to my wallet?</h3>
                <p className="text-muted-foreground">
                  You can add points through your dashboard using our secure payment system. Points are added instantly.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What happens if I don't use all my points?</h3>
                <p className="text-muted-foreground">
                  Points never expire and can be carried over to the next membership year.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

