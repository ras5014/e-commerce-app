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
            index: true,
            element: <div>Home Page</div>
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
