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

// GUI Panel Component
const GuiPanel = ({ settings, onSettingChange }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const ColorPicker = ({ label, value, onChange }) => (
        <div className="mb-3">
            <label className="block text-xs text-gray-300 mb-1">{label}</label>
            <div className="flex items-center gap-2">
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-8 h-6 rounded border-none cursor-pointer"
                />
                <span className="text-xs text-gray-400">{value}</span>
            </div>
        </div>
    );

    const Slider = ({ label, value, onChange, min, max, step = 0.01, suffix = "" }) => (
        <div className="mb-3">
            <label className="block text-xs text-gray-300 mb-1">
                {label}: {value.toFixed(2)}{suffix}
            </label>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
        </div>
    );

    const Checkbox = ({ label, checked, onChange }) => (
        <div className="mb-3 flex items-center gap-2">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <label className="text-xs text-gray-300">{label}</label>
        </div>
    );

    const Button = ({ label, onClick, active = false }) => (
        <button
            onClick={onClick}
            className={`px-3 py-1 text-xs rounded mb-2 mr-2 transition-colors ${
                active 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="absolute top-4 right-4 z-10">
            <div className={`bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 transition-all duration-300 ${
                isCollapsed ? 'w-12 h-12' : 'w-80 max-h-[90vh] overflow-y-auto'
            }`}>
                <div 
                    className="flex items-center justify-between p-3 border-b border-white/20 cursor-pointer"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <h3 className={`text-sm font-medium text-white ${isCollapsed ? 'hidden' : ''}`}>
                        Effect Controls
                    </h3>
                    <button className="text-gray-400 hover:text-white">
                        {isCollapsed ? '⚙️' : '−'}
                    </button>
                </div>
                
                {!isCollapsed && (
                    <div className="p-4 space-y-4">
                        {/* Dissolve Controls */}
                        <div>
                            <h4 className="text-xs font-semibold text-blue-400 mb-2 uppercase tracking-wider">
                                Dissolve Effect (Bottom to Top)
                            </h4>
                            <Slider
                                label="Dissolve Progress"
                                value={settings.dissolveProgress}
                                onChange={(val) => onSettingChange('dissolveProgress', val)}
                                min={-1}
                                max={1}
                                step={0.01}
                            />
                            <Slider
                                label="Edge Width"
                                value={settings.edgeWidth}
                                onChange={(val) => onSettingChange('edgeWidth', val)}
                                min={0.01}
                                max={0.5}
                                step={0.01}
                            />
                            <Slider
                                label="Noise Amplitude"
                                value={settings.amplitude}
                                onChange={(val) => onSettingChange('amplitude', val)}
                                min={0.1}
                                max={2}
                                step={0.01}
                            />
                            <Slider
                                label="Noise Frequency"
                                value={settings.frequency}
                                onChange={(val) => onSettingChange('frequency', val)}
                                min={0.01}
                                max={2}
                                step={0.01}
                            />
                            <Checkbox
                                label="Auto Dissolve Animation"
                                checked={settings.autoDissolve}
                                onChange={(val) => onSettingChange('autoDissolve', val)}
                            />
                        </div>

                        {/* Mesh Controls */}
                        <div>
                            <h4 className="text-xs font-semibold text-green-400 mb-2 uppercase tracking-wider">
                                Mesh Settings
                            </h4>
                            <ColorPicker
                                label="Edge Color"
                                value={settings.edgeColor}
                                onChange={(val) => onSettingChange('edgeColor', val)}
                            />
                            <Slider
                                label="Rotation Y"
                                value={settings.rotationY}
                                onChange={(val) => onSettingChange('rotationY', val)}
                                min={0}
                                max={Math.PI * 2}
                                step={0.01}
                                suffix=" rad"
                            />
                        </div>

                        {/* Presets */}
                        <div>
                            <h4 className="text-xs font-semibold text-yellow-400 mb-2 uppercase tracking-wider">
                                Quick Presets
                            </h4>
                            <Button
                                label="Reset Default"
                                onClick={() => onSettingChange('preset', 'default')}
                            />
                            <Button
                                label="Slow Dissolve"
                                onClick={() => onSettingChange('preset', 'slow')}
                            />
                            <Button
                                label="Fast Dissolve"
                                onClick={() => onSettingChange('preset', 'fast')}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const Scene = ({ settings }) => {
    const meshRef = useRef();
    const { gl, scene, camera, size } = useThree();
    
    // Load the t-shirt texture
    const tshirtTexture = useLoader(THREE.TextureLoader, '/assets/t-shirt2.png');

    // Create plane geometry
    const planeGeometry = useMemo(() => {
        const segments = isMobileDevice() ? 64 : 128;
        return new THREE.PlaneGeometry(8, 8, segments, segments);
    }, []);

    // Dissolve uniform data
    const dissolveUniformData = useMemo(() => ({
        uEdgeColor: { value: new THREE.Color(settings.edgeColor) },
        uFreq: { value: settings.frequency },
        uAmp: { value: settings.amplitude },
        uProgress: { value: settings.dissolveProgress },
        uEdge: { value: settings.edgeWidth }
    }), []);

    // Update uniforms when settings change
    useEffect(() => {
        dissolveUniformData.uEdgeColor.value.set(settings.edgeColor);
        dissolveUniformData.uFreq.value = settings.frequency;
        dissolveUniformData.uAmp.value = settings.amplitude;
        dissolveUniformData.uProgress.value = settings.dissolveProgress;
        dissolveUniformData.uEdge.value = settings.edgeWidth;
    }, [settings.edgeColor, settings.frequency, settings.amplitude, settings.dissolveProgress, settings.edgeWidth, dissolveUniformData]);

    // Shader materials
    const meshMaterial = useMemo(() => {
        const material = new THREE.MeshBasicMaterial({
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
            const yPos = Math.sin(time * 2.0) * 0.5;
            meshRef.current.position.y = yPos;
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
    const [settings, setSettings] = useState({
        dissolveProgress: 0.0,
        edgeWidth: 0.1,
        amplitude: 0.3,
        frequency: 0.5,
        edgeColor: "#4d9bff",
        autoDissolve: false,
        rotationY: 0,
    });

    const handleSettingChange = (key, value) => {
        if (key === 'preset') {
            // Handle presets
            const presets = {
                default: {
                    dissolveProgress: 0.0,
                    edgeWidth: 0.1,
                    amplitude: 0.3,
                    frequency: 0.5,
                    edgeColor: "#4d9bff",
                    autoDissolve: false,
                    rotationY: 0,
                },
                slow: {
                    ...settings,
                    dissolveProgress: 0.0,
                    edgeWidth: 0.15,
                    amplitude: 0.2,
                    frequency: 0.3,
                    autoDissolve: true,
                },
                fast: {
                    ...settings,
                    dissolveProgress: 0.0,
                    edgeWidth: 0.05,
                    amplitude: 0.5,
                    frequency: 0.8,
                    autoDissolve: true,
                }
            };
            setSettings(presets[value]);
        } else {
            setSettings(prev => ({
                ...prev,
                [key]: value
            }));
        }
    };

    return (
        <div className="w-full h-screen relative">
            <Canvas
                camera={{
                    position: isMobileDevice() ? [0, 8, 18] : [0, 1, 14],
                    fov: 75,
                    near: 0.001,
                    far: 100
                }}
                gl={{
                    antialias: true,
                    toneMapping: THREE.CineonToneMapping,
                    outputColorSpace: THREE.SRGBColorSpace,
                }}
                
            >
                <Scene settings={settings} />
                <OrbitControls />
            </Canvas>
            
            <GuiPanel 
                settings={settings} 
                onSettingChange={handleSettingChange}
            />
            
            {/* Instructions */}
            <div className="absolute bottom-4 left-4 text-white/70 text-sm">
                <p>🎛️ Use the controls panel to tweak the dissolve effect</p>
                <p>🖱️ Click and drag to orbit • Scroll to zoom</p>
            </div>
            
            {/* Custom CSS for slider styling */}
            <style jsx>{`
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    height: 16px;
                    width: 16px;
                    border-radius: 50%;
                    background: #4d9bff;
                    cursor: pointer;
                    border: 2px solid #1f2937;
                    box-shadow: 0 0 0 1px #4d9bff;
                }
                
                .slider::-moz-range-thumb {
                    height: 16px;
                    width: 16px;
                    border-radius: 50%;
                    background: #4d9bff;
                    cursor: pointer;
                    border: 2px solid #1f2937;
                    box-shadow: 0 0 0 1px #4d9bff;
                }
                
                .slider::-webkit-slider-track {
                    background: #374151;
                    border-radius: 8px;
                }
                
                .slider::-moz-range-track {
                    background: #374151;
                    border-radius: 8px;
                }
            `}</style>
        </div>
    );
};

export default RevealCode;