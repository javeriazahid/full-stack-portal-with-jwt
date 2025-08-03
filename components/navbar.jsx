import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black bg-opacity-70 px-6 py-4 flex justify-between items-center rounded-b-md shadow-md">
      <h1 className="text-white text-2xl font-semibold tracking-wide">TEU System</h1>
      <div className="space-x-6">
        <Link
          to="/"
          className="text-white hover:text-blue-400 transition duration-200 font-medium"
        >
          Home
        </Link>
        <Link
          to="/register"
          className="text-white hover:text-blue-400 transition duration-200 font-medium"
        >
          Register
        </Link>
        <Link
          to="/students"
          className="text-white hover:text-blue-400 transition duration-200 font-medium"
        >
          Student List
        </Link>
        <Link
          to="/subjects"
          className="text-white hover:text-blue-400 transition duration-200 font-medium"
        >
          Subjects & CGPA
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
