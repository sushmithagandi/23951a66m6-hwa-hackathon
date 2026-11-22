import { Link, useNavigate } from 'react-router-dom';
import { categories, products } from '../data/products';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { useState } from 'react';

export default function HomePage() {
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  const onSearch = (e) => {
    e.preventDefault();
    const term = q.trim();
    navigate(term ? `/shop?q=${encodeURIComponent(term)}` : '/shop');
  };

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-bg-shapes"><span /><span /><span /></div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Happy Pets, Happy Hearts</p>
            <h1>Everything your pet needs for a <span>joyful life</span>.</h1>
            <p className="hero-text">Discover premium food, playful toys, cozy beds, and grooming essentials curated with love for dogs, cats, and every furry friend.</p>
            <form className="hero-search" onSubmit={onSearch}>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for food, toys, beds..." aria-label="Search products" />
              <button className="btn btn-primary" type="submit">Search</button>
            </form>
            <div className="hero-actions">
              <Link to="/shop" className="btn btn-primary btn-lg">Shop Now</Link>
              <Link to="/category/dog-food" className="btn btn-ghost btn-lg">Explore Dog Food</Link>
            </div>
            <div className="hero-stats">
              <div><strong>12k+</strong><span>Happy Pet Parents</span></div>
              <div><strong>500+</strong><span>Quality Products</span></div>
              <div><strong>4.9★</strong><span>Average Rating</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-main">
              <img src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&q=80" alt="Happy dog and cat together" />
            </div>
            <div className="hero-float-card hero-float-a">
              <img src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=300&q=80" alt="Cute dog" />
              <div><strong>New Arrivals</strong><span>Fresh picks every week</span></div>
            </div>
            <div className="hero-float-card hero-float-b">
              <span className="float-icon">🚚</span>
              <div><strong>Free Delivery</strong><span>On orders over $50</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Shop by Category</p>
              <h2>Find exactly what your pet loves</h2>
            </div>
            <Link to="/shop" className="link-arrow">View all products →</Link>
          </div>
          <div className="category-grid">
            {categories.map((c) => <CategoryCard key={c.slug} category={c} />)}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-head center">
            <div>
              <p className="eyebrow">Featured Favorites</p>
              <h2>Popular picks for pawsome pets</h2>
              <p className="section-sub">Handpicked products loved by pet parents for quality, comfort, and tail-wagging happiness.</p>
            </div>
          </div>
          <div className="product-grid">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container promo-banner">
          <div className="promo-copy">
            <p className="eyebrow">Why PawQuest?</p>
            <h2>Carefully chosen products, delivered with love</h2>
            <div className="perk-grid">
              <div className="perk"><span>🌿</span><div><strong>Quality Ingredients</strong><p>Wholesome food and safe materials for your pet's wellbeing.</p></div></div>
              <div className="perk"><span>💝</span><div><strong>Curated with Care</strong><p>Every item is selected for comfort, fun, and durability.</p></div></div>
              <div className="perk"><span>⚡</span><div><strong>Fast & Easy</strong><p>Smooth shopping, quick checkout, and friendly support.</p></div></div>
              <div className="perk"><span>🐶</span><div><strong>For Every Pet</strong><p>From playful pups to curious cats, we've got them covered.</p></div></div>
            </div>
          </div>
          <div className="promo-image">
            <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1000&q=80" alt="Happy dog with owner" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container newsletter">
          <div>
            <p className="eyebrow">Join the PawQuest Family</p>
            <h2>Get pet care tips & exclusive offers</h2>
            <p>Subscribe for treats, deals, and happy pet inspiration.</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); e.currentTarget.reset(); alert('Thanks for subscribing!'); }}>
            <input type="email" required placeholder="Enter your email" aria-label="Email address" />
            <button className="btn btn-primary" type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
