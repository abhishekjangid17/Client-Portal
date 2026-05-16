import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/projects').then(({ data }) => setProjects(data)).finally(() => setLoading(false));
  }, []);

  const active = projects.filter(p => p.status === 'active').length;
  const completed = projects.filter(p => p.status === 'completed').length;
  const onHold = projects.filter(p => p.status === 'on-hold').length;

  const statusStyle = {
    active:    { background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' },
    completed: { background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe' },
    'on-hold': { background: '#fffbeb', color: '#d97706', border: '1px solid #fde68a' },
  };

  return (
    <Layout>
      <div style={{ marginBottom: '28px' }}>
        <p style={{ fontSize: '12px', color: '#a8a49e', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '4px' }}>Overview</p>
        <h1 style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-.3px', color: '#111' }}>Good to see you, {user?.name?.split(' ')[0]}</h1>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
        {[['Total projects', projects.length, '#111'],['Active', active, '#16a34a'],['Completed', completed, '#2563eb'],['On hold', onHold, '#d97706']].map(([l,v,c]) => (
          <div key={l} style={{ background: '#fff', border: '1px solid #e8e7e4', borderRadius: '7px', padding: '16px 18px' }}>
            <p style={{ fontSize: '12px', color: '#a8a49e', marginBottom: '6px' }}>{l}</p>
            <p style={{ fontSize: '28px', fontWeight: 700, color: c, lineHeight: 1, letterSpacing: '-.5px' }}>{v}</p>
          </div>
        ))}
      </div>

      {/* Recent projects */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#111' }}>Recent projects</h2>
        <button onClick={() => navigate('/projects')} style={{ fontSize: '12px', color: '#6f6e69', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>View all</button>
      </div>

      {loading ? (
        <p style={{ color: '#a8a49e', fontSize: '13px' }}>Loading...</p>
      ) : projects.length === 0 ? (
        <div style={{ border: '1px dashed #e8e7e4', borderRadius: '7px', padding: '40px', textAlign: 'center' }}>
          <p style={{ color: '#a8a49e', fontSize: '13px', marginBottom: '12px' }}>No projects yet</p>
          <button onClick={() => navigate('/projects')} style={{ padding: '8px 18px', borderRadius: '5px', border: '1px solid #111', background: '#111', color: '#fff', fontSize: '13px', cursor: 'pointer' }}>Create first project</button>
        </div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid #e8e7e4', borderRadius: '7px', overflow: 'hidden' }}>
          {projects.slice(0, 6).map((p, i) => (
            <div key={p._id} onClick={() => navigate(`/projects/${p._id}`)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderBottom: i < Math.min(projects.length, 6) - 1 ? '1px solid #e8e7e4' : 'none', cursor: 'pointer', transition: 'background .15s' }}
              onMouseEnter={e => e.currentTarget.style.background='#fafaf9'}
              onMouseLeave={e => e.currentTarget.style.background='#fff'}
            >
              <div>
                <p style={{ fontSize: '14px', fontWeight: 500, color: '#111', marginBottom: '2px' }}>{p.title}</p>
                <p style={{ fontSize: '12px', color: '#a8a49e' }}>{p.description?.slice(0, 60) || 'No description'}</p>
              </div>
              <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '4px', fontWeight: 500, flexShrink: 0, ...statusStyle[p.status] }}>
                {p.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}