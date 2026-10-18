
import { useEffect, useMemo, useState } from 'react'
import { getDishIngredientGroups, getDishAddonGroups } from '../services/dishService'
import IngredientGroup from './IngredientGroup'
import AddonGroup from './AddonGroup'
import '../styles/dish_configurator.css'

function createInitialSelections(groups) {
  const selections = {}

  groups.forEach(group => {
    const defaultOptions = group.options
      .filter(option => option.is_default)
      .map(option => option.id)

    if (group.max_choices === 1) {
      selections[group.id] = defaultOptions.slice(0, 1)
    } else if (group.max_choices != null) {
      selections[group.id] = defaultOptions.slice(0, group.max_choices)
    } else {
      selections[group.id] = defaultOptions
    }
  })

  return selections
}

function DishConfigurator({ dish, onPriceChange, onVolumeChange }) {
  const ingredientGroups = useMemo(
    () => getDishIngredientGroups(dish.id),
    [dish.id]
  )

  const addonGroups = useMemo(
    () => getDishAddonGroups(dish.id),
    [dish.id]
  )

  const [selectedIngredients, setSelectedIngredients] = useState(
    () => createInitialSelections(ingredientGroups)
  )

  const [selectedAddons, setSelectedAddons] = useState({})
  const [quantity, setQuantity] = useState(1)

  function handleIngredientChange(groupId, optionIds) {
    setSelectedIngredients(current => ({
      ...current,
      [groupId]: optionIds
    }))
  }

  function handleAddonChange(groupId, addonIds) {
    setSelectedAddons(current => ({
      ...current,
      [groupId]: addonIds
    }))
  }

  const ingredientPrice = useMemo(() => {
    return ingredientGroups.reduce((total, group) => {
      const selectedIds = selectedIngredients[group.id] ?? []

      return total + group.options
        .filter(option => selectedIds.includes(option.id))
        .reduce((sum, option) => sum + option.price_delta, 0)
    }, 0)
  }, [ingredientGroups, selectedIngredients])

  const addonPrice = useMemo(() => {
    return addonGroups.reduce((total, group) => {
      const selectedIds = selectedAddons[group.id] ?? []

      return total + group.options
        .filter(addon => selectedIds.includes(addon.id))
        .reduce((sum, addon) => sum + addon.price, 0)
    }, 0)
  }, [addonGroups, selectedAddons])

  const unitPrice = dish.base_price + ingredientPrice + addonPrice
  const totalPrice = unitPrice * quantity

  const selectedIngredientDetails = ingredientGroups.flatMap(group => {
    const selectedIds = selectedIngredients[group.id] ?? []

    return group.options
      .filter(option => selectedIds.includes(option.id))
      .map(option => ({
        id: option.id,
        groupName: group.name,
        name: option.ingredientData.name,
        price: option.price_delta
      }))
  })

  const volumeGroup = ingredientGroups.find(group => group.id === 6)

  const selectedVolume = volumeGroup?.options.find(
    option => (selectedIngredients[volumeGroup.id] ?? []).includes(option.id)
  )?.ingredientData.name

  const selectedParameters = selectedIngredientDetails.filter(
    item => item.groupName !== 'Додаткові інгредієнти'
  )

  const selectedExtraIngredients = selectedIngredientDetails.filter(
    item => item.groupName === 'Додаткові інгредієнти'
  )

  const selectedAddonDetails = addonGroups.flatMap(group => {
    const selectedIds = selectedAddons[group.id] ?? []

    return group.options
      .filter(addon => selectedIds.includes(addon.id))
      .map(addon => ({
        id: addon.id,
        name: addon.name,
        price: addon.price
      }))
  })

  const selectedExtras = [
    ...selectedExtraIngredients,
    ...selectedAddonDetails
  ]

  useEffect(() => {
    onPriceChange?.(unitPrice)
  }, [unitPrice, onPriceChange])


  useEffect(() => {
    onVolumeChange?.(selectedVolume ?? null)
  }, [selectedVolume, onVolumeChange])

  const isValid =
    ingredientGroups.every(group =>
      !group.is_required ||
      (selectedIngredients[group.id] ?? []).length > 0
    ) &&
    addonGroups.every(group =>
      !group.is_required ||
      (selectedAddons[group.id] ?? []).length > 0
    )

  function handleAddToCart() {
    if (!isValid) {
      return
    }

    console.log('Налаштована страва:', {
      dishId: dish.id,
      selectedIngredients,
      selectedAddons,
      quantity,
      unitPrice,
      totalPrice
    })
  }

  return (
    <div className="dish-configurator">
      {ingredientGroups.map(group => (
        <IngredientGroup
          key={group.id}
          group={group}
          selectedOptions={selectedIngredients[group.id] ?? []}
          onChange={handleIngredientChange}
        />
      ))}

      {addonGroups.length > 0 && (
        <div className="dish-configurator__addons">
          <h3 className="dish-configurator__addons-title">
            Додатки:
          </h3>

          {addonGroups.map(group => (
            <AddonGroup
              key={group.id}
              group={group}
              selectedAddons={selectedAddons[group.id] ?? []}
              onChange={handleAddonChange}
            />
          ))}
        </div>
      )}

      <div className="dish-configurator__bottom">
        <div className="dish-configurator__summary">
          <h3 className="dish-configurator__summary-title">
            Ваше замовлення
          </h3>

          {selectedParameters.length > 0 && (
            <div className="dish-configurator__summary-section">
              {selectedParameters.map(item => (
                <div
                  key={`${item.groupName}-${item.id}`}
                  className="dish-configurator__parameter"
                >
                  <span className="dish-configurator__parameter-name">
                    {item.groupName}
                  </span>

                  <div className="dish-configurator__parameter-value">
                    <span>{item.name}</span>

                    {item.price !== 0 && (
                      <span>
                        ({item.price > 0 ? '+' : ''}{item.price} грн)
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="dish-configurator__summary-section">
            <span className="dish-configurator__summary-label">
              Додано до страви
            </span>

            {selectedExtras.length > 0 ? (
              selectedExtras.map((item, index) => (
                <div
                  key={`${item.groupName ?? 'addon'}-${item.id}-${index}`}
                  className="dish-configurator__summary-item"
                >
                  <span>{item.name}</span>

                  {item.price !== 0 && (
                    <span className="dish-configurator__summary-price">
                      {item.price > 0 ? '+' : ''}{item.price} грн
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="dish-configurator__summary-empty">
                Без додаткових інгредієнтів
              </p>
            )}
          </div>
        </div>

        <div className="dish-configurator__quantity">
          <span>Кількість порцій:</span>

          <div className="dish-quantity-control">
            <button
              type="button"
              onClick={() => setQuantity(current => Math.max(1, current - 1))}
              disabled={quantity === 1}
              aria-label="Зменшити кількість"
            >
              <i className="bi bi-dash"></i>
            </button>

            <span>{quantity}</span>

            <button
              type="button"
              onClick={() => setQuantity(current => Math.min(99, current + 1))}
              disabled={quantity === 99}
              aria-label="Збільшити кількість"
            >
              <i className="bi bi-plus"></i>
            </button>
          </div>
        </div>

        <div className="dish-configurator__total">
          <span>Разом:</span>
          <strong>{totalPrice} грн</strong>
        </div>

        <button
          type="button"
          className="dish-configurator__submit"
          onClick={handleAddToCart}
          disabled={!isValid}
        >
          <i className="bi bi-cart-plus"></i>
          Додати до кошика
        </button>

        {!isValid && (
          <p className="dish-configurator__error">
            Оберіть усі обов'язкові параметри.
          </p>
        )}
      </div>
    </div>
  )
}

export default DishConfigurator