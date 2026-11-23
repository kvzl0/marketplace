import { useEffect } from 'react';

export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section" style={{ background: 'linear-gradient(135deg, #eb0028 0%, #d10022 100%)' }}>
        <div className="hero-content">
          <h1 className="hero-title">Never Settle</h1>
          <p className="hero-subtitle">
            At PlusOne, we believe in creating premium technology that's accessible to everyone
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="products-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="section-header">
            <h2>Our Story</h2>
            <p>Building the future of mobile technology</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '80px' }}>
            <div>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Founded with a vision to challenge the status quo, PlusOne emerged from a simple belief: 
                that premium technology should be accessible to all, not just a privileged few.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                We started as a small team of passionate innovators who refused to compromise on quality 
                while keeping our products within reach. Today, we continue to push boundaries and redefine 
                what's possible in mobile technology.
              </p>
            </div>
            <div
                style={{
                    background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
                    minHeight: '260px',               // slightly shorter = more premium
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative'
                }}
                >
                {/* subtle dark overlay (very OnePlus) */}
                <div
                    style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'linear-gradient(135deg, rgba(0,0,0,0.15), rgba(0,0,0,0.35))',
                    zIndex: 1
                    }}
                />

                <img
                    src="https://media.assettype.com/deccanherald%2F2025-08-04%2Fms6zf88p%2FOnePlus-Nord-5-cover-photos-final-1.jpg?w=900&auto=format%2Ccompress&fit=max"
                    alt="Smartphone"
                    style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0,
                    filter: 'saturate(0.9) contrast(1.05)' // subtle polish
                    }}
                />
                </div>

          </div>

          {/* Mission & Values */}
          <div className="section-header">
            <h2>Our Mission & Values</h2>
          </div>

          <div className="stats-grid" style={{ marginBottom: '80px' }}>
            <div className="stat-card" style={{ textAlign: 'center' }}>
              <div className="stat-icon">🎯</div>
              <div className="stat-info">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Innovation</h3>
                <p style={{ fontSize: '1rem' }}>Constantly pushing the boundaries of what's possible</p>
              </div>
            </div>

            <div className="stat-card" style={{ textAlign: 'center' }}>
              <div className="stat-icon">💎</div>
              <div className="stat-info">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Quality</h3>
                <p style={{ fontSize: '1rem' }}>Never compromising on build quality and user experience</p>
              </div>
            </div>

            <div className="stat-card" style={{ textAlign: 'center' }}>
              <div className="stat-icon">🤝</div>
              <div className="stat-info">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Community</h3>
                <p style={{ fontSize: '1rem' }}>Building products together with our passionate community</p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div style={{ background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)', padding: '80px 40px', borderRadius: '8px', marginBottom: '80px' }}>
            <div className="stats-grid">
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--accent-red)', marginBottom: '15px', letterSpacing: '-2px' }}>10+</div>
                <div style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '500' }}>Years of Innovation</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--accent-red)', marginBottom: '15px', letterSpacing: '-2px' }}>50M+</div>
                <div style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '500' }}>Happy Users</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--accent-red)', marginBottom: '15px', letterSpacing: '-2px' }}>100+</div>
                <div style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '500' }}>Countries</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--accent-red)', marginBottom: '15px', letterSpacing: '-2px' }}>500+</div>
                <div style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '500' }}>Team Members</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="hero-section" style={{ background: 'var(--secondary-black)', height: 'auto', minHeight: '300px' }}>
        <div className="hero-content">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Join Us on Our Journey</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: 0.9 }}>
            Be part of a community that never settles for less
          </p>
          <a href="/" style={{ textDecoration: 'none' }}>
            <button className="hero-button">Explore Our Products</button>
          </a>
        </div>
      </div>
    </div>
  );
}