import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function CartPage() {
  const { cartDetailed, updateQuantity, removeFromCart, cartTotal, clearCart } = useShop();
  const navigate = useNavigate();
  const shipping = cartTotal > 50 || cartTotal === 0 ? 0 : 5.99;
  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + shipping + tax;

  return (
    <div className="page">
      <section className="page-hero compact">
        <div className="container page-hero-inner">
          <div>
            <p className="eyebrow">Your Cart</p>
            <h1>Shopping Cart</h1>
            <p>Review your items and get ready to spoil your pet.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {cartDetailed.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added any pet goodies yet.</p>
              <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items">
                {cartDetailed.map((item) => (
                  <div key={item.productId} className="cart-item">
                    <Link to={`/product/${item.product.id}`} className="cart-item-img">
                      <img src={item.product.image} alt={item.product.name} />
                    </Link>
                    <div className="cart-item-info">
                      <Link to={`/product/${item.product.id}`} className="cart-item-name">{item.product.name}</Link>
                      <p className="cart-item-cat">{item.product.category.replace('-', ' ')}</p>
                      <p className="cart-item-price">${item.product.price.toFixed(2)}</p>
                      <button className="text-btn danger" onClick={() => removeFromCart(item.productId)}>Remove</button>
                    </div>
                    <div className="cart-item-controls">
                      <div className="qty-control">
                        <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} aria-label="Decrease">−</button>
                        <input type="number" min="1" max="99" value={item.quantity} onChange={(e) => updateQuantity(item.productId, e.target.value)} aria-label="Quantity" />
                        <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} aria-label="Increase">+</button>
                      </div>
                      <div className="cart-line-total">${item.lineTotal.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
                <div className="cart-actions-row">
                  <Link to="/shop" className="btn btn-ghost">Continue Shopping</Link>
                  <button className="text-btn danger" onClick={clearCart}>Clear Cart</button>
                </div>
              </div>

              <div className="cart-summary">
                <h3>Order Summary</h3>
                <div className="summary-row"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
                <div className="summary-row"><span>Estimated Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                <div className="summary-divider" />
                <div className="summary-row total"><span>Total</span><span>${grandTotal.toFixed(2)}</span></div>
                {shipping > 0 && <p className="summary-note">Add ${(50 - cartTotal).toFixed(2)} more for free shipping!</p>}
                {shipping === 0 && cartTotal > 0 && <p className="summary-note success">You've unlocked free shipping!</p>}
                <button className="btn btn-primary btn-block btn-lg" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
                <div className="summary-trust">
                  <span>🔒 Secure checkout</span>
                  <span>↩ 30-day returns</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
