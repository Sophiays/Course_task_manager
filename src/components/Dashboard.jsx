import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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

  const courseData = Object.values(
    tasks.reduce((acc, task) => {
      if (!acc[task.course]) {
        acc[task.course] = {
          name: task.course,
          value: 0,
        };
      }

      acc[task.course].value += 1;
      return acc;
    }, {})
  );

  const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#7c3aed"];

  return (
    <>
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

      <section className="card chart-card">
        <h2>Course Task Distribution</h2>

        {courseData.length === 0 ? (
          <p className="empty">No course data yet.</p>
        ) : (
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={courseData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {courseData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>
    </>
  );
}

export default Dashboard;