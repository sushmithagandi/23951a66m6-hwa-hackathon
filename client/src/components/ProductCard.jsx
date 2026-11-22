import { Link, useNavigate } from 'react-router-dom';
import Rating from './Rating';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const navigate = useNavigate();
  const wished = wishlist.includes(product.id);

  const buyNow = () => {
    addToCart(product.id, 1);
    navigate('/checkout?buyNow=' + product.id);
  };

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button
          className={`wish-btn ${wished ? 'active' : ''}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          title={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {wished ? '♥' : '♡'}
        </button>
      </div>
      <div className="product-body">
        <p className="product-category">{product.category.replace('-', ' ')}</p>
        <Link to={`/product/${product.id}`} className="product-name">{product.name}</Link>
        <Rating value={product.rating} reviews={product.reviews} />
        <div className="product-price-row">
          <span className="price">${product.price.toFixed(2)}</span>
          {product.originalPrice && <span className="price-old">${product.originalPrice.toFixed(2)}</span>}
        </div>
        <div className="product-actions">
          <button className="btn btn-primary" onClick={() => addToCart(product.id, 1)}>Add to Cart</button>
          <button className="btn btn-ghost" onClick={buyNow}>Buy Now</button>
        </div>
      </div>
    </article>
  );
}
