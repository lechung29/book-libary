import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default () => {
  return (
    <div className='' style={{minWidth: '400px', maxWidth: '800px'}}>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide>
          <img width={"100%"} height={"320px"} src='https://thegioigiaitri.com.vn/wp-content/uploads/2020/08/Tac-pham-van-hoc-lon-hon-bay-gio-o-dau-3.png' className='img'/>
        </SwiperSlide>
        <SwiperSlide>
          <img width={"100%"} height={"320px"} src='https://newshop.vn/public/uploads/content/tieu-thuyet-viet-nam-anh-chinh-la-thanh-xuan-cua-em-min.png' className='img'/>
        </SwiperSlide>
        <SwiperSlide>
          <img width={"100%"} height={"320px"} src='https://afamilycdn.com/zoom/640_400/150157425591193600/2021/6/6/sach-khoa-hoc-thieu-nhi-4-16228890427571442584974-16229522817291176898576-160-0-960-1280-crop-16229522919271883355913.jpeg' className='img'/>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};