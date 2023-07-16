import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import NotFound from './pages/public/NotFound';
import customerRoutes from './routes/customer/customerRoutes';
import agentRoutes from './routes/agent/agentRoutes';
import publicRoutes from './routes/public/publicRoutes';

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {publicRoutes}
      {agentRoutes}
      {customerRoutes}
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

export default appRouter;
