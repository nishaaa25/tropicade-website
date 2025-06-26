import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree, extend, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Extend R3F with custom geometries
extend({ TeapotGeometry: THREE.TeapotGeometry });

let scale = 1.0;
function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}
if (isMobileDevice()) scale = 0.7;

// Simple noise function (replacing the GLSL import)
const snoise = `
    vec3 mod289(vec3 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 mod289(vec4 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 permute(vec4 x) {
        return mod289(((x*34.0)+1.0)*x);
    }
    
    vec4 taylorInvSqrt(vec4 r) {
        return 1.79284291400159 - 0.85373472095314 * r;
    }
    
    float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        
        i = mod289(i);
        vec4 p = permute(permute(permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }
`;

const Scene = () => {
    const meshRef = useRef();
    const { gl, scene, camera, size } = useThree();
    
    // Load the t-shirt texture
    const tshirtTexture = useLoader(THREE.TextureLoader, '/assets/t-shirt2.png');

    // Create plane geometry
    const planeGeometry = useMemo(() => {
        const segments = isMobileDevice() ? 64 : 128;
        return new THREE.PlaneGeometry(20, 20, segments, segments);
    }, []);

    // Default settings
    const settings = {
        dissolveProgress: 0.0,
        edgeWidth: 0.01,
        amplitude: 0.15,
        frequency: 1.5,
        edgeColor: "#ff3a65",
        autoDissolve: true,
        rotationY: 0,
    };

    // Dissolve uniform data
    const dissolveUniformData = useMemo(() => ({
        uEdgeColor: { value: new THREE.Color(settings.edgeColor) },
        uFreq: { value: settings.frequency },
        uAmp: { value: settings.amplitude },
        uProgress: { value: settings.dissolveProgress },
        uEdge: { value: settings.edgeWidth }
    }), []);

    // Shader materials
    const meshMaterial = useMemo(() => {
        const material = new THREE.MeshStandardMaterial({
            map: tshirtTexture,
            transparent: true,
            side: THREE.DoubleSide,
        });

        material.onBeforeCompile = (shader) => {
            // Setup uniforms
            Object.keys(dissolveUniformData).forEach(key => {
                shader.uniforms[key] = dissolveUniformData[key];
            });

            // Modify shaders
            shader.vertexShader = shader.vertexShader.replace('#include <common>', `#include <common>
                varying vec3 vPos;
                varying vec2 vUv;
            `);

            shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
                vPos = position;
                vUv = uv;
            `);

            shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `#include <common>
                varying vec3 vPos;
                varying vec2 vUv;
                uniform float uFreq;
                uniform float uAmp;
                uniform float uProgress;
                uniform float uEdge;
                uniform vec3 uEdgeColor;
                ${snoise}
            `);

            shader.fragmentShader = shader.fragmentShader.replace('#include <dithering_fragment>', `#include <dithering_fragment>
                // Bottom to top dissolve effect
                // Normalize Y position from -4 to 4 (plane height) to 0 to 1
                float normalizedY = (vPos.y + 4.0) / 8.0;
                
                // Add noise to create organic dissolve pattern
                float noise = snoise(vPos * uFreq) * uAmp;
                
                // Combine Y position with noise for bottom-to-top dissolve
                float dissolveValue = normalizedY + noise;
                
                // Discard pixels below the dissolve threshold
                if(dissolveValue < uProgress) discard;
                
                // Create glowing edge effect
                float edgeWidth = uProgress + uEdge;
                if(dissolveValue > uProgress && dissolveValue < edgeWidth){
                    float edgeIntensity = 1.0 - smoothstep(uProgress, edgeWidth, dissolveValue);
                    gl_FragColor = vec4(uEdgeColor * edgeIntensity * 3.0, 1.0);
                }
            `);
        };

        return material;
    }, [dissolveUniformData, tshirtTexture]);

    // Animation loop
    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Float mesh
        if (meshRef.current) {
            meshRef.current.position.y = 0;
            meshRef.current.rotation.y = settings.rotationY;
        }

        // Auto dissolve animation (bottom to top)
        if (settings.autoDissolve) {
            const progress = Math.sin(time * 0.5) * 0.5 + 0.5; // 0 to 1
            dissolveUniformData.uProgress.value = progress;
        }
    });

    return (
        <>
            <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/symmetrical_garden_02_1k.hdr" />
            <mesh
                ref={meshRef}
                geometry={planeGeometry}
                material={meshMaterial}
            />
        </>
    );
};

const RevealCode = () => {
    return (
        <div className="w-full h-[100vh] relative">
            <Canvas
                camera={{
                    position: isMobileDevice() ? [0, 8, 18] : [0, 1, 14],
                    fov: 75,
                    near: 0.001,
                    far: 100
                }}
                flat
                gl={{
                    antialias: true,
                    toneMappingExposure: 0.8,
                    outputEncoding: THREE.sRGBEncoding,
    toneMapping: THREE.ACESFilmicToneMapping,
                }}
                
            >
                <ambientLight/>
                <Scene />
            </Canvas>
        </div>
    );
};

export default RevealCode;