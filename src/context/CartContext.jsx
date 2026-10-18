import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('restaurant-cart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('restaurant-cart', JSON.stringify(cartItems))
  }, [cartItems])

  function addToCart(item) {
    setCartItems(current => {
      const existingItem = current.find(
        cartItem => cartItem.id === item.id
      )

      if (existingItem) {
        return current.map(cartItem =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + item.quantity
              }
            : cartItem
        )
      }

      return [...current, item]
    })
  }

  function removeFromCart(itemId) {
    setCartItems(current =>
      current.filter(item => item.id !== itemId)
    )
  }

  function updateQuantity(itemId, quantity) {
    if (quantity < 1 || quantity > 99) return

    setCartItems(current =>
      current.map(item =>
        item.id === itemId
          ? { ...item, quantity }
          : item
      )
    )
  }

  function clearCart() {
    setCartItems([])
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }

  return context
}

export { CartProvider, useCart }