import { useMemo, useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { products, categories, getCategoryBySlug } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ShopPage() {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const qParam = searchParams.get('q') || '';
  const [query, setQuery] = useState(qParam);
  const [sort, setSort] = useState('featured');
  const [activeCat, setActiveCat] = useState(categorySlug || 'all');

  useEffect(() => { setQuery(qParam); }, [qParam]);
  useEffect(() => { setActiveCat(categorySlug || 'all'); }, [categorySlug]);

  const category = categorySlug ? getCategoryBySlug(categorySlug) : null;

  const filtered = useMemo(() => {
    let list = [...products];
    const cat = categorySlug || (activeCat !== 'all' ? activeCat : null);
    if (cat) list = list.filter((p) => p.category === cat);
    const term = query.trim().toLowerCase();
    if (term) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
    }
    switch (sort) {
      case 'price-low': list.sort((a, b) => a.price - b.price); break;
      case 'price-high': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'newest': list.sort((a, b) => (b.badge === 'New Arrival' ? 1 : 0) - (a.badge === 'New Arrival' ? 1 : 0)); break;
      default: list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return list;
  }, [query, sort, categorySlug, activeCat]);

  const onSearch = (e) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (query.trim()) next.set('q', query.trim()); else next.delete('q');
    setSearchParams(next);
  };

  const selectCat = (slug) => {
    setActiveCat(slug);
    if (slug === 'all') {
      const next = new URLSearchParams(searchParams);
      setSearchParams(next);
      window.history.pushState({}, '', `/shop${next.toString() ? `?${next}` : ''}`);
    } else {
      const q = searchParams.get('q');
      window.history.pushState({}, '', `/category/${slug}${q ? `?q=${encodeURIComponent(q)}` : ''}`);
    }
    // Force re-render by navigating via location change is messy; instead rely on links below.
  };

  return (
    <div className="page">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div>
            <p className="eyebrow">PawQuest Shop</p>
            <h1>{category ? category.name : 'All Pet Products'}</h1>
            <p>{category ? category.description : 'Explore our complete collection of food, toys, grooming, and comfort essentials for your pets.'}</p>
          </div>
          <div className="page-hero-art">
            <img src={category?.image || 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=900&q=80'} alt={category?.name || 'Pet products'} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container shop-layout">
          <aside className="shop-sidebar">
            <div className="filter-block">
              <h3>Search</h3>
              <form onSubmit={onSearch} className="sidebar-search">
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." />
                <button className="btn btn-primary btn-sm" type="submit">Go</button>
              </form>
            </div>
            <div className="filter-block">
              <h3>Categories</h3>
              <div className="filter-list">
                <Link to={`/shop${qParam ? `?q=${encodeURIComponent(qParam)}` : ''}`} className={`filter-link ${!categorySlug ? 'active' : ''}`}>All Products</Link>
                {categories.map((c) => (
                  <Link key={c.slug} to={`/category/${c.slug}${qParam ? `?q=${encodeURIComponent(qParam)}` : ''}`} className={`filter-link ${categorySlug === c.slug ? 'active' : ''}`}>
                    <span>{c.icon}</span> {c.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="filter-block filter-note">
              <h3>Free Shipping</h3>
              <p>Enjoy free delivery on orders over $50. Treat your pet today!</p>
            </div>
          </aside>

          <div className="shop-main">
            <div className="shop-toolbar">
              <p><strong>{filtered.length}</strong> products found</p>
              <div className="toolbar-controls">
                <label className="sort-label">
                  Sort by
                  <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </label>
              </div>
            </div>

            {filtered.length ? (
              <div className="product-grid">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">🐾</div>
                <h3>No products found</h3>
                <p>Try a different search term or browse another category.</p>
                <Link to="/shop" className="btn btn-primary">Browse all products</Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
