/* eslint-disable react/prop-types */
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

// Import required modules
import { Autoplay } from 'swiper/modules';
import { scrollImages } from "../lib/data";

export default function Carousel({swiperRef,intervalDelay}) {
  return (
    <div className="h-[16rem] md:h-[20rem] relative w-full">
      {/* Swiper Component */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Store Swiper instance
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: intervalDelay, // Sync with text delay
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {scrollImages?.map((item, i) => (
          <SwiperSlide key={i} className="mySwiper-slide">
            <img src={item} alt={`Slide ${i + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}