import { useEffect, useState } from 'react';
import API from '../api/axios';
import Layout from '../components/Layout';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const priorityColors = {
  low: 'bg-gray-100 text-gray-600',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-600',
};

const statusColors = {
  todo: 'bg-gray-100 text-gray-500',
  'in-progress': 'bg-yellow-100 text-yellow-700',
  done: 'bg-green-100 text-green-700',
};

const Tasks = () => {
  const [projects, setProjects] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const { data: projectList } = await API.get('/projects');
        setProjects(projectList);

        const taskPromises = projectList.map(p =>
          API.get(`/projects/${p._id}/tasks`).then(r =>
            r.data.map(t => ({ ...t, projectTitle: p.title, projectId: p._id }))
          )
        );
        const results = await Promise.all(taskPromises);
        setAllTasks(results.flat());
      } catch {
        toast.error('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const filtered = filter === 'all'
    ? allTasks
    : allTasks.filter(t => t.status === filter);

  return (
    <Layout>
      <Toaster />
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">All Tasks</h1>
        <p className="text-sm text-gray-400 mt-1">{allTasks.length} tasks across {projects.length} projects</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {['all', 'todo', 'in-progress', 'done'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition capitalize ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {f.replace('-', ' ')}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading tasks...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-400 text-sm">No tasks found.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map(task => (
            <div
              key={task._id}
              onClick={() => navigate(`/projects/${task.projectId}`)}
              className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex items-center justify-between cursor-pointer hover:shadow-sm transition"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{task.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {task.projectTitle}
                  {task.dueDate && ` · Due ${new Date(task.dueDate).toLocaleDateString()}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${priorityColors[task.priority]}`}>
                  {task.priority}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[task.status]}`}>
                  {task.status.replace('-', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Tasks;