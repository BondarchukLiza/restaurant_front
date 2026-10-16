import { categories, dishes, dishImages } from '../data'

export function getCategoryDescendantIds(categoryId) {
  const ids = [categoryId]

  categories.forEach(category => {
    if (category.parent === categoryId) {
      ids.push(...getCategoryDescendantIds(category.id))
    }
  })

  return ids
}

export function getDishImage(dishId) {
  const image =
    dishImages.find(item => item.dish === dishId && item.is_main) ||
    dishImages.find(item => item.dish === dishId)

  return image?.image || null
}

export function getDishById(id) {
  return dishes.find(dish => dish.id === Number(id))
}

export function getCategoryName(categoryId) {
  return categories.find(category => category.id === categoryId)?.name || ''
}