import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand footer-brand"><span className="brand-mark">🐾</span><span>Paw<span>Quest</span></span></Link>
          <p>Your happy place for premium pet products. We help you care for your furry, feathery, and cuddly family members with love.</p>
          <div className="socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">FB</a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">X</a>
          </div>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>
            <li><Link to="/category/dog-food">Dog Food</Link></li>
            <li><Link to="/category/cat-food">Cat Food</Link></li>
            <li><Link to="/category/toys">Pet Toys</Link></li>
            <li><Link to="/category/grooming">Grooming</Link></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About PawQuest</Link></li>
            <li><Link to="/shop">All Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul className="contact-list">
            <li>📍 123 Pet Lane, Happy Town</li>
            <li>📞 (555) 123-PAWS</li>
            <li>✉️ hello@pawquest.com</li>
            <li>🕘 Mon-Sat: 9am - 7pm</li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} PawQuest. Made with love for pets.</p>
        <p>Free shipping on orders over $50</p>
      </div>
    </footer>
  );
}
