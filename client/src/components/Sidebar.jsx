import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { label: 'Dashboard', path: '/dashboard', icon: '⬡' },
  { label: 'Projects', path: '/projects', icon: '◈' },
  { label: 'Tasks', path: '/tasks', icon: '◉' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ width: '220px', minHeight: '100vh', background: 'var(--surface)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-body)', flexShrink: 0 }}>

      {/* Logo */}
      <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, background: 'linear-gradient(135deg, #a78bfa, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          ClientPortal
        </div>
        <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '3px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{user?.role}</div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '1rem 0.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navLinks.map(link => {
          const active = location.pathname === link.path;
          return (
            <Link key={link.path} to={link.path} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: active ? 500 : 400, color: active ? '#a78bfa' : 'var(--muted)', background: active ? 'rgba(124,58,237,0.12)' : 'transparent', border: active ? '1px solid rgba(124,58,237,0.2)' : '1px solid transparent', transition: 'all 0.15s' }}>
              <span style={{ fontSize: '16px' }}>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</p>
            <p style={{ fontSize: '11px', color: 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</p>
          </div>
        </div>
        <button onClick={() => { logout(); navigate('/login'); }} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--muted)', fontSize: '12px', cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.15s' }}
          onMouseEnter={e => { e.target.style.borderColor='rgba(239,68,68,0.4)'; e.target.style.color='#f87171'; }}
          onMouseLeave={e => { e.target.style.borderColor='var(--border)'; e.target.style.color='var(--muted)'; }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}