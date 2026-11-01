import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import '../styles/checkout.css'

function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart()

  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    deliveryMethod: 'delivery',
    deliveryAddress: '',
    orderComment: ''
  })

  const [completedOrder, setCompletedOrder] = useState(null)

  function handleChange(event) {
    const { name, value } = event.target

    setFormData(current => ({
      ...current,
      [name]: value
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (cartItems.length === 0) return

    if (!formData.customerName.trim()) {
      alert("Введіть ваше ім'я")
      return
    }

    if (
      formData.deliveryMethod === 'delivery' &&
      !formData.deliveryAddress.trim()
    ) {
      alert("Введіть адресу доставки")
      return
    }

    const order = {
      customerName: formData.customerName.trim(),
      customerPhone: formData.customerPhone,
      deliveryMethod: formData.deliveryMethod,
      deliveryAddress: formData.deliveryMethod === 'delivery'
        ? formData.deliveryAddress.trim()
        : '',
      orderComment: formData.orderComment.trim(),
      items: cartItems.map(item => ({
        ...item,
        ingredients: [...(item.ingredients ?? [])],
        addons: [...(item.addons ?? [])]
      })),
      total: cartTotal
    }

    setCompletedOrder(order)
    clearCart()
  }

  if (completedOrder) {
    return (
      <section className="checkout-page container">
        <div className="checkout-success">
          <i className="bi bi-check-circle-fill"></i>

          <h1>Замовлення оформлено!</h1>

          <p>
            Дякуємо за замовлення, {completedOrder.customerName}!
          </p>

          <p>
            {completedOrder.deliveryMethod === 'delivery'
              ? `Спосіб отримання: доставка за адресою ${completedOrder.deliveryAddress}`
              : 'Спосіб отримання: самовивіз'}
          </p>

          <div className="checkout-success-items">
            <h2>Склад замовлення</h2>

            {completedOrder.items.map(item => (
              <div className="checkout-success-item" key={item.id}>
                <div className="checkout-success-item__info">
                  <h3>{item.name}</h3>

                  {[
                    ...(item.ingredients ?? []),
                    ...(item.addons ?? [])
                  ].map((option, index) => (
                    <p key={`${option.id}-${index}`}>
                      {option.groupName && `${option.groupName}: `}
                      {option.name}
                      {option.price !== 0 &&
                        ` (${option.price > 0 ? '+' : ''}${option.price} грн)`}
                    </p>
                  ))}

                  <span>Кількість: {item.quantity}</span>
                </div>
                <strong>{item.unitPrice * item.quantity} грн</strong>
              </div>
            ))}
          </div>

          <p className="checkout-success-total">
            Загальна вартість:
            <strong> {completedOrder.total} грн</strong>
          </p>

          <Link to="/menu" className="checkout-menu-btn">
            Повернутися до меню
          </Link>
        </div>
      </section>
    )
  }

  if (cartItems.length === 0) {
    return (
      <section className="checkout-page container">
        <h1>Оформлення замовлення</h1>

        <div className="checkout-empty">
          <i className="bi bi-cart-x"></i>

          <h2>Ваш кошик порожній</h2>

          <p>
            Додайте страви з меню, щоб оформити замовлення.
          </p>

          <Link to="/menu" className="checkout-menu-btn">
            Перейти до меню
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="checkout-page container">
      <h1>Оформлення замовлення</h1>

      <div className="checkout-layout">
        <div className="checkout-form-section">
          <h2>Контактні дані</h2>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="checkout-field">
              <label htmlFor="customer-name">Ваше ім'я</label>

              <input
                type="text"
                id="customer-name"
                name="customerName"
                placeholder="Введіть ваше ім'я"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="checkout-field">
              <label htmlFor="customer-phone">Номер телефону</label>

              <input
                type="tel"
                id="customer-phone"
                name="customerPhone"
                placeholder="+380XXXXXXXXX"
                value={formData.customerPhone}
                onChange={handleChange}
                pattern="\+380[0-9]{9}"
                title="Введіть номер у форматі +380XXXXXXXXX"
                required
              />
            </div>

            <h2>Спосіб отримання</h2>

            <div className="checkout-delivery-options">
              <label>
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="delivery"
                  checked={formData.deliveryMethod === 'delivery'}
                  onChange={handleChange}
                />
                Доставка
              </label>

              <label>
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="pickup"
                  checked={formData.deliveryMethod === 'pickup'}
                  onChange={handleChange}
                />
                Самовивіз
              </label>
            </div>

            {formData.deliveryMethod === 'delivery' && (
              <div className="checkout-field">
                <label htmlFor="delivery-address">
                  Адреса доставки
                </label>

                <input
                  type="text"
                  id="delivery-address"
                  name="deliveryAddress"
                  placeholder="Вулиця, будинок, квартира"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="checkout-field">
              <label htmlFor="order-comment">
                Коментар до замовлення
              </label>

              <textarea
                id="order-comment"
                name="orderComment"
                rows="4"
                placeholder="Ваші побажання"
                value={formData.orderComment}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="checkout-submit-btn"
            >
              Підтвердити замовлення
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <h2>Ваше замовлення</h2>

          <div className="checkout-summary-items">
            {cartItems.map(item => (
              <div className="checkout-summary-item" key={item.id}>
                <div>
                  <h3>{item.name}</h3>

                  {[
                    ...(item.ingredients ?? []),
                    ...(item.addons ?? [])
                  ].map((option, index) => (
                    <p key={`${option.id}-${index}`}>
                      {option.groupName && `${option.groupName}: `}
                      {option.name}
                    </p>
                  ))}

                  <span>
                    Кількість: {item.quantity}
                  </span>
                </div>

                <strong>
                  {item.unitPrice * item.quantity} грн
                </strong>
              </div>
            ))}
          </div>

          <div className="checkout-summary-total">
            <span>Разом:</span>
            <strong>{cartTotal} грн</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CheckoutPage