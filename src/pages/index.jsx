'use client';
import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

import Image from "next/image";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';

import gsap from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import { SplitText } from 'gsap/dist/SplitText';
import { ScrambleTextPlugin } from 'gsap/dist/ScrambleTextPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrambleTextPlugin);

// import '../styles/globals.css';


import logo from '../../public/logo.png';
import styles from "@/components/WebsiteSection/styles.module.css";
import {scale} from "motion";

export default function Home() {
    //GSAP stuff
    const [scroll, setScroll] = useState(0.0);
    const main = useRef();
    const smoother = useRef();

    useGSAP(
        () => {
            smoother.current = ScrollSmoother.create({
                smooth: 2,
                effects: true,
                // collect scroll progress from gsap and pass it to the shader
                onUpdate: (progress) => {setScroll(progress.progress)},
            });
            //create a scroll trigger for the sticky divs
            ScrollTrigger.create({
                trigger: '#stickyContent',
                pin: true,
                start: 'center center',
                end: '+=2000',
                markers: false,
            });
            ScrollTrigger.create({
                trigger: '#stickyContent2',
                pin: true,
                start: 'center center',
                end: '+=2000',
                markers: false,
            });
            ScrollTrigger.create({
                trigger: '#stickyContent3',
                pin: true,
                start: 'center center',
                end: '+=2000',
                markers: true,
            });

        },
        {
            scope: main,
        }
    );

    //Text split for the logo bottom text
    useEffect(() => {
        if (typeof window !== "undefined") {
            const split = SplitText.create(".logoText", {
                type: "words",
            });
            gsap.from(split.words, {
                y: 10,
                autoAlpha: 0,
                stagger: 0.2,
            });
        }
    }, []);

    //Text split Website section
    const [inView, setInView] = useState(false);
    useEffect(() => {
        if (inView) {
            const split = SplitText.create(".websiteTitle2", {
                type: "chars",
            });
            gsap.from(split.chars, {
                y: 0,
                autoAlpha: 0,
                stagger: {
                    amount: 0.5,
                    from: "random",
                },
                scrambleText: {
                    text: "WEBSITES",
                    speed: 0.3,
                    revealDelay: 0.5,
                    chars: "01",
                }
            });
        }
    }, [inView]);





    //Converting the GSAP scroll progress to a motion value
    const canvasRef = useRef();
    const scrollRef = useRef(null);
    const scrollYProgress  = useMotionValue(scroll);
    useEffect(() => {
        scrollYProgress.set(scroll);
    }, [scroll, scrollYProgress]);

    //useTransform for the shader colors
    const backgroundColor1B = useTransform(
        scrollYProgress,
        [0.0, 0.09, 0.36, 0.40, 0.63, 0.67, 0.9, 0.94, 1.0],
        [0.0, 0.0, 0.0, 0.2, 0.2, 0.2, 0.2, 0.1, 0.1]
    )
    const backgroundColor1 = useTransform(
        scrollYProgress,
        [0.0, 0.09, 0.36, 0.40, 0.63, 0.67, 0.9, 0.94, 1.0],
        [0.9, 0.0, 0.0, 0.8, 0.8, 0.8, 0.8, 0.7, 0.7]
    )

    const backgroundColor2B = useTransform(
        scrollYProgress,
        [0.0, 0.09, 0.36, 0.40, 0.63, 0.67, 0.9, 0.94, 1.0],
        [0.0, 0.0, 0.0, 0.2, 0.2, 0.4, 0.4, 0.1, 0.1]
    )
    const backgroundColor2 = useTransform(
        scrollYProgress,
        [0.0, 0.09, 0.36, 0.40, 0.63, 0.67, 0.9, 0.94, 1.0],
        [0.7, 0.7, 0.7, 0.5, 0.5, 0.6, 0.6, 0.7, 0.7]
    )

    const backgroundColor3B = useTransform(
        scrollYProgress,
        [0.0, 0.09, 0.36, 0.40, 0.63, 0.67, 0.9, 0.94, 1.0],
        [0.0, 0.3, 0.3, 0.0, 0.0, 0.1, 0.1, 0.1, 0.1]
    )
    const backgroundColor3 = useTransform(
        scrollYProgress,
        [0.0, 0.09, 0.36, 0.40, 0.63, 0.67, 0.9, 0.94, 1.0],
        [0.4, 0.8, 0.8, 0.7, 0.7, 0.6, 0.6, 0.7, 0.7]
    )


    const backgroundTimeStep = useTransform(
        scrollYProgress,
        [0, 1.0],
        [0, 10.0]
    )

    //useEffect for the canvas to update the shader with the scroll progress
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
            iTime: { value: 1 },
            iResolution: { value: new THREE.Vector2(width, height) },
            redVal: { value: 0.9},
            greenVal: { value: 0.9 },
            blueVal: { value: 0.9 },
            redVal2: { value: 0.0},
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
            uniforms.iTime.value = backgroundTimeStep.get() + 100 + time * 0.0001;
            uniforms.redVal.value = backgroundColor1.get();
            uniforms.greenVal.value = backgroundColor2.get();
            uniforms.blueVal.value = backgroundColor3.get();
            uniforms.redVal2.value = backgroundColor1B.get();
            uniforms.greenVal2.value = backgroundColor2B.get();
            uniforms.blueVal2.value = backgroundColor3B.get();
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
            window.removeEventListener('resize', handleResize);
        };
    }, [backgroundTimeStep, backgroundColor1, backgroundColor2, backgroundColor3, backgroundColor1B, backgroundColor2B, backgroundColor3B]);


    const webCardMain = useTransform(
        scrollYProgress,
        [0.12,0.14],
        ["-50%", "-100%"]
    )
    const webCardMainSpring = useSpring(webCardMain, { stiffness: 80, damping: 20 });
    const webCardMainScale = useTransform(
        scrollYProgress,
        [0.09,0.14],
        ["200%", "100%"]
    )
    const webCardMainScaleSpring = useSpring(webCardMainScale, { stiffness: 80, damping: 20 });
    const webCard1 = useTransform(
        scrollYProgress,
        [0.14,0.17],
        ["0%", "-400%"]
    )
    const webCard1Spring = useSpring(webCard1, { stiffness: 80, damping: 20 });
    const webCard2 = useTransform(
        scrollYProgress,
        [0.17,0.22],
        ["0%", "-400%"]
    )
    const webCard2Spring = useSpring(webCard2, { stiffness: 80, damping: 20 });
    const webCard3 = useTransform(
        scrollYProgress,
        [0.22,0.27],
        ["0%", "-400%"]
    )
    const webCard3Spring = useSpring(webCard3, { stiffness: 80, damping: 20 });


    const webCard1B = useTransform(
        scrollYProgress,
        [0.15,0.20],
        ["0%", "-250%"]
    )
    const webCard1Spring2 = useSpring(webCard1B, { stiffness: 80, damping: 20 });
    const webCard2B = useTransform(
        scrollYProgress,
        [0.20,0.25],
        ["0%", "-250%"]
    )
    const webCard2Spring2 = useSpring(webCard2B, { stiffness: 80, damping: 20 });
    const webCard3B = useTransform(
        scrollYProgress,
        [0.25,0.30],
        ["0%", "-250%"]
    )
    const webCard3Spring2 = useSpring(webCard3B, { stiffness: 80, damping: 20 });

    const webCardButton = useTransform(
        scrollYProgress,
        [0.25,0.30],
        ["0%", "100%"]
    )
    const webCardButtonSpring = useSpring(webCardButton, { stiffness: 80, damping: 20 });

    const seoCircRadius = useTransform(
        scrollYProgress,
        [0.40,0.63],
        ["100%", "300%"]
    )
    const seoCircRadiusSpring = useSpring(seoCircRadius, { stiffness: 80, damping: 20 });
    const seoCircOpacity = useTransform(
        scrollYProgress,
        [0.40,0.63],
        [1.0, 0.0]
    )
    const seoCircOpacitySpring = useSpring(seoCircOpacity, { stiffness: 80, damping: 20 });

    const seoTextFlip = useTransform(
        scrollYProgress,
        [0.45, 0.50],  // Adjust these values to control when the flip happens
        [0, 180]       // Rotate from 0 to 180 degrees
    )
    const seoTextFlipSpring = useSpring(seoTextFlip, { stiffness: 70, damping: 15 });





    // console.log(scrollYProgress.get());
        return (
        <motion.div ref={scrollRef}>
            <motion.div id="smooth-wrapper"  ref={main} animate={true} className="smoothWrap" >
                <motion.div id="smooth-content"  animate={true} className="smoothContent" >

                        <div className="sectionTop">
                                <motion.div
                                    initial={{ opacity:0 }}
                                     animate={{ opacity:1}}
                                     transition={{ duration:0.5, ease: 'easeInOut' }}
                                    className="logoCont">
                                    <Image src="/logo.png" alt="logo" fill objectFit="contain" className="logoLogo"/>
                                    {/*<div className="logoBg"></div>*/}
                                </motion.div>
                                <div className="logoText">
                                    <h3 className=" mt-[-20px]">WEB SEO DESIGN</h3>
                                    <h3 className="">info@servaldesigns.com</h3>
                                </div>
                        </div>

                        <motion.div  className="section">
                            <div className="sticky-div" id="stickyContent" data-speed="1.5">
                                <div className="infoCont" >
                                    <motion.div  className="infoCard" style={{x: webCardMainSpring}}>
                                        <div className="webTitleCont">
                                            <motion.div
                                                style={{scale: webCardMainScaleSpring}}
                                                className="websiteTitle"
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1, scramble: true }}
                                                viewport={{ once: true }}
                                                onViewportEnter={() => setInView(true)}
                                            >Custom Built</motion.div>
                                            <motion.div
                                                style={{scale: webCardMainScaleSpring}}
                                                className="websiteTitle2"
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1, scramble: true }}
                                                viewport={{ once: true }}
                                                onViewportEnter={() => setInView(true)}
                                            >Websites</motion.div>
                                        </div>
                                        <motion.a className="webCardButton" style={{opacity: webCardButtonSpring }}>SEE MORE</motion.a>
                                    </motion.div>
                                    <div>
                                        <motion.div className="webCard1" style={{x: webCard1Spring}}>
                                            <h1>Test</h1>
                                        </motion.div>
                                        <motion.div className="webCard2" style={{x: webCard2Spring}}>
                                            <h1>Test</h1>
                                        </motion.div>
                                        <motion.div className="webCard3" style={{x: webCard3Spring}}>
                                            <h1>Test</h1>
                                        </motion.div>
                                        <motion.div className="webCard1" style={{x: webCard1Spring2}}>
                                            <h1>Test</h1>
                                        </motion.div>
                                        <motion.div className="webCard2" style={{x: webCard2Spring2}}>
                                            <h1>Test</h1>
                                        </motion.div>
                                        <motion.div className="webCard3" style={{x: webCard3Spring2}}>
                                            <h1>Test</h1>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    <div className="section">
                        <motion.div className="sticky-div" id="stickyContent2" data-speed="1.5">
                            <div className="circContainer">
                                <motion.svg
                                    className="circleText"
                                    viewBox="0 0 500 500"
                                    data-duration="5"
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
                                    style={{
                                        scale: useSpring(useTransform(scrollYProgress, [0.4, 0.63], [1, 2.0]), {
                                            stiffness: 80,
                                            damping: 20,
                                        }),
                                        opacity: useSpring(useTransform(scrollYProgress, [0.4, 0.5], [.7, 0]), {
                                            stiffness: 80,
                                            damping: 20,
                                        }),
                                    }}
                                >

                                    <path id="textcircle" fill="none" stroke="#FF9800" strokeWidth="0"
                                          data-duration="5"
                                          d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250">
                                    </path>

                                    <text dy="-25">
                                        <textPath className="pathText" xlinkHref="#textcircle" textLength="1250" lengthAdjust="spacingAndGlyphs">Keywords Backlinks Meta Tags Content Crawling Indexing Ranking Traffic Optimization SERP</textPath>
                                    </text>

                                </motion.svg>
                            </div>

                            <div
                                className="seoTextContWrapper"
                                 style={{perspective: '1500px'}}

                            >
                                <motion.div
                                    className="seoTextCont"
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        rotateY: seoTextFlipSpring
                                    }}
                                >
                                    <div
                                        className="seoTextFront"
                                        style={{
                                            backfaceVisibility: 'hidden',

                                    }}
                                    >
                                        <h1>SEO</h1>
                                        <h3>SOLUTIONS</h3>

                                    </div>
                                    <div
                                        className="seoTextBack"
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            transform: 'rotateY(180deg)',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',

                                        }}
                                    >

                                        <motion.div className="seoBackCont">
                                            <p className="seoTextBody">
                                                Data driven content campaigns<br/><br/>
                                                site optimized technical seo<br/><br/>
                                                Analytics based updates
                                            </p>

                                            <a className="seoBackButton">Contact</a>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                    <div className="section">
                        <motion.div id="stickyContent3" data-speed="1.5" className="sticky-div">
                            <h1 className="text-white ">SERVAL DESIGNS</h1>
                            <h1 className="text-white">WEB SEO DESIGN</h1>
                        </motion.div>
                    </div>
                    <div className="sectionBottom">
                            <motion.div initial={{ y: 0 }} animate={{ y: 0 }} whileInView={{ y: 0 }} viewport={{ once: true }} className="sticky-div">
                                <h1 className="text-white ">SERVAL DESIGNS</h1>
                                <h1 className="text-white">WEB SEO DESIGN</h1>
                            </motion.div>
                        </div>

                </motion.div>
            </motion.div>
                <div className="canvasCont">
                    <canvas ref={canvasRef} style={{ width: '100%', height: '100vh' }} />;
                </div>
        </motion.div>
    )
}
