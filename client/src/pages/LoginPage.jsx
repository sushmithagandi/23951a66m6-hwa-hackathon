import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const { notify } = useShop();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
    const res = await login(form.email, form.password);
    if (res.ok) {
      notify('Welcome back to PawQuest!');
      navigate('/');
    } else {
      setError(res.message || 'Login failed.');
    }
  };

  return (
    <div className="page auth-page">
      <div className="container auth-layout">
        <div className="auth-card">
          <p className="eyebrow">Welcome Back</p>
          <h1>Login to PawQuest</h1>
          <p className="auth-sub">Sign in to sync your cart, wishlist, and orders.</p>
          <form onSubmit={submit} className="auth-form" noValidate>
            <label className="field">
              <span>Email</span>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
            </label>
            <label className="field">
              <span>Password</span>
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Your password" />
            </label>
            {error && <div className="form-error">{error}</div>}
            <button className="btn btn-primary btn-block btn-lg" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
          </form>
          <p className="auth-switch">New to PawQuest? <Link to="/register">Create an account</Link></p>
        </div>
        <div className="auth-visual">
          <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=80" alt="Happy dogs running" />
          <div className="auth-visual-overlay">
            <h2>Join a community of pet lovers</h2>
            <p>Shop quality products and give your pets the care they deserve.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
