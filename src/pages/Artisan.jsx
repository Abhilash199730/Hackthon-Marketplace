import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function Artisan() {

  const [formData, setFormData] = useState({
    fullName: '',
    craftType: '',
    email: '',
    phone: '',
    productName: '',
    productCategory: '',
    productPrice: '',
    productDescription: ''
  })

  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [message, setMessage] = useState('')

  // -----------------------------------------
  // GET LOGGED-IN USER'S REGISTERED PRODUCTS
  // -----------------------------------------

  const fetchRegistrations = async () => {

    setLoadingProducts(true)

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if (userError || !user) {
      setLoadingProducts(false)
      return
    }

    const { data, error } = await supabase
      .from('artisan_registrations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', {
        ascending: false
      })

    if (error) {
      console.error('Fetch error:', error)
    } else {
      setRegistrations(data || [])
    }

    setLoadingProducts(false)
  }

  // Load registrations when page opens
  useEffect(() => {
    fetchRegistrations()
  }, [])


  // -----------------------------------------
  // HANDLE INPUT CHANGES
  // -----------------------------------------

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }


  // -----------------------------------------
  // REGISTER ARTISAN + PRODUCT
  // -----------------------------------------

  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)
    setMessage('')

    // Check logged-in user
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if (userError || !user) {

      setMessage(
        '❌ Please login before registering as an artisan.'
      )

      setLoading(false)

      return
    }


    // Insert registration into Supabase
    const { data, error } = await supabase
      .from('artisan_registrations')
      .insert({

        user_id: user.id,

        full_name: formData.fullName,
        craft_type: formData.craftType,

        email: formData.email,
        phone: formData.phone,

        product_name: formData.productName,
        product_category: formData.productCategory,

        product_price: Number(formData.productPrice),

        product_description:
          formData.productDescription

      })
      .select()
      .single()


    // If error
    if (error) {

      console.error('Registration error:', error)

      setMessage(
        '❌ Registration failed: ' + error.message
      )

      setLoading(false)

      return
    }


    // Add newly registered product immediately
    setRegistrations((previous) => [
      data,
      ...previous
    ])


    // Success message
    setMessage(
      '🎉 Artisan and product registered successfully!'
    )


    // Clear form
    setFormData({
      fullName: '',
      craftType: '',
      email: '',
      phone: '',
      productName: '',
      productCategory: '',
      productPrice: '',
      productDescription: ''
    })

    setLoading(false)

  }


  return (

    <div className="artisan-page">

      <div className="artisan-card">

        {/* -------------------------------- */}
        {/* HEADER */}
        {/* -------------------------------- */}

        <div className="artisan-icon">
          👨‍🎨
        </div>

        <h1>
          Become an Artisan
        </h1>

        <p>
          Showcase your handmade products and
          connect with customers through
          CraftConnect.
        </p>


        {/* -------------------------------- */}
        {/* REGISTRATION FORM */}
        {/* -------------------------------- */}

        <form onSubmit={handleSubmit}>

          <h2 className="form-section-title">
            Artisan Details
          </h2>


          <label>
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />


          <label>
            Craft Type
          </label>

          <input
            type="text"
            name="craftType"
            placeholder="Example: Pottery, Jewelry, Woodwork"
            value={formData.craftType}
            onChange={handleChange}
            required
          />


          <label>
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />


          <label>
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />


          {/* PRODUCT DETAILS */}

          <h2 className="form-section-title">
            Product Details
          </h2>


          <label>
            Product Name
          </label>

          <input
            type="text"
            name="productName"
            placeholder="Example: Traditional Clay Vase"
            value={formData.productName}
            onChange={handleChange}
            required
          />


          <label>
            Product Category
          </label>

          <input
            type="text"
            name="productCategory"
            placeholder="Example: Pottery, Jewelry, Fashion"
            value={formData.productCategory}
            onChange={handleChange}
            required
          />


          <label>
            Product Price
          </label>

          <input
            type="number"
            name="productPrice"
            placeholder="Enter product price"
            value={formData.productPrice}
            onChange={handleChange}
            min="1"
            required
          />


          <label>
            Product Description
          </label>

          <textarea
            name="productDescription"
            placeholder="Describe your handmade product..."
            value={formData.productDescription}
            onChange={handleChange}
            rows="4"
          />


          {/* SUBMIT BUTTON */}

          <button
            type="submit"
            className="artisan-submit"
            disabled={loading}
          >

            {loading
              ? 'Registering...'
              : 'Register as Artisan →'
            }

          </button>


          {/* MESSAGE */}

          {message && (

            <p className="artisan-message">
              {message}
            </p>

          )}

        </form>


        {/* -------------------------------- */}
        {/* MY REGISTERED PRODUCTS */}
        {/* -------------------------------- */}

        <div className="my-products-section">

          <h2 className="my-products-title">
            🛍️ My Registered Products
          </h2>

          <p className="my-products-subtitle">
            Products registered through your
            CraftConnect account.
          </p>


          {/* LOADING */}

          {loadingProducts && (

            <div className="products-loading">
              Loading your products...
            </div>

          )}


          {/* NO PRODUCTS */}

          {!loadingProducts &&
            registrations.length === 0 && (

              <div className="no-products">

                <div className="no-products-icon">
                  🎨
                </div>

                <h3>
                  No products registered yet
                </h3>

                <p>
                  Register your first handmade
                  product using the form above.
                </p>

              </div>

            )}


          {/* PRODUCTS */}

          {!loadingProducts &&
            registrations.length > 0 && (

              <div className="my-products-list">

                {registrations.map((product) => (

                  <div
                    className="my-product-card"
                    key={product.id}
                  >

                    <div className="my-product-icon">
                      🎁
                    </div>


                    <div className="my-product-info">

                      <span className="my-product-label">
                        REGISTERED PRODUCT
                      </span>

                      <h3>
                        {product.product_name}
                      </h3>

                      <p>
                        🎨 {product.product_category}
                      </p>

                      <strong>
                        ₹{product.product_price}
                      </strong>

                      {product.product_description && (

                        <div className="my-product-description">
                          {product.product_description}
                        </div>

                      )}

                    </div>


                    <div className="registered-status">
                      ✓ Registered
                    </div>

                  </div>

                ))}

              </div>

            )}

        </div>


        {/* -------------------------------- */}
        {/* BACK HOME */}
        {/* -------------------------------- */}

        <div className="artisan-back-home">

          <Link
            to="/"
            className="back-home-btn"
          >
            ← Back to Home
          </Link>

        </div>

      </div>

    </div>

  )
}

export default Artisan