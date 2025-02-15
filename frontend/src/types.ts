export interface Product {
  _id: string
  name: string
  category: string
  cost: number
  rating: number
  image: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  cartItems: CartItem[]
} 