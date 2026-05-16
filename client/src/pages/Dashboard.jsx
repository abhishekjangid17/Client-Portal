import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const statusStyle = {
  active:    { background:'#0f2a18', color:'#4ade80', border:'1px solid #1a3f25' },
  completed: { background:'#0f1d2a', color:'#60a5fa', border:'1px solid #1a2f3f' },
  'on-hold': { background:'#2a2010', color:'#fbbf24', border:'1px solid #3f3010' },
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/projects').then(({ data }) => setProjects(data)).finally(() => setLoading(false));
  }, []);

  const active    = projects.filter(p => p.status === 'active').length;
  const completed = projects.filter(p => p.status === 'completed').length;
  const onHold    = projects.filter(p => p.status === 'on-hold').length;

  return (
    <Layout>
      <div style={{ marginBottom:'28px' }}>
        <p style={{ fontSize:'11px', color:'#555', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:'4px' }}>Overview</p>
        <h1 style={{ fontSize:'22px', fontWeight:700, letterSpacing:'-.3px', color:'#ededed' }}>Good to see you, {user?.name?.split(' ')[0]}</h1>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'10px', marginBottom:'32px' }}>
        {[['Total', projects.length, '#ededed'],['Active', active, '#4ade80'],['Completed', completed, '#60a5fa'],['On hold', onHold, '#fbbf24']].map(([l,v,c]) => (
          <div key={l} style={{ background:'#161616', border:'1px solid #2a2a2a', borderRadius:'7px', padding:'16px 18px' }}>
            <p style={{ fontSize:'11px', color:'#555', marginBottom:'8px', textTransform:'uppercase', letterSpacing:'.06em' }}>{l}</p>
            <p style={{ fontSize:'28px', fontWeight:700, color:c, lineHeight:1, letterSpacing:'-.5px' }}>{v}</p>
          </div>
        ))}
      </div>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px' }}>
        <h2 style={{ fontSize:'13px', fontWeight:600, color:'#ededed' }}>Recent projects</h2>
        <button onClick={() => navigate('/projects')} style={{ fontSize:'12px', color:'#555', background:'none', border:'none', cursor:'pointer', textDecoration:'underline', fontFamily:'inherit' }}>View all</button>
      </div>

      {loading ? (
        <p style={{ color:'#555', fontSize:'13px' }}>Loading...</p>
      ) : projects.length === 0 ? (
        <div style={{ border:'1px dashed #2a2a2a', borderRadius:'7px', padding:'40px', textAlign:'center' }}>
          <p style={{ color:'#555', fontSize:'13px', marginBottom:'12px' }}>No projects yet</p>
          <button onClick={() => navigate('/projects')} style={{ padding:'8px 18px', borderRadius:'5px', border:'none', background:'#ededed', color:'#0e0e0e', fontSize:'13px', fontWeight:600, cursor:'pointer' }}>Create first project</button>
        </div>
      ) : (
        <div style={{ background:'#161616', border:'1px solid #2a2a2a', borderRadius:'7px', overflow:'hidden' }}>
          {projects.slice(0,6).map((p,i) => (
            <div key={p._id} onClick={() => navigate(`/projects/${p._id}`)} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 18px', borderBottom: i < Math.min(projects.length,6)-1 ? '1px solid #2a2a2a' : 'none', cursor:'pointer', transition:'background .15s' }}
              onMouseEnter={e => e.currentTarget.style.background='#1c1c1c'}
              onMouseLeave={e => e.currentTarget.style.background='#161616'}
            >
              <div>
                <p style={{ fontSize:'14px', fontWeight:500, color:'#ededed', marginBottom:'2px' }}>{p.title}</p>
                <p style={{ fontSize:'12px', color:'#555' }}>{p.description?.slice(0,60) || 'No description'}</p>
              </div>
              <span style={{ fontSize:'11px', padding:'3px 10px', borderRadius:'4px', fontWeight:500, flexShrink:0, marginLeft:'16px', ...statusStyle[p.status] }}>
                {p.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}