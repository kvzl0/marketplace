export default function Community() {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section" style={{ background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)' }}>
        <div className="hero-content">
          <h1 className="hero-title">Join Our Community</h1>
          <p className="hero-subtitle">
            Connect with millions of PlusOne users worldwide
          </p>
        </div>
      </div>

      {/* Community Platforms */}
      <div className="products-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="section-header">
            <h2>Where to Find Us</h2>
            <p>Connect with us across multiple platforms</p>
          </div>

          <div className="stats-grid" style={{ marginBottom: '80px' }}>
            {/* Forums */}
            <div className="stat-card" style={{ cursor: 'pointer' }}>
              <div className="stat-icon">💬</div>
              <div className="stat-info">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Forums</h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '15px' }}>
                  Join discussions, share experiences, and get help from fellow PlusOne enthusiasts
                </p>
                <a href="#" className="stat-link">Visit Forums →</a>
              </div>
            </div>

            {/* Discord */}
            <div className="stat-card" style={{ cursor: 'pointer' }}>
              <div className="stat-icon">🎮</div>
              <div className="stat-info">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Discord</h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '15px' }}>
                  Real-time chat with community members and participate in exclusive events
                </p>
                <a href="#" className="stat-link">Join Discord →</a>
              </div>
            </div>

            {/* Reddit */}
            <div className="stat-card" style={{ cursor: 'pointer' }}>
              <div className="stat-icon">🤖</div>
              <div className="stat-info">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Reddit</h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '15px' }}>
                  Share tips, tricks, and stay updated with the latest news and discussions
                </p>
                <a href="#" className="stat-link">Join Subreddit →</a>
              </div>
            </div>

            {/* Social Media */}
            <div className="stat-card" style={{ cursor: 'pointer' }}>
              <div className="stat-icon">📱</div>
              <div className="stat-info">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Social Media</h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '15px' }}>
                  Follow us on Twitter, Instagram, and Facebook for updates
                </p>
                <a href="#" className="stat-link">Follow Us →</a>
              </div>
            </div>

            {/* YouTube */}
            <div className="stat-card" style={{ cursor: 'pointer' }}>
              <div className="stat-icon">📺</div>
              <div className="stat-info">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>YouTube</h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '15px' }}>
                  Watch product reviews, tutorials, and behind-the-scenes content
                </p>
                <a href="#" className="stat-link">Subscribe →</a>
              </div>
            </div>

            {/* Beta Program */}
            <div className="stat-card" style={{ cursor: 'pointer' }}>
              <div className="stat-icon">🔬</div>
              <div className="stat-info">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Beta Program</h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '15px' }}>
                  Get early access to new features and help shape the future
                </p>
                <a href="#" className="stat-link">Join Beta →</a>
              </div>
            </div>
          </div>

          {/* Community Guidelines */}
          <div style={{ background: 'var(--light-gray)', padding: '60px 40px', borderRadius: '8px', marginBottom: '80px' }}>
            <div className="section-header">
              <h2>Community Guidelines</h2>
            </div>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>Be Respectful</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                  Treat everyone with kindness and respect, regardless of their background or opinions
                </p>
              </div>

              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>Help Others</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                  Share your knowledge and assist fellow community members when they need help
                </p>
              </div>

              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>Stay On Topic</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                  Keep discussions relevant and constructive to maintain a quality community experience
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>Share Responsibly</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                  Respect privacy and intellectual property when sharing content
                </p>
              </div>
            </div>
          </div>

          {/* Featured Community Content */}
          <div className="section-header">
            <h2>Community Highlights</h2>
            <p>See what our community is creating</p>
          </div>

          <div className="stats-grid">
            <div style={{ background: 'var(--light-gray)', minHeight: '250px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
              <span style={{ fontSize: '4rem', marginBottom: '20px' }}>📸</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '8px' }}>Photo Contest</h3>
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>Best shots of the month</p>
            </div>

            <div style={{ background: 'var(--light-gray)', minHeight: '250px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
              <span style={{ fontSize: '4rem', marginBottom: '20px' }}>🎨</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '8px' }}>Custom Themes</h3>
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>Created by community</p>
            </div>

            <div style={{ background: 'var(--light-gray)', minHeight: '250px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
              <span style={{ fontSize: '4rem', marginBottom: '20px' }}>💡</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '8px' }}>Tips & Tricks</h3>
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>Expert user guides</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="hero-section" style={{ background: 'var(--accent-red)', height: 'auto', minHeight: '300px' }}>
        <div className="hero-content">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Ready to Join?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: 0.9 }}>
            Become part of a global community that never settles
          </p>
          <button className="hero-button">Get Started</button>
        </div>
      </div>
    </div>
  );
}