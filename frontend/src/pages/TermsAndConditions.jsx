import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "../config/contact";

function TermsAndConditions() {
  return (
    <div className="info-page legal-page">
      <section className="page-hero-section">
        <div className="max-w-4xl mx-auto">
          <h1 className="page-title">Terms & Conditions</h1>
          <p className="text-xs text-text-secondary">Last updated: June 5, 2026</p>
        </div>
      </section>

      <section className="legal-content pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto space-y-5 text-xs sm:text-sm text-text-secondary leading-relaxed">
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-text-primary mb-1.5">General</h2>
            <p>
              By using Mukta Arts, you agree to these terms. Our platform
              showcases and delivers premium handcrafted clay and ceramic artworks,
              cookware, home decor, and artistic creations.
            </p>
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-text-primary mb-1.5">Orders & Availability</h2>
            <p>
              Each product is crafted with artisanal care. All orders
              are subject to stock availability and confirmation by our team.
              Prices quoted are valid at the time of purchase or as confirmed in your quote.
            </p>
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-text-primary mb-1.5">Payment & Invoicing</h2>
            <p>
              Payment terms are confirmed at the time of order placement.
              GST-compliant invoices are provided for all eligible purchases.
            </p>
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-text-primary mb-1.5">Delivery</h2>
            <p>
              We ship pan-India through trusted courier and logistics partners. Delivery timelines
              vary by location and order size. Risk of loss passes to the buyer upon
              delivery to the specified address.
            </p>
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-text-primary mb-1.5">Quality & Returns</h2>
            <p>
              Our ceramic and clay creations undergo thorough quality checks. Return
              and replacement requests for items damaged during transit must be reported
              within 48 hours of delivery with photos and order details.
            </p>
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-text-primary mb-1.5">Contact</h2>
            <p>
              Questions about these terms? Call us at{" "}
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

export default TermsAndConditions;
