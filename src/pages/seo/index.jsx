'use client';
import React, { useState, useEffect } from 'react';

import styles from './styles.module.css';

import Curve from '@/components/Layout/Curve';

import { motion, useMotionValue, useTransform, useVelocity, useMotionValueEvent, useSpring } from 'motion/react';



export default function seo({ pageRoute }) {
    const [innerHeight, setInnerHeight] = useState(0);

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

    const section1X = useTransform(sectionPicker, [0, 1, 2, 3, 4], [0, -500, -500, -500, -500])
    const section2X = useTransform(sectionPicker, [0, 1, 2, 3, 4], [500, 0, -500, -500, -500])
    const section3X = useTransform(sectionPicker, [0, 1, 2, 3, 4], [500, 500, 0, -500, -500])
    const section4X = useTransform(sectionPicker, [0, 1, 2, 3, 4], [500, 500, 500, 0, -500])
    const section5X = useTransform(sectionPicker, [0, 1, 2, 3, 4], [500, 500, 500, 500, 0])
    const section1Opacity = useTransform(sectionPicker, [0, 1, 2, 3, 4], [1, 0, 0, 0, 0])
    const section2Opacity = useTransform(sectionPicker, [0, 1, 2, 3, 4], [0, 1, 0, 0, 0])
    const section3Opacity = useTransform(sectionPicker, [0, 1, 2, 3, 4], [0, 0, 1, 0, 0])
    const section4Opacity = useTransform(sectionPicker, [0, 1, 2, 3, 4], [0, 0, 0, 1, 0])
    const section5Opacity = useTransform(sectionPicker, [0, 1, 2, 3, 4], [0, 0, 0, 0, 1])

    const xVelocity = useVelocity(swipeX)
    const sectionBlur = useTransform(xVelocity, [-100, 0, 100], [5, 0, 5], { clamp: true })
    const blurSpring = useSpring(sectionBlur, { stiffness: 100, damping: 10 })





    return (
        <motion.div className={styles.mainCont} animate={true} style={{ height: innerHeight ? innerHeight : "100vh" }}>
            <Curve backgroundColor="transparent" routeLabel={pageRoute}>
                <div className={styles.mobileMain}>
                    <motion.div className={styles.textCont} >
                        <motion.div className={styles.textContInner} >
                            <motion.div className={styles.textContInnerItem}
                                style={{ x: section1X, opacity: section1Opacity }}
                            >
                                <h1>
                                    First Section
                                </h1>
                            </motion.div>
                        </motion.div>
                        <motion.div className={styles.textContInner} >
                            <motion.div className={styles.textContInnerItem}
                                style={{ x: section2X, opacity: section2Opacity }}
                            >
                                <h1>
                                    Second Section
                                </h1>
                            </motion.div>
                        </motion.div>
                        <motion.div className={styles.textContInner} >
                            <motion.div className={styles.textContInnerItem}
                                style={{ x: section3X, opacity: section3Opacity }}
                            >
                                <h1>
                                    Third Section
                                </h1>
                            </motion.div>
                        </motion.div>
                        <motion.div className={styles.textContInner} >
                            <motion.div className={styles.textContInnerItem}
                                style={{ x: section4X, opacity: section4Opacity }}
                            >
                                <h1>
                                    Fourth Section
                                </h1>
                            </motion.div>
                        </motion.div>
                        <motion.div className={styles.textContInner} >
                            <motion.div className={styles.textContInnerItem}
                                style={{ x: section5X, opacity: section5Opacity }}
                            >
                                <h1>
                                    Fifth Section
                                    
                                </h1>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                    <motion.div className={styles.swipeCont}>
                        <motion.div
                            className={styles.swipeHome}
                            drag="x"
                            dragConstraints={{ top: 0, right: 0, bottom: 0, left: -600 }}
                            dragTransition={{
                                power: 0.8,
                                timeConstant: 100,
                                modifyTarget: target => Math.round(target / 150) * 150,


                                bounceStiffness: 600,
                                bounceDamping: 20
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
                                left one
                            </motion.div>
                        </motion.div>
                        <motion.div
                            className={styles.swipeLeft2}


                            style={{
                                x: 0,
                                width: left2Width
                            }}
                        >
                            <motion.div className={styles.swipeHomeContent} style={{ opacity: left2Opacity }}>
                                left two
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
                                Right one
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
                                Right two
                            </motion.div>
                        </motion.div>
                    </motion.div>

                </div>

            </Curve>
        </motion.div>
    );
}

