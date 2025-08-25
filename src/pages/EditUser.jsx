
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "employee",
  });

  
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userToEdit = storedUsers.find((u) => u.id === parseInt(id));

    if (userToEdit) {
      setUser(userToEdit);
    } else {
      alert("User not found!");
      navigate("/admin");
    }
  }, [id, navigate]);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = storedUsers.map((u) =>
      u.id === user.id ? user : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    alert("User updated successfully!");
    navigate("/admin"); 
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block font-semibold">Role</label>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
