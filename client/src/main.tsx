import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import SignUpPage from './pages/signup';
import DarkModeLayout from './layouts/darkmode-layout';
import LoginPage from './pages/login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { store } from './state/store';
import { Provider } from 'react-redux'
import ProtectedRoute from './components/protected-route';
import Home from './pages/home';
import NavbarLayout from './layouts/navbar-layout';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <DarkModeLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <NavbarLayout />,
            children: [
              {
                index: true,
                element: <Home />
              }
            ]
          }
        ]
      },
      {
        path: "/signup",
        element: <SignUpPage />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>)
