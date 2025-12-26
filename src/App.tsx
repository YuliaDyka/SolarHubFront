import { RouterProvider } from 'react-router'
import './App.css'
import {router} from './routes/AppRouter'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  )
}

export default App
