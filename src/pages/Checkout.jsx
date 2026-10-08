import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Checkout({ cart, setCart }) {

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [card, setCard] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  const handlePayment = (e) => {
    e.preventDefault()

    // Demo payment only
    setCart([])

    navigate('/success')
  }

  return (
    <div className="checkout-page">

      <div className="checkout-card">

        <h1>💳 Checkout</h1>

        <p className="checkout-total">
          Total Amount: <strong>₹{total}</strong>
        </p>

        <form onSubmit={handlePayment}>

          <label>Cardholder Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Card Number</label>

          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            maxLength="19"
            value={card}
            onChange={(e) => setCard(e.target.value)}
            required
          />

          <div className="payment-row">

            <div>
              <label>Expiry</label>

              <input
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
              />
            </div>

            <div>
              <label>CVV</label>

              <input
                type="password"
                placeholder="123"
                maxLength="3"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </div>

          </div>

          <button className="payment-btn" type="submit">
            Pay ₹{total} →
          </button>

        </form>

        <p className="demo-payment">
          🔒 Demo payment for hackathon
        </p>

      </div>

    </div>
  )
}

export default Checkout