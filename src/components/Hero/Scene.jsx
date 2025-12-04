import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COLORS = [
    '#240046', // Deep Purple (Base)
    '#7B2CBF', // Electric Indigo (Rising)
    '#FF006E', // Hot Pink (Peak Energy)
    '#00F5D4', // Cyan (Cool down)
];

const Scene = () => {
    const groupRef = useRef();
    const materialRef = useRef();
    const innerMaterialRef = useRef();
    const [hovered, setHovered] = useState(false);
    const timeRef = useRef(0); // Custom time tracker for variable speed
    const glitchEndTime = useRef(0);
    const lastGlitchTime = useRef(-3000); // Initialize to allow immediate glitch

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('hotpink') }
    }), []);

    useFrame((state, delta) => {
        // 1. Variable Time Update for Pulse
        const timeSpeed = hovered ? 9.0 : 1.0;
        timeRef.current += delta * timeSpeed;

        // 2. Group Rotation (Constant)
        if (groupRef.current) {
            groupRef.current.rotation.x += delta * 0.2;
            groupRef.current.rotation.y += delta * 0.3;

            // 3. Glitch Effect (Position Jitter)
            if (Date.now() < glitchEndTime.current) {
                groupRef.current.position.x = (Math.random() - 0.5) * 0.2;
                groupRef.current.position.y = (Math.random() - 0.5) * 0.2;
                groupRef.current.position.z = (Math.random() - 0.5) * 0.2;
            } else {
                groupRef.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.1);
            }
        }

        // 4. Shader Time Update
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = timeRef.current;
        }

        // 5. Color Shift Animation
        if (innerMaterialRef.current) {
            const t = state.clock.elapsedTime * 0.5; // Speed of color cycle
            const index = Math.floor(t) % COLORS.length;
            const nextIndex = (index + 1) % COLORS.length;
            const alpha = t % 1;

            innerMaterialRef.current.color.lerpColors(
                new THREE.Color(COLORS[index]),
                new THREE.Color(COLORS[nextIndex]),
                alpha
            );
        }
    });

    const vertexShader = `
        varying vec3 vPosition;
        void main() {
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec3 vPosition;
        
        void main() {
            float dist = length(vPosition);
            float time = mod(uTime, 3.0);
            float wavePos = time * 1.5;
            float intensity = 1.0 - smoothstep(0.0, 0.4, abs(dist - wavePos));
            if (intensity < 0.01) discard;
            gl_FragColor = vec4(uColor, intensity);
        }
    `;

    return (
        <group
            ref={groupRef}
            onPointerOver={() => {
                setHovered(true);
                // Only glitch if 3 seconds have passed since last glitch
                if (Date.now() - lastGlitchTime.current > 3000) {
                    glitchEndTime.current = Date.now() + 200; // Glitch for 0.2s
                    lastGlitchTime.current = Date.now();
                }
            }}
            onPointerOut={() => setHovered(false)}
        >
            {/* Inner Original Mesh */}
            <mesh>
                <torusKnotGeometry args={[1, 0.3, 100, 16]} />
                <meshStandardMaterial
                    ref={innerMaterialRef}
                    color="#240046"
                    roughness={0.1}
                    metalness={0.8}
                    emissive="#001133"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Outer Wireframe Pulse Mesh */}
            <mesh scale={1.001}>
                <torusKnotGeometry args={[1, 0.3, 100, 16]} />
                <shaderMaterial
                    ref={materialRef}
                    transparent
                    wireframe
                    uniforms={uniforms}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    depthWrite={false}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
};

export default Scene;
