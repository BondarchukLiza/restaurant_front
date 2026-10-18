import { useCart } from '../context/CartContext'
import '../styles/cart_item.css'
import { dishImages } from '../data/dishImages'

function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart()
  const dishImage = dishImages.find(
    image => image.dish === item.dishId && image.is_main
  )?.image

  const selectedOptions = [
    ...(item.ingredients ?? []),
    ...(item.addons ?? [])
  ]

  return (
    <div className="cart-item">
      <div className="cart-item__info">
        <div className="cart-item__heading">
          {dishImage && (
            <img
              src={dishImage}
              alt={item.name}
              className="cart-item__image"
            />
          )}

          <h3>{item.name}</h3>
        </div>
        {selectedOptions.length > 0 && (
          <div className="cart-item__options">
            {selectedOptions.map((option, index) => (
              <p key={`${option.id}-${index}`}>
                {option.groupName && `${option.groupName}: `}
                {option.name}
                {option.price !== 0 && ` (${option.price > 0 ? '+' : ''}${option.price} грн)`}
              </p>
            ))}
          </div>
        )}

        <p className="cart-item__unit-price">
          Ціна за порцію: {item.unitPrice} грн
        </p>
      </div>

      <div className="cart-item__controls">
        <div className="cart-item__quantity">
          <button
            type="button"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            aria-label="Зменшити кількість"
          >
            <i className="bi bi-dash"></i>
          </button>

          <span>{item.quantity}</span>

          <button
            type="button"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            disabled={item.quantity >= 99}
            aria-label="Збільшити кількість"
          >
            <i className="bi bi-plus"></i>
          </button>
        </div>

        <strong className="cart-item__total">
          {item.unitPrice * item.quantity} грн
        </strong>

        <button
          type="button"
          className="cart-item__remove"
          onClick={() => removeFromCart(item.id)}
          aria-label={`Видалити ${item.name}`}
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  )
}

export default CartItem