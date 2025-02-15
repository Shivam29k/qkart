import { Product } from '@/types'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { addToCart } from '@/services/api'
import { toast } from 'sonner'
import { useState } from 'react'
import { Loader2, ShoppingCart, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [loading, setLoading] = useState(false)

  const handleAddToCart = async () => {
    try {
      setLoading(true)
      await addToCart(product._id, 1)
      toast.success('Added to cart')
    } catch (error: any) {
      const errorData = error.response?.data
      toast.error(errorData?.message || 'Failed to add to cart')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        {/* Category Badge */}
        <Badge 
          className="absolute top-2 left-2 capitalize"
          variant="secondary"
        >
          {product.category}
        </Badge>
      </div>

      <CardContent className="p-4">
        {/* Product Details */}
        <div className="mb-2">
          <h3 className="font-semibold text-lg line-clamp-1 mb-1">
            {product.name}
          </h3>
        </div>

        {/* Price and Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold">₹{product.cost}</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard 