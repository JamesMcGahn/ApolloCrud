import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import Dashboard from './pages/Dashboard';
import TicketTable from './components/TicketTable';
import Ticket from './pages/Ticket';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/utils/ProtectedRoute';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <Container fluid>
          <Routes>
            <Route path="/" element={<ProtectedRoute />} />
            <Route
              path="/agent/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard>
                    <TicketTable />
                  </Dashboard>
                </ProtectedRoute>
              }
            />

            <Route
              path="/agent/dashboard/ticket/:id"
              element={
                <ProtectedRoute>
                  <Dashboard>
                    <Ticket />
                  </Dashboard>
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<>notfound</>} />
          </Routes>
        </Container>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
