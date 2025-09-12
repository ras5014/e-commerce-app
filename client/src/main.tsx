import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import SignUpPage from './pages/signup';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUpPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,)
