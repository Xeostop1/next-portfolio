'use client';

import { Project } from '@/types/Project';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

type Props = {
  projects?: Project[]; // **** projects가 undefined일 수도 있으니 옵셔널로 설정
};

export default function ProjectCarousel({ projects }: Props) {
  console.log('🧩 전달받은 projects:', projects); // **** 디버깅 로그

  if (!projects || projects.length === 0) {
    // **** 예외 처리
    return (
      <div className="text-center text-white py-10">
        프로젝트가 없습니다. 😢 {/* **** */}
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        loop={true}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        {projects.map((project) => (
          <SwiperSlide key={project._id}>
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
              <img
                src={`/project/${project.path}.jpg`}
                alt={project.title}
                className="w-full h-56 object-cover"
              />
              <div className="w-full text-white text-center font-semibold text-lg py-3">
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
