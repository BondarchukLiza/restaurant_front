import { Link } from 'react-router-dom'
import {
  getDishImage,
  getCategoryName
} from '../services/menuService'
import '../styles/dish_card.css'

function DishCard({ dish }) {
  const image = getDishImage(dish.id)
  const categoryName = getCategoryName(dish.category)

  return (
    <article className="dish-card">
      <Link
        to={`/dish/${dish.id}`}
        className="dish-card__image-link"
        aria-label={`Переглянути страву ${dish.name}`}
      >
        {image ? (
          <img
            src={image}
            alt={dish.name}
            className="dish-card__image"
            loading="lazy"
          />
        ) : (
          <div className="dish-card__placeholder">
            <i className="bi bi-image" aria-hidden="true"></i>
          </div>
        )}
      </Link>

      <div className="dish-card__content">
        <span className="dish-card__category">
          {categoryName}
        </span>

        <h3 className="dish-card__title">
          <Link to={`/dish/${dish.id}`}>
            {dish.name}
          </Link>
        </h3>

        <div className="dish-card__dietary">
          {dish.is_vegan && <span>Веганська</span>}
          {dish.is_vegetarian && !dish.is_vegan && (
            <span>Вегетаріанська</span>
          )}
          {dish.is_gluten_free && <span>Без глютену</span>}
        </div>

        <div className="dish-card__bottom">
          <span className="dish-card__price">
            {dish.base_price} грн
          </span>

          <Link
            to={`/dish/${dish.id}`}
            className="dish-card__button"
          >
            Детальніше
            <i className="bi bi-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default DishCard