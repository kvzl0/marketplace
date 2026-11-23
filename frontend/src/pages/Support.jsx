import { useEffect } from 'react';

export default function Support() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section" style={{ background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)' }}>
        <div className="hero-content">
          <h1 className="hero-title">We're Here to Help</h1>
          <p className="hero-subtitle">
            Get the support you need, whenever you need it
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="products-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="section-header">
            <h2>Popular Support Topics</h2>
            <p>Find quick answers to common questions</p>
          </div>

          <div className="stats-grid" style={{ marginBottom: '80px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <div className="stat-card" style={{ cursor: 'pointer' }}>
              <div className="stat-icon">📦</div>
              <div className="stat-info">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Order Status</h3>
                <p style={{ fontSize: '0.9rem' }}>Track your order</p>
              </div>
            </div>

            <div className="stat-card" style={{ cursor: 'pointer' }}>
              <div className="stat-icon">🔧</div>
              <div className="stat-info">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Device Setup</h3>
                <p style={{ fontSize: '0.9rem' }}>Get started guides</p>
              </div>
            </div>

            <div className="stat-card" style={{ cursor: 'pointer' }}>
              <div className="stat-icon">🔄</div>
              <div className="stat-info">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Software Updates</h3>
                <p style={{ fontSize: '0.9rem' }}>Latest features</p>
              </div>
            </div>

            <div className="stat-card" style={{ cursor: 'pointer' }}>
              <div className="stat-icon">🛡️</div>
              <div className="stat-info">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Warranty</h3>
                <p style={{ fontSize: '0.9rem' }}>Coverage details</p>
              </div>
            </div>
          </div>

          {/* Support Options */}
          <div className="section-header">
            <h2>How Can We Assist You?</h2>
            <p>Choose your preferred support channel</p>
          </div>

          <div className="stats-grid" style={{ marginBottom: '80px' }}>
            {/* Live Chat */}
            <div className="stat-card" style={{ textAlign: 'center', border: '2px solid var(--medium-gray)' }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>💬</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Live Chat</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>
                Get instant help from our support team
              </p>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Available 24/7
              </div>
              <button className="hero-button" style={{ width: '100%', padding: '12px 20px' }}>
                Start Chat
              </button>
            </div>

            {/* Phone Support */}
            <div className="stat-card" style={{ textAlign: 'center', border: '2px solid var(--medium-gray)' }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📞</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Phone Support</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>
                Speak directly with our experts
              </p>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Mon-Fri, 9AM-6PM EST
              </div>
              <button className="hero-button" style={{ width: '100%', padding: '12px 20px' }}>
                Call Now
              </button>
            </div>

            {/* Email Support */}
            <div className="stat-card" style={{ textAlign: 'center', border: '2px solid var(--medium-gray)' }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✉️</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Email Support</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>
                Send us your questions anytime
              </p>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Response within 24 hours
              </div>
              <button className="hero-button" style={{ width: '100%', padding: '12px 20px' }}>
                Send Email
              </button>
            </div>
          </div>

          {/* FAQs */}
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
          </div>

          <div style={{ maxWidth: '900px', margin: '0 auto', marginBottom: '80px' }}>
            <div className="stat-card" style={{ marginBottom: '15px', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>
                How do I track my order?
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
                You can track your order using the tracking number sent to your email. Simply enter it in our order tracking page or log into your account to view the status.
              </p>
            </div>

            <div className="stat-card" style={{ marginBottom: '15px', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>
                What's your return policy?
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
                We offer a 15-day return policy from the date of delivery. Items must be in original condition with all accessories and packaging. Contact support to initiate a return.
              </p>
            </div>

            <div className="stat-card" style={{ marginBottom: '15px', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>
                How long is the warranty?
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
                All PlusOne devices come with a 1-year limited warranty covering manufacturing defects. Extended warranty options are available at checkout.
              </p>
            </div>

            <div className="stat-card" style={{ marginBottom: '15px', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>
                How do I update my device?
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
                Go to Settings → System → System Updates. Make sure you're connected to Wi-Fi and have sufficient battery. The update will download and install automatically.
              </p>
            </div>

            <div className="stat-card" style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>
                Where can I find user manuals?
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
                User manuals and quick start guides are available in the support section of our website. You can also find them in the box with your device.
              </p>
            </div>
          </div>

          {/* Service Centers */}
          <div style={{ background: 'var(--light-gray)', padding: '60px 40px', borderRadius: '8px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Service Centers</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '30px', maxWidth: '700px', margin: '0 auto 30px' }}>
              Find authorized PlusOne service centers near you for repairs, replacements, and technical support.
            </p>
            <button className="hero-button">Find Service Center</button>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="hero-section" style={{ background: 'var(--secondary-black)', height: 'auto', minHeight: '300px' }}>
        <div className="hero-content">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Still Need Help?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: 0.9 }}>
            Our support team is ready to assist you
          </p>
          <button className="hero-button" style={{ background: 'var(--accent-red)', color: 'white' }}>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
