import { Route } from 'react-router-dom';
import Home from '../../pages/public/Home';
import Login from '../../pages/public/Login';
import Register from '../../pages/public/Register';
import ForgotPassword from '../../pages/public/ForgotPassword';
import ResetPassword from '../../pages/public/ResetPassword';
import blogRoutes from './blog/blogRoutes';

const publicRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="forgotpassword" element={<ForgotPassword />} />
    <Route path="resetpassword" element={<ResetPassword />} />
    {blogRoutes}
  </>
);

export default publicRoutes;
