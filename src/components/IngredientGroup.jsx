import '../styles/ingredient_group.css'

function IngredientGroup({ group, selectedOptions, onChange }) {
  const isSingleChoice = group.max_choices === 1
  const isVolumeGroup = group.name === 'Обʼєм напою'

  function handleSelect(optionId) {
    if (isSingleChoice) {
      onChange(group.id, [optionId])
      return
    }

    const isSelected = selectedOptions.includes(optionId)

    if (isSelected) {
      if (group.is_required && selectedOptions.length === 1) {
        return
      }

      onChange(
        group.id,
        selectedOptions.filter(id => id !== optionId)
      )
    } else {
      if (
        group.max_choices != null &&
        selectedOptions.length >= group.max_choices
      ) {
        return
      }

      onChange(group.id, [...selectedOptions, optionId])
    }
  }

  return (
    <div className="ingredient-group">
      <div className="ingredient-group__heading">
        <h3 className="ingredient-group__title">{group.name}</h3>

        {group.max_choices != null && (
          <span className="ingredient-group__limit">
            {group.max_choices === 1
              ? 'Оберіть 1 варіант'
              : `Можна обрати до ${group.max_choices} варіантів`}
          </span>
        )}
      </div>

      <div className={`ingredient-group__options ${isVolumeGroup ? 'ingredient-group__options--volume' : ''}`}>
        {group.options.map(option => {
          const ingredient = option.ingredientData
          const isSelected = selectedOptions.includes(option.id)

          const isDisabled =
            !isSingleChoice &&
            !isSelected &&
            group.max_choices != null &&
            selectedOptions.length >= group.max_choices

          return (
            <button
              key={option.id}
              type="button"
              className={`ingredient-option ${isSelected ? 'selected' : ''} ${isVolumeGroup ? 'ingredient-option--volume' : ''}`}
              onClick={() => handleSelect(option.id)}
              disabled={isDisabled}
              aria-pressed={isSelected}
            >
              {ingredient.image && (
                <img
                  src={ingredient.image}
                  alt=""
                  className="ingredient-option__image"
                />
              )}

              <span className="ingredient-option__name">
                {ingredient.name}
              </span>

              {option.price_delta !== 0 && (
                <span className="ingredient-option__price">
                  {option.price_delta > 0 ? '+' : ''}
                  {option.price_delta} грн
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default IngredientGroup