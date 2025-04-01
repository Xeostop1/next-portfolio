'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function MoonSystem() {
  const moonRef = useRef<THREE.Mesh>(null);
  const angle = useRef(0);

  useFrame(() => {
    angle.current += 0.01; // 달의 공전 속도 조절

    const radius = 5; // 달과 지구 사이 거리
    const x = radius * Math.cos(angle.current);
    const z = radius * Math.sin(angle.current);

    if (moonRef.current) {
      moonRef.current.position.set(x, 0, z);
    }
  });

  return (
    <>
      {/* 🌍 지구 */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {/* 🌕 달 */}
      <mesh ref={moonRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* 💡 빛 */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} />
    </>
  );
}

export default function MoonOrbit() {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 3, 10], fov: 60 }}>
        <OrbitControls enableZoom={false} />
        <MoonSystem />
      </Canvas>
    </div>
  );
}
