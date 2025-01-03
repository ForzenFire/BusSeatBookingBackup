import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './view/Login';
import Driver from './view/Driver';
import Reservation from './view/Reservation';
import Unauthorized from './view/unauthorized';
import ProtectedRoute from './controller/middleware/protectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/" element={<ProtectedRoute allowedRoles={['commuter']}><Reservation /></ProtectedRoute>} />
        <Route path="/Driver" element={<ProtectedRoute allowedRoles={['admin']}><Driver /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
