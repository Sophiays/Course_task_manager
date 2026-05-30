function Dashboard({ tasks, getDaysLeft }) {
  const unfinishedCount = tasks.filter((task) => !task.completed).length;

  const dueSoonCount = tasks.filter((task) => {
    const daysLeft = getDaysLeft(task.deadline);
    return !task.completed && daysLeft >= 0 && daysLeft <= 7;
  }).length;

  const overdueCount = tasks.filter((task) => {
    return !task.completed && getDaysLeft(task.deadline) < 0;
  }).length;

  const completedCount = tasks.filter((task) => task.completed).length;

  const progress =
    tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  return (
    <section className="card dashboard">
      <div>
        <h3>{tasks.length}</h3>
        <p>Total Tasks</p>
      </div>

      <div>
        <h3>{unfinishedCount}</h3>
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

      <div>
        <h3>{progress}%</h3>
        <p>Progress</p>
      </div>
    </section>
  );
}

export default Dashboard;