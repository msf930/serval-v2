'use client';
import React, { useState, useEffect, useRef } from 'react';

import styles from './styles.module.css';

import Curve from '@/components/Layout/Curve';

import { motion, useMotionValue, useTransform, useVelocity, useMotionValueEvent, useSpring } from 'motion/react';



import gsap from 'gsap';
import { SplitText } from 'gsap/dist/SplitText';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(SplitText);

export default function seo({ pageRoute }) {
    const [innerHeight, setInnerHeight] = useState(0);
    const [animatedSections, setAnimatedSections] = useState(new Set());

    useEffect(() => {

        setInnerHeight(window.innerHeight);

    }, []);

    const swipeX = useMotionValue(-300)
    const swipeXLeft = useTransform(swipeX, (value) => value)
    const swipeXRight = useTransform(swipeX, (value) => value + 600)
    const opacity = useTransform(
        swipeX,
        [-500, -300, -100],
        [0, 1, 0]
    )
    const left1Width = useTransform(swipeX, [0, -50, -150, -300], [0, 125, 125, 0])
    const left2Width = useTransform(swipeX, [0, -50, -150, -300], [300, 125, 25, 0])
    const right1Width = useTransform(swipeX, [-600, -550, -450, -300], [0, 125, 125, 0])
    const right2Width = useTransform(swipeX, [-600, -550, -450, -300], [300, 125, 25, 0])

    const left1Opacity = useTransform(swipeX, [0, -50, -150, -300], [0, 1, 1, 0])
    const left2Opacity = useTransform(swipeX, [0, -50, -150, -300], [1, 1, 0, 0])
    const right1Opacity = useTransform(swipeX, [-600, -550, -450, -300], [0, 1, 1, 0])
    const right2Opacity = useTransform(swipeX, [-600, -550, -450, -300], [1, 1, 0, 0])

    const right2X = useTransform(swipeXRight, (value) => value + right1Width.get())

    const sectionPicker = useTransform(swipeX, [-600, -450, -300, -150, 0], [4, 3, 2, 1, 0])

    const section1X = useTransform(sectionPicker, [0, 1, 2, 3, 4], [0, -20, -20, -20, -20])
    const section2X = useTransform(sectionPicker, [0, 1, 2, 3, 4], [-20, 0, -20, -20, -20])
    const section3X = useTransform(sectionPicker, [0, 1, 2, 3, 4], [-20, -20, 0, -20, -20])
    const section4X = useTransform(sectionPicker, [0, 1, 2, 3, 4], [-20, -20, -20, 0, -20])
    const section5X = useTransform(sectionPicker, [0, 1, 2, 3, 4], [-20, -20, -20, -20, 0])
    const section1Opacity = useTransform(sectionPicker, [0, 1, 2, 3, 4], [1, 0, 0, 0, 0])
    const section2Opacity = useTransform(sectionPicker, [0, 1, 2, 3, 4], [0, 1, 0, 0, 0])
    const section3Opacity = useTransform(sectionPicker, [0, 1, 2, 3, 4], [0, 0, 1, 0, 0])
    const section4Opacity = useTransform(sectionPicker, [0, 1, 2, 3, 4], [0, 0, 0, 1, 0])
    const section5Opacity = useTransform(sectionPicker, [0, 1, 2, 3, 4], [0, 0, 0, 0, 1])
    

    const constraintsRef = useRef(null)


    // Function to trigger SplitText animation for a specific section
    const triggerSectionAnimation = (sectionIndex) => {
        if (animatedSections.has(sectionIndex)) return;
        gsap.set(`[data-section="${sectionIndex}"]`, { opacity: 1 });
        const sectionElement = document.querySelector(`[data-section="${sectionIndex}"] .split`);
        if (sectionElement) {

            const split = SplitText.create(sectionElement, {
                type: "lines, words",
                mask: "lines",
                autoSplit: true,
            });

            gsap.from(split.words, {
                duration: 1,
                y: 100,
                autoAlpha: 0,
                stagger: 0.05,
                ease: "power2.out"
            });

            setAnimatedSections(prev => new Set([...prev, sectionIndex]));
        }
    };

    // Listen for section changes and trigger animations
    useMotionValueEvent(sectionPicker, "change", (latest) => {
        const activeSection = Math.round(latest);
        triggerSectionAnimation(activeSection);
    });

    useGSAP(
        () => {
            // Initial setup - no automatic splitting
        }, [])


    return (
        <motion.div className={styles.mainCont} animate={true} style={{ height: innerHeight ? innerHeight : "100vh" }}>
            <Curve backgroundColor="transparent" routeLabel={pageRoute}>
                <div className={styles.mobileMain}>
                    <motion.div className={styles.textCont} >
                        <motion.div className={styles.textContInner} data-section="0" style={{ opacity: 0 }}>
                            <motion.div className={styles.textContInnerItem}
                                style={{ y: section1X, opacity: section1Opacity, 
                                    // filter: useTransform(sectionBlur1, (value) => `blur(${value}px)`)
                                 }}
                            >
                                <div className={`split ${styles.sectionText}`}>
                                    <h2>On-Page SEO</h2>
                                    <p>We make sure every page on your website is set up to win in search
                                        results. By fine-tuning your headlines, descriptions, and content
                                        around the right keywords, we help your site show up when your
                                        ideal customers are looking. The result? More visibility and more
                                        clicks from the people who matter most.</p>
                                </div>
                            </motion.div>
                        </motion.div>
                        <motion.div className={styles.textContInner} data-section="1" style={{ opacity: 0 }}>
                            <motion.div className={styles.textContInnerItem}
                                style={{ y: section2X, opacity: section2Opacity, 
                                    // filter: useTransform(sectionBlur2, (value) => `blur(${value}px)`)
                                 }}
                            >
                                <div className={`split ${styles.sectionText}`}>
                                    <h2>Technical SEO</h2>
                                    <p>A fast, smooth website keeps both search engines and visitors happy.
                                        We take care of the behind-the-scenes fixes—like speeding up your
                                        site, making it mobile-friendly, and cleaning up broken links—so
                                        nothing gets in the way of ranking higher and converting more visitors.</p>

                                </div>
                            </motion.div>
                        </motion.div>
                        <motion.div className={styles.textContInner2} data-section="2" >
                            <motion.div className={styles.textContInnerItem}
                                style={{ y: section3X, opacity: section3Opacity, border: '1px solid white', borderRadius: '12px',
                                    // filter: useTransform(sectionBlur3, (value) => `blur(${value}px)`)
                                 }}
                                 ref={constraintsRef}
                            >
                                
                                <motion.div
                                    drag
                                    className={styles.sectionTitleCont}
                                    dragConstraints={constraintsRef}
                                    dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}

                                >
                                    <motion.h1 className={styles.sectionTitle}>SEO</motion.h1>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                        <motion.div className={styles.textContInner} data-section="3" style={{ opacity: 0 }}>
                            <motion.div className={styles.textContInnerItem}
                                style={{ y: section4X, opacity: section4Opacity, 
                                    // filter: useTransform(sectionBlur4, (value) => `blur(${value}px)`)
                                 }}
                            >
                                <div className={`split ${styles.sectionText}`}>
                                    <h2>Content Strategy</h2>
                                    <p>Your content is what turns visitors into customers.
                                        We create and optimize blogs, landing pages, and resources that not
                                        only answer your audience&rsquo;s questions but also position your brand as
                                        the expert. With a steady flow of fresh, high-quality content, your
                                        site keeps climbing in search results.</p>

                                </div>
                            </motion.div>
                        </motion.div>
                        <motion.div className={styles.textContInner} data-section="4" style={{ opacity: 0 }}>
                            <motion.div className={styles.textContInnerItem}
                                    style={{ y: section5X, opacity: section5Opacity, 
                                    // filter: useTransform(sectionBlur5, (value) => `blur(${value}px)`)
                                 }}
                            >
                                <div className={`split ${styles.sectionText}`}>
                                
                                    <h2>Local SEO Optimization</h2>
                                    <p>If you serve a local market, we&rsquo;ll make sure your business
                                        is front and center when people nearby are searching. From
                                        Google Business Profile optimization to local keyword targeting,
                                        we help you stand out in “near me” searches and drive more foot
                                        traffic, calls, and leads from your community.</p>

                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                    <motion.div className={styles.swipeCont}>
                        <motion.div
                            className={styles.swipeHome}
                            drag="x"
                            dragConstraints={{ top: 0, right: 0, bottom: 0, left: -600 }}
                            dragTransition={{
                                power: 0.1,
                                timeConstant: 500,
                                modifyTarget: target => Math.round(target / 150) * 150,
                                // min: 0,
                                // max: 100,

                                // bounceStiffness: 800,
                                // bounceDamping: 20
                            }}
                            dragElastic={0.1}
                            style={{
                                x: swipeX,
                                opacity: opacity
                            }}
                        >
                            <motion.div className={styles.swipeHomeContent}>

                                <span>Swipe left or right</span>

                            </motion.div>
                        </motion.div>
                        <motion.div
                            className={styles.swipeLeft}


                            style={{
                                x: left2Width,
                                width: left1Width
                            }}
                        >
                            <motion.div className={styles.swipeHomeContent} style={{ opacity: left1Opacity }}>
                                Technical
                            </motion.div>
                        </motion.div>
                        <motion.div
                            className={styles.swipeLeft2}


                            style={{
                                x: 0,
                                width: left2Width
                            }}
                        >
                            <motion.div className={styles.swipeHomeContent} style={{ opacity: left2Opacity, color: "black" }}>
                                On-Page
                            </motion.div>
                        </motion.div>
                        <motion.div
                            className={styles.swipeRight}


                            style={{
                                x: swipeXRight,
                                width: right1Width
                            }}
                        >
                            <motion.div className={styles.swipeHomeContent} style={{ opacity: right1Opacity }}>
                                Content
                            </motion.div>
                        </motion.div>
                        <motion.div
                            className={styles.swipeRight2}


                            style={{
                                x: right2X,
                                width: right2Width
                            }}
                        >
                            <motion.div className={styles.swipeHomeContent} style={{ opacity: right2Opacity }}>
                                Local
                            </motion.div>
                        </motion.div>
                    </motion.div>

                </div>

            </Curve>
        </motion.div>
    );
}

