import { useEffect, useState } from "react";
import "./App.css";
import SemesterSelector from "./components/SemesterSelector";
import Dashboard from "./components/Dashboard";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import CourseChart from "./components/CourseChart";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [currentSemester, setCurrentSemester] = useState("大一上");
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortMode, setSortMode] = useState("category");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(newTask) {
    setTasks([...tasks, { ...newTask, semester: currentSemester }]);
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

  const semesterTasks = tasks.filter(
    (task) => task.semester === currentSemester
  );

  const courseOptions = [
    ...new Set(semesterTasks.map((task) => task.course)),
  ];

  const filteredTasks = semesterTasks
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
      
      const matchesCategory =
        selectedCategory === "all" || task.category === selectedCategory;

      return matchesSearch && matchesStatus && matchesCourse && matchesCategory;
    })
    .sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      return new Date(a.deadline) - new Date(b.deadline);
    });

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Course Task Manager</h1>
          <p>Manage academic tasks by semester, course, category, and deadline.</p>
        </div>

        <SemesterSelector
          currentSemester={currentSemester}
          setCurrentSemester={setCurrentSemester}
          setSelectedCourse={setSelectedCourse}
          setSearchText={setSearchText}
        />
      </header>

      <Dashboard tasks={semesterTasks} getDaysLeft={getDaysLeft} />

      <TaskForm onAddTask={addTask} courseOptions={courseOptions} />

      <div className="content-grid">
        <TaskList
          tasks={semesterTasks}
          filteredTasks={filteredTasks}
          searchText={searchText}
          setSearchText={setSearchText}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          courseOptions={courseOptions}
          onDeleteTask={deleteTask}
          onToggleCompleted={toggleCompleted}
          onUpdateTask={updateTask}
          getDaysLeft={getDaysLeft}
        />

        <CourseChart tasks={semesterTasks} />
      </div>
    </div>
  );
}

export default App;