
import { useEffect, useMemo, useState } from 'react'
import { categories, dishes } from '../data'
import { getCategoryDescendantIds } from '../services/menuService'
import DishCard from '../components/DishCard'
import CategoryMenu from '../components/CategoryMenu'
import SortDropdown from '../components/SortDropdown'
import '../styles/menu.css'

const dietaryFilters = [
  { key: 'is_vegan', label: 'Веганські' },
  { key: 'is_vegetarian', label: 'Вегетаріанські' },
  { key: 'is_gluten_free', label: 'Без глютену' },
  { key: 'is_lactose_free', label: 'Без лактози' },
  { key: 'is_nut_free', label: 'Без горіхів' }
]

function MenuPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedFilters, setSelectedFilters] = useState([])
  const [sortBy, setSortBy] = useState('default')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const activeDishes = useMemo(
    () => dishes.filter(dish => dish.is_active),
    []
  )

  const maxAvailablePrice = useMemo(
    () => Math.max(
      0,
      ...activeDishes.map(dish => Number(dish.base_price))
    ),
    [activeDishes]
  )

  const [maxPrice, setMaxPrice] = useState(maxAvailablePrice)

  const availableCategories = useMemo(() => {
    return categories.filter(category => {
      const descendantIds = getCategoryDescendantIds(category.id)

      return activeDishes.some(dish =>
        descendantIds.includes(dish.category)
      )
    })
  }, [activeDishes])

  const filteredDishes = useMemo(() => {
    let result = [...activeDishes]

    const query = search.trim().toLocaleLowerCase('uk')

    if (query) {
      result = result.filter(dish =>
        dish.name.toLocaleLowerCase('uk').includes(query)
      )
    }

    if (selectedCategory !== null) {
      const categoryIds = getCategoryDescendantIds(selectedCategory)

      result = result.filter(dish =>
        categoryIds.includes(dish.category)
      )
    }

    if (selectedFilters.length > 0) {
      result = result.filter(dish =>
        selectedFilters.every(filter => dish[filter] === true)
      )
    }

    if (maxPrice < maxAvailablePrice) {
      result = result.filter(dish =>
        Number(dish.base_price) <= maxPrice
      )
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.base_price - b.base_price)
        break

      case 'price-desc':
        result.sort((a, b) => b.base_price - a.base_price)
        break

      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name, 'uk'))
        break

      default:
        result.sort((a, b) => a.id - b.id)
    }

    return result
  }, [
    activeDishes,
    search,
    selectedCategory,
    selectedFilters,
    sortBy,
    maxPrice,
    maxAvailablePrice
  ])

  useEffect(() => {
    if (!filtersOpen) {
      return
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setFiltersOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [filtersOpen])

  function toggleFilter(key) {
    setSelectedFilters(current =>
      current.includes(key)
        ? current.filter(filter => filter !== key)
        : [...current, key]
    )
  }

  function resetFilters() {
    setSearch('')
    setSelectedCategory(null)
    setSelectedFilters([])
    setSortBy('default')
    setMaxPrice(maxAvailablePrice)
  }

  const hasPriceFilter = maxPrice < maxAvailablePrice

  const activeFilterCount =
    selectedFilters.length + (hasPriceFilter ? 1 : 0)

  const hasFilters =
    search.trim() !== '' ||
    selectedCategory !== null ||
    selectedFilters.length > 0 ||
    sortBy !== 'default' ||
    hasPriceFilter

  return (
    <div className="menu-page">
      <section className="menu-page__intro">
        <div className="container">
          <span className="home-eyebrow">Наше меню</span>
          <h1>Оберіть страву до смаку</h1>
          <p>
            Переглядайте страви, використовуйте фільтри
            та обирайте варіанти відповідно до своїх уподобань.
          </p>
        </div>
      </section>

      <section className="menu-page__catalog">
        <div className="container">
          <div className="menu-toolbar">
            <div className="menu-search">
              <i className="bi bi-search" aria-hidden="true"></i>
              <input
                type="search"
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder="Пошук страв..."
                aria-label="Пошук страв"
              />
            </div>

            <SortDropdown
              value={sortBy}
              onChange={setSortBy}
            />

            <button
              type="button"
              className="menu-filter-toggle"
              onClick={() => setFiltersOpen(true)}
              aria-expanded={filtersOpen}
              aria-controls="menu-filter-panel"
            >
              <i className="bi bi-sliders" aria-hidden="true"></i>
              Фільтри

              {activeFilterCount > 0 && (
                <span className="menu-filter-count">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          <CategoryMenu
            categories={availableCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className="menu-results-row">
            <p className="menu-results" role="status">
              Знайдено страв: {filteredDishes.length}
            </p>

            {hasFilters && (
              <button
                type="button"
                className="menu-clear"
                onClick={resetFilters}
              >
                <i
                  className="bi bi-x-circle"
                  aria-hidden="true"
                ></i>
                Скинути все
              </button>
            )}
          </div>

          {activeFilterCount > 0 && (
            <div className="menu-active-filters">
              <span className="menu-active-filters__label">
                Активні фільтри:
              </span>

              {selectedFilters.map(key => {
                const filter = dietaryFilters.find(
                  item => item.key === key
                )

                if (!filter) {
                  return null
                }

                return (
                  <button
                    type="button"
                    className="menu-active-filter"
                    key={key}
                    onClick={() => toggleFilter(key)}
                    aria-label={`Прибрати фільтр ${filter.label}`}
                  >
                    {filter.label}
                    <i
                      className="bi bi-x"
                      aria-hidden="true"
                    ></i>
                  </button>
                )
              })}

              {hasPriceFilter && (
                <button
                  type="button"
                  className="menu-active-filter"
                  onClick={() => setMaxPrice(maxAvailablePrice)}
                  aria-label="Прибрати обмеження за ціною"
                >
                  До {maxPrice} грн
                  <i
                    className="bi bi-x"
                    aria-hidden="true"
                  ></i>
                </button>
              )}
            </div>
          )}

          {filteredDishes.length > 0 ? (
            <div className="row g-4">
              {filteredDishes.map(dish => (
                <div
                  className="col-sm-6 col-lg-4 col-xl-3"
                  key={dish.id}
                >
                  <DishCard dish={dish} />
                </div>
              ))}
            </div>
          ) : (
            <div className="menu-empty">
              <i
                className="bi bi-search"
                aria-hidden="true"
              ></i>
              <h2>Страв не знайдено</h2>
              <p>
                Спробуйте змінити пошуковий запит
                або вибрати інші фільтри.
              </p>
              <button
                type="button"
                onClick={resetFilters}
              >
                Показати всі страви
              </button>
            </div>
          )}
        </div>
      </section>

      {filtersOpen && (
        <div className="menu-filter-overlay">
          <button
            type="button"
            className="menu-filter-backdrop"
            onClick={() => setFiltersOpen(false)}
            aria-label="Закрити фільтри"
          />

          <aside
            id="menu-filter-panel"
            className="menu-filter-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-filter-title"
          >
            <div className="menu-filter-panel__header">
              <div>
                <span className="home-eyebrow">
                  Налаштування
                </span>
                <h2 id="menu-filter-title">
                  Фільтри меню
                </h2>
              </div>

              <button
                type="button"
                className="menu-filter-close"
                onClick={() => setFiltersOpen(false)}
                aria-label="Закрити"
              >
                <i
                  className="bi bi-x-lg"
                  aria-hidden="true"
                ></i>
              </button>
            </div>

            <div className="menu-filter-panel__body">
              <div className="menu-price-filter">
                <div className="menu-price-filter__heading">
                  <h3>Ціновий діапазон</h3>
                  <span>До {maxPrice} грн</span>
                </div>

                <p>
                  Вкажіть максимальну вартість страви.
                </p>

                <input
                  type="range"
                  min="0"
                  max={maxAvailablePrice}
                  step="1"
                  value={maxPrice}
                  onChange={event =>
                    setMaxPrice(Number(event.target.value))
                  }
                  aria-label="Максимальна ціна страви"
                  disabled={maxAvailablePrice === 0}
                />

                <div className="menu-price-filter__limits">
                  <span>0 грн</span>
                  <span>{maxAvailablePrice} грн</span>
                </div>
              </div>

              <div className="menu-filters__group">
                <h3>Особливості харчування</h3>
                <p>
                  Оберіть вимоги до складу страв.
                </p>

                {dietaryFilters.map(filter => (
                  <label
                    className="menu-checkbox"
                    key={filter.key}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(filter.key)}
                      onChange={() => toggleFilter(filter.key)}
                    />
                    <span>{filter.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="menu-filter-panel__footer">
              <button
                type="button"
                className="menu-reset"
                onClick={resetFilters}
                disabled={!hasFilters}
              >
                Скинути все
              </button>

              <button
                type="button"
                className="menu-filter-apply"
                onClick={() => setFiltersOpen(false)}
              >
                Показати страви ({filteredDishes.length})
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

export default MenuPage