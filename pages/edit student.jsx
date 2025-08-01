import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [studentData, setStudentData] = useState({
    name: "",
    rollNumber: "",
    department: "",
    major: "",
    image: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(stored);
    const selected = stored[parseInt(id)];
    if (selected) setStudentData(selected);
  }, [id]);

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = [...students];
    updated[parseInt(id)] = studentData;
    localStorage.setItem("students", JSON.stringify(updated));
    navigate("/students");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 py-12 px-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-blue-800 text-center">Edit Student</h2>

        <input
          type="text"
          name="name"
          value={studentData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="rollNumber"
          value={studentData.rollNumber}
          onChange={handleChange}
          placeholder="Roll Number"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="department"
          value={studentData.department}
          onChange={handleChange}
          placeholder="Department"
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="major"
          value={studentData.major}
          onChange={handleChange}
          placeholder="Major"
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="image"
          value={studentData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Update Student
        </button>
      </form>
    </div>
  );
}
