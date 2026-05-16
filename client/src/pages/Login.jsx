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
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const inp = { width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #e8e7e4', background: '#fff', fontSize: '14px', outline: 'none', fontFamily: 'inherit', color: '#111' };

  return (
    <div style={{ minHeight: '100vh', background: '#fafaf9', display: 'flex', flexDirection: 'column' }}>
      <Toaster toastOptions={{ style: { fontSize: '13px', borderRadius: '6px' } }} />
      <nav style={{ padding: '14px 40px', borderBottom: '1px solid #e8e7e4', background: '#fff' }}>
        <Link to="/" style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-.3px', textDecoration: 'none', color: '#111' }}>ClientPortal</Link>
      </nav>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ background: '#fff', border: '1px solid #e8e7e4', borderRadius: '8px', padding: '32px', width: '100%', maxWidth: '380px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-.3px', marginBottom: '6px' }}>Sign in</h1>
          <p style={{ fontSize: '13px', color: '#6f6e69', marginBottom: '24px' }}>Welcome back to ClientPortal</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 500, color: '#6f6e69', display: 'block', marginBottom: '5px' }}>Email</label>
              <input type="email" placeholder="you@example.com" style={inp} value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                onFocus={e => e.target.style.borderColor='#111'}
                onBlur={e => e.target.style.borderColor='#e8e7e4'}
                required />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 500, color: '#6f6e69', display: 'block', marginBottom: '5px' }}>Password</label>
              <input type="password" placeholder="••••••••" style={inp} value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                onFocus={e => e.target.style.borderColor='#111'}
                onBlur={e => e.target.style.borderColor='#e8e7e4'}
                required />
            </div>
            <button type="submit" disabled={loading} style={{ padding: '10px', borderRadius: '6px', border: 'none', background: '#111', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: '4px' }}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '13px', color: '#6f6e69', marginTop: '20px' }}>
            No account? <Link to="/register" style={{ color: '#111', fontWeight: 500, textDecoration: 'underline' }}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}