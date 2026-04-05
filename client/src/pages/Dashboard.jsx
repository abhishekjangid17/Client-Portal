import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/projects')
      .then(({ data }) => setProjects(data))
      .finally(() => setLoading(false));
  }, []);

  const active = projects.filter(p => p.status === 'active').length;
  const completed = projects.filter(p => p.status === 'completed').length;
  const onHold = projects.filter(p => p.status === 'on-hold').length;

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Welcome back, {user?.name} 👋</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <p className="text-xs text-gray-400 mb-1">Total Projects</p>
          <p className="text-3xl font-semibold text-gray-800">{projects.length}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <p className="text-xs text-gray-400 mb-1">Active</p>
          <p className="text-3xl font-semibold text-green-600">{active}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <p className="text-xs text-gray-400 mb-1">Completed</p>
          <p className="text-3xl font-semibold text-blue-600">{completed}</p>
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold text-gray-700">Recent Projects</h2>
          <button
            onClick={() => navigate('/projects')}
            className="text-sm text-blue-600 hover:underline"
          >
            View all
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400 text-sm">Loading...</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-400 text-sm">No projects yet. <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigate('/projects')}>Create one</span></p>
        ) : (
          <div className="space-y-3">
            {projects.slice(0, 4).map((p) => (
              <div
                key={p._id}
                onClick={() => navigate(`/projects/${p._id}`)}
                className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex justify-between items-center cursor-pointer hover:shadow-sm transition"
              >
                <div>
                  <p className="text-sm font-medium text-gray-700">{p.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{p.description?.slice(0, 60) || 'No description'}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  p.status === 'active' ? 'bg-green-100 text-green-700' :
                  p.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;