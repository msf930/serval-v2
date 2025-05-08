'use client';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export default function GlowShaderCanvas() {
    const canvasRef = useRef();

    useEffect(() => {
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        // Plane geometry
        const geometry = new THREE.PlaneGeometry(2, 2);

        const uniforms = {
            iTime: { value: 0 },
            iResolution: { value: new THREE.Vector2(width, height) },
        };

        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        precision mediump float;
        uniform float iTime;
        uniform vec2 iResolution;
        varying vec2 vUv;

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

        void main() {
          vec2 fragCoord = vUv * iResolution;
          vec2 uv = fragCoord / iResolution.x;
          float shade = clamp(fbm(uv + fbm(uv + fbm(uv))), 0.0, 1.0);

          vec3 baseColor = vec3(shade);
          vec3 glow = pow(vec3(shade), vec3(2.0)) * 2.0;
          vec3 finalColor = baseColor + glow * 0.25;

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Postprocessing
        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(width, height),
            1.5, 0.4, 0.9
        );
        composer.addPass(bloomPass);

        // Animation loop
        const animate = (time) => {
            uniforms.iTime.value = time * 0.001;
            composer.render();
            requestAnimationFrame(animate);
        };
        animate();

        // Cleanup
        return () => {
            renderer.dispose();
            composer.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}
