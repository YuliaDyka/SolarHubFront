import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
import { authRequireLoader, getUserLoader, redirectIfAuth } from './loaders/authLoader'

const Home = lazy(() => import('@/pages/HomePage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const MainLayout = lazy(() => import('@/layouts/MainLayout'))

export const router = createBrowserRouter([
  {
    path: '',
    element: <MainLayout />,
    loader: getUserLoader,
    children: [
      { index: true, Component: Home },
      { loader: authRequireLoader, children: [{ path: 'fuck', element: <div>FUCKING</div> }] },
      { path: '*', element: <NotFoundPage /> },
    ],
  },

  {
    path: 'auth',
    loader: redirectIfAuth,
    children: [
      {
        path: 'login',
        Component: LoginPage,
      },
      {
        path: 'register',
        Component: RegisterPage,
      },
    ],
  },
])
