import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from '../components/ProtectedRoute';
import Problems from '../pages/Problems';
import Practice from '../pages/Practice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
  path: '/problems',
  element: (
    <ProtectedRoute>
      <Problems />
    </ProtectedRoute>
  ),
},
{
  path: '/practice',
  element: (
    <ProtectedRoute>
      <Practice />
    </ProtectedRoute>
  ),
},

]);

export default router;
