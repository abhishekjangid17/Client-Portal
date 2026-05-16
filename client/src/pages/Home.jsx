import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useRef } from 'react';

const features = [
  { icon: '⬡', title: 'Kanban board', desc: 'Move tasks across To Do, In Progress and Done visually' },
  { icon: '◈', title: 'JWT auth', desc: 'Secure login with bcrypt hashing and protected routes' },
  { icon: '◉', title: 'Role access', desc: 'Separate admin and client dashboards' },
  { icon: '◎', title: 'Live stats', desc: 'Real-time project and task count dashboard' },
  { icon: '⬟', title: 'Task priority', desc: 'Low, medium, high priority with due dates' },
  { icon: '◫', title: 'REST API', desc: 'Full Express + MongoDB backend with 10+ endpoints' },
];

const INIT_TASKS = {
  todo: [
    { id: 'a', title: 'Mobile responsiveness', pri: 'medium', priColor: '#f59e0b', priBg: 'rgba(245,158,11,.15)' },
    { id: 'b', title: 'Performance audit', pri: 'low', priColor: '#10b981', priBg: 'rgba(16,185,129,.15)' },
  ],
  inprog: [
    { id: 'c', title: 'Build product page', pri: 'high', priColor: '#ef4444', priBg: 'rgba(239,68,68,.15)' },
    { id: 'd', title: 'Auth screens', pri: 'high', priColor: '#ef4444', priBg: 'rgba(239,68,68,.15)' },
  ],
  done: [
    { id: 'e', title: 'UX audit complete', pri: 'high', priColor: '#ef4444', priBg: 'rgba(239,68,68,.15)' },
    { id: 'f', title: 'Brand workshop', pri: 'medium', priColor: '#f59e0b', priBg: 'rgba(245,158,11,.15)' },
  ],
};

function AnimatedApp() {
  const [tasks, setTasks] = useState(JSON.parse(JSON.stringify(INIT_TASKS)));
  const [movingId, setMovingId] = useState(null);
  const [doneCount, setDoneCount] = useState(1);
  const seqRef = useRef(0);

  const MOVES = [
    { from: 'todo', id: 'a', to: 'inprog' },
    { from: 'inprog', id: 'c', to: 'done' },
    { from: 'todo', id: 'b', to: 'inprog' },
  ];

  useEffect(() => {
    const run = () => {
      const move = MOVES[seqRef.current % MOVES.length];
      setMovingId(move.id);
      setTimeout(() => {
        setTasks(prev => {
          const next = { todo: [...prev.todo], inprog: [...prev.inprog], done: [...prev.done] };
          const taskIdx = next[move.from].findIndex(t => t.id === move.id);
          if (taskIdx === -1) return prev;
          const [task] = next[move.from].splice(taskIdx, 1);
          next[move.to].push(task);
          return next;
        });
        if (move.to === 'done') setDoneCount(c => c + 1);
        setMovingId(null);
        seqRef.current++;
      }, 500);
    };

    const interval = setInterval(run, 2800);
    return () => clearInterval(interval);
  }, []);

  const col = (label, items, color) => (
    <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', padding: '8px' }}>
      <div style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color, marginBottom: '8px' }}>{label}</div>
      {items.map(t => (
        <div key={t.id} style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${movingId === t.id ? 'rgba(124,58,237,.6)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '6px', padding: '6px 8px', marginBottom: '6px', opacity: movingId === t.id ? 0.3 : 1, transform: movingId === t.id ? 'scale(0.97)' : 'scale(1)', transition: 'all .4s ease' }}>
          <div style={{ fontSize: '9px', color: '#e2e8f0', lineHeight: 1.4, marginBottom: '3px' }}>{t.title}</div>
          <span style={{ fontSize: '8px', padding: '1px 5px', borderRadius: '4px', fontWeight: 600, background: t.priBg, color: t.priColor }}>{t.pri}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ background: '#0a0e1a', borderRadius: '0 0 10px 10px', height: '220px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Mini topbar */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.07)', gap: '12px', flexShrink: 0 }}>
        <div style={{ fontSize: '11px', fontWeight: 800, background: 'linear-gradient(135deg,#a78bfa,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ClientPortal</div>
        {['Dashboard','Projects','Tasks'].map((l,i) => (
          <div key={l} style={{ fontSize: '9px', color: i===0?'#a78bfa':'rgba(255,255,255,0.35)', padding: '3px 8px', borderRadius: '5px', background: i===0?'rgba(124,58,237,.15)':'transparent' }}>{l}</div>
        ))}
      </div>
      {/* Stats */}
      <div style={{ display: 'flex', gap: '6px', padding: '8px 10px', flexShrink: 0 }}>
        {[['Total','4','rgba(124,58,237,.6)'],['Active','2','rgba(6,182,212,.6)'],['Done', String(doneCount),'rgba(16,185,129,.6)']].map(([l,v,c]) => (
          <div key={l} style={{ flex:1, background:'rgba(255,255,255,0.04)', border:`1px solid ${c}`, borderRadius:'6px', padding:'5px 8px' }}>
            <div style={{ fontSize:'8px', color:'rgba(255,255,255,.4)', textTransform:'uppercase', letterSpacing:'.06em' }}>{l}</div>
            <div style={{ fontSize:'16px', fontWeight:700, color:'#f0f2ff', lineHeight:1.2 }}>{v}</div>
          </div>
        ))}
      </div>
      {/* Kanban */}
      <div style={{ display: 'flex', gap: '6px', padding: '0 10px 10px', flex: 1, overflow: 'hidden' }}>
        {col('To Do', tasks.todo, 'rgba(255,255,255,.4)')}
        {col('In Progress', tasks.inprog, '#fbbf24')}
        {col('Done', tasks.done, '#34d399')}
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [demoLoading, setDemoLoading] = useState(false);

  const handleDemo = async () => {
    setDemoLoading(true);
    try {
      const { data } = await API.post('/auth/demo');
      login(data.user, data.token);
      toast.success('Welcome to the demo! 🎮');
      navigate('/dashboard');
    } catch {
      toast.error('Demo login failed. Try again.');
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans',system-ui,sans-serif", minHeight: '100vh', background: 'var(--bg)', overflow: 'hidden' }}>
      <Toaster toastOptions={{ style: { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' } }} />

      {/* Orbs */}
      <div style={{ position: 'fixed', top: '-20%', left: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-10%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Nav */}
      <nav style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 3rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ fontFamily: 'Syne,sans-serif', fontSize: '20px', fontWeight: 800, background: 'linear-gradient(135deg, #a78bfa, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          ClientPortal
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate('/login')} style={{ padding: '8px 20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#8892aa', fontSize: '14px', cursor: 'pointer' }}>Login</button>
          <button onClick={() => navigate('/register')} style={{ padding: '8px 20px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', color: '#fff', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>Get started</button>
        </div>
      </nav>

      {/* Hero — two column */}
      <section style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', padding: '4rem 3rem 3rem', maxWidth: '1100px', margin: '0 auto' }}>

        {/* Left */}
        <div className="fade-up">
          <div style={{ display: 'inline-block', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#a78bfa', fontSize: '11px', fontWeight: 600, padding: '4px 14px', borderRadius: '20px', marginBottom: '1.5rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>
            Full-stack MERN · React + Node + MongoDB
          </div>
          <h1 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.25rem', background: 'linear-gradient(160deg, #f0f2ff 0%, #a78bfa 50%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Manage clients.<br />Ship projects faster.
          </h1>
          <p style={{ color: '#8892aa', fontSize: '16px', lineHeight: 1.75, marginBottom: '2rem' }}>
            A production-grade client portal with Kanban boards, JWT authentication, and role-based dashboards — built with the MERN stack.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button onClick={handleDemo} disabled={demoLoading} style={{ padding: '13px 28px', borderRadius: '12px', border: '1px solid rgba(124,58,237,0.4)', background: 'rgba(124,58,237,0.12)', color: '#a78bfa', fontSize: '15px', fontWeight: 600, cursor: demoLoading ? 'not-allowed' : 'pointer', transition: 'all .2s' }}>
              {demoLoading ? 'Loading...' : '🎮 Try live demo'}
            </button>
            <button onClick={() => navigate('/register')} style={{ padding: '13px 28px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', color: '#fff', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>
              Get started free →
            </button>
          </div>
          {/* Social proof */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '2rem' }}>
            <div style={{ display: 'flex' }}>
              {['AJ','SK','MR','PL'].map((i,idx) => (
                <div key={i} style={{ width: '28px', height: '28px', borderRadius: '50%', background: `linear-gradient(135deg,hsl(${idx*60+200},70%,60%),hsl(${idx*60+240},70%,50%))`, border: '2px solid #0a0e1a', marginLeft: idx===0?0:'-8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 700, color: '#fff' }}>{i}</div>
              ))}
            </div>
            <span style={{ fontSize: '13px', color: '#8892aa' }}>Built for freelancers &amp; agencies</span>
          </div>
        </div>

        {/* Right — Animated browser mockup */}
        <div className="fade-up-2">
          <div style={{ background: '#161d30', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}>
            {/* Browser chrome */}
            <div style={{ background: '#0f1422', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '5px', height: '20px', marginLeft: '10px', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,.3)' }}>client-portal.vercel.app/dashboard</span>
              </div>
            </div>
            {/* Animated app */}
            <AnimatedApp />
          </div>
          {/* Below mockup tags */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
            {['MongoDB Atlas','Express.js','React + Vite','Node.js','JWT Auth','Tailwind CSS'].map(t => (
              <span key={t} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#8892aa', fontSize: '11px', padding: '3px 10px', borderRadius: '20px' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ position: 'relative', zIndex: 1, padding: '2rem 3rem 5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Syne,sans-serif', textAlign: 'center', fontSize: '22px', fontWeight: 700, color: '#f0f2ff', marginBottom: '2rem' }}>Everything you need</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: '#0f1422', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '1.5rem', transition: 'border-color .2s, transform .2s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(124,58,237,0.4)'; e.currentTarget.style.transform='translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.transform='translateY(0)'; }}
            >
              <div style={{ fontSize: '22px', marginBottom: '12px', background: 'linear-gradient(135deg,#a78bfa,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{f.icon}</div>
              <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: 600, fontSize: '15px', marginBottom: '6px', color: '#f0f2ff' }}>{f.title}</p>
              <p style={{ color: '#8892aa', fontSize: '13px', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '2rem 3rem', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
        {['MongoDB','Express.js','React','Node.js','JWT','Tailwind','Vercel','Render'].map(t => (
          <span key={t} style={{ background: '#0f1422', border: '1px solid rgba(255,255,255,0.08)', color: '#8892aa', fontSize: '12px', padding: '5px 14px', borderRadius: '20px', fontWeight: 500 }}>{t}</span>
        ))}
      </section>

      <footer style={{ textAlign: 'center', padding: '1.5rem', color: '#8892aa', fontSize: '12px', borderTop: '1px solid rgba(255,255,255,0.07)', position: 'relative', zIndex: 1 }}>
        Built with MERN stack · Deployed on Vercel + Render
      </footer>
    </div>
  );
}