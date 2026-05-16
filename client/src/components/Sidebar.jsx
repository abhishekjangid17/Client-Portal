import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { label:'Dashboard', path:'/dashboard' },
  { label:'Projects',  path:'/projects'  },
  { label:'Tasks',     path:'/tasks'     },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ width:'200px', minHeight:'100vh', background:'#111', borderRight:'1px solid #2a2a2a', display:'flex', flexDirection:'column', flexShrink:0 }}>
      <div style={{ padding:'16px 16px 14px', borderBottom:'1px solid #2a2a2a' }}>
        <div style={{ fontSize:'14px', fontWeight:700, letterSpacing:'-.3px', color:'#ededed' }}>ClientPortal</div>
        <div style={{ fontSize:'11px', color:'#555', marginTop:'2px', textTransform:'capitalize' }}>{user?.role}</div>
      </div>

      <nav style={{ padding:'10px 8px', flex:1 }}>
        {links.map(link => {
          const active = location.pathname === link.path;
          return (
            <Link key={link.path} to={link.path} style={{ display:'block', padding:'8px 10px', borderRadius:'5px', textDecoration:'none', fontSize:'13px', color:active?'#ededed':'#555', background:active?'#1c1c1c':'transparent', fontWeight:active?500:400, marginBottom:'2px', border:active?'1px solid #2a2a2a':'1px solid transparent' }}>
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding:'12px 16px', borderTop:'1px solid #2a2a2a' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}>
          <div style={{ width:'30px', height:'30px', borderRadius:'50%', background:'#1c1c1c', border:'1px solid #2a2a2a', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', fontWeight:700, color:'#ededed', flexShrink:0 }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div style={{ minWidth:0 }}>
            <p style={{ fontSize:'12px', fontWeight:500, color:'#ededed', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user?.name}</p>
            <p style={{ fontSize:'11px', color:'#555', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user?.email}</p>
          </div>
        </div>
        <button onClick={() => { logout(); navigate('/login'); }} style={{ width:'100%', padding:'7px', borderRadius:'5px', border:'1px solid #2a2a2a', background:'transparent', color:'#555', fontSize:'12px', cursor:'pointer', fontFamily:'inherit' }}
          onMouseEnter={e => { e.target.style.borderColor='#5f1d1d'; e.target.style.color='#f87171'; }}
          onMouseLeave={e => { e.target.style.borderColor='#2a2a2a'; e.target.style.color='#555'; }}
        >Sign out</button>
      </div>
    </div>
  );
}