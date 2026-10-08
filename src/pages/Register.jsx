import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setMessage('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
      return
    }

    setMessage('Account created! You can now login.')
    
    setTimeout(() => {
      navigate('/login')
    }, 1500)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">✨</div>

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Join the CraftConnect community
        </p>

        <form onSubmit={handleRegister}>

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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="6"
            required
          />

          <button type="submit" className="auth-btn">
            Create Account →
          </button>

        </form>

        {message && (
          <p className="auth-message">{message}</p>
        )}

        <p className="switch-auth">
          Already have an account?{' '}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  )
}

export default Register