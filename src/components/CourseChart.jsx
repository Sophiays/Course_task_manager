import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function CourseChart({ tasks }) {
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

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#dc2626",
    "#7c3aed",
    "#0891b2",
  ];

  return (
    <section className="card">
      <h2>Course Distribution</h2>

      {courseData.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <div className="chart-box">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
                <Pie
                data={courseData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                >
                {courseData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>

                <Tooltip />
            </PieChart>
            </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}

export default CourseChart;