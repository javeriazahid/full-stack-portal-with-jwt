import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function RegistrationForm() {
  const [student, setStudent] = useState({
    name: "",
    rollNumber: "",
    department: "",
    major: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudent((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setStudent((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!student.name || !student.rollNumber) return;

    
    const stored = localStorage.getItem("students");
    const students = stored ? JSON.parse(stored) : [];

   
    const updatedList = [...students, student];
    localStorage.setItem("students", JSON.stringify(updatedList));

    
    setStudent({ name: "", rollNumber: "", department: "", major: "", image: null });

    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-[#e3f2fd]">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-blue-700">Student Registration</h2>

          <input
            name="name"
            value={student.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded"
          />

          <input
            name="rollNumber"
            value={student.rollNumber}
            onChange={handleChange}
            placeholder="Roll Number"
            className="w-full p-2 border border-gray-300 rounded"
          />

          <select
            name="department"
            value={student.department}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Department</option>
            <option value="CS">Computer Science</option>
            <option value="EE">Electrical Engineering</option>
            <option value="BBA">Business Admin</option>
          </select>

          <input
            name="major"
            value={student.major}
            onChange={handleChange}
            placeholder="Major"
            className="w-full p-2 border border-gray-300 rounded"
          />

          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="w-full p-2 border border-gray-300 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 shadow"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
