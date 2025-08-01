import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import RegistrationForm from './components/RegistrationForm';
import StudentList from './pages/StudentList';
import EditStudent from './pages/EditStudent';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/edit/:id" element={<EditStudent />} />
      </Routes>
    </BrowserRouter>
  );
}
