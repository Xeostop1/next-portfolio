'use client';

import { useEffect, useState } from 'react';
import { Project } from '@/types/Project';
import Link from 'next/link';

type Props = {
  projects: Project[];
};

export default function ProjectCarousel({ projects }: Props) {
  const [isMobile, setIsMobile] = useState(false); // ✅ 최상단 useState
  const [index, setIndex] = useState(0); // ✅ 최상단 useState

  // ✅ 최상단 useEffect
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [projects.length]);

  if (isMobile) {
    // ✅ 조건부 JSX 렌더링만 가능
    return (
      <div className="flex flex-col gap-4 mt-4">
        {projects.map((project) => (
          <Link
            key={project._id}
            href={`/projects/${project.path}`}
            className="block bg-white/10 rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={`/project/${project.path}.jpg`}
              alt={project.title}
              className="w-full aspect-[2/1] object-cover"
            />
            <div className="p-4 text-white text-center font-medium">
              {project.title}
            </div>
          </Link>
        ))}
      </div>
    );
  }

  const current = projects[index];

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-6">
      <div className="overflow-hidden rounded-xl shadow-lg bg-white/10 backdrop-blur-md">
        <img
          src={`/project/${current.path}.jpg`}
          alt={current.title}
          className="w-full aspect-[2/1] object-cover"
        />
        <div className="p-4 text-white text-center font-semibold text-xl">
          <Link href={`/projects/${current.path}`}>{current.title}</Link>
        </div>
      </div>

      <button
        onClick={() => setIndex((prev) => (prev - 1 + projects.length) % projects.length)}
        className="absolute left-0 top-1/2 -translate-y-1/2 px-3 py-1 bg-white/20 backdrop-blur-sm text-white shadow-md rounded-l-lg"
      >
        ◀
      </button>
      <button
        onClick={() => setIndex((prev) => (prev + 1) % projects.length)}
        className="absolute right-0 top-1/2 -translate-y-1/2 px-3 py-1 bg-white/20 backdrop-blur-sm text-white shadow-md rounded-r-lg"
      >
        ▶
      </button>
    </div>
  );
}
