import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
import { authRequireLoader, getUserLoader, redirectIfAuth } from './loaders/authLoader'
import { ClientDetailsPage } from '@/pages/clients/ClientsDetailsPage'

const Home = lazy(() => import('@/pages/HomePage'))
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'))
const ClientsPage = lazy(() => import('@/pages/clients/ClientsPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const MainLayout = lazy(() => import('@/layouts/MainLayout'))

export const router = createBrowserRouter([
  {
    path: '',
    element: <MainLayout />,
    loader: getUserLoader,
    children: [
      { index: true, Component: Home },
      {
        loader: authRequireLoader,
        children: [
          {
            path: 'clients',
            children: [
              { index: true, Component: ClientsPage },
              { path: ':id', Component: ClientDetailsPage },
            ],
          },
        ],
      },
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
