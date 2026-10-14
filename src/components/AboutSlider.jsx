import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const slides = [
  {
    id: 1,
    image: '/assets/rest/events-slider/events-slider-1.jpg',
    alt: 'Святково оформлений стіл у ресторані'
  },
  {
    id: 2,
    image: '/assets/rest/events-slider/events-slider-2.jpg',
    alt: 'Гості за столом у ресторані'
  },
  {
    id: 3,
    image: '/assets/rest/events-slider/events-slider-3.jpg',
    alt: 'Святкова атмосфера ресторану'
  }
]

function AboutSlider() {
  return (
    <div className="about-slider">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        loop
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <img
              src={slide.image}
              alt={slide.alt}
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default AboutSlider