import { NavLink, useLocation, useNavigate } from 'react-router'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'
import { useAuth } from '@/context/AuthContext'

const navItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Clients', to: '/clients' },
  { label: 'Projects', to: '/projects' },
  { label: 'Inventory', to: '/inventory' },
  { label: 'Employees', to: '/employees' },
  { label: 'Finance', to: '/finance' },
]

const Sidebar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation();

  const handleLogout = async () => {
    await logout()
    navigate(`/auth/login?redirect=${location.pathname}`)
  }

  return (
    <aside className="flex h-screen w-64 flex-col bg-gray-900 text-gray-200 fixed left-0">
      <div className="border-b border-gray-800 px-6 py-4">
        <div className="text-lg font-semibold text-white">SolarHub</div>
        <div className="text-xs text-gray-400">Management system</div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center rounded-md px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  )
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-gray-800 px-4 py-4">
        {user ? (
          <>
            <div className="mb-3">
              <div className="text-sm font-medium text-white">{user?.username}</div>
              <div className="text-xs text-gray-400">{user?.email}</div>
            </div>

            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-gray-800"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button variant="primary" className="w-full">
            <NavLink to="/login">Login</NavLink>
          </Button>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
