
import { Link } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center shadow-md">
     
      <div className="text-lg font-bold">
        <Link to="/">MyCompany</Link>
      </div>

      
      <div className="space-x-4">
        {!user && (
          <>
            <Link to="/login" className="hover:text-blue-400">
              Login
            </Link>
            <Link to="/register" className="hover:text-blue-400">
              Register
            </Link>
          </>
        )}

        {user && user.role === "admin" && (
          <Link to="/admin" className="hover:text-blue-400">
            Admin Dashboard
          </Link>
        )}

        {user && user.role === "employee" && (
          <Link to="/employee" className="hover:text-blue-400">
            Employee Dashboard
          </Link>
        )}

        {user && (
          <button
            onClick={onLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
