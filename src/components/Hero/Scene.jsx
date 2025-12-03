import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Scene = () => {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <mesh ref={meshRef}>
            <torusKnotGeometry args={[1, 0.3, 100, 16]} />
            <meshStandardMaterial
                color="#00d8ff"
                roughness={0.1}
                metalness={0.8}
                emissive="#001133"
                emissiveIntensity={0.2}
            />
        </mesh>
    );
};

export default Scene;
