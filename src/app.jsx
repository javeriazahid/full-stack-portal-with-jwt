
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import AdminDashboard from "./components/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Navbar from "./src/components/Navbar";
import EditUser from "./src/pages/EditUser"; 

function App() {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

 
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  
  const ProtectedRoute = ({ children, role }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    if (role && user.role !== role) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
       
        <Route path="/" element={<Navigate to="/login" />} />

      
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

       
        <Route
          path="/employee"
          element={
            <ProtectedRoute role="employee">
              <EmployeeDashboard user={user} />
            </ProtectedRoute>
          }
        />

       
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

       
        <Route
          path="/edit-user/:id"
          element={
            <ProtectedRoute role="admin">
              <EditUser />
            </ProtectedRoute>
          }
        />

      
        <Route
          path="*"
          element={<h1 className="text-center mt-10">404 Page Not Found</h1>}
        />
      </Routes>
    </Router>
  );
}

export default App;
