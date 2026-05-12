import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post('/auth/login', form);
      login(data.user, data.token);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '10px',
    border: '1px solid var(--border2)', background: 'rgba(255,255,255,0.04)',
    color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '14px',
    outline: 'none', transition: 'border-color 0.2s',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', fontFamily: 'var(--font-body)', position: 'relative', overflow: 'hidden' }}>
      <Toaster toastOptions={{ style: { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' } }} />
      <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="fade-up" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '2.5rem', width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, background: 'linear-gradient(135deg, #a78bfa, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>
            ClientPortal
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>Welcome back</h1>
          <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Login to your portal</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '6px', display: 'block' }}>Email</label>
            <input type="email" placeholder="you@example.com" style={inputStyle} value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              onFocus={e => e.target.style.borderColor='rgba(124,58,237,0.6)'}
              onBlur={e => e.target.style.borderColor='var(--border2)'}
              required />
          </div>
          <div>
            <label style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '6px', display: 'block' }}>Password</label>
            <input type="password" placeholder="••••••••" style={inputStyle} value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              onFocus={e => e.target.style.borderColor='rgba(124,58,237,0.6)'}
              onBlur={e => e.target.style.borderColor='var(--border2)'}
              required />
          </div>
          <button type="submit" disabled={loading} style={{ marginTop: '8px', padding: '13px', borderRadius: '10px', border: 'none', background: loading ? 'rgba(124,58,237,0.5)' : 'linear-gradient(135deg, #7c3aed, #06b6d4)', color: '#fff', fontSize: '15px', fontWeight: 600, fontFamily: 'var(--font-display)', cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '0.02em' }}>
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--muted)', marginTop: '1.5rem' }}>
          No account? <Link to="/register" style={{ color: '#a78bfa', textDecoration: 'none' }}>Register</Link>
        </p>
      </div>
    </div>
  );
}