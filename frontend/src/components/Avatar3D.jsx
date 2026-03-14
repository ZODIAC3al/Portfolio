import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useTexture,
  MeshDistortMaterial,
  Float,
  Stars,
} from "@react-three/drei";
import * as THREE from "three";

// Inner 3D scene
function Avatar3D({ imageUrl }) {
  const meshRef = useRef();
  const ringRef = useRef();
  const glowRef = useRef();
  const { mouse } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (meshRef.current) {
      // Face the cursor
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        mouse.x * 0.3,
        0.05,
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -mouse.y * 0.15,
        0.05,
      );
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4;
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.1;
    }

    if (glowRef.current) {
      glowRef.current.material.opacity = 0.15 + Math.sin(t * 2) * 0.05;
    }
  });

  const texture = useTexture(imageUrl);

  return (
    <group>
      {/* Stars background */}
      <Stars
        radius={20}
        depth={5}
        count={500}
        factor={2}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Main avatar sphere */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.4, 64, 64]} />
          <meshStandardMaterial
            map={texture}
            roughness={0.2}
            metalness={0.05}
            envMapIntensity={1}
          />
        </mesh>
      </Float>

      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial
          color="#00d4aa"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Rotating ring 1 */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.012, 16, 120]} />
        <meshBasicMaterial color="#00d4aa" transparent opacity={0.6} />
      </mesh>

      {/* Rotating ring 2 */}
      <mesh rotation={[Math.PI / 3, 0.4, 0]}>
        <torusGeometry args={[2.3, 0.008, 16, 120]} />
        <meshBasicMaterial color="#00a8ff" transparent opacity={0.35} />
      </mesh>

      {/* Particles floating around */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <Float key={i} speed={1 + i * 0.3} floatIntensity={0.5}>
            <mesh
              position={[
                Math.cos(angle) * 2.2,
                Math.sin(i * 0.8) * 0.8,
                Math.sin(angle) * 2.2,
              ]}
            >
              <octahedronGeometry args={[0.05, 0]} />
              <meshBasicMaterial
                color={i % 2 === 0 ? "#00d4aa" : "#00a8ff"}
                transparent
                opacity={0.8}
              />
            </mesh>
          </Float>
        );
      })}

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-3, 2, 2]} intensity={0.8} color="#00d4aa" />
      <pointLight position={[3, -2, -2]} intensity={0.5} color="#00a8ff" />
    </group>
  );
}

export default function AvatarCanvas({ imageUrl }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <Avatar3D imageUrl={imageUrl} />
      </Canvas>
    </div>
  );
}
