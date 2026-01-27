import React, { useEffect, useRef, forwardRef } from 'react';
import * as THREE from 'three';

import { createPortal } from 'react-dom';

export const LivingFluidBackground = forwardRef<HTMLDivElement, { className?: string }>(({ className }, ref) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = React.useState(false)

    useEffect(() => {
        setMounted(true)
        const currentMount = mountRef.current;
        if (!currentMount) return;

        // --- Scene Setup ---
        const scene = new THREE.Scene();
        
        // Use OrthographicCamera for a true fullscreen quad regardless of aspect ratio
        // Left, Right, Top, Bottom, Near, Far
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); 
        
        // Explicitly clear background to be transparent
        renderer.setClearColor(0x000000, 0);
        
        // Use WINDOW size to guarantee full screen
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        renderer.domElement.style.position = 'fixed';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.width = '100vw'; // Explicit vw
        renderer.domElement.style.height = '100vh'; // Explicit vh
        renderer.domElement.style.zIndex = '-1'; 
        
        currentMount.appendChild(renderer.domElement);
        
        // --- GLSL Shader Code ---
        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = vec4(position, 1.0); // Simple clip space position for fullscreen quad
            }
        `;

        const fragmentShader = `
            uniform vec2 u_resolution;
            uniform float u_time;
            uniform vec2 u_mouse;

            // 2D Noise function
            float noise(vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
            }

            // Fractional Brownian Motion
            float fbm(vec2 st) {
                float value = 0.0;
                float amplitude = 0.5;
                float frequency = 0.0;
                for (int i = 0; i < 6; i++) {
                    value += amplitude * noise(st);
                    st *= 2.0;
                    amplitude *= 0.5;
                }
                return value;
            }

            void main() {
                // Correct aspect ratio for the shader pattern so it doesn't stretch
                vec2 st = gl_FragCoord.xy / u_resolution.xy;
                
                // Correction: Adjust 'st.x' by aspect ratio to make noise uniform
                float aspect = u_resolution.x / u_resolution.y;
                st.x *= aspect;

                vec2 mouse = u_mouse / u_resolution.xy;
                mouse.x *= aspect; // Adjust mouse too

                // Animate the noise field
                vec2 q = vec2(fbm(st + 0.0*u_time), fbm(st + vec2(1.0)));
                
                // Add mouse interaction to distort the field
                float mouse_dist = distance(st, mouse);
                vec2 mouse_effect = (mouse - st) * 0.1 / (mouse_dist + 0.01);
                q += mouse_effect;
                
                // More animation
                vec2 r = vec2(fbm(st + q + vec2(1.7,9.2) + 0.15*u_time), fbm(st + q + vec2(8.3,2.8) + 0.126*u_time));

                // Use the final noise values to generate color
                float final_noise = fbm(st + r);

                // Configurable visibility
                
                // Color: Pure White
                vec3 color = vec3(1.0, 1.0, 1.0);

                // Alpha:
                // Reduce particle density by raising the threshold further (0.6 -> 0.75)
                // This makes the static much sparser.
                float visibility = smoothstep(0.75, 0.9, final_noise); 
                
                // Boost alpha for visible parts
                float alpha = visibility * 0.5; 
                
                gl_FragColor = vec4(color, alpha);
            }
        `;

        // --- Shader Material ---
        const uniforms = {
            u_time: { value: 0.0 },
            u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            u_mouse: { value: new THREE.Vector2() }
        };

        const planeGeometry = new THREE.PlaneGeometry(2, 2);
        const planeMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true, 
            depthWrite: false, 
        });

        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        scene.add(plane);

        // --- Mouse Interaction ---
        const handleMouseMove = (event: MouseEvent) => {
            uniforms.u_mouse.value.set(event.clientX, window.innerHeight - event.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove, false);

        // --- Animation Loop ---
        const clock = new THREE.Clock();
        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            uniforms.u_time.value = clock.getElapsedTime() * 0.2;
            renderer.render(scene, camera);
        };

        animate();

        // --- Responsive Handling ---
        const handleResize = () => {
            // No camera aspect update needed for full screen ortho quad
            renderer.setSize(window.innerWidth, window.innerHeight);
            uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // --- Cleanup ---
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (currentMount && renderer.domElement) {
                currentMount.removeChild(renderer.domElement);
            }
            renderer.dispose();
            cancelAnimationFrame(animationId);
        };

    }, [mounted]);

    if (!mounted) return null

    // Portal to body to break out of all containers
    return createPortal(
        <div ref={ref} className={`fixed inset-0 w-screen h-screen pointer-events-none ${className}`} style={{zIndex: 10 /* Force high z-index here or via className */}}>
             <div ref={mountRef} className="absolute inset-0 w-full h-full" />
        </div>,
        document.body
    );
});

LivingFluidBackground.displayName = 'LivingFluidBackground';
