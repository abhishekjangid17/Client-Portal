import { useNavigate } from 'react-router-dom';

const features = [
  { icon: '⬡', title: 'Kanban board', desc: 'Move tasks across To Do, In Progress and Done visually' },
  { icon: '◈', title: 'JWT auth', desc: 'Secure login with bcrypt hashing and protected routes' },
  { icon: '◉', title: 'Role access', desc: 'Separate admin and client dashboards' },
  { icon: '◎', title: 'Live stats', desc: 'Real-time project and task count dashboard' },
  { icon: '⬟', title: 'Task priority', desc: 'Low, medium, high priority with due dates' },
  { icon: '◫', title: 'REST API', desc: 'Full Express + MongoDB backend with 10+ endpoints' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'var(--font-body)', minHeight: '100vh', background: 'var(--bg)', overflow: 'hidden' }}>

      {/* Orb backgrounds */}
      <div style={{ position: 'fixed', top: '-20%', left: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-10%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Nav */}
      <nav style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 3rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, background: 'linear-gradient(135deg, #a78bfa, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          ClientPortal
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate('/login')} style={{ padding: '8px 20px', borderRadius: '10px', border: '1px solid var(--border2)', background: 'transparent', color: 'var(--muted)', fontFamily: 'var(--font-body)', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => e.target.style.color='var(--text)'}
            onMouseLeave={e => e.target.style.color='var(--muted)'}
          >Login</button>
          <button onClick={() => navigate('/register')} style={{ padding: '8px 20px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
            Get started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '6rem 2rem 4rem' }}>
        <div className="fade-up" style={{ display: 'inline-block', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#a78bfa', fontSize: '12px', fontWeight: 500, padding: '5px 16px', borderRadius: '20px', marginBottom: '2rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Full-stack MERN · React + Node + MongoDB
        </div>
        <h1 className="fade-up-2" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', background: 'linear-gradient(160deg, #f0f2ff 0%, #a78bfa 50%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Manage clients.<br />Ship projects faster.
        </h1>
        <p className="fade-up-3" style={{ color: 'var(--muted)', fontSize: '17px', maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          A production-grade client portal built with the MERN stack. Kanban boards, JWT auth, role-based dashboards — all in one.
        </p>
        <div className="fade-up-4" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/register')} style={{ padding: '14px 32px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', color: '#fff', fontSize: '15px', fontWeight: 600, fontFamily: 'var(--font-display)', cursor: 'pointer', letterSpacing: '0.02em' }}>
            Start for free →
          </button>
          <button onClick={() => navigate('/login')} style={{ padding: '14px 32px', borderRadius: '12px', border: '1px solid var(--border2)', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', fontSize: '15px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
            Login
          </button>
        </div>
      </section>

      {/* Feature grid */}
      <section style={{ position: 'relative', zIndex: 1, padding: '2rem 3rem 5rem', maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', transition: 'border-color 0.2s, transform 0.2s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(124,58,237,0.4)'; e.currentTarget.style.transform='translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='translateY(0)'; }}
            >
              <div style={{ fontSize: '22px', marginBottom: '12px', background: 'linear-gradient(135deg, #a78bfa, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{f.icon}</div>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px', marginBottom: '6px', color: 'var(--text)' }}>{f.title}</p>
              <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack badges */}
      <section style={{ borderTop: '1px solid var(--border)', padding: '2rem 3rem', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
        {['MongoDB', 'Express.js', 'React', 'Node.js', 'JWT', 'Tailwind', 'Vercel', 'Render'].map(t => (
          <span key={t} style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--muted)', fontSize: '12px', padding: '5px 14px', borderRadius: '20px', fontWeight: 500 }}>{t}</span>
        ))}
      </section>

      <footer style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--muted)', fontSize: '12px', borderTop: '1px solid var(--border)', position: 'relative', zIndex: 1 }}>
        Built with MERN stack · Deployed on Vercel + Render
      </footer>
    </div>
  );
}