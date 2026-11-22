import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' }
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount, wishlist } = useShop();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault();
    const term = q.trim();
    navigate(term ? `/shop?q=${encodeURIComponent(term)}` : '/shop');
    setOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link to="/" className="brand" aria-label="PawQuest home">
          <span className="brand-mark">🐾</span>
          <span>Paw<span>Quest</span></span>
        </Link>

        <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
          <span /><span /><span />
        </button>

        <nav className={`nav ${open ? 'open' : ''}`}>
          <div className="nav-links">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setOpen(false)}>
                {item.label}
              </NavLink>
            ))}
          </div>

          <form className="nav-search" onSubmit={submitSearch}>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search pet products..." aria-label="Search products" />
            <button type="submit" aria-label="Search">⌕</button>
          </form>

          <div className="nav-actions">
            <Link to="/wishlist" className="icon-btn" onClick={() => setOpen(false)} aria-label="Wishlist">
              ♡ <span className="badge">{wishlist.length}</span>
            </Link>
            <Link to="/cart" className="icon-btn" onClick={() => setOpen(false)} aria-label="Cart">
              🛒 <span className="badge">{cartCount}</span>
            </Link>
            {user ? (
              <div className="user-menu">
                <span className="user-name">Hi, {user.name.split(' ')[0]}</span>
                <button className="btn btn-ghost btn-sm" onClick={() => { logout(); setOpen(false); }}>Logout</button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm" onClick={() => setOpen(false)}>Login</Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
