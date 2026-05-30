import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  filteredTasks,
  searchText,
  setSearchText,
  filterStatus,
  setFilterStatus,
  selectedCourse,
  setSelectedCourse,
  courseOptions,
  onDeleteTask,
  onToggleCompleted,
  onUpdateTask,
  getDaysLeft,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <section className="card">
      <h2>Task List</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by task or course..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Unfinished</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="作業">作業</option>
          <option value="小考">小考</option>
          <option value="期中考">期中考</option>
          <option value="期末考">期末考</option>
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