import { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Success from './pages/Success'
import Artisan from './pages/Artisan'

import './App.css'


// ================= HOME PAGE =================

function Home({ cart, setCart }) {

  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  // Check logged-in user
  useEffect(() => {

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    // Listen for login/logout
    const { data: listener } =
      supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user ?? null)
        }
      )

    return () => {
      listener.subscription.unsubscribe()
    }

  }, [])


  // Add product to cart
  const addToCart = (product) => {

    setCart((currentCart) => [
      ...currentCart,
      product
    ])

    alert(`${product.name} added to cart! 🛒`)
  }


  // Logout
  const handleLogout = async () => {

    await supabase.auth.signOut()

    navigate('/login')
  }


  return (

    <div className="app">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div className="logo">
          🛍️ <span>CraftConnect</span>
        </div>


        <div className="nav-links">

          <a href="#home">
            Home
          </a>

          <a href="#products">
            Products
          </a>

          <a href="#categories">
            Categories
          </a>

          <a href="#artisans">
            Artisans
          </a>

        </div>


        {/* CART */}

        <Link
          to="/cart"
          className="cart-btn"
        >
          🛒 Cart ({cart.length})
        </Link>


        {/* LOGIN / LOGOUT */}

        {user ? (

          <div className="user-area">

            <span className="user-email">
              👤 {user.email}
            </span>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        ) : (

          <Link
            to="/login"
            className="login-btn"
          >
            Login
          </Link>

        )}

      </nav>


      {/* ================= HERO ================= */}

      <section
        className="hero-section"
        id="home"
      >

        <div className="hero-content">

          <p className="tagline">
            ✨ Handmade with love
          </p>


          <h1>
            Discover the beauty of

            <span>
              handmade products.
            </span>
          </h1>


          <p className="hero-text">
            Explore unique creations made by
            talented local artisans.
            Support small businesses and
            bring something special home.
          </p>


          <div className="hero-buttons">

            <a
              href="#products"
              className="primary-btn"
            >
              Explore Products →
            </a>


            {/* BECOME AN ARTISAN */}

            <button
              className="secondary-btn"
              onClick={() => navigate('/artisan')}
            >
              Become an Artisan
            </button>

          </div>

        </div>


        <div className="hero-art">

          <div className="art-circle">
            🧶
          </div>


          <div className="floating-card card-one">
            🏺 Handmade Pottery
          </div>


          <div className="floating-card card-two">
            💍 Artisan Jewelry
          </div>

        </div>

      </section>


      {/* ================= CATEGORIES ================= */}

      <section
        className="categories"
        id="categories"
      >

        <p className="section-label">
          EXPLORE
        </p>


        <h2>
          Shop by Category
        </h2>


        <div className="category-grid">


          <div className="category-card">

            <span>🧶</span>

            <h3>
              Crafts
            </h3>

            <p>
              Handmade creations
            </p>

          </div>


          <div className="category-card">

            <span>🏺</span>

            <h3>
              Pottery
            </h3>

            <p>
              Beautiful ceramic art
            </p>

          </div>


          <div className="category-card">

            <span>💍</span>

            <h3>
              Jewelry
            </h3>

            <p>
              Unique artisan pieces
            </p>

          </div>


          <div className="category-card">

            <span>👜</span>

            <h3>
              Fashion
            </h3>

            <p>
              Handcrafted fashion
            </p>

          </div>


          <div className="category-card">

            <span>🪵</span>

            <h3>
              Woodwork
            </h3>

            <p>
              Traditional craftsmanship
            </p>

          </div>


          <div className="category-card">

            <span>🎨</span>

            <h3>
              Artwork
            </h3>

            <p>
              Creative handmade art
            </p>

          </div>


        </div>

      </section>


      {/* ================= PRODUCTS ================= */}

      <section
        className="products"
        id="products"
      >

        <p className="section-label">
          OUR COLLECTION
        </p>


        <h2>
          Featured Products
        </h2>


        <div className="product-grid">


          {/* CLAY VASE */}

          <div className="product-card">

            <div className="product-image">

              <img
                src="/images/clay-vase.jpg"
                alt="Traditional Clay Vase"
              />

            </div>


            <div className="product-info">

              <p>
                Handmade Pottery
              </p>

              <h3>
                Traditional Clay Vase
              </h3>

              <strong>
                ₹799
              </strong>


              <button
                className="primary-btn product-btn"
                onClick={() =>
                  addToCart({
                    name: 'Traditional Clay Vase',
                    category: 'Handmade Pottery',
                    price: 799,
                    image: '/images/clay-vase.jpg'
                  })
                }
              >
                Add to Cart 🛒
              </button>

            </div>

          </div>


          {/* JUTE BAG */}

          <div className="product-card">

            <div className="product-image">

              <img
                src="/images/jute-bag.jpg"
                alt="Artisan Jute Bag"
              />

            </div>


            <div className="product-info">

              <p>
                Handcrafted Fashion
              </p>

              <h3>
                Artisan Jute Bag
              </h3>

              <strong>
                ₹599
              </strong>


              <button
                className="primary-btn product-btn"
                onClick={() =>
                  addToCart({
                    name: 'Artisan Jute Bag',
                    category: 'Handcrafted Fashion',
                    price: 599,
                    image: '/images/jute-bag.jpg'
                  })
                }
              >
                Add to Cart 🛒
              </button>

            </div>

          </div>


          {/* NECKLACE */}

          <div className="product-card">

            <div className="product-image">

              <img
                src="/images/traditional-necklace.jpg"
                alt="Traditional Necklace"
              />

            </div>


            <div className="product-info">

              <p>
                Handmade Jewelry
              </p>

              <h3>
                Traditional Necklace
              </h3>

              <strong>
                ₹999
              </strong>


              <button
                className="primary-btn product-btn"
                onClick={() =>
                  addToCart({
                    name: 'Traditional Necklace',
                    category: 'Handmade Jewelry',
                    price: 999,
                    image: '/images/traditional-necklace.jpg'
                  })
                }
              >
                Add to Cart 🛒
              </button>

            </div>

          </div>


        </div>

      </section>


      {/* ================= ARTISAN ================= */}

      <section
        className="artisan-section"
        id="artisans"
      >

        <div>

          <p className="section-label">
            FOR CREATORS
          </p>


          <h2>
            Are you an artisan?
          </h2>


          <p>
            Turn your creativity into a business.
            Showcase your handmade products and
            reach customers beyond your local
            community.
          </p>


          {/* START SELLING */}

          <button
            className="primary-btn"
            onClick={() => navigate('/artisan')}
          >
            Start Selling →
          </button>

        </div>


        <div className="artisan-icon">
          👨‍🎨
        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer>

        <h3>
          🛍️ CraftConnect
        </h3>


        <p>
          Connecting artisans with the world.
        </p>


        <p className="copyright">
          © 2026 CraftConnect.
          Made for artisans ❤️
        </p>

      </footer>

    </div>

  )
}


// ================= MAIN APP =================

function App() {

  // Cart is maintained here
  // so all pages share the same cart

  const [cart, setCart] = useState(() => {

    const savedCart =
      localStorage.getItem('cart')

    return savedCart
      ? JSON.parse(savedCart)
      : []

  })


  // Save cart to localStorage

  useEffect(() => {

    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    )

  }, [cart])


  return (

    <Routes>


      {/* HOME */}

      <Route
        path="/"
        element={
          <Home
            cart={cart}
            setCart={setCart}
          />
        }
      />


      {/* LOGIN */}

      <Route
        path="/login"
        element={<Login />}
      />


      {/* REGISTER */}

      <Route
        path="/register"
        element={<Register />}
      />


      {/* CART */}

      <Route
        path="/cart"
        element={
          <Cart
            cart={cart}
            setCart={setCart}
          />
        }
      />


      {/* CHECKOUT */}

      <Route
        path="/checkout"
        element={
          <Checkout
            cart={cart}
            setCart={setCart}
          />
        }
      />


      {/* SUCCESS */}

      <Route
        path="/success"
        element={<Success />}
      />


      {/* ARTISAN */}

      <Route
        path="/artisan"
        element={<Artisan />}
      />


    </Routes>

  )
}


export default App