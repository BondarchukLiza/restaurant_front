import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { categories, dishes, dishImages } from '../data'
import '../styles/dish.css'
import DishConfigurator from '../components/DishConfigurator'

const dietaryLabels = [
  { key: 'is_vegan', label: 'Веганська' },
  { key: 'is_vegetarian', label: 'Вегетаріанська' },
  { key: 'is_gluten_free', label: 'Без глютену' },
  { key: 'is_lactose_free', label: 'Без лактози' },
  { key: 'is_nut_free', label: 'Без горіхів' }
]

function DishPage() {
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [currentPrice, setCurrentPrice] = useState(null)
  const [currentVolume, setCurrentVolume] = useState(null)

  const dish = dishes.find(
    item => item.id === Number(id) && item.is_active
  )

  if (!dish) {
    return (
      <div className="dish-page">
        <div className="container dish-not-found">
          <i className="bi bi-exclamation-circle"></i>
          <h1>Страву не знайдено</h1>
          <p>Можливо, цю страву було видалено з меню.</p>
          <Link to="/menu" className="dish-back-button">
            Повернутися до меню
          </Link>
        </div>
      </div>
    )
  }

  const category = categories.find(
    item => item.id === dish.category
  )

  const images = dishImages.filter(
    image => image.dish === dish.id
  )

  const orderedImages = [
    ...images.filter(image => image.is_main),
    ...images.filter(image => !image.is_main)
  ]

  const currentImage = orderedImages[selectedImage] || orderedImages[0]

  const dietaryFeatures = dietaryLabels.filter(
    feature => dish[feature.key] === true
  )

  return (
    <div className="dish-page">
      <section className="dish-page__intro">
        <div className="container">
          <Link to="/menu" className="dish-back-link">
            <i className="bi bi-arrow-left"></i>
            Повернутися до меню
          </Link>
        </div>
      </section>

      <section className="dish-page__content">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5">
              <div className="dish-page__sticky">
                <div className="dish-gallery">
                  <div className="dish-gallery__main">
                    {currentImage ? (
                      <img
                        src={currentImage.image}
                        alt={dish.name}
                      />
                    ) : (
                      <div className="dish-gallery__placeholder">
                        <i className="bi bi-image"></i>
                      </div>
                    )}
                  </div>

                  {orderedImages.length > 1 && (
                    <div className="dish-gallery__thumbnails">
                      {orderedImages.map((image, index) => (
                        <button
                          key={image.id}
                          type="button"
                          className={`dish-gallery__thumbnail ${
                            selectedImage === index ? 'active' : ''
                          }`}
                          onClick={() => setSelectedImage(index)}
                          aria-label={`Переглянути фото ${index + 1}`}
                          aria-pressed={selectedImage === index}
                        >
                          <img src={image.image} alt="" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="dish-details">
                  {category && (
                    <span className="dish-details__category">
                      {category.name}
                    </span>
                  )}


                  <h1>{dish.name}</h1>

                  {dish.composition && (
                    <p className="dish-details__composition">
                      <span>Склад: </span>
                      {dish.composition}
                    </p>
                  )}

                  <div className="dish-details__price-row">
                    <div className="dish-details__price">
                      {currentPrice ?? dish.base_price} грн
                    </div>

                    {dish.weight != null && (
                      <span className="dish-details__weight">
                        {dish.id === 3 && currentVolume
                          ? currentVolume
                          : `${dish.weight} ${dish.weight_unit ?? 'г'}`}
                      </span>
                    )}
                  </div>

                  <div className="dish-details__divider"></div>

                  {dietaryFeatures.length > 0 && (
                    <div className="dish-details__section">
                      <div className="dish-details__features">
                        {dietaryFeatures.map(feature => (
                          <span
                            key={feature.key}
                            className="dish-details__feature"
                          >
                            {feature.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="dish-page__customization">
                <div className="dish-page__customization-heading">
                  <span>ПЕРСОНАЛІЗАЦІЯ</span>
                  <h2>Налаштуйте свою страву</h2>
                  <p>
                    Оберіть параметри приготування та додаткові
                    інгредієнти відповідно до своїх уподобань.
                  </p>
                </div>

                <DishConfigurator
                  key={dish.id}
                  dish={dish}
                  onPriceChange={setCurrentPrice}
                  onVolumeChange={setCurrentVolume}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DishPage