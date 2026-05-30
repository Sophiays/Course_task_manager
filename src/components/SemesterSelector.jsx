function SemesterSelector({
  currentSemester,
  setCurrentSemester,
  setSelectedCourse,
  setSearchText,
}) {
  const semesters = [
    "大一上",
    "大一下",
    "大二上",
    "大二下",
    "大三上",
    "大三下",
    "大四上",
    "大四下",
  ];

  function handleChange(e) {
    setCurrentSemester(e.target.value);
    setSelectedCourse("all");
    setSearchText("");
  }

  return (
    <div className="semester-inline">
      <span>Semester</span>

      <select value={currentSemester} onChange={handleChange}>
        {semesters.map((semester) => (
          <option key={semester} value={semester}>
            {semester}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SemesterSelector;