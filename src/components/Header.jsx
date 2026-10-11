import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header id="header" className="header fixed-top">
      <div className="topbar d-flex align-items-center">
        <div className="container d-flex justify-content-center justify-content-md-between">

          <div className="contact-info d-flex align-items-center">
            <i className="bi bi-envelope d-flex align-items-center">
              <a href="mailto:restknu@gmail.com">
                restknu@gmail.com
              </a>
            </i>

            <i className="bi bi-phone d-flex align-items-center ms-4">
              <span>+38 097 777 77 77</span>
            </i>
          </div>

          <div className="languages d-none d-md-flex align-items-center">
            <ul>
              <li>Uk</li>
            </ul>
          </div>

        </div>
      </div>

      <div className="branding d-flex align-items-center">
        <div className="container position-relative d-flex align-items-center justify-content-between">

          <Link to="/" className="logo d-flex align-items-center me-auto me-xl-0">
            <h1 className="sitename">Restaurantly</h1>
          </Link>

          <nav
            id="navmenu"
            className={`navmenu ${menuOpen ? 'mobile-nav-active' : ''}`}
          >
            <ul>
              <li>
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) => isActive ? 'active' : ''}
                    onClick={() => setMenuOpen(false)}
                >
                  Головна
                </NavLink>
              </li>

              <li>
                <Link
                  to="/#about"
                  onClick={() => setMenuOpen(false)}
                >
                  Про нас
                </Link>
              </li>

              <li>
                <NavLink
                  to="/menu"
                  className={({ isActive }) => isActive ? 'active' : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  Меню
                </NavLink>
              </li>
            </ul>

            <button
              type="button"
              className="mobile-nav-toggle d-xl-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Закрити меню' : 'Відкрити меню'}
              aria-expanded={menuOpen}
            >
              <i className={`bi ${menuOpen ? 'bi-x' : 'bi-list'}`}></i>
            </button>
          </nav>

          <div className="d-none d-xl-flex align-items-center gap-3 ms-3">
            <button
              type="button"
              className="cart-icon-btn"
              aria-label="Кошик"
              disabled
            >
              <i className="bi bi-cart3"></i>
              <span className="cart-badge">0</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header