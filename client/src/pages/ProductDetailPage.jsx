import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getProductById, products, getCategoryBySlug } from '../data/products';
import Rating from '../components/Rating';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = getProductById(id);
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
    return (
      <div className="page section"><div className="container empty-state">
        <div className="empty-icon">🔍</div>
        <h2>Product not found</h2>
        <p>The product you're looking for may have moved or no longer exists.</p>
        <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
      </div></div>
    );
  }

  const category = getCategoryBySlug(product.category);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wished = wishlist.includes(product.id);

  const onBuyNow = () => {
    addToCart(product.id, qty);
    navigate('/checkout?buyNow=' + product.id);
  };

  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">Home</Link><span>/</span>
            <Link to="/shop">Shop</Link><span>/</span>
            {category && <><Link to={`/category/${category.slug}`}>{category.name}</Link><span>/</span></>}
            <span>{product.name}</span>
          </div>

          <div className="detail-grid">
            <div className="detail-gallery">
              <div className="detail-main-image">
                <img src={product.images[activeImg] || product.image} alt={product.name} />
                {product.badge && <span className="product-badge">{product.badge}</span>}
              </div>
              <div className="detail-thumbs">
                {product.images.map((img, i) => (
                  <button key={i} className={`thumb ${i === activeImg ? 'active' : ''}`} onClick={() => setActiveImg(i)}>
                    <img src={img} alt={`${product.name} ${i + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="detail-info">
              <p className="product-category">{category?.name || product.category}</p>
              <h1>{product.name}</h1>
              <Rating value={product.rating} reviews={product.reviews} />
              <div className="detail-price-row">
                <span className="price price-lg">${product.price.toFixed(2)}</span>
                {product.originalPrice && <span className="price-old">${product.originalPrice.toFixed(2)}</span>}
                {product.originalPrice && <span className="save-tag">Save ${(product.originalPrice - product.price).toFixed(2)}</span>}
              </div>
              <p className="detail-desc">{product.description}</p>

              <div className="detail-features">
                {product.features.map((f) => <span key={f} className="feature-chip">✓ {f}</span>)}
              </div>

              <div className="detail-stock">
                <span className={product.stock > 0 ? 'in-stock' : 'out-stock'}>
                  {product.stock > 0 ? `In stock (${product.stock} available)` : 'Out of stock'}
                </span>
              </div>

              <div className="detail-purchase">
                <div className="qty-control">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
                  <input type="number" min="1" max="99" value={qty} onChange={(e) => setQty(Math.max(1, Math.min(99, Number(e.target.value) || 1)))} aria-label="Quantity" />
                  <button onClick={() => setQty((q) => Math.min(99, q + 1))} aria-label="Increase quantity">+</button>
                </div>
                <button className="btn btn-primary btn-lg" onClick={() => addToCart(product.id, qty)}>Add to Cart</button>
                <button className="btn btn-ghost btn-lg" onClick={onBuyNow}>Buy Now</button>
              </div>

              <button className={`wishlist-link ${wished ? 'active' : ''}`} onClick={() => toggleWishlist(product.id)}>
                {wished ? '♥ Saved to Wishlist' : '♡ Add to Wishlist'}
              </button>

              <div className="detail-assurance">
                <div><strong>🚚 Free Shipping</strong><span>On orders over $50</span></div>
                <div><strong>↩ Easy Returns</strong><span>30-day return policy</span></div>
                <div><strong>🔒 Secure Checkout</strong><span>Safe payment processing</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section-soft">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">You may also like</p>
                <h2>Related products</h2>
              </div>
            </div>
            <div className="product-grid">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
