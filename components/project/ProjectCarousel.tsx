'use client';

import { Project } from '@/types/Project';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

type Props = {
  projects: Project[];
};

export default function ProjectCarousel({ projects }: Props) {
  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      <Swiper
        spaceBetween={20} // *** 슬라이드 간격 줄임
        loop={true}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        breakpoints={{ // *** 반응형으로 슬라이드 개수 조절
          0: {
            slidesPerView: 1, // 모바일에서 1개씩
          },
          768: {
            slidesPerView: 2, // 태블릿 이상에서 2개
          },
          1024: {
            slidesPerView: 3, // PC에서 3개
          },
        }}
      >
        {projects.map((project) => (
          <SwiperSlide key={project._id}>
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
              <img
                src={`/project/${project.path}.jpg`}
                alt={project.title}
                className="w-full h-[300px] object-cover" // *** 이미지 높이 고정
              />
              <div className="w-full text-white text-center font-semibold text-base md:text-lg py-3"> {/* *** 폰트 크기 반응형 */}
                <Link href={`/projects/${project.path}`}>
                  {project.title}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center mt-4">
        <div className="swiper-pagination" />
      </div> 
    </div>
  );
}
