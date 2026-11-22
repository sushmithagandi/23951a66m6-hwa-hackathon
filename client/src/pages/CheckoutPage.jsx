import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { getProductById } from '../data/products';

const initialForm = {
  fullName: '', email: '', phone: '', address: '', city: '', state: '', zip: '',
  cardName: '', cardNumber: '', expiry: '', cvv: ''
};

export default function CheckoutPage() {
  const { cartDetailed, cartTotal, clearCart, notify } = useShop();
  const { user, token } = useAuth();
  const [searchParams] = useSearchParams();
  const buyNowId = searchParams.get('buyNow');
  const [form, setForm] = useState({ ...initialForm, fullName: user?.name || '', email: user?.email || '' });
  const [payment, setPayment] = useState('card');
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const buyNowProduct = buyNowId ? getProductById(buyNowId) : null;
  const items = buyNowProduct && cartDetailed.length === 0
    ? [{ productId: buyNowProduct.id, product: buyNowProduct, quantity: 1, lineTotal: buyNowProduct.price }]
    : cartDetailed;

  const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {};
    ['fullName', 'email', 'phone', 'address', 'city', 'state', 'zip'].forEach((k) => { if (!form[k].trim()) e[k] = 'Required'; });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (payment === 'card') {
      ['cardName', 'cardNumber', 'expiry', 'cvv'].forEach((k) => { if (!form[k].trim()) e[k] = 'Required'; });
      if (form.cardNumber && form.cardNumber.replace(/\s/g, '').length < 12) e.cardNumber = 'Enter a valid card number';
      if (form.cvv && form.cvv.length < 3) e.cvv = 'Invalid CVV';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!items.length) return;
    if (!validate()) { notify('Please fill in required fields', 'error'); return; }
    setSubmitting(true);
    const orderPayload = {
      items: items.map((i) => ({ productId: i.productId, name: i.product.name, price: i.product.price, quantity: i.quantity, image: i.product.image })),
      subtotal, shipping, tax, total,
      customer: { fullName: form.fullName, email: form.email, phone: form.phone, address: form.address, city: form.city, state: form.state, zip: form.zip },
      paymentMethod: payment === 'card' ? 'Credit/Debit Card' : payment === 'paypal' ? 'PayPal' : 'Cash on Delivery',
    };
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { 'x-user-id': token } : {}) },
        body: JSON.stringify({ order: orderPayload })
      });
      const data = await res.json().catch(() => ({}));
      const confirmed = res.ok ? data.order : { ...orderPayload, id: `local-${Date.now()}`, createdAt: new Date().toISOString(), status: 'confirmed' };
      setOrder(confirmed);
      clearCart();
      notify('Order placed successfully!');
    } catch {
      setOrder({ ...orderPayload, id: `local-${Date.now()}`, createdAt: new Date().toISOString(), status: 'confirmed' });
      clearCart();
      notify('Order placed successfully!');
    } finally {
      setSubmitting(false);
    }
  };

  if (order) {
    return (
      <div className="page section">
        <div className="container">
          <div className="order-confirmation">
            <div className="confirm-icon">🎉</div>
            <p className="eyebrow">Order Confirmed</p>
            <h1>Thank you for your order!</h1>
            <p className="confirm-sub">Your pet goodies are being prepared with care. A confirmation has been sent to <strong>{order.customer.email}</strong>.</p>
            <div className="confirm-card">
              <div className="confirm-row"><span>Order ID</span><strong>#{String(order.id).slice(-8).toUpperCase()}</strong></div>
              <div className="confirm-row"><span>Payment</span><strong>{order.paymentMethod}</strong></div>
              <div className="confirm-row"><span>Total</span><strong>${order.total.toFixed(2)}</strong></div>
              <div className="confirm-row"><span>Status</span><strong className="status-confirmed">Confirmed</strong></div>
            </div>
            <div className="confirm-items">
              {order.items.map((i) => (
                <div key={i.productId} className="confirm-item">
                  <img src={i.image} alt={i.name} />
                  <div><strong>{i.name}</strong><span>Qty: {i.quantity}</span></div>
                  <span>${(i.price * i.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="confirm-actions">
              <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
              <Link to="/" className="btn btn-ghost">Go Home</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <section className="page-hero compact">
        <div className="container page-hero-inner">
          <div>
            <p className="eyebrow">Secure Checkout</p>
            <h1>Checkout</h1>
            <p>Complete your order and get ready for happy tail wags.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {items.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🧾</div>
              <h2>No items to checkout</h2>
              <p>Add some products to your cart before checking out.</p>
              <Link to="/shop" className="btn btn-primary">Shop Now</Link>
            </div>
          ) : (
            <form className="checkout-layout" onSubmit={placeOrder} noValidate>
              <div className="checkout-form">
                <div className="form-card">
                  <h3>Contact & Shipping</h3>
                  <div className="form-grid">
                    <Field label="Full Name" name="fullName" value={form.fullName} onChange={onChange} error={errors.fullName} />
                    <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} error={errors.email} />
                    <Field label="Phone" name="phone" value={form.phone} onChange={onChange} error={errors.phone} />
                    <Field label="Address" name="address" value={form.address} onChange={onChange} error={errors.address} className="full" />
                    <Field label="City" name="city" value={form.city} onChange={onChange} error={errors.city} />
                    <Field label="State" name="state" value={form.state} onChange={onChange} error={errors.state} />
                    <Field label="ZIP Code" name="zip" value={form.zip} onChange={onChange} error={errors.zip} />
                  </div>
                </div>

                <div className="form-card">
                  <h3>Payment Method</h3>
                  <div className="payment-options">
                    {[
                      { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
                      { id: 'paypal', label: 'PayPal', icon: '🅿️' },
                      { id: 'cod', label: 'Cash on Delivery', icon: '💵' }
                    ].map((opt) => (
                      <label key={opt.id} className={`payment-option ${payment === opt.id ? 'active' : ''}`}>
                        <input type="radio" name="payment" value={opt.id} checked={payment === opt.id} onChange={() => setPayment(opt.id)} />
                        <span className="payment-icon">{opt.icon}</span>
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>

                  {payment === 'card' && (
                    <div className="form-grid" style={{ marginTop: 16 }}>
                      <Field label="Name on Card" name="cardName" value={form.cardName} onChange={onChange} error={errors.cardName} className="full" />
                      <Field label="Card Number" name="cardNumber" value={form.cardNumber} onChange={onChange} error={errors.cardNumber} placeholder="1234 5678 9012 3456" className="full" />
                      <Field label="Expiry (MM/YY)" name="expiry" value={form.expiry} onChange={onChange} error={errors.expiry} placeholder="MM/YY" />
                      <Field label="CVV" name="cvv" value={form.cvv} onChange={onChange} error={errors.cvv} placeholder="123" />
                    </div>
                  )}
                  {payment === 'paypal' && <p className="payment-note">You'll be redirected to PayPal to complete your purchase securely. (Sample option for demo)</p>}
                  {payment === 'cod' && <p className="payment-note">Pay with cash when your order arrives at your door. (Sample option for demo)</p>}
                </div>
              </div>

              <div className="checkout-summary">
                <h3>Order Summary</h3>
                <div className="summary-items">
                  {items.map((i) => (
                    <div key={i.productId} className="summary-item">
                      <img src={i.product.image} alt={i.product.name} />
                      <div className="summary-item-info">
                        <strong>{i.product.name}</strong>
                        <span>Qty: {i.quantity}</span>
                      </div>
                      <span>${i.lineTotal.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="summary-divider" />
                <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
                <div className="summary-row"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                <div className="summary-divider" />
                <div className="summary-row total"><span>Total</span><span>${total.toFixed(2)}</span></div>
                <button className="btn btn-primary btn-block btn-lg" type="submit" disabled={submitting}>
                  {submitting ? 'Placing Order...' : `Place Order • $${total.toFixed(2)}`}
                </button>
                <p className="summary-note">This is a demo checkout. No real payment is processed.</p>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

function Field({ label, name, type = 'text', value, onChange, error, className = '', placeholder }) {
  return (
    <label className={`field ${className} ${error ? 'has-error' : ''}`}>
      <span>{label}</span>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder || label} />
      {error && <small>{error}</small>}
    </label>
  );
}
