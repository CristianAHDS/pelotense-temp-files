import AppTheme from './theme/AppTheme'
import AdminLogin from './components/AdminLogin'
import AdminPanel from './components/AdminPanel'
import PublicDownload from './components/PublicDownload'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { FilesProvider } from './contexts/FilesContext'

function AppRouter() {
  const { login, logout, isAuthenticated } = useAuth()
  const params = new URLSearchParams(window.location.search)
  const fileId = params.get('id')

  if (fileId) return <PublicDownload />

  return (
    <div className="min-h-screen">
      {isAuthenticated ? (
        <AdminPanel logout={logout} />
      ) : (
        <AdminLogin onLogin={login} />
      )}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <FilesProvider>
        <AppRouter />
      </FilesProvider>
    </AuthProvider>
  )
}
