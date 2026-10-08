import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setMessage('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
      return
    }

    navigate('/')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">🛍️</div>

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to continue to CraftConnect
        </p>

        <form onSubmit={handleLogin}>

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-btn">
            Login →
          </button>

        </form>

        {message && (
          <p className="auth-message">{message}</p>
        )}

        <p className="switch-auth">
          Don't have an account?{' '}
          <Link to="/register">Create Account</Link>
        </p>

      </div>
    </div>
  )
}

export default Login