import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { Website } from './Website';
import { Dashboard } from './Dashboard';
import { BookingsList } from './components/admin/BookingsList';
import { ClubSettings } from './components/admin/settings/ClubSettings';
import { AdminDashboard } from './pages/AdminDashboard';

const router = createBrowserRouter([
  {
    path: '/website',
    element: <Website />
  },
  {
    path: '/',
    element: <Dashboard />,
    children: [
      {
        path: '/',
        element: <AdminDashboard />
      },
      {
        path: '/bookings',
        element: <BookingsList bookings={[]} onStatusChange={() => {}} />
      },
      {
        path: '/members',
        element: <div>Members Management</div>
      },
      {
        path: '/tournaments',
        element: <div>Tournaments Management</div>
      },
      {
        path: '/settings',
        element: <ClubSettings />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);