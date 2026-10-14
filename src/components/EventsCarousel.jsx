import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import '../styles/home.css'

const galleryImages = Array.from(
  { length: 8 },
  (_, index) => ({
    id: index + 1,
    image: `/assets/rest/gallery/gallery-${index + 1}.jpg`
  })
)

function EventsCarousel() {
  return (
    <section className="home-events">
      <div className="container">
        <div className="home-section-heading">
          <span className="home-eyebrow">
            Атмосфера ресторану
          </span>

          <h2>Події та святкування</h2>

          <p>
            Особливі моменти, теплі зустрічі
            та незабутні вечори.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          spaceBetween={20}
          loop
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          breakpoints={{
            576: { slidesPerView: 2 },
            992: { slidesPerView: 3 }
          }}
          className="events-carousel"
        >
          {galleryImages.map(image => (
            <SwiperSlide key={image.id}>
              <div className="events-carousel__item">
                <img
                  src={image.image}
                  alt={`Атмосфера ресторану — фотографія ${image.id}`}
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default EventsCarousel