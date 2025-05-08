import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { shaderMaterial, useTrailTexture } from '@react-three/drei'
import * as THREE from 'three'
import './styles.css'
import Image from 'next/image'


import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'; // optional


const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

` // copy from above
const fragmentShader = `
precision mediump float;
uniform float iTime;
uniform vec2 iResolution;
varying vec2 vUv;

// ---- Colormap functions ----
float colormap_red(float x) {
    return smoothstep(0.0, 0.8, x);
}

float colormap_green(float x) {
    return smoothstep(0.0, 0.6, x);
}

float colormap_blue(float x) {
    return smoothstep(0.0, 0.3, x);
}

vec4 colormap(float x) {
    return vec4(colormap_red(x), colormap_green(x), colormap_blue(x), 0.3);
}

// ---- Noise and FBM ----
float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}
float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    float res = mix(
        mix(rand(ip), rand(ip+vec2(1.0,0.0)), u.x),
        mix(rand(ip+vec2(0.0,1.0)), rand(ip+vec2(1.0,1.0)), u.x),u.y);
    return res*res;
}
const mat2 mtx = mat2(0.80, 0.60, -0.60, 0.80);
float fbm(vec2 p) {
    float f = 0.0;
    f += 0.5 * noise(p + iTime); p = mtx*p*2.02;
    f += 0.25 * noise(p); p = mtx*p*2.01;
    f += 0.125 * noise(p); p = mtx*p*2.03;
    f += 0.0625 * noise(p); p = mtx*p*2.01;
    f += 0.03125 * noise(p); p = mtx*p*2.04;
    f += 0.015625 * noise(p + sin(iTime));
    return f / 0.96875;
}
float pattern(vec2 p) {
    return fbm(p + fbm(p + fbm(p)));
}

void main() {
    vec2 fragCoord = vUv * iResolution;
    vec2 uv = fragCoord / iResolution.x;
    float shade = pattern(uv);

    // Normalize shade to [0, 1]
    shade = clamp(shade, 0.0, 1.0);

    gl_FragColor = vec4(colormap(shade).rgb, 1.0);
}

` // copy from above

const fragmentShader2 = `
uniform float iTime;
uniform vec2 iResolution;

#define t iTime
#define r iResolution.xy

void main() {
    vec2 fragCoord = gl_FragCoord.xy / iResolution.xy; // Normalize to [0, 1]
    vec2 uv = fragCoord - 1.0; // Center to [-0.5, 0.5]
    uv.x *= iResolution.x / iResolution.y; // Adjust for aspect ratio

    vec3 c;
    float l, z = t;

    for (int i = 0; i < 3; i++) {
        vec2 p = uv;
        z += 0.07;
        l = length(p);
        p += p / l * (sin(z) + 1.0) * abs(sin(l * 9.0 - z - z));
        c[i] = 0.01 / length(mod(p, 1.0) - 0.5);
    }

    gl_FragColor = vec4(c / l, t);
}
`

const fragmentShader3 = `
precision mediump float;
uniform float iTime;
uniform vec2 iResolution;
varying vec2 vUv;

// ---- Colormap functions ----
float colormap_red(float x) {
    return smoothstep(0.0, 0.8, x);
}
float colormap_green(float x) {
    return smoothstep(0.0, 0.6, x);
}
float colormap_blue(float x) {
    return smoothstep(0.0, 0.3, x);
}
vec4 colormap(float x) {
    return vec4(colormap_red(x), colormap_green(x), colormap_blue(x), 0.3);
}

// ---- Noise and FBM ----
float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}
float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    float res = mix(
        mix(rand(ip), rand(ip+vec2(1.0,0.0)), u.x),
        mix(rand(ip+vec2(0.0,1.0)), rand(ip+vec2(1.0,1.0)), u.x),u.y);
    return res*res;
}
const mat2 mtx = mat2(0.80, 0.60, -0.60, 0.80);
float fbm(vec2 p) {
    float f = 0.0;
    f += 0.5 * noise(p + iTime); p = mtx*p*2.02;
    f += 0.25 * noise(p); p = mtx*p*2.01;
    f += 0.125 * noise(p); p = mtx*p*2.03;
    f += 0.0625 * noise(p); p = mtx*p*2.01;
    f += 0.03125 * noise(p); p = mtx*p*2.04;
    f += 0.015625 * noise(p + sin(iTime));
    return f / 0.96875;
}
float pattern(vec2 p) {
    return fbm(p + fbm(p + fbm(p)));
}

void main() {
    vec2 fragCoord = vUv * iResolution;
    vec2 uv = fragCoord / iResolution.x;
    float shade = clamp(pattern(uv), 0.0, 1.0);

    // Main color
    vec3 baseColor = colormap(shade).rgb;

    // Fake glow color: brighter and blurred version of the pattern
    float glow = pow(shade, 2.0); // Emphasize high values
    vec3 glowColor = colormap(glow).rgb * 2.0; // Brighten glow

    // Blend glow and base: additive blending
    vec3 finalColor = baseColor + glowColor * 0.25;

    gl_FragColor = vec4(finalColor, 1.0);
}

`

// Create ShaderMaterial with uniforms
const ColormapMaterial = shaderMaterial(
    {
        iTime: 0,
        iResolution: new THREE.Vector2(),
    },
    vertexShader,
    fragmentShader
)

extend({ ColormapMaterial })

function FullscreenPlane() {
    const ref = useRef()
    const { viewport, size } = useThree()

    // Update uniforms each frame
    useFrame(({ clock }) => {
        ref.current.iTime = clock.getElapsedTime()
        ref.current.iResolution.set(size.width, size.height)
    })

    return (
        <mesh >
            <planeGeometry args={[viewport.width, viewport.height]} />
            <colormapMaterial
                ref={ref}
            />
        </mesh>
    )
}
const canvas = document.querySelector('#webgl');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
    -1, 1, 1, -1, 0, 1
);
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// Procedural shader pass
const baseShaderPass = new ShaderPass(fragmentShader);
composer.addPass(baseShaderPass);

// Blur shader (Gaussian blur or UnrealBloom for simplicity)
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,  // strength
    0.4,  // radius
    0.85  // threshold
);
composer.addPass(bloomPass);

function animate(time) {
    requestAnimationFrame(animate);
    BaseShader.uniforms.iTime.value = time * 0.001;

    composer.render();
}


export default function HomePage() {
    return (
        <div className="container">
            <div className="absolute z-50 w-full text-center h-full flex flex-col items-center justify-center text-white">
                <div className="logoCont">
                    <Image src="/logo.png" fill objectFit="contain" />
                    {/*<div className="logoBg"></div>*/}
                </div>

            </div>
            <Canvas style={{height: "100vh", width: "100vw"}} orthographic camera={{ position: [0, 0, 1], zoom: 1 }}  >
                <FullscreenPlane />
            </Canvas>
        </div>
    )
}
