import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { AuthAPI } from '@/features/auth/api'
import { Button } from '@/components/ui/Button'

export default function Login() {
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const [email, setEmail] = useState('user@example.com')
  const [password, setPassword] = useState('StrongPass123')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    AuthAPI.login(email, password)
      .then(() => {
        const redirect = params.get('redirect') || '/'

        navigate(redirect, { replace: true })
      })
      .catch((err) => {
        if (err.status === 401) {
          setError('Invalid credentionals')
        } else {
          setError('Something went wrong')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    setError(null)
  }, [email, password])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 mx-4">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">Вхід у систему</h1>
        <p className="text-sm text-gray-500 text-center mt-2">Введіть свої облікові дані</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="email..."
            />
          </div>

          <div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="password..."
            />
          </div>

          {/* <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white
                       hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Вхід...' : 'Увійти'}
          </button> */}
          <Button className='w-full font-semibold'>
            {loading ? 'Вхід...' : 'Увійти'}
          </Button>
        </form>

        {error && (
          <div className="mt-4 text-sm text-red-600 text-center">{error}</div>
        )}

        <div className='text-center mt-4'>
          <Link to={`/auth/register?redirect=${params.get('redirect') || '/'}`} 
          className='text-emerald-600'>
            Не зареєстровані
          </Link>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} SolarHub
        </div>
      </div>
    </div>
  )
}
