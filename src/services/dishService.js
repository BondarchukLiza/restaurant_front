
import {
  addonCategories,
  addons,
  dishAddonGroups,
  ingredientGroups,
  ingredientOptions,
  ingredients
} from '../data'

export function getDishIngredientGroups(dishId) {
  return ingredientGroups
    .filter(group => group.dish === dishId)
    .map(group => ({
      ...group,
      options: ingredientOptions
        .filter(option => option.group === group.id)
        .map(option => ({
          ...option,
          ingredientData: ingredients.find(
            ingredient => ingredient.id === option.ingredient
          )
        }))
        .filter(option => option.ingredientData)
    }))
}

export function getAddonCategoryDescendantIds(categoryId) {
  const category = addonCategories.find(
    item => item.id === categoryId
  )

  if (!category) {
    return []
  }

  return addonCategories
    .filter(item =>
      item.tree_id === category.tree_id &&
      item.lft >= category.lft &&
      item.rght <= category.rght
    )
    .map(item => item.id)
}

export function getDishAddonGroups(dishId) {
  return dishAddonGroups
    .filter(group => group.dish === dishId)
    .map(group => {
      const category = addonCategories.find(
        item => item.id === group.category
      )

      const categoryIds = getAddonCategoryDescendantIds(
        group.category
      )

      return {
        ...group,
        name: category?.name ?? 'Добавки',
        is_required: group.is_required ?? false,
        max_choices: group.max_choices ?? null,
        options: addons.filter(addon =>
          categoryIds.includes(addon.category)
        )
      }
    })
    .filter(group => group.options.length > 0)
}