import { useEffect, useState } from "react";
import "./App.css";
import SemesterSelector from "./components/SemesterSelector";
import Dashboard from "./components/Dashboard";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

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

      return matchesSearch && matchesStatus && matchesCourse;
    })
    .sort((a, b) => {
      if (sortMode === "urgent") {
        return new Date(a.deadline) - new Date(b.deadline);
      }

      const categoryOrder = {
        期中考: 1,
        期末考: 2,
        小考: 3,
        作業: 4,
      };

      return categoryOrder[a.category] - categoryOrder[b.category];
    });

  return (
    <div className="app">
      <header className="header">
        <h1>Course Task Manager</h1>
        <p>Manage academic tasks by semester, course, category, and deadline.</p>
      </header>

      <SemesterSelector
        currentSemester={currentSemester}
        setCurrentSemester={setCurrentSemester}
        setSelectedCourse={setSelectedCourse}
        setSearchText={setSearchText}
      />

      <Dashboard tasks={semesterTasks} getDaysLeft={getDaysLeft} />

      <TaskForm onAddTask={addTask} courseOptions={courseOptions} />

      <TaskList
        tasks={semesterTasks}
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