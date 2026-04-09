import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: 'Kanban board',
    desc: 'Drag tasks across To Do, In Progress and Done columns',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    title: 'Project tracking',
    desc: 'Create and monitor multiple projects with deadlines',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    title: 'Role-based access',
    desc: 'Separate admin and client views with JWT auth',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    title: 'Live dashboard',
    desc: 'Real-time stats on active, completed and on-hold projects',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    title: 'Secure auth',
    desc: 'JWT tokens, bcrypt hashing and protected routes',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Task priorities',
    desc: 'Set low, medium or high priority with due dates',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-100">
        <span className="text-lg font-semibold text-blue-600">ClientPortal</span>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Get started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center px-6 py-20">
        <div className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-4 py-1.5 rounded-full mb-5">
          Full-stack MERN project
        </div>
        <h1 className="text-4xl font-semibold text-gray-900 leading-tight mb-4">
          Manage clients and projects<br className="hidden sm:block" /> in one place
        </h1>
        <p className="text-gray-500 text-base max-w-lg mx-auto mb-8 leading-relaxed">
          A modern client portal to track projects, manage tasks with a Kanban board,
          and collaborate with your team — all in one clean dashboard.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => navigate('/register')}
            className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Get started free
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 border border-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition"
          >
            Login to dashboard
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-14 px-6">
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-8">
          Everything you need
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-gray-100 rounded-2xl p-5"
            >
              <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                {f.icon}
              </div>
              <p className="text-sm font-medium text-gray-800 mb-1">{f.title}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6">
        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto text-center">
          <div>
            <p className="text-2xl font-semibold text-blue-600">MERN</p>
            <p className="text-xs text-gray-400 mt-1">Full stack</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-blue-600">JWT</p>
            <p className="text-xs text-gray-400 mt-1">Secure auth</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-blue-600">Live</p>
            <p className="text-xs text-gray-400 mt-1">Deployed on Vercel</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-100 py-5 text-center text-xs text-gray-400">
        Built with React, Node.js, Express &amp; MongoDB
      </footer>

    </div>
  );
};

export default Home;