import Banner1 from "../public/banner1.png";
import Banner2 from "../public/banner2.png";
import Banner3 from "../public/banner3.png";
import Banner4 from "../public/banner4.png";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";

SwiperCore.use([Autoplay]);

const banners = [Banner1, Banner2, Banner3, Banner4];

export default function Banner() {
  return (
    <div className="fixed bottom-0 mx-auto w-full max-w-xl ">
      <Swiper
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <Image
              key={index}
              src={banner}
              alt={`banner${index + 1} load failed`}
              className="h-48 w-full"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
