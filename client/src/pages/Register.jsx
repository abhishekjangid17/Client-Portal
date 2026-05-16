import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'client' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post('/auth/register', form);
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inp = { width:'100%', padding:'9px 12px', borderRadius:'6px', border:'1px solid #2a2a2a', background:'#161616', fontSize:'14px', outline:'none', fontFamily:'inherit', color:'#ededed' };

  return (
    <div style={{ minHeight:'100vh', background:'#0e0e0e', display:'flex', flexDirection:'column', color:'#ededed' }}>
      <Toaster toastOptions={{ style:{ fontSize:'13px', borderRadius:'6px', background:'#1c1c1c', color:'#ededed', border:'1px solid #2a2a2a' } }} />
      <nav style={{ padding:'14px 40px', borderBottom:'1px solid #2a2a2a' }}>
        <Link to="/" style={{ fontSize:'15px', fontWeight:700, letterSpacing:'-.3px', textDecoration:'none', color:'#ededed' }}>ClientPortal</Link>
      </nav>
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 20px' }}>
        <div style={{ background:'#161616', border:'1px solid #2a2a2a', borderRadius:'8px', padding:'32px', width:'100%', maxWidth:'380px' }}>
          <h1 style={{ fontSize:'20px', fontWeight:700, letterSpacing:'-.3px', marginBottom:'6px' }}>Create account</h1>
          <p style={{ fontSize:'13px', color:'#888', marginBottom:'24px' }}>Get started with ClientPortal</p>
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
            {[['Full name','name','text','John Doe'],['Email','email','email','you@example.com'],['Password','password','password','••••••••']].map(([label,key,type,ph]) => (
              <div key={key}>
                <label style={{ fontSize:'12px', fontWeight:500, color:'#888', display:'block', marginBottom:'5px' }}>{label}</label>
                <input type={type} placeholder={ph} style={inp} value={form[key]}
                  onChange={e => setForm({...form, [key]:e.target.value})}
                  onFocus={e => e.target.style.borderColor='#555'}
                  onBlur={e => e.target.style.borderColor='#2a2a2a'}
                  required />
              </div>
            ))}
            <div>
              <label style={{ fontSize:'12px', fontWeight:500, color:'#888', display:'block', marginBottom:'5px' }}>Role</label>
              <select style={{ ...inp, cursor:'pointer' }} value={form.role} onChange={e => setForm({...form, role:e.target.value})}>
                <option value="client">Client</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" disabled={loading} style={{ padding:'10px', borderRadius:'6px', border:'none', background:'#ededed', color:'#0e0e0e', fontSize:'14px', fontWeight:700, cursor:loading?'not-allowed':'pointer', opacity:loading?0.6:1, marginTop:'4px' }}>
              {loading ? 'Creating...' : 'Create account'}
            </button>
          </form>
          <p style={{ textAlign:'center', fontSize:'13px', color:'#888', marginTop:'20px' }}>
            Already have an account? <Link to="/login" style={{ color:'#ededed', fontWeight:500, textDecoration:'underline' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}