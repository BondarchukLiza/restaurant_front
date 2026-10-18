import '../styles/addon_group.css'

function AddonGroup({ group, selectedAddons, onChange }) {
  const maxChoices = group.max_choices
  const isSingleChoice = maxChoices === 1

  function handleSelect(addonId) {
    const isSelected = selectedAddons.includes(addonId)

    if (isSelected) {
      if (group.is_required && selectedAddons.length === 1) {
        return
      }

      onChange(
        group.id,
        selectedAddons.filter(id => id !== addonId)
      )

      return
    }

    if (isSingleChoice) {
      onChange(group.id, [addonId])
      return
    }

    if (
      maxChoices != null &&
      selectedAddons.length >= maxChoices
    ) {
      return
    }

    onChange(group.id, [...selectedAddons, addonId])
  }

  return (
    <div className="addon-group">
      <div className="addon-group__heading">
        <h3 className="addon-group__title">{group.name}</h3>

        {group.max_choices != null && (
          <span className="addon-group__limit">
            {group.max_choices === 1
              ? 'Можна обрати 1 добавку'
              : `Можна обрати до ${group.max_choices} добавок`}
          </span>
        )}
      </div>

      <div className="addon-group__options">
        {group.options.map(addon => {
          const isSelected = selectedAddons.includes(addon.id)

          const isDisabled =
            !isSingleChoice &&
            !isSelected &&
            maxChoices != null &&
            selectedAddons.length >= maxChoices

          return (
            <button
              key={addon.id}
              type="button"
              className={`addon-option ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelect(addon.id)}
              disabled={isDisabled}
              aria-pressed={isSelected}
            >
              {addon.image && (
                <img
                  src={addon.image}
                  alt=""
                  className="addon-option__image"
                />
              )}

              <span className="addon-option__name">
                {addon.name}
              </span>

              <span className="addon-option__price">
                {addon.price === 0
                  ? 'Безкоштовно'
                  : `+${addon.price} грн`}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default AddonGroup