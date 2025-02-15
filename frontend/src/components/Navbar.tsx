import { Link } from 'react-router-dom'
import { ShoppingCart, User, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { getCart } from '@/services/api'
import { toast } from 'sonner'
import { Cart as CartType } from '@/types'

const Navbar = () => {
  const token = localStorage.getItem('token')
  const [cartItemsCount, setCartItemsCount] = useState(0)

  useEffect(() => {
    if (token) {
      fetchCartItems()
    } else {
      setCartItemsCount(0)
    }
  }, [token])

  const fetchCartItems = async () => {
    try {
      const cart: CartType = await getCart()
      // Calculate total quantity of all items in cart
      const totalItems = cart.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      )
      setCartItemsCount(totalItems)
    } catch (error: any) {
      const errorData = error.response?.data
      toast.error(errorData?.message || 'Failed to fetch cart items')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <nav className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            QKart
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/products" className="text-gray-600 hover:text-blue-600 transition-colors">
              Products
            </Link>
            
            {token ? (
              <>
                <Link to="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                        {cartItemsCount}
                      </span>
                    )}
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 