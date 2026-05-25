import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  filteredTasks,
  searchText,
  setSearchText,
  filterStatus,
  setFilterStatus,
  sortMode,
  setSortMode,
  selectedCourse,
  setSelectedCourse,
  courseOptions,
  onDeleteTask,
  onToggleCompleted,
  onUpdateTask,
  getDaysLeft,
}) {
  return (
    <section className="card">
      <h2>Task List</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by task, course, or category..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Unfinished</option>
          <option value="completed">Completed</option>
        </select>

        <select value={sortMode} onChange={(e) => setSortMode(e.target.value)}>
          <option value="category">依照分類呈現</option>
          <option value="urgent">依照時間急迫</option>
        </select>

        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="all">All Courses</option>
          {courseOptions.map((courseName) => (
            <option key={courseName} value={courseName}>
              {courseName}
            </option>
          ))}
        </select>
      </div>

      <p className="summary">
        Total: {tasks.length} | Showing: {filteredTasks.length}
      </p>

      {filteredTasks.length === 0 ? (
        <p className="empty">No tasks found.</p>
      ) : (
        <div className="task-list">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDeleteTask={onDeleteTask}
              onToggleCompleted={onToggleCompleted}
              onUpdateTask={onUpdateTask}
              getDaysLeft={getDaysLeft}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default TaskList;