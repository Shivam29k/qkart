import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { 
  MapPin, 
  Wallet, 
  Mail, 
  User, 
  Building, 
  ShoppingBag,
  CreditCard,
  Settings,
  ChevronRight
} from 'lucide-react'
import { toast } from 'sonner'


const UserProfile = () => {
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  
  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
  }, [token, navigate])

  useEffect(() => {
    toast.info('Backend integration is not ready yet. Showing mock data.', {
      duration: 4000,
    })
  }, [])

  const quickActions = [
    { icon: ShoppingBag, label: 'My Orders', link: '/orders' },
    { icon: Wallet, label: 'Transaction History', link: '/transactions' },
    { icon: CreditCard, label: 'Payment Methods', link: '/payments' },
    { icon: Settings, label: 'Account Settings', link: '/settings' },
  ]

  // Mock data
  const mockUserData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    walletMoney: 5000,
    address: '123 Main Street, City, Country'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Notification Banner */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1 text-sm text-blue-700">
              <p className="font-medium">Development Notice</p>
              <p>Backend integration is not ready yet. Showing mock data for demonstration purposes.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{mockUserData.name}</h1>
                <p className="text-muted-foreground">{mockUserData.email}</p>
              </div>
            </div>
            <div className="bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-medium">
              Active Member
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => toast.info('This feature is coming soon!')}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <action.icon className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium">{action.label}</span>
                <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{mockUserData.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{mockUserData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Building className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium">January 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Wallet */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Wallet Balance</h2>
              <div className="bg-primary/5 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Wallet className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium text-primary">Available Balance</span>
                </div>
                <p className="text-3xl font-bold text-primary">
                  ₹{mockUserData.walletMoney.toLocaleString()}
                </p>
                <Button 
                  className="mt-4" 
                  variant="outline"
                  onClick={() => toast.info('Transactions feature coming soon!')}
                >
                  View Transactions
                </Button>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Delivery Address</h2>
                <Button 
                  variant="outline" 
                  onClick={() => toast.info('Address update feature coming soon!')}
                  size="sm"
                >
                  Edit Address
                </Button>
              </div>
              
              <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                <p className="flex-1">{mockUserData.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile 