import { Link } from 'react-router-dom'

function Success() {
  return (
    <div className="success-page">

      <div className="success-card">

        <div className="success-icon">
          🎉
        </div>

        <h1>Shopping Successful!</h1>

        <p>
          Your order has been placed successfully.
        </p>

        <p>
          Thank you for supporting our artisans ❤️
        </p>

        <Link to="/" className="primary-btn">
          Continue Shopping →
        </Link>

      </div>

    </div>
  )
}

export default Success