import { Header } from '@/components/layout/header';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Information We Collect</h2>
              <p className="mb-4">
                We collect information you provide directly to us, including name, email address, phone number, and
                payment information. We also collect information about your use of our platform, including bookings,
                transactions, and interactions with partners.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. How We Use Your Information</h2>
              <p className="mb-4">
                We use your information to provide and improve our services, process transactions, communicate with you,
                and personalize your experience. We may also use your information for marketing purposes with your consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Information Sharing</h2>
              <p className="mb-4">
                We share your information with partners when you book benefits, as necessary to fulfill your bookings.
                We do not sell your personal information to third parties. We may share information with service providers
                who assist us in operating our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Data Security</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures to protect your personal information.
                However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Your Rights</h2>
              <p className="mb-4">
                You have the right to access, update, or delete your personal information. You may also opt out of
                marketing communications at any time. Contact us at privacy@accessvlx.com to exercise these rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Cookies and Tracking</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to improve your experience and analyze platform usage.
                You can control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Children's Privacy</h2>
              <p className="mb-4">
                Our service is not intended for children under 18. We do not knowingly collect personal information
                from children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. International Transfers</h2>
              <p className="mb-4">
                Your information may be transferred to and processed in countries other than your country of residence.
                We ensure appropriate safeguards are in place for such transfers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Changes to This Policy</h2>
              <p className="mb-4">
                We may update this privacy policy from time to time. We will notify you of any material changes by
                posting the new policy on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Contact Us</h2>
              <p className="mb-4">
                If you have questions about this privacy policy, please contact us at privacy@accessvlx.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}






