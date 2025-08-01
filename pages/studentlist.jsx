import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(stored);
  }, []);

  const handleDelete = (index) => {
    const confirm = window.confirm("Are you sure you want to delete this student?");
    if (confirm) {
      const updatedStudents = [...students];
      updatedStudents.splice(index, 1);
      setStudents(updatedStudents);
      localStorage.setItem("students", JSON.stringify(updatedStudents));
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 py-12 px-6">
        <h1 className="text-3xl font-bold text-blue-800 text-center mb-8">
          Registered Students
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {students.length > 0 ? (
            students.map((student, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center text-center hover:shadow-xl transition"
              >
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-300 mb-3"
                />
                <h2 className="text-xl font-semibold text-blue-700">{student.name}</h2>
                <p className="text-gray-700 text-sm">Roll #: {student.rollNumber}</p>
                <p className="text-gray-600 text-sm">Dept: {student.department}</p>
                <p className="text-gray-600 text-sm">Major: {student.major}</p>

                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/edit/${index}`}
                    className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 w-full col-span-full">
              No students registered yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
