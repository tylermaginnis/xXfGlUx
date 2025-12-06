import { Header } from '@/components/layout/header';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Membership Agreement</h2>
              <p className="mb-4">
                By signing up for AccessVLX, you agree to these terms and conditions. Your membership is subject to
                acceptance and payment of the annual membership fee.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Membership Tiers</h2>
              <p className="mb-4">
                AccessVLX offers two membership tiers: Gold ($1,199.99/year) and Black ($2,399.99/year). Each tier
                includes different benefits and access levels as described on our membership page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Points and Wallet</h2>
              <p className="mb-4">
                Points in your digital wallet can be used to book benefits. Points do not expire and can be carried
                over to subsequent membership years. Points are non-transferable and non-refundable except as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Bookings and Cancellations</h2>
              <p className="mb-4">
                Bookings are subject to availability. Cancellation policies vary by partner and benefit. Points will be
                refunded to your wallet if a booking is cancelled in accordance with the applicable cancellation policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Partner Benefits</h2>
              <p className="mb-4">
                Benefits are provided by third-party partners. AccessVLX is not responsible for the quality, availability,
                or delivery of partner benefits. All disputes regarding partner benefits should be directed to the partner.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Refund Policy</h2>
              <p className="mb-4">
                Membership fees are non-refundable except as required by law. If you are not satisfied with your membership,
                please contact our support team to discuss your options.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Account Security</h2>
              <p className="mb-4">
                You are responsible for maintaining the security of your account. Notify us immediately if you suspect
                unauthorized access to your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Limitation of Liability</h2>
              <p className="mb-4">
                AccessVLX's liability is limited to the amount paid for your membership. We are not liable for any indirect,
                incidental, or consequential damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. Continued use of the service after changes
                constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Contact</h2>
              <p className="mb-4">
                For questions about these terms, please contact us at legal@accessvlx.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}






