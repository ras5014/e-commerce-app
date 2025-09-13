import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import SignUpPage from './pages/signup';
import DarkModeLayout from './layouts/darkmode-layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <DarkModeLayout />,
    children: [
      {
        path: "/signup",
        element: <SignUpPage />
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,)
