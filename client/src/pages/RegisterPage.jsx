import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';

export default function RegisterPage() {
  const { register, loading } = useAuth();
  const { notify } = useShop();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password) { setError('Please fill in all required fields.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    const res = await register(form.name, form.email, form.password);
    if (res.ok) {
      notify('Account created! Welcome to PawQuest.');
      navigate('/');
    } else {
      setError(res.message || 'Registration failed.');
    }
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="page auth-page">
      <div className="container auth-layout">
        <div className="auth-card">
          <p className="eyebrow">Join PawQuest</p>
          <h1>Create your account</h1>
          <p className="auth-sub">Save your wishlist, cart, and order history across visits.</p>
          <form onSubmit={submit} className="auth-form" noValidate>
            <label className="field"><span>Full Name</span><input name="name" value={form.name} onChange={onChange} placeholder="Your name" /></label>
            <label className="field"><span>Email</span><input name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" /></label>
            <label className="field"><span>Password</span><input name="password" type="password" value={form.password} onChange={onChange} placeholder="At least 6 characters" /></label>
            <label className="field"><span>Confirm Password</span><input name="confirm" type="password" value={form.confirm} onChange={onChange} placeholder="Re-enter password" /></label>
            {error && <div className="form-error">{error}</div>}
            <button className="btn btn-primary btn-block btn-lg" type="submit" disabled={loading}>{loading ? 'Creating account...' : 'Create Account'}</button>
          </form>
          <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
        </div>
        <div className="auth-visual">
          <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1000&q=80" alt="Cute cat" />
          <div className="auth-visual-overlay">
            <h2>Everything for happy pets</h2>
            <p>Create an account to get a personalized shopping experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
