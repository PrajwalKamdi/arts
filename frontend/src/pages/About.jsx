function About() {
  return (
    <div className="info-page legal-page">
      <section className="page-hero-section">
        <div className="max-w-7xl mx-auto">
          <h1 className="page-title">About Mukta Arts</h1>
          <p className="text-text-secondary text-lg max-w-3xl leading-relaxed">
            Mukta Arts is dedicated to the timeless beauty of handcrafted clay and ceramic creations.
            We bring you authentic, artisan-made cookware, elegant home decor, and unique artistic
            pieces that enrich your everyday living and culinary experiences.
          </p>
        </div>
      </section>

      <section className="legal-content pb-10 sm:pb-12 border-b border-border-light">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="rounded-2xl border border-border-light bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-text-primary mb-3">Our Mission</h2>
            <p className="text-text-secondary leading-relaxed">
              Preserve traditional pottery artistry and bring premium handcrafted clay and ceramic
              artworks directly to modern homes and businesses across India — with authentic craftsmanship,
              safe packaging, and honest customer service.
            </p>
          </div>
          <div className="rounded-2xl border border-border-light bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-text-primary mb-3">Who We Serve</h2>
            <ul className="text-text-secondary space-y-2">
              <li>· Art lovers, collectors & home decor enthusiasts</li>
              <li>· Restaurants, cafes & traditional cookware kitchens</li>
              <li>· Corporate gifting & festive bulk orders</li>
              <li>· Retailers, boutiques & online partners</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="store-page-x pb-16 pt-6 sm:pt-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-text-primary mb-6">What We Offer</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-text-secondary">
            {[
              "Handcrafted clay & ceramic cookware",
              "Artistic home decor & pottery showpieces",
              "Custom & bulk order fulfillment",
              "Safe protective packaging for transit",
              "Pan-India courier & express delivery",
              "Direct support & personalized service",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 rounded-lg border border-border-light bg-neutral-50 px-4 py-3"
              >
                <span className="text-primary">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default About;
