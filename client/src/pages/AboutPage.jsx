import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div>
            <p className="eyebrow">About PawQuest</p>
            <h1>Made by pet lovers, for pet lovers</h1>
            <p>We believe every pet deserves quality care, comfort, and a little extra joy every day.</p>
          </div>
          <div className="page-hero-art">
            <img src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=80" alt="Dog being petted" />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container about-grid">
          <div className="about-card">
            <span className="about-icon">💚</span>
            <h3>Our Mission</h3>
            <p>To make premium pet care accessible and delightful, with products you can trust and a shopping experience you’ll love.</p>
          </div>
          <div className="about-card">
            <span className="about-icon">✨</span>
            <h3>Quality First</h3>
            <p>We handpick products for safety, nutrition, durability, and comfort so your pets get only the best.</p>
          </div>
          <div className="about-card">
            <span className="about-icon">🤝</span>
            <h3>Community</h3>
            <p>PawQuest is more than a store — it’s a community of pet parents who want happy, healthy companions.</p>
          </div>
        </div>
        <div className="container" style={{ marginTop: 32, textAlign: 'center' }}>
          <Link to="/shop" className="btn btn-primary btn-lg">Explore Our Products</Link>
        </div>
      </section>
    </div>
  );
}
