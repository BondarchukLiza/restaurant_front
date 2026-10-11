import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer id="footer" className="footer dark-background">
      <div className="container footer-top">
        <div className="row gy-4">

          <div className="col-lg-4 col-md-6 footer-about">
            <Link to="/" className="logo d-flex align-items-center">
              <span className="sitename">Restaurantly</span>
            </Link>

            <div className="footer-contact pt-3">
              <p>вул. Хрещатик, 1</p>
              <p>Київ, Україна</p>

              <p className="mt-3">
                <strong>Телефон:</strong>
                <span> +38 097 777 77 77</span>
              </p>

              <p>
                <strong>Email:</strong>
                <span> info@restaurant.com</span>
              </p>
            </div>

            <div className="social-links d-flex mt-4">
              <a href="https://www.facebook.com/" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>

              <a href="https://www.instagram.com/" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Навігація</h4>

            <ul>
              <li>
                <Link to="/">Головна</Link>
              </li>

              <li>
                <Link to="/menu">Меню</Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>
          © 2026 <strong className="px-1 sitename">Ресторан</strong>
          Всі права захищені.
        </p>
      </div>
    </footer>
  )
}

export default Footer