import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import CustomerHome from './pages/CustomerHome';
import Ticket from './pages/Ticket';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import AgentHome from './pages/AgentHome';
import AgentDashboard from './pages/AgentDashboard';
import MyTickets from './pages/MyTickets';
import Profile from './pages/Profile';
import ProtectedRoute from './components/utils/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import CustomerDashboard from './pages/CustomerDashboard';
import Companies from './pages/Companies';
import Company from './pages/Company';
import Users from './pages/Users';
import User from './pages/User';
import TicketSearch from './pages/TicketSearch';
import RootLayout from './components/layout/RootLayout';

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<Home />} />
      <Route element={<ProtectedRoute allowedUser="agent" />}>
        <Route path="/agent" element={<AgentHome />} />
        <Route path="/agent/dashboard/" element={<AgentDashboard />} />
        <Route path="/agent/profile" element={<Profile />} />
        <Route path="/agent/dashboard/mytickets" element={<MyTickets />} />
        <Route path="/agent/dashboard/ticket" element={<TicketSearch />} />
        <Route path="/agent/dashboard/ticket/:id" element={<Ticket />} />
        <Route path="/agent/dashboard/companies" element={<Companies />} />
        <Route path="/agent/dashboard/companies/:id" element={<Company />} />
        <Route
          path="/agent/dashboard/companies/:id/:userId"
          element={<User />}
        />
        <Route path="/agent/dashboard/users" element={<Users />} />
        <Route path="/agent/dashboard/users/:userId" element={<User />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/customer" element={<CustomerHome />} />
        <Route path="/customer/profile" element={<Profile />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/dashboard/ticket/:id" element={<Ticket />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route path="*" element={<>notfound</>} />
    </Route>,
  ),
);

export default appRouter;
