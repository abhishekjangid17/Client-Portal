import { useNavigate } from 'react-router-dom';

const statusColors = {
  active: 'bg-green-100 text-green-700',
  completed: 'bg-blue-100 text-blue-700',
  'on-hold': 'bg-yellow-100 text-yellow-700',
};

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/projects/${project._id}`)}
      className="bg-white border border-gray-100 rounded-2xl p-5 cursor-pointer hover:shadow-md transition group"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-600 transition">
          {project.title}
        </h3>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[project.status]}`}>
          {project.status}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
        {project.description || 'No description provided.'}
      </p>

      <div className="flex justify-between items-center text-xs text-gray-400">
        <span>Admin: {project.admin?.name}</span>
        {project.deadline && (
          <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;