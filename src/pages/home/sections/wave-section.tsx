/* eslint-disable react/no-unknown-property */
import { useRef, useState } from 'react';

import { Canvas, useFrame } from '@react-three/fiber';
import { NavLink } from 'react-router-dom';
import * as THREE from 'three';

const PARTICLE_SIZE = 0.035; // 점 크기(0.5)
const PARTICLE_OPACITY = 0.5; // 투명도(0.8)
const FIELD_X = 15; // x 범위(20)
const FIELD_Z = 15; // z 범위(15)

const WaveParticles = () => {
  const points = useRef<THREE.Points>(null!);

  const count = 20000;

  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * FIELD_X;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = (Math.random() - 0.5) * FIELD_Z;
    }
    return pos;
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const geom = points.current.geometry as THREE.BufferGeometry;
    const posAttr = geom.getAttribute('position') as THREE.BufferAttribute;

    for (let i = 0; i < count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);

      let h = Math.sin(x * 0.5 + t * 0.7) * Math.cos(z * 0.3 + t * 0.5) * 1.5;
      h += Math.sin(x * 1.2 + t * 1.2) * 0.3;
      h += Math.sin((x + z) * 2.5 + t * 2) * 0.1;

      posAttr.setY(i, h);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>

      <pointsMaterial
        size={PARTICLE_SIZE}
        color="#ffffff"
        transparent
        opacity={PARTICLE_OPACITY}
        sizeAttenuation={true}
        blending={THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
};

export const WaveSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* 배경 레이어: 깊이감을 위해 카메라 각도를 낮춤 (Low Angle) */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 1.5, 10], fov: 40 }} dpr={1}>
          <color attach="background" args={['#000']} />
          {/* 안개를 강하게 걸어 뒷부분이 사진처럼 어둠 속으로 사라지게 함 */}
          <fog attach="fog" args={['#000', 2, 1]} />
          <WaveParticles />
        </Canvas>
      </div>

      {/* Overlay UI */}
      <div className="absolute inset-0 z-10 flex select-none flex-col justify-center px-4 pt-72 text-left sm:px-8 lg:px-28">
        {/* Title */}
        <h1 className="text-2xl font-bold tracking-tight text-text-default">
          SSCC, <br />
          꿈을 향한 첫걸음.
        </h1>
        <NavLink
          to="/apply"
          className="mt-4 shrink-0 self-start rounded-full border-[1.5px] border-point bg-bg-default px-6 py-2 text-xs font-semibold text-point"
        >
          지금 바로 지원하기 →
        </NavLink>
      </div>
    </section>
  );
};

export default WaveSection;
