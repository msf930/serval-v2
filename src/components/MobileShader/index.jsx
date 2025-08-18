import styles from './styles.module.css';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

export default function MobileShader({ bg1b, bg1, bg2b, bg2, bg3b, bg3 }) {
    
    // Set default values if props are not provided
    const backgroundColor1B = bg1b ?? 0.0;
    const backgroundColor1 = bg1 ?? 0.9;
    const backgroundColor2B = bg2b ?? 0.0;
    const backgroundColor2 = bg2 ?? 0.7;
    const backgroundColor3B = bg3b ?? 0.0;
    const backgroundColor3 = bg3 ?? 0.4;
    
    const canvasRef = useRef();
    useEffect(() => {
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: false });
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        // Plane geometry
        const geometry = new THREE.PlaneGeometry(2, 2);

        const uniforms = {
            iTime: { value: 1 },
            iResolution: { value: new THREE.Vector2(width, height) },
            redVal: { value: 0.9 },
            greenVal: { value: 0.9 },
            blueVal: { value: 0.9 },
            redVal2: { value: 0.0 },
            greenVal2: { value: 0.0 },
            blueVal2: { value: 0.0 },
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
        uniform float redVal;
        uniform float greenVal;
        uniform float blueVal;
        uniform float redVal2;
        uniform float greenVal2;
        uniform float blueVal2;
        
        // ---- Colormap functions ----
        float colormap_red( float redVal2, float redVal, float x) {
            return smoothstep(redVal2, redVal, x);
        }
        
        float colormap_green( float greenVal2, float greenVal, float x) {
            return smoothstep(greenVal2, greenVal, x);
        }
        
        float colormap_blue(float blueVal2, float blueVal, float x) {
            return smoothstep(blueVal2, blueVal, x);
        }
        
        vec4 colormap(float x, float redVal, float redVal2, float greenVal, float greenVal2, float blueVal, float blueVal2) {
            return vec4(colormap_red(redVal2, redVal, x ), colormap_green(greenVal2, greenVal, x), colormap_blue(blueVal2, blueVal, x), 0.9);
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
        
            gl_FragColor = vec4(colormap(shade, redVal, redVal2, greenVal, greenVal2, blueVal , blueVal2).rgb, 1.0);
        }
      `,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Postprocessing
        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));



        // Animation loop
        const animate = (time) => {
            uniforms.iTime.value = 100 + time * 0.0001;
            uniforms.redVal.value = backgroundColor1;
            uniforms.greenVal.value = backgroundColor2;
            uniforms.blueVal.value = backgroundColor3;
            uniforms.redVal2.value = backgroundColor1B;
            uniforms.greenVal2.value = backgroundColor2B;
            uniforms.blueVal2.value = backgroundColor3B;
            composer.render();
            requestAnimationFrame(animate);
            



        };
        animate();
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            renderer.setPixelRatio(window.devicePixelRatio);
            uniforms.iResolution.value = new THREE.Vector2(width, height);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            renderer.dispose();
            composer.dispose();
            // window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div className={styles.mobileShaderCont}>
             <div className={styles.canvasCont}>
                <canvas  ref={canvasRef} style={{ width: '100%', height: '100vh' }} />
            </div>
        </div>
    )
}