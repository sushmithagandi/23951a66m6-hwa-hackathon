import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { getProductById } from '../data/products';
import Rating from '../components/Rating';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useShop();
  const items = wishlist.map(getProductById).filter(Boolean);

  return (
    <div className="page">
      <section className="page-hero compact">
        <div className="container page-hero-inner">
          <div>
            <p className="eyebrow">Saved for Later</p>
            <h1>Your Wishlist</h1>
            <p>Keep track of the products your pet will love.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {items.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">♡</div>
              <h2>Your wishlist is empty</h2>
              <p>Save your favorite pet products here for easy access later.</p>
              <Link to="/shop" className="btn btn-primary">Discover Products</Link>
            </div>
          ) : (
            <div className="wishlist-grid">
              {items.map((product) => (
                <div key={product.id} className="wishlist-item">
                  <Link to={`/product/${product.id}`} className="wishlist-img">
                    <img src={product.image} alt={product.name} />
                  </Link>
                  <div className="wishlist-info">
                    <p className="product-category">{product.category.replace('-', ' ')}</p>
                    <Link to={`/product/${product.id}`} className="product-name">{product.name}</Link>
                    <Rating value={product.rating} reviews={product.reviews} />
                    <div className="product-price-row">
                      <span className="price">${product.price.toFixed(2)}</span>
                      {product.originalPrice && <span className="price-old">${product.originalPrice.toFixed(2)}</span>}
                    </div>
                    <div className="wishlist-actions">
                      <button className="btn btn-primary btn-sm" onClick={() => addToCart(product.id, 1)}>Add to Cart</button>
                      <button className="btn btn-ghost btn-sm" onClick={() => toggleWishlist(product.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
