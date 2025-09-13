import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import SignUpPage from './pages/signup';
import DarkModeLayout from './layouts/darkmode-layout';
import LoginPage from './pages/login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <DarkModeLayout />,
    children: [
      {
        path: "/signup",
        element: <SignUpPage />
      },
      {
        path: "/login",
        element: <LoginPage />
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,)
