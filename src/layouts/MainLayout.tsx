import { Outlet, useLoaderData } from 'react-router'
// import Header from './Header'
// import Footer from './Footer'
import { useAuth } from '@/context/AuthContext'
import type { User } from '@/dto/user.dto'
import { useEffect } from 'react'
import ScrollToTop from '@/utils/ScrollToTop'
import SideBar from '../components/Sidebar'

const MainLayout = () => {
  const loaderData = useLoaderData() as { user: User }

  if (loaderData) {
    const { user: loadedUser } = loaderData
    const { setUser } = useAuth()

    useEffect(() => {
      setUser(loadedUser)
    }, [loadedUser])
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-dark text-text-primary">
      <ScrollToTop />
      <div className="flex">
        <SideBar />
        <main className="p-4 grow ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
