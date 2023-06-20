import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import CustomerHome from './pages/CustomerHome';
import Ticket from './pages/Ticket';
import Login from './pages/Login';
import Register from './pages/Register';
import AgentHome from './pages/AgentHome';
import MyTickets from './pages/MyTickets';
import Profile from './pages/Profile';
import ProtectedRoute from './components/utils/ProtectedRoute';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import CustomerDashboard from './pages/CustomerDashboard';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute allowedUser="agent" />}>
            <Route path="/agent/dashboard" element={<AgentHome />} />
            <Route path="/agent/profile" element={<Profile />} />
            <Route path="/agent/dashboard/mytickets" element={<MyTickets />} />
            <Route path="/agent/dashboard/ticket/:id" element={<Ticket />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/customer" element={<CustomerHome />} />
            <Route path="/customer/profile" element={<Profile />} />
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            <Route path="/customer/dashboard/ticket/:id" element={<Ticket />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<>notfound</>} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
