import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-[600px] flex items-center justify-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-6">Welcome to QKart</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover a world of endless possibilities. Shop the latest trends in fashion, electronics, and more.
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100">
              Explore Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            image="https://images.unsplash.com/photo-1580169980114-ccd0babfa840?q=80&w=2070"
            title="Fast Delivery"
            description="Get your orders delivered to your doorstep within 24 hours"
          />
          <FeatureCard
            image="https://images.unsplash.com/photo-1612103198005-b238154f4590?q=80&w=2069"
            title="Secure Payments"
            description="Shop with confidence using our secure payment systems"
          />
          <FeatureCard
            image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070"
            title="24/7 Support"
            description="Our customer service team is always here to help you"
          />
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 px-4 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <CategoryCard
            image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999"
            title="Electronics"
            link="/products?category=electronics"
          />
          <CategoryCard
            image="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071"
            title="Fashion"
            link="/products?category=fashion"
          />
          <CategoryCard
            image="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070"
            title="Accessories"
            link="/products?category=accessories"
          />
          <CategoryCard
            image="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070"
            title="Home & Living"
            link="/products?category=home"
          />
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter for the latest products and exclusive offers
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Feature Card Component
const FeatureCard = ({ image, title, description }: { image: string; title: string; description: string }) => (
  <div className="rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
)

// Category Card Component
const CategoryCard = ({ image, title, link }: { image: string; title: string; link: string }) => (
  <Link to={link} className="group">
    <div className="rounded-lg overflow-hidden shadow-lg relative">
      <img src={image} alt={title} className="w-full h-64 object-cover transition-transform group-hover:scale-110" />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h3 className="text-white text-xl font-semibold">{title}</h3>
      </div>
    </div>
  </Link>
)

export default Home 