import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Projects', path: '/projects' },
  { label: 'Tasks', path: '/tasks' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ width: '200px', minHeight: '100vh', background: '#fff', borderRight: '1px solid #e8e7e4', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      <div style={{ padding: '16px 16px 14px', borderBottom: '1px solid #e8e7e4' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '-.3px', color: '#111' }}>ClientPortal</div>
        <div style={{ fontSize: '11px', color: '#a8a49e', marginTop: '2px', textTransform: 'capitalize' }}>{user?.role}</div>
      </div>

      <nav style={{ padding: '10px 8px', flex: 1 }}>
        {links.map(link => {
          const active = location.pathname === link.path;
          return (
            <Link key={link.path} to={link.path} style={{ display: 'block', padding: '8px 10px', borderRadius: '5px', textDecoration: 'none', fontSize: '13px', color: active ? '#111' : '#6f6e69', background: active ? '#f3f2f0' : 'transparent', fontWeight: active ? 500 : 400, marginBottom: '2px' }}>
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: '12px 16px', borderTop: '1px solid #e8e7e4' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#f3f2f0', border: '1px solid #e8e7e4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#111', flexShrink: 0 }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: '12px', fontWeight: 500, color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</p>
            <p style={{ fontSize: '11px', color: '#a8a49e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</p>
          </div>
        </div>
        <button onClick={() => { logout(); navigate('/login'); }} style={{ width: '100%', padding: '7px', borderRadius: '5px', border: '1px solid #e8e7e4', background: 'transparent', color: '#6f6e69', fontSize: '12px', cursor: 'pointer' }}
          onMouseEnter={e => { e.target.style.borderColor = '#dc2626'; e.target.style.color = '#dc2626'; }}
          onMouseLeave={e => { e.target.style.borderColor = '#e8e7e4'; e.target.style.color = '#6f6e69'; }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}