const priorityColors = {
  low: 'bg-gray-100 text-gray-600',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-600',
};

const TaskCard = ({ task, onDelete, onUpdate }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm font-medium text-gray-800">{task.title}</p>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-xs text-gray-400 mb-3 line-clamp-2">{task.description}</p>
      )}

      {task.dueDate && (
        <p className="text-xs text-gray-400 mb-3">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}

      <div className="flex gap-2 mt-2">
        {task.status !== 'in-progress' && (
          <button
            onClick={() => onUpdate(task._id, { status: 'in-progress' })}
            className="text-xs text-blue-500 hover:underline"
          >
            → In Progress
          </button>
        )}
        {task.status !== 'done' && (
          <button
            onClick={() => onUpdate(task._id, { status: 'done' })}
            className="text-xs text-green-500 hover:underline"
          >
            ✓ Done
          </button>
        )}
        <button
          onClick={() => onDelete(task._id)}
          className="text-xs text-red-400 hover:underline ml-auto"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;