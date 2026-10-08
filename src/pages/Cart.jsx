import { Link, useNavigate } from 'react-router-dom'

function Cart({ cart, setCart }) {
  const navigate = useNavigate()

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index)
    setCart(updatedCart)
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="cart-page">
      <div className="cart-container">

        <h1>🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some beautiful handmade products!</p>

            <Link to="/" className="primary-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {cart.map((item, index) => (
              <div className="cart-item" key={index}>

                <div className="cart-product-image">
                  {item.image}
                </div>

                <div className="cart-product-info">
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                  <strong>₹{item.price}</strong>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>

              </div>
            ))}

            <div className="cart-summary">
              <h2>Total: ₹{total}</h2>

              <button
                className="primary-btn"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout →
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default Cart