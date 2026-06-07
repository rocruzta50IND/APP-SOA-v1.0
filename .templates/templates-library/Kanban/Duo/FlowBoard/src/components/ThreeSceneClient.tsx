"use client";

import React, { useRef } from 'react';
import type { Mesh } from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Sphere } from '@react-three/drei';

function RotatingSphere() {
  const meshRef = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
      <meshStandardMaterial color="#00ffff" wireframe />
    </Sphere>
  );
}

export default function ThreeSceneClient() {
  return (
    <div className="w-full h-full absolute inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <RotatingSphere />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}