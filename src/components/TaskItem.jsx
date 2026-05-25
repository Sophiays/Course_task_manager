import { useState } from "react";

function TaskItem({
  task,
  onDeleteTask,
  onToggleCompleted,
  onUpdateTask,
  getDaysLeft,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editCourse, setEditCourse] = useState(task.course);
  const [editDeadline, setEditDeadline] = useState(task.deadline);
  const [editCategory, setEditCategory] = useState(task.category);

  const daysLeft = getDaysLeft(task.deadline);

  function handleSave() {
    if (
      editTitle.trim() === "" ||
      editCourse.trim() === "" ||
      editDeadline === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    onUpdateTask({
      ...task,
      title: editTitle,
      course: editCourse,
      deadline: editDeadline,
      category: editCategory,
    });

    setIsEditing(false);
  }

  function getDeadlineLabel() {
    if (task.completed) return "Completed";
    if (daysLeft < 0) return "Overdue";
    if (daysLeft === 0) return "Due Today";
    if (daysLeft <= 7) return `Due in ${daysLeft} day(s)`;
    return `${daysLeft} day(s) left`;
  }

  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""} ${
        !task.completed && daysLeft < 0 ? "overdue" : ""
      } ${!task.completed && daysLeft >= 0 && daysLeft <= 7 ? "due-soon" : ""}`}
    >
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <input
            type="text"
            value={editCourse}
            onChange={(e) => setEditCourse(e.target.value)}
          />

          <input
            type="date"
            value={editDeadline}
            onChange={(e) => setEditDeadline(e.target.value)}
          />

          <select
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
          >
            <option value="作業">作業</option>
            <option value="小考">小考</option>
            <option value="期中考">期中考</option>
            <option value="期末考">期末考</option>
          </select>
        </div>
      ) : (
        <div>
          <h3>{task.title}</h3>
          <p>Course: {task.course}</p>
          <p>Category: {task.category}</p>
          <p>Deadline: {task.deadline}</p>
          <p>Status: {task.completed ? "Completed" : "Unfinished"}</p>
          <p className="deadline-label">{getDeadlineLabel()}</p>
        </div>
      )}

      <div className="task-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={() => onToggleCompleted(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>

            <button onClick={() => setIsEditing(true)}>Edit</button>

            <button className="delete-btn" onClick={() => onDeleteTask(task.id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskItem;