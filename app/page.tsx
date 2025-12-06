'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Card3D } from '@/components/membership/card-3d';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Welcome to <span className="text-primary">AccessVLX</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Premium luxury membership platform for high-net-worth individuals.
          Exclusive benefits, personalized experiences, and unparalleled access.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/signup"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/how-it-works"
            className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Digital Card Showcase */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Your Digital Membership Card</h2>
        <p className="text-sm md:text-base text-muted-foreground mb-12 text-center max-w-2xl mx-auto px-4">
          Each membership tier comes with a stunning 3D digital card. Hover to see the interactive effect, 
          or click to flip and view the back.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-4xl mx-auto mb-20">
          <div className="space-y-4 px-4">
            <h3 className="text-xl md:text-2xl font-semibold text-center text-primary">Gold Card</h3>
            <div className="flex justify-center">
              <Card3D
                tier="GOLD"
                memberName="JOHN DOE"
                memberId="1234 5678 9012"
                interactive={true}
              />
            </div>
          </div>
          <div className="space-y-4 px-4">
            <h3 className="text-xl md:text-2xl font-semibold text-center text-primary">Black Card</h3>
            <div className="flex justify-center">
              <Card3D
                tier="BLACK"
                memberName="JANE SMITH"
                memberId="9876 5432 1098"
                interactive={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Exclusive Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-secondary border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-primary">Premium Access</h3>
            <p className="text-muted-foreground">
              Access to exclusive partner benefits and experiences curated for our members.
            </p>
          </div>
          <div className="bg-secondary border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-primary">Digital Wallet</h3>
            <p className="text-muted-foreground">
              Manage your points, bookings, and redemptions all in one place with our secure wallet.
            </p>
          </div>
          <div className="bg-secondary border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-primary">Personalized Service</h3>
            <p className="text-muted-foreground">
              Dedicated support and personalized recommendations tailored to your preferences.
            </p>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Membership Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-secondary border-2 border-primary rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-2 text-primary">Gold</h3>
            <p className="text-4xl font-bold mb-4">$1,199.99</p>
            <p className="text-muted-foreground mb-6">per year</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>Access to all partner benefits</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>Digital wallet with points system</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>Priority customer support</span>
              </li>
            </ul>
            <Link
              href="/signup?tier=GOLD"
              className="block w-full bg-primary text-primary-foreground text-center py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Choose Gold
            </Link>
          </div>

          <div className="bg-secondary border-2 border-primary rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-2 text-primary">Black</h3>
            <p className="text-4xl font-bold mb-4">$2,399.99</p>
            <p className="text-muted-foreground mb-6">per year</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>Everything in Gold, plus:</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>Exclusive Black-tier benefits</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>VIP concierge service</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>Priority booking access</span>
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
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">AccessVLX</h4>
              <p className="text-sm text-muted-foreground">
                Premium luxury membership platform
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/how-it-works" className="text-muted-foreground hover:text-primary">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/membership" className="text-muted-foreground hover:text-primary">
                    Membership
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-primary">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <p className="text-sm text-muted-foreground">
                Follow us on social media
              </p>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} AccessVLX. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
