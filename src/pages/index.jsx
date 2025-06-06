'use client';
import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

import Image from "next/image";

import designLogo1 from '../../public/designLogo1.png';
import designLogo2 from '../../public/designLogo2.png';
import designPreHero from '../../public/designPreHero.jpg';
import designPostHero from '../../public/designPostHero.jpg';
import hamburger from '../../public/hamburger.png';
import time from '../../public/time.png';
import tools from '../../public/tools.png';
import handshake from '../../public/handshake.png';
import house from '../../public/house.png';


import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'motion/react';

import gsap from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import { SplitText } from 'gsap/dist/SplitText';
import { Observer } from 'gsap/dist/Observer';
import { ScrambleTextPlugin } from 'gsap/dist/ScrambleTextPlugin';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

import { FaCircle } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrambleTextPlugin, Observer, ScrollToPlugin);




import logo from '../../public/logo.png';
import styles from "@/components/WebsiteSection/styles.module.css";
import {scale} from "motion";
import Carousel from "@/components/Carousel";
import Gooey from "@/components/Gooey";

export default function Home() {
    //GSAP stuff
    const [scroll, setScroll] = useState(0.0);
    const hasAnimated = useRef(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState("0%");
    const [loadTransition, setLoadTransition] = useState(false);


    const main = useRef();
    const smoother = useRef();





    useEffect(() => {
        const checkAnimation = setInterval(() => {
            if (hasAnimated.current) {
                setIsLoading(false);
                clearInterval(checkAnimation);
            }
        }, 100);

        return () => clearInterval(checkAnimation);
    }, []);

    useEffect(() => {
        if (isLoading) {
            setLoadProgress("30%"); // Set intermediate progress
        } else {
            setLoadProgress("100%"); // Set final progress
        }
    }, [isLoading]);

    const loadProgressMotion  = useMotionValue(loadProgress);
    useEffect(() => {
        loadProgressMotion.set(loadProgress);
    }, [loadProgressMotion, loadProgress]);
    const scaleX = useSpring(loadProgressMotion, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })
    useEffect(() => {
      if(!isLoading) {
            setTimeout(() => {
                setLoadTransition(true);
            }, 1600);
      }
    },[isLoading])
    useGSAP(
        () => {
            // ScrollTrigger.normalizeScroll({
            //     allowNestedScroll: true,
            //     lockAxis: false,
            //     momentum: self => Math.min(3, self.velocityY / 1000), // dynamically control the duration of the momentum when flick-scrolling
            //     type: "touch,wheel,pointer", // now the page will be drag-scrollable on desktop because "pointer" is in the list
            // });
            ScrollTrigger.normalizeScroll(true);
            // ScrollTrigger.normalizeScroll({ ignoreMobileResize: true, allowNestedScroll: true, type: "touch, scroll, pointer" });
            // ScrollTrigger.addEventListener("scrollStart", () => gsap.ticker.add(ScrollTrigger.update));
            // ScrollTrigger.addEventListener("scrollEnd", () => gsap.ticker.remove(ScrollTrigger.update));

            smoother.current = ScrollSmoother.create({
                smooth: 2,
                effects: true,
                // collect scroll progress from gsap and pass it to the shader
                onUpdate: (progress) => {setScroll(progress.progress)},
            });
            //create a scroll trigger for the sticky divs

            let viewportHeight = window.innerHeight;
            const handleResize = () => {
                viewportHeight = window.innerHeight
            };
            window.addEventListener('resize', handleResize);

            ScrollTrigger.create({
                trigger: '#stickyContent',
                pin: true,
                start: 'center center',
                end: `${viewportHeight * 6}`,
                // markers: true,
                scrub: 1,


            });
            const splitWeb = SplitText.create(".websiteTitle2", {
                type: "words",
            });
            let hasAnimated = false;
            ScrollTrigger.create({
                trigger: '#stickyContent',

                start: 'top top',
                end: 'center center',
                markers: false,
                onToggle:( self ) => {
                    if(self.isActive && !hasAnimated) {
                        gsap.to(splitWeb.words, {
                            stagger: {
                                amount: 0.5,
                                from: "random",
                            },
                            scrambleText: {
                                text: "WEBSITES",
                                speed: 0.5,
                                revealDelay: 0.5,
                                chars: "01",
                            }
                        });
                        hasAnimated = true;
                    }
                }
            });

            SplitText.create('.loadingTextH1',{
                type: "chars",
                onSplit: (split) => {
                    gsap.from(split.chars, {
                        y: 20,
                        autoAlpha: 0,
                        stagger: {
                            amount: 0.4,
                            // from: "random",
                        },

                    })
                }
            })
            ScrollTrigger.create({
                trigger: '#stickyContent2',
                pin: true,
                start: 'center center',
                end: `${viewportHeight * 9}`,
                markers: false,
            });
            ScrollTrigger.create({
                trigger: '#stickyContent3',
                pin: true,
                start: 'center center',
                end: `${viewportHeight * 14}`,
                markers: false,
            });


        },
        {

            scope: main,

        }
    );

    useEffect(() => {
        const split = SplitText.create(".logoText", {
            type: "words",
        });
        gsap.from(
            split.words,
            { y: 10, opacity: 0, stagger: 0.2, delay: 1.8 }
        );

    }, [isLoading]);






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
        [0.0, 0.06, 0.38, 0.42, 0.63, 0.67, 0.94, 0.98, 1.0],
        [0.0, 0.0, 0.0, 0.2, 0.2, 0.2, 0.2, 0.1, 0.1]
    )
    const backgroundColor1 = useTransform(
        scrollYProgress,
        [0.0, 0.06, 0.38, 0.42, 0.63, 0.67, 0.94, 0.98, 1.0],
        [0.9, 0.0, 0.0, 0.8, 0.8, 0.8, 0.8, 0.7, 0.7]
    )

    const backgroundColor2B = useTransform(
        scrollYProgress,
        [0.0, 0.06, 0.38, 0.42, 0.63, 0.67, 0.94, 0.98, 1.0],
        [0.0, 0.0, 0.0, 0.2, 0.2, 0.4, 0.4, 0.1, 0.1]
    )
    const backgroundColor2 = useTransform(
        scrollYProgress,
        [0.0, 0.06, 0.38, 0.42, 0.63, 0.67, 0.94, 0.98, 1.0],
        [0.7, 0.7, 0.7, 0.5, 0.5, 0.6, 0.6, 0.7, 0.7]
    )

    const backgroundColor3B = useTransform(
        scrollYProgress,
        [0.0, 0.06, 0.38, 0.42, 0.63, 0.67, 0.94, 0.98, 1.0],
        [0.0, 0.3, 0.3, 0.0, 0.0, 0.1, 0.1, 0.1, 0.1]
    )
    const backgroundColor3 = useTransform(
        scrollYProgress,
        [0.0, 0.06, 0.38, 0.42, 0.63, 0.67, 0.94, 0.98, 1.0],
        [0.4, 0.8, 0.8, 0.7, 0.7, 0.6, 0.6, 0.7, 0.7]
    )


    const backgroundTimeStep = useTransform(
        scrollYProgress,
        [0, 1.0],
        [0, 10.0]
    )

    //useEffect for the canvas to update the shader with the scroll progress
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
            if (!hasAnimated.current) {

                hasAnimated.current = true;
            }



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
    }, [ backgroundTimeStep, backgroundColor1, backgroundColor2, backgroundColor3, backgroundColor1B, backgroundColor2B, backgroundColor3B]);


    //-----------------------------------WEBCARD MAIN-----------------------------------
    const webCardMain = useTransform(
        scrollYProgress,
        [0.12,0.14, 0.32, 0.34],
        ["-50%", "-120%", "-120%", "-250%"]
    )
    const webCardMainSpring = useSpring(webCardMain, { stiffness: 80, damping: 20 });
    const webCardMainScale = useTransform(
        scrollYProgress,
        [0.09,0.14],
        ["200%", "100%"]
    )
    const webCardMainScaleSpring = useSpring(webCardMainScale, { stiffness: 80, damping: 20 });


    //-----------------------------------WEBCARDS-----------------------------------
    const webCard1 = useTransform(
        scrollYProgress,
        [0.12, 0.14, 0.32, 0.34],
        ["-100%", "0%", "0%", "-100%"]
    )
    const webCard1Spring = useSpring(webCard1, { stiffness: 80, damping: 20 });
    const webCard1Rotate = useTransform(
        scrollYProgress,
        [0.16,0.17],
        [0, -20]
    )
    const webCard1RotateSpring = useSpring(webCard1Rotate, { stiffness: 80, damping: 20 });

    const webCard2 = useTransform(
        scrollYProgress,
        [0.16,0.19],
        ["-30vw", "10vw"]
    )
    const webCard2Spring = useSpring(webCard2, { stiffness: 80, damping: 20 });
    const webCard2Rotate = useTransform(
        scrollYProgress,
        [0.18,0.19],
        [0, -20]
    )
    const webCard2RotateSpring = useSpring(webCard2Rotate, { stiffness: 80, damping: 20 });

    const webCard3 = useTransform(
        scrollYProgress,
        [0.18,0.21],
        ["-30vw", "10vw"]
    )
    const webCard3Spring = useSpring(webCard3, { stiffness: 80, damping: 20 });
    const webCard3Rotate = useTransform(
        scrollYProgress,
        [0.20,0.21],
        [0, -20]
    )
    const webCard3RotateSpring = useSpring(webCard3Rotate, { stiffness: 80, damping: 20 });

    //------------------------------------WEBCARD BUTTON-----------------------------------
    const webCardButton = useTransform(
        scrollYProgress,
        [0.12,0.14],
        ["0%", "100%"]
    )
    const webCardButtonSpring = useSpring(webCardButton, { stiffness: 80, damping: 20 });


    //-----------------------------------SEO-----------------------------------
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
        [0.45, 0.47],  // Adjust these values to control when the flip happens
        [0, 180]       // Rotate from 0 to 180 degrees
    )
    const seoTextFlipSpring = useSpring(seoTextFlip, { stiffness: 70, damping: 15 });


    //__________________________________________DESIGN____________________________________
    const designTitleOpacity = useTransform(
        scrollYProgress,
        [0.63, 0.71, 0.75],
        [1.0, 1.0, 0.0]
    )

    //PRE DESIGN
    const preDesignOpacity = useTransform(
        scrollYProgress,
        [ 0.71, 0.75, 0.77, 0.81],
        [ 0.0, 1.0, 1.0, 0.0]
    )

    //BOX OPACITY
    const boxOpacity = useTransform(
        scrollYProgress,
        [ 0.75, 0.81, 0.85, 0.91],
        [ 0.0, 1.0, 1.0, 0.0 ]
    )
    const postDesignOpacity = useTransform(
        scrollYProgress,
        [ 0.85, 0.89, 0.94],
        [ 0.0, 1.0, 1.0]
    )

    // BOX1
    const box1X = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["0%", "0%", "0%", "0%"]
    )
    const box1XSpring = useSpring(box1X, { stiffness: 70, damping: 15 });
    const box1Y = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["0%", "0%", "0%", "0%"]
    )
    const box1YSpring = useSpring(box1Y, { stiffness: 70, damping: 15 });
    const box1Width = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["100%", "100%", "100%", "100%"]
    )
    const box1WidthSpring = useSpring(box1Width, { stiffness: 70, damping: 15 });
    const box1Height = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["33%", "33%", "100%", "100%"]
    )
    const box1HeightSpring = useSpring(box1Height, { stiffness: 70, damping: 15 });
    const box1BG = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        [0.6, 0.6, 0.6, 0.6]
    )
    const box1BGSpring = useSpring(box1BG, { stiffness: 70, damping: 15 });


    // BOX2
    const box2X = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["43.5%", "43.5%", "91%", "91%"]
    )
    const box2XSpring = useSpring(box2X, { stiffness: 70, damping: 15 });
    const box2Y = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["7%", "7%", "1.5%", "1.5%"]
    )
    const box2YSpring = useSpring(box2Y, { stiffness: 70, damping: 15 });
    const box2Width = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["13%", "13%", "5%", "5%"]
    )
    const box2WidthSpring = useSpring(box2Width, { stiffness: 70, damping: 15 });
    const box2Height = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["3%", "3%", "6%", "6%"]
    )
    const box2HeightSpring = useSpring(box2Height, { stiffness: 70, damping: 15 });
    const box2BG = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        [0.0, 0.0, 0.0, 0.0]
    )
    const box2BGSpring = useSpring(box2BG, { stiffness: 70, damping: 15 });


    //box3
    const box3X = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["35.5%", "35.5%", "4%", "4%"]
    )
    const box3XSpring = useSpring(box3X, { stiffness: 70, damping: 15 });
    const box3Y = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["15%", "15%", "1%", "1%"]
    )
    const box3YSpring = useSpring(box3Y, { stiffness: 70, damping: 15 });
    const box3Width = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["28%", "28%", "20%", "20%"]
    )
    const box3WidthSpring = useSpring(box3Width, { stiffness: 70, damping: 15 });
    const box3Height = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["11.5%", "11.5%", "7%", "7%"]
    )
    const box3HeightSpring = useSpring(box3Height, { stiffness: 70, damping: 15 });
    const box3BG = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        [0.0, 0.0, 0.0, 0.0]
    )
    const box3BGSpring = useSpring(box3BG, { stiffness: 70, damping: 15 });


     //box4
    const box4X = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["0%", "0%", "11%", "11%"]
    )
    const box4XSpring = useSpring(box4X, { stiffness: 70, damping: 15 });
    const box4Y = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["34%", "34%", "26%", "26%"]
    )
    const box4YSpring = useSpring(box4Y, { stiffness: 70, damping: 15 });
    const box4Width = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["100%", "100%", "40%", "40%"]
    )
    const box4WidthSpring = useSpring(box4Width, { stiffness: 70, damping: 15 });
    const box4Height = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["11%", "11%", "23%", "23%"]
    )
    const box4HeightSpring = useSpring(box4Height, { stiffness: 70, damping: 15 });
    const box4BG = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        [0.6, 0.6, 0.0, 0.0]
    )
    const box4BGSpring = useSpring(box4BG, { stiffness: 70, damping: 15 });


    //box5
    const box5X = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["32%", "32%", "11%", "11%"]
    )
    const box5XSpring = useSpring(box5X, { stiffness: 70, damping: 15 });
    const box5Y = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["36%", "36%", "49%", "49%"]
    )
    const box5YSpring = useSpring(box5Y, { stiffness: 70, damping: 15 });
    const box5Width = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["37%", "37%", "40%", "40%"]
    )
    const box5WidthSpring = useSpring(box5Width, { stiffness: 70, damping: 15 });
    const box5Height = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["7%", "7%", "9%", "9%"]
    )
    const box5HeightSpring = useSpring(box5Height, { stiffness: 70, damping: 15 });
    const box5BG = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        [0.0, 0.0, 0.0, 0.0]
    )
    const box5BGSpring = useSpring(box5BG, { stiffness: 70, damping: 15 });


    //box6
    const box6X = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["0%", "0%", "11%", "11%"]
    )
    const box6XSpring = useSpring(box6X, { stiffness: 70, damping: 15 });
    const box6Y = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["46%", "46%", "58%", "58%"]
    )
    const box6YSpring = useSpring(box6Y, { stiffness: 70, damping: 15 });
    const box6Width = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["100%", "100%", "22%", "22%"]
    )
    const box6WidthSpring = useSpring(box6Width, { stiffness: 70, damping: 15 });
    const box6Height = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["54%", "54%", "5%", "5%"]
    )
    const box6HeightSpring = useSpring(box6Height, { stiffness: 70, damping: 15 });
    const box6BG = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        [0.6, 0.6, 0.0, 0.0]
    )
    const box6BGSpring = useSpring(box6BG, { stiffness: 70, damping: 15 });


    //box7
    const box7X = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["33%", "33%", "14%", "14%"]
    )
    const box7XSpring = useSpring(box7X, { stiffness: 70, damping: 15 });
    const box7Y = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["51%", "51%", "77%", "77%"]
    )
    const box7YSpring = useSpring(box7Y, { stiffness: 70, damping: 15 });
    const box7Width = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["10%", "10%", "18.5%", "18.5%"]
    )
    const box7WidthSpring = useSpring(box7Width, { stiffness: 70, damping: 15 });
    const box7Height = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["5%", "5%", "16%", "16%"]
    )
    const box7HeightSpring = useSpring(box7Height, { stiffness: 70, damping: 15 });
    const box7BG = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        [0.0, 0.0, 0.0, 0.0]
    )
    const box7BGSpring = useSpring(box7BG, { stiffness: 70, damping: 15 });


    //box8
    const box8X = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["45%", "45%", "32.5%", "32.5%"]
    )
    const box8XSpring = useSpring(box8X, { stiffness: 70, damping: 15 });
    const box8Y = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["51%", "51%", "77%", "77%"]
    )
    const box8YSpring = useSpring(box8Y, { stiffness: 70, damping: 15 });
    const box8Width = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["10%", "10%", "18.5%", "18.5%"]
    )
    const box8WidthSpring = useSpring(box8Width, { stiffness: 70, damping: 15 });
    const box8Height = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["5%", "5%", "16%", "16%"]
    )
    const box8HeightSpring = useSpring(box8Height, { stiffness: 70, damping: 15 });
    const box8BG = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        [0.0, 0.0, 0.0, 0.0]
    )
    const box8BGSpring = useSpring(box8BG, { stiffness: 70, damping: 15 });



    //box9
    const box9X = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["57%", "57%", "51%", "51%"]
    )
    const box9XSpring = useSpring(box9X, { stiffness: 70, damping: 15 });
    const box9Y = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["51%", "51%", "77%", "77%"]
    )
    const box9YSpring = useSpring(box9Y, { stiffness: 70, damping: 15 });
    const box9Width = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["10%", "10%", "18.5%", "18.5%"]
    )
    const box9WidthSpring = useSpring(box9Width, { stiffness: 70, damping: 15 });
    const box9Height = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["5%", "5%", "16%", "16%"]
    )
    const box9HeightSpring = useSpring(box9Height, { stiffness: 70, damping: 15 });
    const box9BG = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        [0.0, 0.0, 0.0, 0.0]
    )
    const box9BGSpring = useSpring(box9BG, { stiffness: 70, damping: 15 });


    //box10
    const box10X = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["25%", "25%", "69.5%", "69.5%"]
    )
    const box10XSpring = useSpring(box10X, { stiffness: 70, damping: 15 });
    const box10Y = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["60%", "60%", "77%", "77%"]
    )
    const box10YSpring = useSpring(box10Y, { stiffness: 70, damping: 15 });
    const box10Width = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["50%", "50%", "18.5%", "18.5%"]
    )
    const box10WidthSpring = useSpring(box10Width, { stiffness: 70, damping: 15 });
    const box10Height = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        ["36%", "36%", "16%", "16%"]
    )
    const box10HeightSpring = useSpring(box10Height, { stiffness: 70, damping: 15 });
    const box10BG = useTransform(
        scrollYProgress,
        [0.75, 0.81, 0.85, 0.91],
        [0.0, 0.0, 0.0, 0.0]
    )
    const box10BGSpring = useSpring(box10BG, { stiffness: 70, damping: 15 });




    const [webInView, setWebInView] = useState(false);
    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange((progress) => {
            if (progress > 0.14 && !webInView) {
                setWebInView(true);
            }
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, [scrollYProgress, webInView]);



        return (
                    <motion.div ref={scrollRef} className="mainCont">
                        <motion.div id="smooth-wrapper" ref={main} animate={true} className="smoothWrap">
                            <motion.div id="smooth-content" animate={true} className={!loadTransition ? "smoothContent1" : "smoothContent"}>
                                <AnimatePresence>
                                {
                                    isLoading
                                    // true
                                    && (
                                        <motion.div className="loadingCont">
                                            <motion.div className="loadingText" transition={{delay: 1.0}} initial={{opacity: 1}} exit={{opacity: 0}}>
                                                <h1 className="loadingTextH1">LOADING</h1>
                                                <div className="loadProgressCont">
                                                    <motion.div className="loadingBar" style={{ width: scaleX }}></motion.div>
                                                </div>
                                            </motion.div>
                                            <motion.div className="loadingGridTop">
                                                <motion.div className="loadingBox" initial={{y: "0vh"}} exit={{y: "-50vh"}} transition={{delay: 1.2, duration: 0.5, ease: 'easeInOut'}}></motion.div>
                                                <motion.div className="loadingBox" initial={{y: "0vh"}} exit={{y: "-50vh"}} transition={{delay: 1.3, duration: 0.5, ease: 'easeInOut'}}></motion.div>
                                                <motion.div className="loadingBox" initial={{y: "0vh"}} exit={{y: "-50vh"}} transition={{delay: 1.4, duration: 0.5, ease: 'easeInOut'}}></motion.div>
                                                <motion.div className="loadingBox" initial={{y: "0vh"}} exit={{y: "-50vh"}} transition={{delay: 1.5, duration: 0.5, ease: 'easeInOut'}}></motion.div>
                                                <motion.div className="loadingBox" initial={{y: "0vh"}} exit={{y: "-50vh"}} transition={{delay: 1.6, duration: 0.5, ease: 'easeInOut'}}></motion.div>
                                            </motion.div>
                                            <motion.div className="loadingGridBottom">
                                                <motion.div className="loadingBox" initial={{y: "0vh"}} exit={{y: "50vh"}} transition={{delay: 1.2, duration: 0.5, ease: 'easeInOut'}}></motion.div>
                                                <motion.div className="loadingBox" initial={{y: "0vh"}} exit={{y: "50vh"}} transition={{delay: 1.3, duration: 0.5, ease: 'easeInOut'}}></motion.div>
                                                <motion.div className="loadingBox" initial={{y: "0vh"}} exit={{y: "50vh"}} transition={{delay: 1.4, duration: 0.5, ease: 'easeInOut'}}></motion.div>
                                                <motion.div className="loadingBox" initial={{y: "0vh"}} exit={{y: "50vh"}} transition={{delay: 1.5, duration: 0.5, ease: 'easeInOut'}}></motion.div>
                                                <motion.div className="loadingBox" initial={{y: "0vh"}} exit={{y: "50vh"}} transition={{delay: 1.6, duration: 0.5, ease: 'easeInOut'}}></motion.div>
                                            </motion.div>
                                        </motion.div>
                                    )
                                }
                                </AnimatePresence>
                                <div className="sectionTop">
                                    <AnimatePresence>
                                        {loadTransition &&
                                            <motion.div
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            transition={{duration: 0.5, ease: 'easeInOut'}}
                                            className="logoCont">
                                            <Image src="/logo.png"
                                                   alt="logo"
                                                   fill
                                                   className="logoLogo"
                                                   priority={true}
                                            />

                                            </motion.div>
                                        }
                                    </AnimatePresence>
                                    <motion.div className="logoText" >
                                        <div className=" mt-[-20px] flex flex-row justify-center items-center gap-1 cursor-pointer">
                                            <a onClick={() => {gsap.to(window, { duration: 0.5, scrollTo: { y: "#stickyContent" }, ease: "power2" });}}>WEB</a>
                                            <h3>&#8226;</h3>
                                            <a onClick={() => {gsap.to(window, { duration: 0.5, scrollTo: { y: "#stickyContent2" }, ease: "power2" });}}>SEO</a>
                                            <h3>&#8226;</h3>
                                            <a onClick={() => {gsap.to(window, { duration: 0.5, scrollTo: { y: "#stickyContent3" }, ease: "power2" });}}>DESIGN</a>
                                        </div>
                                        <h3 className="">info@servaldesigns.com</h3>
                                    </motion.div>
                                </div>

                                <motion.div className="sectionWeb">
                                    <div className="sticky-div" id="stickyContent" data-speed="1.5">
                                        <div className="infoCont">
                                            <motion.div className="infoCard" style={{x: webCardMainSpring}}>
                                                <div className="webTitleCont">
                                                    <motion.div
                                                        style={{scale: webCardMainScaleSpring}}
                                                        className="websiteTitle"
                                                        initial={{opacity: 0}}
                                                        whileInView={{opacity: 1, scramble: true}}
                                                        viewport={{once: true}}
                                                    >Custom Built
                                                    </motion.div>
                                                    <motion.div
                                                        style={{scale: webCardMainScaleSpring}}
                                                        className="websiteTitle2"
                                                    >0000000
                                                    </motion.div>
                                                </div>
                                                <motion.a className="webCardButton"
                                                          style={{opacity: webCardButtonSpring}}>SEE MORE
                                                </motion.a>
                                            </motion.div>
                                            <motion.div
                                                className="carouselParent"
                                                style={{
                                                    right: webCard1Spring,
                                                }}
                                            >
                                                <Carousel/>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>

                                <div className="sectionSEO">
                                    <motion.div className="sticky-div" id="stickyContent2" data-speed="1.5">
                                        <div className="circContainer">
                                            <motion.svg
                                                className="circleText"
                                                viewBox="0 0 500 500"
                                                data-duration="5"
                                                animate={{rotate: 360}}
                                                transition={{repeat: Infinity, duration: 50, ease: "linear"}}
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
                                                    <textPath className="pathText" xlinkHref="#textcircle"
                                                              textLength="1250" lengthAdjust="spacingAndGlyphs">Keywords
                                                        Backlinks Meta Tags Content Crawling Indexing Ranking Traffic
                                                        Optimization SERP
                                                    </textPath>
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
                                                            content campaigns<br/><br/>
                                                            technical seo<br/><br/>
                                                            strategic updates
                                                        </p>

                                                        <a className="seoBackButton">Contact</a>
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </div>
                                <motion.div className="sectionDesign">
                                    <motion.div id="stickyContent3" data-speed="1.5" className="sticky-div">
                                        <motion.div
                                        className="designTitleCont"
                                        style={{opacity: designTitleOpacity}}
                                        >

                                            {/*<Gooey/>*/}
                                            <h2>Custom Redesigns</h2>
                                        </motion.div>

                                        <motion.div className="boxContainer">
                                            <motion.div
                                                className="designPreCont"
                                                style={{opacity: preDesignOpacity}}
                                            >
                                                <div className="preHeader">
                                                    <div className="preHeaderLinkCont">
                                                        <p className="preLinkHome">HOME</p>
                                                    </div>
                                                    <div className="preHeaderLogoCont">
                                                        <div className="preLogoCont">
                                                            <Image src={designLogo1} alt="logo for general construction" fill={true} objectFit="contain" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="preBanner">
                                                    <h3>Your Remodel & Restoration Pros</h3>
                                                </div>
                                                <div className="preBody">
                                                    <div className="preBodyLinkCont">
                                                        <p className="preLink">PROJECTS</p>
                                                        <p className="preLink">SERVICES</p>
                                                        <p className="preLink">GALLERY</p>
                                                    </div>
                                                    <div className="preBodyHeroCont">
                                                        <div className="preHeroCont">
                                                            <Image src={designPreHero} alt="hero image for general construction" fill={true} objectFit="contain"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                            <motion.div
                                                className="designPostCont"
                                                style={{opacity: postDesignOpacity}}
                                            >
                                                <div className="postImageCont">
                                                    <Image src={designPostHero} alt="modern kitchen" fill={true} objectFit="cover"/>
                                                </div>
                                                 <div className="postHeader">
                                                     <div className="postHeaderLogoCont">
                                                         <Image src={designLogo2} alt="logo for general construction" fill={true} objectFit="contain" />
                                                     </div>
                                                     <div className="postHeaderHamCont">
                                                         <Image src={hamburger} alt="menu icon" fill={true} objectFit="contain" />
                                                     </div>
                                                 </div>
                                                <div className="postBodyCont">
                                                    <div className="postBodyTextCont">
                                                        <div className="titleCont">
                                                            <h2>Transforming Houses Into Dream Homes</h2>
                                                        </div>
                                                        <div className="subTitleCont">
                                                            <h3>Quality remodeling services with craftsmanship you can count on.</h3>
                                                        </div>
                                                        <div className="ctaCont">
                                                            <p>Get a Free Estimate</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="postValueCont">

                                                    <div className="postValueItemCont">
                                                        <div className="postValueItem">
                                                            <div className="postValueItemImgCont">
                                                                <Image src={tools} alt="value icon" fill={true} objectFit="contain" />
                                                            </div>
                                                            <h3>Quality Craftsmanship</h3>
                                                        </div>
                                                        <div className="postValueItem">
                                                            <div className="postValueItemImgCont">
                                                                <Image src={time} alt="value icon" fill={true} objectFit="contain" />
                                                            </div>
                                                            <h3>Clear Timelines</h3>
                                                        </div>
                                                        <div className="postValueItem">
                                                            <div className="postValueItemImgCont">
                                                                <Image src={handshake} alt="value icon" fill={true} objectFit="contain" />
                                                            </div>
                                                            <h3>Personalized Service</h3>
                                                        </div>
                                                        <div className="postValueItem">
                                                            <div className="postValueItemImgCont">
                                                                <Image src={house} alt="value icon" fill={true} objectFit="contain" />
                                                            </div>
                                                            <h3>Full-Service Remodeling</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                            <motion.div
                                                className="box"
                                                style={{
                                                    left: box1XSpring,
                                                    top: box1YSpring,
                                                    height: box1HeightSpring,
                                                    width: box1WidthSpring,
                                                    backgroundColor: `rgba(0, 0, 0, ${box1BGSpring.get()})`,
                                                    opacity: boxOpacity.get(),
                                                }}
                                            >
                                            </motion.div>
                                            <motion.div
                                                className="box"
                                                style={{
                                                    left: box2XSpring,
                                                    top: box2YSpring,
                                                    height: box2HeightSpring,
                                                    width: box2WidthSpring,
                                                    backgroundColor: `rgba(0, 0, 0, ${box2BGSpring.get()})`,
                                                    opacity: boxOpacity.get(),
                                                }}
                                            >
                                            </motion.div>
                                            <motion.div
                                                className="box"
                                                style={{
                                                    left: box3XSpring,
                                                    top: box3YSpring,
                                                    height: box3HeightSpring,
                                                    width: box3WidthSpring,
                                                    backgroundColor: `rgba(0, 0, 0, ${box3BGSpring.get()})`,
                                                    opacity: boxOpacity.get(),
                                                }}
                                            >
                                            </motion.div>
                                            <motion.div
                                                className="box"
                                                style={{
                                                    left: box4XSpring,
                                                    top: box4YSpring,
                                                    height: box4HeightSpring,
                                                    width: box4WidthSpring,
                                                    backgroundColor: `rgba(0, 0, 0, ${box4BGSpring.get()})`,
                                                    opacity: boxOpacity.get(),
                                                }}
                                            >
                                            </motion.div>

                                            <motion.div
                                                className="box"
                                                style={{
                                                    left: box5XSpring,
                                                    top: box5YSpring,
                                                    height: box5HeightSpring,
                                                    width: box5WidthSpring,
                                                    backgroundColor: `rgba(0, 0, 0, ${box5BGSpring.get()})`,
                                                    opacity: boxOpacity.get(),
                                                }}
                                            >
                                            </motion.div>
                                            <motion.div
                                                className="box"
                                                style={{
                                                    left: box6XSpring,
                                                    top: box6YSpring,
                                                    height: box6HeightSpring,
                                                    width: box6WidthSpring,
                                                    backgroundColor: `rgba(0, 0, 0, ${box6BGSpring.get()})`,
                                                    opacity: boxOpacity.get(),
                                                }}
                                            >
                                            </motion.div>
                                            <motion.div
                                                className="box"
                                                style={{
                                                    left: box7XSpring,
                                                    top: box7YSpring,
                                                    height: box7HeightSpring,
                                                    width: box7WidthSpring,
                                                    backgroundColor: `rgba(0, 0, 0, ${box7BGSpring.get()})`,
                                                    opacity: boxOpacity.get(),
                                                }}
                                            >
                                            </motion.div>
                                            <motion.div
                                                className="box"
                                                style={{
                                                    left: box8XSpring,
                                                    top: box8YSpring,
                                                    height: box8HeightSpring,
                                                    width: box8WidthSpring,
                                                    backgroundColor: `rgba(0, 0, 0, ${box8BGSpring.get()})`,
                                                    opacity: boxOpacity.get(),
                                                }}
                                            >
                                            </motion.div>
                                            <motion.div
                                                className="box"
                                                style={{
                                                    left: box9XSpring,
                                                    top: box9YSpring,
                                                    height: box9HeightSpring,
                                                    width: box9WidthSpring,
                                                    backgroundColor: `rgba(0, 0, 0, ${box9BGSpring.get()})`,
                                                    opacity: boxOpacity.get(),
                                                }}
                                            >
                                            </motion.div>
                                            <motion.div
                                                className="box"
                                                style={{
                                                    left: box10XSpring,
                                                    top: box10YSpring,
                                                    height: box10HeightSpring,
                                                    width: box10WidthSpring,
                                                    backgroundColor: `rgba(0, 0, 0, ${box10BGSpring.get()})`,
                                                    opacity: boxOpacity.get(),
                                                }}
                                            >
                                            </motion.div>

                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                                <div className="sectionBottom">
                                    <motion.div initial={{y: 0}} animate={{y: 0}} whileInView={{y: 0}}
                                                viewport={{once: true}}
                                                className="sticky-div">
                                        <h1 className="text-white ">SERVAL DESIGNS</h1>
                                        <h1 className="text-white">WEB SEO DESIGN</h1>

                                    </motion.div>
                                </div>

                            </motion.div>
                        </motion.div>

                        <div className="canvasCont">
                            <canvas ref={canvasRef} style={{width: '100%', height: '100vh'}}/>
                        </div>
                    </motion.div>

    )
}
