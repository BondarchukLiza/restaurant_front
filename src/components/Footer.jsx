
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer id="footer" className="footer dark-background">
      <div className="container footer-top">
        <div className="row gy-4 gx-3">

          <div className="col-lg-3 col-md-4 footer-about">
            <Link to="/" className="logo d-flex align-items-center">
              <span className="sitename">Restaurantly</span>
            </Link>

            <div className="social-links d-flex mt-4">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Навігація</h4>

            <ul>
              <li>
                <i className="bi bi-chevron-right"></i>
                <Link to="/">Головна</Link>
              </li>

              <li>
                <i className="bi bi-chevron-right"></i>
                <Link to="/menu">Меню</Link>
              </li>

              <li>
                <i className="bi bi-chevron-right"></i>
                <Link to="/#about">Про нас</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-5 footer-contacts">
            <h4>Контакти</h4>

            <div className="footer-contact-item">
              <span>Адреса</span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Хрещатик+1+Київ"
                target="_blank"
                rel="noopener noreferrer"
              >
                вул. Хрещатик, 1, Київ, Україна
              </a>
            </div>

            <div className="footer-contact-item">
              <span>Телефон</span>
              <a href="tel:+380977777777">
                +38 097 777 77 77
              </a>
            </div>

            <div className="footer-contact-item">
              <span>Email</span>
              <a href="mailto:info@restaurant.com">
                info@restaurant.com
              </a>
            </div>
          </div>

        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>
          © 2026 <strong className="px-1">Restaurantly</strong>
          · Всі права захищені.
        </p>
      </div>
    </footer>
  )
}

export default Footer
