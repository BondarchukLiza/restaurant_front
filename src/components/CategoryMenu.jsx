
import { useState } from 'react'

function CategoryMenu({
  categories,
  selectedCategory,
  onSelectCategory
}) {
  const [openRoot, setOpenRoot] = useState(null)
  const [openBranches, setOpenBranches] = useState([])

  const rootCategories = categories.filter(
    category => category.parent === null
  )

  function getChildren(parentId) {
    return categories.filter(
      category => category.parent === parentId
    )
  }

  function isInBranch(categoryId) {
    let current = categories.find(
      category => category.id === selectedCategory
    )

    while (current) {
      if (current.id === categoryId) {
        return true
      }

      current = categories.find(
        category => category.id === current.parent
      )
    }

    return false
  }

  function closeMenu() {
    setOpenRoot(null)
    setOpenBranches([])
  }

  function selectCategory(categoryId) {
    onSelectCategory(categoryId)
    closeMenu()
  }

  function toggleRoot(categoryId) {
    setOpenRoot(current =>
      current === categoryId ? null : categoryId
    )
    setOpenBranches([])
  }

  function openBranch(categoryId, level) {
    setOpenBranches(current => [
      ...current.slice(0, level - 1),
      categoryId
    ])
  }

  function toggleBranch(categoryId, level) {
    setOpenBranches(current => {
      if (current[level - 1] === categoryId) {
        return current.slice(0, level - 1)
      }

      return [
        ...current.slice(0, level - 1),
        categoryId
      ]
    })
  }

  function renderChildren(parentId, level = 1) {
    const children = getChildren(parentId)

    if (children.length === 0) {
      return null
    }

    return (
      <ul className="category-dropdown__list">
        {children.map(category => {
          const hasChildren = getChildren(category.id).length > 0
          const isExpanded = openBranches[level - 1] === category.id

          return (
            <li
              key={category.id}
              onMouseEnter={event => {
                if (event.pointerType === 'touch') {
                  return
                }

                if (window.matchMedia('(hover: hover)').matches) {
                  if (hasChildren) {
                    openBranch(category.id, level)
                  } else {
                    setOpenBranches(current =>
                      current.slice(0, level - 1)
                    )
                  }
                }
              }}
            >
              <div className="category-dropdown__row">
                <button
                  type="button"
                  className={`category-dropdown__button ${
                    selectedCategory === category.id ? 'active' : ''
                  }`}
                  style={{
                    paddingLeft: `${12 + (level - 1) * 14}px`
                  }}
                  onClick={() => selectCategory(category.id)}
                >
                  {category.name}
                </button>

                {hasChildren && (
                  <button
                    type="button"
                    className="category-dropdown__toggle"
                    onClick={() => toggleBranch(category.id, level)}
                    aria-label={`${
                      isExpanded ? 'Згорнути' : 'Розгорнути'
                    } підкатегорії ${category.name}`}
                    aria-expanded={isExpanded}
                  >
                    <i
                      className={`bi ${
                        isExpanded
                          ? 'bi-chevron-up'
                          : 'bi-chevron-down'
                      }`}
                      aria-hidden="true"
                    ></i>
                  </button>
                )}
              </div>

              {hasChildren && isExpanded &&
                renderChildren(category.id, level + 1)}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <nav
      className="menu-category-navigation"
      aria-label="Категорії меню"
    >
      <div className="menu-category-tabs">
        <button
          type="button"
          className={`menu-category-all ${
            selectedCategory === null ? 'active' : ''
          }`}
          onClick={() => selectCategory(null)}
        >
          Усі страви
        </button>

        {rootCategories.map(category => {
          const hasChildren = getChildren(category.id).length > 0
          const isOpen = openRoot === category.id

          return (
            <div
              key={category.id}
              className={`menu-category-item ${
                isOpen ? 'is-open' : ''
              }`}
              onMouseEnter={() => {
                if (window.matchMedia('(hover: hover)').matches) {
                  setOpenRoot(category.id)
                  setOpenBranches([])
                }
              }}
              onMouseLeave={() => {
                if (window.matchMedia('(hover: hover)').matches) {
                  closeMenu()
                }
              }}
            >
              <div className="menu-category-root">
                <button
                  type="button"
                  className={`menu-category-trigger ${
                    isInBranch(category.id) ? 'active' : ''
                  }`}
                  onClick={() => selectCategory(category.id)}
                >
                  {category.name}
                </button>

                {hasChildren && (
                  <button
                    type="button"
                    className={`menu-category-expand ${
                      isInBranch(category.id) ? 'active' : ''
                    }`}
                    onClick={() => toggleRoot(category.id)}
                    aria-label={`${
                      isOpen ? 'Згорнути' : 'Розгорнути'
                    } підкатегорії ${category.name}`}
                    aria-expanded={isOpen}
                  >
                    <i
                      className={`bi ${
                        isOpen
                          ? 'bi-chevron-up'
                          : 'bi-chevron-down'
                      }`}
                      aria-hidden="true"
                    ></i>
                  </button>
                )}
              </div>

              {hasChildren && isOpen && (
                <div className="category-dropdown">
                  {renderChildren(category.id)}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}

export default CategoryMenu