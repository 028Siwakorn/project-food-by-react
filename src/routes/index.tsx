import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Cart from '../pages/Cart'

const router = createBrowserRouter ([
  {
    path: '/',
    // Main Layout
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/cart',
        element: <Cart />
      }
    ]
  }
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}