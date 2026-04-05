import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Layout from '../components/Layout';
import KanbanColumn from '../components/KanbanColumn';
import toast, { Toaster } from 'react-hot-toast';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  });

  const fetchProject = async () => {
    try {
      const { data } = await API.get(`/projects/${id}`);
      setProject(data);
    } catch {
      toast.error('Project not found');
      navigate('/projects');
    }
  };

  const fetchTasks = async () => {
    try {
      const { data } = await API.get(`/projects/${id}/tasks`);
      setTasks(data);
    } catch {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchTasks();
  }, [id]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/projects/${id}/tasks`, form);
      toast.success('Task created!');
      setShowModal(false);
      setForm({ title: '', description: '', priority: 'medium', dueDate: '' });
      fetchTasks();
    } catch {
      toast.error('Failed to create task');
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      await API.put(`/projects/tasks/${taskId}`, updates);
      toast.success('Task updated!');
      fetchTasks();
    } catch {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await API.delete(`/projects/tasks/${taskId}`);
      toast.success('Task deleted');
      fetchTasks();
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const handleDeleteProject = async () => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await API.delete(`/projects/${id}`);
      toast.success('Project deleted');
      navigate('/projects');
    } catch {
      toast.error('Failed to delete project');
    }
  };

  const statusColors = {
    active: 'bg-green-100 text-green-700',
    completed: 'bg-blue-100 text-blue-700',
    'on-hold': 'bg-yellow-100 text-yellow-700',
  };

  if (loading) return (
    <Layout>
      <p className="text-gray-400 text-sm">Loading project...</p>
    </Layout>
  );

  return (
    <Layout>
      <Toaster />

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <button
              onClick={() => navigate('/projects')}
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              ← Projects
            </button>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-800">{project?.title}</h1>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[project?.status]}`}>
              {project?.status}
            </span>
          </div>
          {project?.description && (
            <p className="text-sm text-gray-400 mt-1">{project.description}</p>
          )}
          {project?.deadline && (
            <p className="text-xs text-gray-400 mt-1">
              Deadline: {new Date(project.deadline).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2.5 rounded-lg transition"
          >
            + New Task
          </button>
          <button
            onClick={handleDeleteProject}
            className="border border-red-200 text-red-400 hover:bg-red-50 text-sm px-4 py-2.5 rounded-lg transition"
          >
            Delete Project
          </button>
        </div>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {['todo', 'in-progress', 'done'].map(status => (
          <div key={status} className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-xs text-gray-400 capitalize mb-1">{status.replace('-', ' ')}</p>
            <p className="text-2xl font-semibold text-gray-800">
              {tasks.filter(t => t.status === status).length}
            </p>
          </div>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {['todo', 'in-progress', 'done'].map(status => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={tasks}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
            onAddTask={() => setShowModal(true)}
          />
        ))}
      </div>

      {/* Create Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">New Task</h2>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Title</label>
                <input
                  type="text"
                  placeholder="Task title"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Description</label>
                <textarea
                  placeholder="Task details..."
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Priority</label>
                  <select
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Due Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.dueDate}
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm transition"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProjectDetail;