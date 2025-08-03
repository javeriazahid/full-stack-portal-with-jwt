import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegistrationForm from "./pages/registration form";
import EditStudent from "./pages/edit tudent";
import StudentList from "./pages/studentlist";
import SubjectManager from "./pages/subjectmanager"; 

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/edit/:id" element={<EditStudent />} />
        <Route path="/subjects" element={<SubjectManager />} /> 
      </Routes>
    </Router>
  );
}
