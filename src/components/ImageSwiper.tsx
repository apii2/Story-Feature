import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";
import { CircleChevronLeft, CircleChevronRight, Plus } from "lucide-react";
import type { Image } from "../App";

interface ImageSwiperProps {
  images: Image[];
  setOpenImageAddModal: (open: boolean) => void;
  setSelectedImage: (url: string) => void;
}

const ImageSwiper: React.FC<ImageSwiperProps> = ({
  images,
  setOpenImageAddModal,
  setSelectedImage,
}) => {
  return (
    <Swiper
      modules={[Navigation]}
      breakpoints={{
        0: { slidesPerView: 4, spaceBetween: 4 },
        500: { slidesPerView: 5, spaceBetween: 6 },
        640: { slidesPerView: 6, spaceBetween: 6 },
        768: { slidesPerView: 5, spaceBetween: 6 },
        990: { slidesPerView: 6, spaceBetween: 6 },
        1400: { slidesPerView: 7, spaceBetween: 6 },
      }}
      slidesPerGroup={3}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      className="mb-6"
    >
      <SwiperSlide>
        <div
          onClick={() => setOpenImageAddModal(true)}
          className="w-20 h-20 xl:w-25 xl:h-25 xs:w-18 xs:h-18 flex items-center justify-center rounded-full overflow-hidden border-[3px] shadow-md transition-all duration-300 cursor-pointer hover:shadow-lg group hover:border-gray-800 hover:dark:border-white border-gray-600"
        >
          <Plus className="w-4/5 h-4/5 text-gray-600 group-hover:dark:text-white group-hover:text-gray-800 pointer-events-none transition-all duration-300" />
        </div>
      </SwiperSlide>

      {images.map((image: Image) => (
        <SwiperSlide key={image.id}>
          <button
            key={image.id}
            onClick={() => setSelectedImage(image.url)}
            className="w-20 h-20 xl:w-25 xl:h-25 xs:w-18 xs:h-18 rounded-full overflow-hidden border-[3px] border-gray-300 shadow-md transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
          >
            <img
              src={image.url}
              alt={`Story ${image.id}`}
              className="w-full h-full object-cover"
            />
          </button>
        </SwiperSlide>
      ))}

      <div className="swiper-button-next text-gray-800! right-0!">
        <CircleChevronRight className="fill-gray-300! w-8! h-8!" />
      </div>
      <div className="swiper-button-prev text-gray-800! left-0!">
        <CircleChevronLeft className="fill-gray-300! w-8! h-8!" />
      </div>
    </Swiper>
  );
};

export default ImageSwiper;
