import { useState } from "react";

function TaskForm({ onAddTask, courseOptions }) {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("作業");

  function handleSubmit(e) {
    e.preventDefault();

    if (title.trim() === "" || course.trim() === "" || deadline === "") {
      alert("Please fill in all required fields.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      course,
      deadline,
      category,
      completed: false,
    };

    onAddTask(newTask);

    setTitle("");
    setCourse("");
    setDeadline("");
    setCategory("作業");
  }

  return (
    <section className="card">
      <h2>Add New Task</h2>

      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          list="course-list"
          type="text"
          placeholder="Course name"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <datalist id="course-list">
          {courseOptions.map((courseName) => (
            <option key={courseName} value={courseName} />
          ))}
        </datalist>

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="作業">作業</option>
          <option value="小考">小考</option>
          <option value="期中考">期中考</option>
          <option value="期末考">期末考</option>
        </select>

        <button type="submit">Add Task</button>
      </form>
    </section>
  );
}

export default TaskForm;