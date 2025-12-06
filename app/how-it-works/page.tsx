import { Header } from '@/components/layout/header';
import Link from 'next/link';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">How It Works</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Discover how AccessVLX brings exclusive luxury experiences to your fingertips.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">1. Join AccessVLX</h2>
              <p className="text-muted-foreground mb-4">
                Choose your membership tier - Gold or Black - and gain access to our exclusive network of premium partners.
              </p>
              <p className="text-muted-foreground">
                Your membership includes a digital wallet with points that you can use to book benefits and experiences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">2. Browse Benefits</h2>
              <p className="text-muted-foreground mb-4">
                Explore our curated selection of exclusive benefits from luxury partners. Filter by category, city, or points required.
              </p>
              <p className="text-muted-foreground">
                Each benefit is carefully selected to provide exceptional value and unique experiences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">3. Book & Redeem</h2>
              <p className="text-muted-foreground mb-4">
                When you find a benefit you love, book it using your points. You'll receive a QR code for easy redemption.
              </p>
              <p className="text-muted-foreground">
                Present your QR code at the partner location to enjoy your exclusive benefit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">4. Manage Your Membership</h2>
              <p className="text-muted-foreground mb-4">
                Track your bookings, manage your wallet, and add more points whenever you need them.
              </p>
              <p className="text-muted-foreground">
                Our platform makes it easy to stay on top of your membership and maximize your benefits.
              </p>
            </section>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/signup"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}






