import { useState, useRef, useEffect } from 'react'

const sortOptions = [
  { value: 'default', label: 'За замовчуванням' },
  { value: 'price-asc', label: 'Спочатку дешевші' },
  { value: 'price-desc', label: 'Спочатку дорожчі' },
  { value: 'name', label: 'За назвою' }
]

function SortDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const selectedOption = sortOptions.find(option => option.value === value)

  return (
    <div
      className={`sort-dropdown ${isOpen ? 'is-open' : ''}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        className="sort-dropdown__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{selectedOption?.label}</span>
        <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`}></i>
      </button>

      {isOpen && (
        <div className="sort-dropdown__menu">
          {sortOptions.map(option => (
            <button
              key={option.value}
              type="button"
              className={`sort-dropdown__option ${
                value === option.value ? 'active' : ''
              }`}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              <span>{option.label}</span>

            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SortDropdown