import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartItem from './CartItem'
import '../styles/cart_drawer.css'

function CartDrawer({ isOpen, onClose }) {
  const { cartItems, cartTotal, clearCart } = useCart()

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      <div
        className="cart-overlay"
        onClick={onClose}
      ></div>

      <aside
        className="cart-panel open"
        role="dialog"
        aria-modal="true"
        aria-label="Кошик"
      >
        <div className="cart-panel-header">
          <div className="cart-panel-title">
            <i className="bi bi-cart3"></i>
            <span>Кошик</span>
          </div>

          <button
            type="button"
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Закрити кошик"
          >
            ×
          </button>
        </div>

        <div className="cart-items-container">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              Кошик порожній
            </div>
          ) : (
            cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))
          )}
        </div>


        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span className="cart-total-label">Разом:</span>
              <strong className="cart-total-val">
                {cartTotal} грн
              </strong>
            </div>

            <button
              type="button"
              className="cart-clear-btn"
              onClick={clearCart}
            >
              <i className="bi bi-trash"></i>
              Очистити кошик
            </button>

            <Link
              to="/checkout"
              className="cart-checkout-btn"
              onClick={onClose}
            >
              Оформити замовлення
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}

export default CartDrawer