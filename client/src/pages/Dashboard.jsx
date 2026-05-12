import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const statCard = (label, value, color) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: color }} />
    <p style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>{label}</p>
    <p style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 800, color: 'var(--text)' }}>{value}</p>
  </div>
);

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

  return (
    <Layout>
      <div className="fade-up" style={{ marginBottom: '2.5rem' }}>
        <p style={{ fontSize: '13px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Overview</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: 'var(--text)' }}>
          Welcome back, {user?.name?.split(' ')[0]} 👋
        </h1>
      </div>

      {/* Stats */}
      <div className="fade-up-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px', marginBottom: '2.5rem' }}>
        {statCard('Total', projects.length, 'linear-gradient(90deg, #7c3aed, #06b6d4)')}
        {statCard('Active', active, 'linear-gradient(90deg, #10b981, #06b6d4)')}
        {statCard('Done', completed, 'linear-gradient(90deg, #a78bfa, #7c3aed)')}
      </div>

      {/* Recent */}
      <div className="fade-up-3">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--text)' }}>Recent projects</h2>
          <button onClick={() => navigate('/projects')} style={{ fontSize: '13px', color: '#a78bfa', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>View all →</button>
        </div>

        {loading ? (
          <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Loading...</p>
        ) : projects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed var(--border)', borderRadius: '16px' }}>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '12px' }}>No projects yet</p>
            <button onClick={() => navigate('/projects')} style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', color: '#fff', fontSize: '13px', cursor: 'pointer' }}>Create one →</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {projects.slice(0, 5).map(p => (
              <div key={p._id} onClick={() => navigate(`/projects/${p._id}`)} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'border-color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor='var(--border2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}
              >
                <div>
                  <p style={{ fontWeight: 500, fontSize: '14px', color: 'var(--text)', marginBottom: '2px' }}>{p.title}</p>
                  <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{p.description?.slice(0, 60) || 'No description'}</p>
                </div>
                <span style={{ fontSize: '11px', padding: '4px 12px', borderRadius: '20px', fontWeight: 500, flexShrink: 0, marginLeft: '12px', background: p.status === 'active' ? 'rgba(16,185,129,0.15)' : p.status === 'completed' ? 'rgba(124,58,237,0.15)' : 'rgba(245,158,11,0.15)', color: p.status === 'active' ? '#34d399' : p.status === 'completed' ? '#a78bfa' : '#fbbf24' }}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}