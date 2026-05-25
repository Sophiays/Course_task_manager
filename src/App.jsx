import { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortMode, setSortMode] = useState("category");
  const [selectedCourse, setSelectedCourse] = useState("all");

  const courseOptions = [...new Set(tasks.map((task) => task.course))];

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleCompleted(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function updateTask(updatedTask) {
    setTasks(
      tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  }

  function getDaysLeft(deadline) {
    const today = new Date();
    const dueDate = new Date(deadline);

    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    return Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
  }

  const overdueCount = tasks.filter(
    (task) => !task.completed && getDaysLeft(task.deadline) < 0
  ).length;

  const dueSoonCount = tasks.filter((task) => {
    const daysLeft = getDaysLeft(task.deadline);
    return !task.completed && daysLeft >= 0 && daysLeft <= 7;
  }).length;

  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchText.toLowerCase()) ||
        task.course.toLowerCase().includes(searchText.toLowerCase()) ||
        task.category.toLowerCase().includes(searchText.toLowerCase());

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "completed" && task.completed) ||
        (filterStatus === "active" && !task.completed);

      const matchesCourse =
        selectedCourse === "all" || task.course === selectedCourse;

      return matchesSearch && matchesStatus && matchesCourse;
    })
    .sort((a, b) => {
      if (sortMode === "urgent") {
        return new Date(a.deadline) - new Date(b.deadline);
      }

      const categoryOrder = {
        作業: 1,
        小考: 2,
        期中考: 3,
        期末考: 4,
      };

      return categoryOrder[a.category] - categoryOrder[b.category];
    });

  return (
    <div className="app">
      <header className="header">
        <h1>Course Task Manager</h1>
        <p>Manage assignments, quizzes, exams, and deadlines.</p>
      </header>

      <TaskForm onAddTask={addTask} courseOptions={courseOptions} />

      <section className="card dashboard">
        <div>
          <h3>{tasks.length}</h3>
          <p>Total Tasks</p>
        </div>

        <div>
          <h3>{tasks.filter((task) => !task.completed).length}</h3>
          <p>Unfinished</p>
        </div>

        <div>
          <h3>{dueSoonCount}</h3>
          <p>Due in 7 Days</p>
        </div>

        <div>
          <h3>{overdueCount}</h3>
          <p>Overdue</p>
        </div>
      </section>

      <TaskList
        tasks={tasks}
        filteredTasks={filteredTasks}
        searchText={searchText}
        setSearchText={setSearchText}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        sortMode={sortMode}
        setSortMode={setSortMode}
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
        courseOptions={courseOptions}
        onDeleteTask={deleteTask}
        onToggleCompleted={toggleCompleted}
        onUpdateTask={updateTask}
        getDaysLeft={getDaysLeft}
      />
    </div>
  );
}

export default App;