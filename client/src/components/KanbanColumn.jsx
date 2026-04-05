import TaskCard from './TaskCard';

const columnStyles = {
  todo: { label: 'To Do', color: 'bg-gray-100 text-gray-600' },
  'in-progress': { label: 'In Progress', color: 'bg-yellow-100 text-yellow-700' },
  done: { label: 'Done', color: 'bg-green-100 text-green-700' },
};

const KanbanColumn = ({ status, tasks, onDelete, onUpdate, onAddTask }) => {
  const { label, color } = columnStyles[status];
  const columnTasks = tasks.filter(t => t.status === status);

  return (
    <div className="flex-1 min-w-[280px] bg-gray-50 rounded-2xl p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${color}`}>
            {label}
          </span>
          <span className="text-xs text-gray-400">{columnTasks.length}</span>
        </div>
        {status === 'todo' && (
          <button
            onClick={onAddTask}
            className="text-xs text-blue-600 hover:underline"
          >
            + Add
          </button>
        )}
      </div>

      <div className="space-y-3">
        {columnTasks.length === 0 ? (
          <p className="text-xs text-gray-300 text-center py-8">No tasks</p>
        ) : (
          columnTasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;