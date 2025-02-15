import { useEffect, useState } from 'react'
import { getProducts } from '@/services/api'
import { Product } from '@/types'
import ProductCard from '@/components/ProductCard'
import { toast } from 'sonner'
import { Loader2, Search, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [categories, setCategories] = useState<string[]>(['all'])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
        
        // Extract unique categories from products with proper typing
        const productCategories = data.map((product: Product) => product.category)
        const uniqueCategories = ['all', ...Array.from(new Set(productCategories))] as string[]
        setCategories(uniqueCategories)
      } catch (error: any) {
        const errorData = error.response?.data
        toast.error(errorData?.message || 'Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading products...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Our Products</h1>
        <p className="text-muted-foreground">
          Discover our collection of high-quality products
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="sm:w-auto w-full"
          >
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            Filters
          </Button>
        </div>

        {/* Category Filters */}
        {showFilters && (
          <div className="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-lg">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="h-8 capitalize"
              >
                {category === 'all' ? 'All Products' : category}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="mb-6 text-sm text-muted-foreground">
        Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        {selectedCategory !== 'all' && (
          <span> in <span className="font-medium capitalize">{selectedCategory}</span></span>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-4 text-muted-foreground">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium">No products found</h3>
            <p className="text-sm">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Products 