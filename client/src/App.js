import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import AgentLayout from './components/layout/AgentLayout';
import TicketTable from './components/TicketTable';
import Ticket from './pages/Ticket';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/layout/AgentLayout';
import ProtectedRoute from './components/utils/ProtectedRoute';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute />} />
          <Route
            path="/agent/dashboard"
            element={
              <ProtectedRoute>
                <AgentLayout>
                  <TicketTable />
                </AgentLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/agent/dashboard/ticket/:id"
            element={
              <ProtectedRoute>
                <AgentLayout>
                  <Ticket />
                </AgentLayout>
              </ProtectedRoute>
            }
          />
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
