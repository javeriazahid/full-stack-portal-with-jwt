import { useState } from "react";

const gradePoints = {
  "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0,
  "D": 1.0, "F": 0.0
};

function SubjectManager() {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({
    name: "", code: "", creditHours: "", instructor: "", grade: "A"
  });
  const [editIndex, setEditIndex] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...subjects];
      updated[editIndex] = form;
      setSubjects(updated);
      setEditIndex(null);
    } else {
      setSubjects([...subjects, form]);
    }
    setForm({ name: "", code: "", creditHours: "", instructor: "", grade: "A" });
  };

  
  const handleEdit = (index) => {
    setForm(subjects[index]);
    setEditIndex(index);
  };

  
  const handleDelete = (index) => {
    const updated = [...subjects];
    updated.splice(index, 1);
    setSubjects(updated);
  };

 
  const calculateCGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;

    subjects.forEach(subject => {
      const gpa = gradePoints[subject.grade];
      const credits = parseFloat(subject.creditHours);
      if (!isNaN(gpa) && !isNaN(credits)) {
        totalCredits += credits;
        totalPoints += gpa * credits;
      }
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "N/A";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">📘 Subject Manager & CGPA Calculator</h2>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded shadow space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Subject Name" required className="input" />
          <input name="code" value={form.code} onChange={handleChange} placeholder="Subject Code" required className="input" />
          <input name="creditHours" value={form.creditHours} onChange={handleChange} placeholder="Credit Hours" type="number" required className="input" />
          <input name="instructor" value={form.instructor} onChange={handleChange} placeholder="Instructor" required className="input" />
          <select name="grade" value={form.grade} onChange={handleChange} className="input">
            {Object.keys(gradePoints).map(g => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {editIndex !== null ? "Update Subject" : "Add Subject"}
        </button>
      </form>

      <div className="max-w-5xl mx-auto mt-10">
        <h3 className="text-xl font-semibold mb-4">📄 Subjects List</h3>
        {subjects.length === 0 ? (
          <p className="text-gray-500">No subjects yet. Add some above.</p>
        ) : (
          <table className="w-full bg-white border rounded shadow text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Code</th>
                <th className="p-2 border">Credits</th>
                <th className="p-2 border">Instructor</th>
                <th className="p-2 border">Grade</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={index}>
                  <td className="border p-2">{subject.name}</td>
                  <td className="border p-2">{subject.code}</td>
                  <td className="border p-2">{subject.creditHours}</td>
                  <td className="border p-2">{subject.instructor}</td>
                  <td className="border p-2">{subject.grade}</td>
                  <td className="border p-2 space-x-2">
                    <button onClick={() => handleEdit(index)} className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500">Edit</button>
                    <button onClick={() => handleDelete(index)} className="bg-red-500 px-2 py-1 text-white rounded hover:bg-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="mt-6 text-lg font-bold text-right">
          🎯 CGPA: <span className="text-blue-600">{calculateCGPA()}</span>
        </div>
      </div>
    </div>
  );
}

export default SubjectManager;
