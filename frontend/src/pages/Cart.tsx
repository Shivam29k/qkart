import { useEffect, useState } from 'react'
import { getCart, updateCart, checkout } from '@/services/api'
import { Cart as CartType } from '@/types'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const Cart = () => {
  const [cart, setCart] = useState<CartType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const data = await getCart()
      setCart(data)
    } catch (error: any) {
      const errorData = error.response?.data
      toast.error(errorData?.message || 'Failed to fetch cart')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    try {
      if (quantity === 0) {
        // Show confirmation before removing item
        if (!confirm('Are you sure you want to remove this item?')) {
          return
        }
      }
      await updateCart(productId, quantity)
      await fetchCart()
      toast.success('Cart updated successfully')
    } catch (error: any) {
      const errorData = error.response?.data
      toast.error(errorData?.message || 'Failed to update cart')
    }
  }

  const handleCheckout = async () => {
    try {
      await checkout()
      toast.success('Checkout successful')
      await fetchCart()
    } catch (error: any) {
      const errorData = error.response?.data
      toast.error(errorData?.message || 'Checkout failed')
    }
  }

  const calculateTotal = () => {
    if (!cart?.cartItems.length) return 0
    return cart.cartItems.reduce((total, item) => {
      return total + (item.product.cost * item.quantity)
    }, 0)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!cart?.cartItems.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-4">Add some items to your cart to see them here.</p>
          <Link to="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.cartItems.map(({ product, quantity }) => (
              <div 
                key={product._id} 
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg bg-white shadow-sm"
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <p className="text-blue-600 font-semibold">${product.cost.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Subtotal: ${(product.cost * quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleUpdateQuantity(product._id, quantity - 1)}
                    className="h-8 w-8"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleUpdateQuantity(product._id, quantity + 1)}
                    className="h-8 w-8"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleUpdateQuantity(product._id, 0)}
                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-4 bg-white shadow-sm sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-lg">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleCheckout} 
                className="w-full"
                size="lg"
              >
                Proceed to Checkout
              </Button>

              <Link to="/products">
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart 