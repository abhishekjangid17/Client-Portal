import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const priStyle = {
  high:   { background: '#2a1515', color: '#f87171', border: '1px solid #3f1f1f' },
  medium: { background: '#2a2010', color: '#fbbf24', border: '1px solid #3f3010' },
  low:    { background: '#0f2a18', color: '#4ade80', border: '1px solid #1a3f25' },
};

const INIT_TASKS = {
  todo:   [{ id:'a', title:'Mobile responsiveness', pri:'medium' }, { id:'b', title:'Performance audit', pri:'low' }],
  inprog: [{ id:'c', title:'Build product page', pri:'high' }, { id:'d', title:'Auth screens', pri:'high' }],
  done:   [{ id:'e', title:'UX audit complete', pri:'high' }],
};

function AnimatedBoard() {
  const [tasks, setTasks] = useState(JSON.parse(JSON.stringify(INIT_TASKS)));
  const [movingId, setMovingId] = useState(null);
  const [doneCount, setDoneCount] = useState(1);
  const seq = useRef(0);
  const MOVES = [
    { from:'todo',   id:'a', to:'inprog' },
    { from:'inprog', id:'c', to:'done'   },
    { from:'todo',   id:'b', to:'inprog' },
  ];

  useEffect(() => {
    const run = () => {
      const move = MOVES[seq.current % MOVES.length];
      setMovingId(move.id);
      setTimeout(() => {
        setTasks(prev => {
          const next = { todo:[...prev.todo], inprog:[...prev.inprog], done:[...prev.done] };
          const i = next[move.from].findIndex(t => t.id === move.id);
          if (i === -1) return prev;
          const [task] = next[move.from].splice(i, 1);
          next[move.to].push(task);
          return next;
        });
        if (move.to === 'done') setDoneCount(c => c + 1);
        setMovingId(null);
        seq.current++;
      }, 400);
    };
    const t = setTimeout(() => {
      run();
      const iv = setInterval(run, 2800);
      return () => clearInterval(iv);
    }, 1400);
    return () => clearTimeout(t);
  }, []);

  const col = (label, items) => (
    <div style={{ flex:1, background:'#1c1c1c', border:'1px solid #2a2a2a', borderRadius:'6px', padding:'8px' }}>
      <div style={{ fontSize:'9px', fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', color:'#555', marginBottom:'8px' }}>{label}</div>
      {items.map(t => (
        <div key={t.id} style={{ background:'#111', border:`1px solid ${movingId===t.id?'#ededed':'#2a2a2a'}`, borderRadius:'4px', padding:'6px 7px', marginBottom:'5px', opacity:movingId===t.id?0.2:1, transition:'all .35s ease' }}>
          <div style={{ fontSize:'9px', color:'#ccc', marginBottom:'4px', lineHeight:1.4 }}>{t.title}</div>
          <span style={{ fontSize:'8px', padding:'1px 5px', borderRadius:'3px', fontWeight:600, ...priStyle[t.pri] }}>{t.pri}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div style={{ background:'#1c1c1c', border:'1px solid #2a2a2a', borderRadius:'8px 8px 0 0', padding:'9px 12px', display:'flex', alignItems:'center', gap:'6px', borderBottom:'none' }}>
        {['#ff5f57','#febc2e','#28c840'].map(c => (
          <div key={c} style={{ width:'10px', height:'10px', borderRadius:'50%', background:c }} />
        ))}
        <div style={{ flex:1, background:'#111', border:'1px solid #2a2a2a', borderRadius:'4px', height:'20px', marginLeft:'10px', display:'flex', alignItems:'center', padding:'0 8px' }}>
          <span style={{ fontSize:'10px', color:'#555' }}>client-portal.vercel.app/dashboard</span>
        </div>
      </div>
      <div style={{ border:'1px solid #2a2a2a', borderRadius:'0 0 8px 8px', display:'flex', overflow:'hidden', height:'220px' }}>
        <div style={{ width:'110px', borderRight:'1px solid #2a2a2a', padding:'12px 10px', background:'#111', flexShrink:0 }}>
          <div style={{ fontSize:'12px', fontWeight:700, letterSpacing:'-.2px', marginBottom:'14px', color:'#ededed' }}>ClientPortal</div>
          {['Dashboard','Projects','Tasks'].map((l,i) => (
            <div key={l} style={{ fontSize:'10px', padding:'6px 8px', borderRadius:'4px', marginBottom:'2px', background:i===1?'#1c1c1c':'transparent', color:i===1?'#ededed':'#555', fontWeight:i===1?500:400 }}>{l}</div>
          ))}
        </div>
        <div style={{ flex:1, padding:'12px', background:'#0e0e0e', overflow:'hidden' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'6px', marginBottom:'10px' }}>
            {[['Total','4'],['Active','2'],['Done',String(doneCount)]].map(([l,v]) => (
              <div key={l} style={{ background:'#161616', border:'1px solid #2a2a2a', borderRadius:'5px', padding:'6px 8px' }}>
                <div style={{ fontSize:'8px', color:'#555', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:'2px' }}>{l}</div>
                <div style={{ fontSize:'17px', fontWeight:700, color:'#ededed', lineHeight:1 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:'6px' }}>
            {col('To do', tasks.todo)}
            {col('In progress', tasks.inprog)}
            {col('Done', tasks.done)}
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  ['Kanban board',  'Visual task management across columns'],
  ['JWT auth',      'Secure login with bcrypt hashing'],
  ['Role access',   'Admin and client views with permissions'],
  ['REST API',      '10+ Express endpoints with MongoDB'],
  ['Task priority', 'Low, medium, high with due dates'],
  ['Live deploy',   'Vercel frontend · Render backend'],
];

export default function Home() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [demoLoading, setDemoLoading] = useState(false);

  const handleDemo = async () => {
    setDemoLoading(true);
    try {
      const { data } = await API.post('/auth/demo');
      login(data.user, data.token);
      toast.success('Logged in as demo user');
      navigate('/dashboard');
    } catch {
      toast.error('Demo login failed. Try again.');
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div style={{ minHeight:'100vh', background:'#0e0e0e', fontFamily:'system-ui,-apple-system,sans-serif', color:'#ededed' }}>
      <Toaster toastOptions={{ style:{ fontSize:'13px', borderRadius:'6px', background:'#1c1c1c', color:'#ededed', border:'1px solid #2a2a2a' } }} />

      {/* Nav */}
      <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 40px', borderBottom:'1px solid #2a2a2a' }}>
        <span style={{ fontSize:'15px', fontWeight:700, letterSpacing:'-.3px' }}>ClientPortal</span>
        <div style={{ display:'flex', gap:'8px' }}>
          <button onClick={() => navigate('/login')} style={{ padding:'7px 16px', borderRadius:'6px', border:'1px solid #2a2a2a', background:'transparent', fontSize:'13px', cursor:'pointer', color:'#888' }}>Login</button>
          <button onClick={() => navigate('/register')} style={{ padding:'7px 16px', borderRadius:'6px', border:'none', background:'#ededed', color:'#0e0e0e', fontSize:'13px', fontWeight:600, cursor:'pointer' }}>Get started</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'start', padding:'64px 40px 48px', maxWidth:'1100px', margin:'0 auto' }}>
        <div className="fade-up">
          <div style={{ display:'inline-flex', alignItems:'center', gap:'6px', fontSize:'12px', color:'#888', border:'1px solid #2a2a2a', padding:'4px 10px', borderRadius:'4px', marginBottom:'24px' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#4ade80', display:'inline-block' }} />
            Live demo — no sign up needed
          </div>

          <h1 style={{ fontSize:'42px', fontWeight:800, lineHeight:1.08, letterSpacing:'-.8px', color:'#ededed', marginBottom:'18px' }}>
            Project management<br />for freelancers
          </h1>

          <p style={{ fontSize:'16px', color:'#888', lineHeight:1.7, marginBottom:'32px', maxWidth:'400px' }}>
            Track client projects, manage tasks on a Kanban board, and collaborate with clients — built end-to-end with the MERN stack.
          </p>

          <div style={{ display:'flex', gap:'10px', marginBottom:'40px', flexWrap:'wrap' }}>
            <button onClick={handleDemo} disabled={demoLoading} style={{ padding:'11px 22px', borderRadius:'6px', border:'none', background:'#ededed', color:'#0e0e0e', fontSize:'14px', fontWeight:700, cursor:demoLoading?'not-allowed':'pointer', opacity:demoLoading?0.6:1 }}>
              {demoLoading ? 'Loading...' : '▶ Try live demo'}
            </button>
            <button onClick={() => navigate('/register')} style={{ padding:'11px 22px', borderRadius:'6px', border:'1px solid #2a2a2a', background:'transparent', color:'#ededed', fontSize:'14px', cursor:'pointer' }}>
              Create account
            </button>
            <a href="https://github.com" target="_blank" rel="noreferrer" style={{ padding:'11px 22px', borderRadius:'6px', border:'1px solid #2a2a2a', background:'transparent', color:'#888', fontSize:'14px', cursor:'pointer', textDecoration:'none' }}>
              GitHub ↗
            </a>
          </div>

          <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
            {['MongoDB','Express.js','React','Node.js','JWT','Tailwind CSS','Vercel'].map(t => (
              <span key={t} style={{ fontSize:'11px', padding:'3px 9px', borderRadius:'4px', border:'1px solid #2a2a2a', color:'#555', background:'#161616' }}>{t}</span>
            ))}
          </div>
        </div>

        <div className="fade-up-2">
          <AnimatedBoard />
        </div>
      </div>

      {/* Features */}
      <div style={{ borderTop:'1px solid #2a2a2a', borderBottom:'1px solid #2a2a2a' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', maxWidth:'1100px', margin:'0 auto' }}>
          {features.map(([title, desc], i) => (
            <div key={title} style={{ padding:'28px 32px', borderRight: i%3!==2 ? '1px solid #2a2a2a' : 'none', borderBottom: i<3 ? '1px solid #2a2a2a' : 'none' }}>
              <p style={{ fontSize:'13px', fontWeight:600, color:'#ededed', marginBottom:'5px' }}>{title}</p>
              <p style={{ fontSize:'12px', color:'#555', lineHeight:1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ padding:'20px 40px', display:'flex', justifyContent:'space-between', borderTop:'1px solid #2a2a2a' }}>
        <span style={{ fontSize:'12px', color:'#555' }}>Built with React · Node.js · MongoDB Atlas</span>
        <span style={{ fontSize:'12px', color:'#555' }}>Deployed on Vercel + Render</span>
      </footer>
    </div>
  );
}