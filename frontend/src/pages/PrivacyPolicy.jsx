import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "../config/contact";

function PrivacyPolicy() {
  return (
    <div className="info-page legal-page">
      <section className="page-hero-section">
        <div className="max-w-4xl mx-auto">
          <h1 className="page-title">Privacy Policy</h1>
          <p className="text-xs text-text-secondary">Last updated: June 5, 2026</p>
        </div>
      </section>

      <section className="legal-content pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto space-y-5 text-xs sm:text-sm text-text-secondary leading-relaxed">
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-text-primary mb-1.5">Information We Collect</h2>
            <p>
              At Mukta Arts, we are committed to protecting your privacy. When you register,
              browse our collection, place an order, or contact us, we may collect your name,
              email address, phone number, shipping address, and order-related details necessary
              to fulfill your orders.
            </p>
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-text-primary mb-1.5">How We Use Your Information</h2>
            <p>
              We use your data to process orders, arrange delivery, provide customer support,
              and share updates about new artistic arrivals and special offers if you subscribe
              to our updates.
            </p>
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-text-primary mb-1.5">Data Security</h2>
            <p>
              We implement reasonable security measures to protect your personal
              information. Passwords are encrypted and access to customer data is
              restricted to authorized personnel only.
            </p>
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-text-primary mb-1.5">Sharing of Information</h2>
            <p>
              We do not sell your personal information. We may share data with trusted
              service providers (such as payment processors and courier partners) only
              as needed to fulfill your orders.
            </p>
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-text-primary mb-1.5">Contact Us</h2>
            <p>
              For privacy-related questions, call us at{" "}
              <a href={CONTACT_PHONE_TEL} className="text-primary hover:underline">
                {CONTACT_PHONE_DISPLAY}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
