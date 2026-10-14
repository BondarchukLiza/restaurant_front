import { Link } from 'react-router-dom'
import { dishes } from '../data'
import DishCard from '../components/DishCard'
import '../styles/home.css'
import AboutSlider from '../components/AboutSlider'
import EventsCarousel from '../components/EventsCarousel'

function HomePage() {
  const featuredDishes = dishes
    .filter(dish => dish.is_active)
    .slice(0, 4)

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="container home-hero__content">
          <span className="home-eyebrow">
            Ласкаво Просимо
          </span>

          <h1>
            Смак, створений <span>для вас</span>
          </h1>

          <p>
            Відкривайте нові смаки, обирайте улюблені страви
            та налаштовуйте їх відповідно до власних уподобань.
          </p>

          <div className="home-hero__actions">
            <Link to="/menu" className="home-button">
              Переглянути меню
            </Link>

            <a href="#about" className="home-button home-button--outline">
              Про ресторан
            </a>
          </div>
        </div>
      </section>
      <section className="home-about" id="about">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="home-eyebrow">Про нас</span>

              <h2>Мистецтво смаку в кожній страві</h2>

              <p>
                Ми поєднуємо якісні інгредієнти, увагу до деталей
                та сучасний підхід до ресторанного обслуговування.
              </p>

              <p>
                Наша платформа дозволяє не лише переглядати меню,
                а й обирати склад страви, додаткові інгредієнти
                та одразу бачити її підсумкову вартість.
              </p>
            </div>

            <div className="col-lg-6">
              <AboutSlider />
            </div>
          </div>
        </div>
      </section>
      <EventsCarousel />
      <section className="home-features">
        <div className="container">
          <div className="home-section-heading">
            <span className="home-eyebrow">Наші можливості</span>
            <h2>Ваше замовлення — ваші правила</h2>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="home-feature">
                <i className="bi bi-journal-richtext"></i>
                <h3>Зручне меню</h3>
                <p>
                  Шукайте страви за назвою, категорією,
                  ціною та особливостями харчування.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="home-feature">
                <i className="bi bi-sliders"></i>
                <h3>Персоналізація</h3>
                <p>
                  Налаштовуйте склад страви, обирайте інгредієнти
                  та додавайте улюблені доповнення.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="home-feature">
                <i className="bi bi-bag-check"></i>
                <h3>Просте замовлення</h3>
                <p>
                  Додавайте страви до кошика та переглядайте
                  загальну вартість перед оформленням.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-dishes">
        <div className="container">
          <div className="home-section-heading">
            <span className="home-eyebrow">Наше меню</span>
            <h2>Рекомендуємо спробувати</h2>
            <p>
              Ознайомтеся з добіркою страв нашого ресторану.
            </p>
          </div>

          <div className="row g-4">
            {featuredDishes.map(dish => (
              <div className="col-md-6 col-lg-3" key={dish.id}>
                <DishCard dish={dish} />
              </div>
            ))}
          </div>

          <div className="home-dishes__more">
            <Link to="/menu" className="home-button">
              Переглянути все меню
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

export default HomePage