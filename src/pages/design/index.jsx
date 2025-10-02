'use client';
import React, { useState, useEffect, useRef } from 'react';

import styles from './styles.module.css';

import Curve from '@/components/Layout/Curve';
import gsap from 'gsap/dist/gsap';
import { motion, animate, useSpring, useMotionValue, useTransform    } from 'motion/react';

import MobileShader from '@/components/MobileShader';
export default function design({ pageRoute }) {

    const [innerHeight, setInnerHeight] = useState(0);
    const [sectionHeight, setSectionHeight] = useState(0);
    const [overlay1Width, setOverlay1Width] = useState(0);
    const [overlay2Width, setOverlay2Width] = useState(0);
    const [overlay3Width, setOverlay3Width] = useState(0);
    const [overlay4Width, setOverlay4Width] = useState(0);
    const [overlay1Radius, setOverlay1Radius] = useState(50);
    const [overlay2Radius, setOverlay2Radius] = useState(50);
    const [overlay3Radius, setOverlay3Radius] = useState(50);
    const [overlay4Radius, setOverlay4Radius] = useState(50);
    const [dragGradinet, setDragGradinet] = useState(0);
    const [dragText, setDragText] = useState("Drag");
    const [dragBg, setDragBg] = useState("goldenrod");
    const [isDragging, setIsDragging] = useState(false);
    const designContOverlayRef = useRef(null);
    
    let dragGradientSpring = useSpring(0, { stiffness: 80, damping: 20 });
    

    useEffect(() => {
        setInnerHeight(window.innerHeight);
        setSectionHeight((window.innerHeight - 100) / 2);
    }, []);

    useEffect(() => {
        dragGradientSpring.set(dragGradinet);
    }, [dragGradientSpring, dragGradinet]);

    const onDrag = (e, info) => {
        let x = info.offset.x;
        let y = info.offset.y;
        setIsDragging(true);
        if (Math.abs(x) > 50 || Math.abs(y) > 50) {
            setDragBg("transparent");

            if (x > 0 && y < 0) {
                setDragText("Visual Design");
                animate(overlay2Width, sectionHeight, {
                    onUpdate: latest => {
                        setOverlay2Width(latest);
                    }
                });
                animate(overlay2Radius, 0, {
                    onUpdate: latest => {
                        setOverlay2Radius(latest);
                    }
                });
                animate(dragGradinet, 100, {
                    duration: 1.0,
                    onUpdate: latest => {
                        setDragGradinet(latest);
                    }
                });
                // dragGradientSpring.set(100);
            } else {
                animate(overlay2Width, 0, {
                    onUpdate: latest => {
                        setOverlay2Width(latest);
                    }
                });
                animate(overlay2Radius, 50, {
                    onUpdate: latest => {
                        setOverlay2Radius(latest);
                    }
                });
                // dragGradientSpring.set(0);
            }
            if (x < 0 && y < 0) {
                setDragText("User Experience");
                animate(overlay1Width, sectionHeight, {
                    onUpdate: latest => {
                        setOverlay1Width(latest);
                    }
                });
                animate(overlay1Radius, 0, {
                    onUpdate: latest => {
                        setOverlay1Radius(latest);
                    }
                });
                animate(dragGradinet, 100, {
                    duration: 1.0,
                    onUpdate: latest => {
                        setDragGradinet(latest);
                    }
                });
                // setDragGradinet(100);
                // dragGradientSpring.set(100);
            } else {
                animate(overlay1Width, 0, {
                    onUpdate: latest => {
                        setOverlay1Width(latest);
                    }
                });
                animate(overlay1Radius, 50, {
                    onUpdate: latest => {
                        setOverlay1Radius(latest);
                    }
                });
                // animate(dragGradinet, 0, {
                //     onUpdate: latest => {
                //         setDragGradinet(latest);
                //     }
                // });
                // dragGradientSpring.set(0);
            }
            if (x < 0 && y > 0) {
                setDragText("3");
                animate(overlay3Width, sectionHeight, {
                    onUpdate: latest => {
                        setOverlay3Width(latest);
                    }
                });
                animate(overlay3Radius, 0, {
                    onUpdate: latest => {
                        setOverlay3Radius(latest);
                    }
                });

            } else {
                animate(overlay3Width, 0, {
                    onUpdate: latest => {
                        setOverlay3Width(latest);
                    }
                });
                animate(overlay3Radius, 50, {
                    onUpdate: latest => {
                        setOverlay3Radius(latest);
                    }
                });
            }
            if (x > 0 && y > 0) {
                setDragText("4");
                animate(overlay4Width, sectionHeight, {
                    onUpdate: latest => {
                        setOverlay4Width(latest);
                    }
                });
                animate(overlay4Radius, 0, {
                    onUpdate: latest => {
                        setOverlay4Radius(latest);
                    }
                });

            } else {
                animate(overlay4Width, 0, {
                    onUpdate: latest => {
                        setOverlay4Width(latest);
                    }
                });
                animate(overlay4Radius, 50, {
                    onUpdate: latest => {
                        setOverlay4Radius(latest);
                    }
                });
            }
        } else {
            setDragText("Drag");
            setDragBg("goldenrod");
            animate(dragGradinet, 0, {
                onUpdate: latest => {
                    setDragGradinet(latest);
                }
            });
            dragGradientSpring.set(0);
            animate(overlay1Width, 0, {
                onUpdate: latest => {
                    setOverlay1Width(latest);
                }
            });
            animate(overlay1Radius, 50, {
                onUpdate: latest => {
                    setOverlay1Radius(latest);
                }
            });
            animate(overlay2Width, 0, {
                onUpdate: latest => {
                    setOverlay2Width(latest);
                }
            });
            animate(overlay2Radius, 50, {
                onUpdate: latest => {
                    setOverlay2Radius(latest);
                }
            });
            animate(overlay3Width, 0, {
                onUpdate: latest => {
                    setOverlay3Width(latest);
                }
            });
            animate(overlay3Radius, 50, {
                onUpdate: latest => {
                    setOverlay3Radius(latest);
                }
            });
            animate(overlay4Width, 0, {
                onUpdate: latest => {
                    setOverlay4Width(latest);
                }
            });
            animate(overlay4Radius, 50, {
                onUpdate: latest => {
                    setOverlay4Radius(latest);
                }
            });
        }
    }
    const onDragEnd = (e, info) => {
        setDragText("Drag");
        setDragBg("goldenrod");
        setIsDragging(false);
        // dragGradientSpring.set(0);
        animate(dragGradinet, 0, {
            duration: 1.0,
            onUpdate: latest => {
                setDragGradinet(latest);
            }
        });
        animate(overlay1Width, 0, {
            onUpdate: latest => {
                setOverlay1Width(latest);
            }
        });
        animate(overlay1Radius, 50, {
            onUpdate: latest => {
                setOverlay1Radius(latest);
            }
        });
        animate(overlay2Width, 0, {
            onUpdate: latest => {
                setOverlay2Width(latest);
            }
        });
        animate(overlay2Radius, 50, {
            onUpdate: latest => {
                setOverlay2Radius(latest);
            }
        });
        animate(overlay3Width, 0, {
            onUpdate: latest => {
                setOverlay3Width(latest);
            }
        });
        animate(overlay3Radius, 50, {
            onUpdate: latest => {
                setOverlay3Radius(latest);
            }
        });
        animate(overlay4Width, 0, {
            onUpdate: latest => {
                setOverlay4Width(latest);
            }
        });
        animate(overlay4Radius, 50, {
            onUpdate: latest => {
                setOverlay4Radius(latest);
            }
        });
    }

    useEffect(() => {
        const scrollingText = gsap.utils.toArray('.UE1 h1');

        const tl = horizontalLoop(scrollingText, {
            repeat: -1,
            paddingRight: 0,
            reversed: false,
        });

        const scrollingText2 = gsap.utils.toArray('.UE2 h1');

        const tl2 = horizontalLoop(scrollingText2, {
            repeat: -1,
            paddingRight: 0,
            reversed: true,
        });


        /*
        This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.
        
        Features:
         - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
         - When each item animates to the left or right enough, it will loop back to the other side
         - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
         - The returned timeline will have the following methods added to it:
           - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
           - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
           - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
           - current() - returns the current index (if an animation is in-progress, it reflects the final index)
           - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
         */
        function horizontalLoop(items, config) {
            items = gsap.utils.toArray(items);
            config = config || {};
            let tl = gsap.timeline({ repeat: config.repeat, paused: config.paused, defaults: { ease: "none" }, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100) }),
                length = items.length,
                startX = items[0].offsetLeft,
                times = [],
                widths = [],
                xPercents = [],
                curIndex = 0,
                // pixelsPerSecond = (config.speed || 1) * 1,
                pixelsPerSecond = 100,
                snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
                totalWidth, curX, distanceToStart, distanceToLoop, item, i;
            gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
                xPercent: (i, el) => {
                    let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
                    xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
                    return xPercents[i];
                }
            });
            gsap.set(items, { x: 0 });
            totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") + (parseFloat(config.paddingRight) || 0);
            for (i = 0; i < length; i++) {
                item = items[i];
                curX = xPercents[i] / 100 * widths[i];
                distanceToStart = item.offsetLeft + curX - startX;
                distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
                tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
                    .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
                    .add("label" + i, distanceToStart / pixelsPerSecond);
                times[i] = distanceToStart / pixelsPerSecond;
            }
            function toIndex(index, vars) {
                vars = vars || {};
                (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
                let newIndex = gsap.utils.wrap(0, length, index),
                    time = times[newIndex];
                if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
                    vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
                    time += tl.duration() * (index > curIndex ? 1 : -1);
                }
                curIndex = newIndex;
                vars.overwrite = true;
                return tl.tweenTo(time, vars);
            }
            tl.next = vars => toIndex(curIndex + 1, vars);
            tl.previous = vars => toIndex(curIndex - 1, vars);
            tl.current = () => curIndex;
            tl.toIndex = (index, vars) => toIndex(index, vars);
            tl.times = times;
            // tl.progress(1, true).progress(0, true); // pre-render for performance
            if (config.reversed) {
                tl.vars.onReverseComplete();
                tl.reverse();
            }
            // if (config.reverse) {
            //     ScrollTrigger.create({
            //         trigger: ".sectionDesign",
            //         start: "top+=100vh bottom",
            //         end: "bottom-=500vh top",
            //         // end: "bottom top",
            //         markers: false,
            //         scrub: config.scrub || 1,
            //         onUpdate: (self) => {
            //             tl.progress(self.progress * -0.2 + 1);
            //             // console.log(self.progress);
            //         },
            //     });
            // } else {
            //     ScrollTrigger.create({
            //         trigger: ".sectionDesign",
            //         start: "top+=100vh bottom",
            //         end: "bottom-=500vh top",
            //         // end: "bottom top",
            //         markers: false,
            //         scrub: config.scrub || 1,
            //         onUpdate: (self) => {
            //             tl.progress(self.progress * 0.2);
            //             // console.log(self.progress);
            //         },
            //     });
            // }
            return tl;
        }


    }, []);
    return (
        <motion.div className={styles.mainCont} animate={true} style={{ height: innerHeight ? innerHeight : "100vh" }}>
            <Curve backgroundColor="transparent" routeLabel={pageRoute}>
                <div className={styles.mobileMain}>
                    <div className={styles.designContOverlay} ref={designContOverlayRef}>
                        <motion.div className={styles.designContDrag}
                            drag
                            dragSnapToOrigin
                            onDrag={onDrag}
                            onDragEnd={onDragEnd}
                            dragConstraints={designContOverlayRef}
                            dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}
                            style={{ backgroundColor: dragBg }}
                        >
                            <div className={styles.dragTextCont} style={{ background: `linear-gradient(90deg, #ff7a18, #ff7a18 ${dragGradientSpring.get()}%, #32005e ${dragGradientSpring.get()}%, #32005e)` }}>
                                
                                <h1 className={styles.dragText} style={{ marginBottom: isDragging ? "80px" : 0, whiteSpace: "nowrap" }}>{dragText}</h1>
                            </div>
                        </motion.div>
                        <div className={styles.designContOverlayItem}>

                        </div>
                    </div>
                    <div className={styles.designCont}>
                        <div className={styles.designContItem}>
                            <h1>User Experience</h1>
                            <div className={styles.designContItemOverlay} style={{ width: overlay1Width, height: overlay1Width, borderRadius: overlay1Radius }}>
                                {Array.from({ length: 4 }, (_, index) => (
                                    <React.Fragment key={index}>
                                        <div className={`UE1 ${styles.scrollerText}`}>
                                            <h1>User Experience &nbsp;</h1>
                                            <h1>User Experience &nbsp;</h1>
                                            <h1>User Experience &nbsp;</h1>
                                            <h1>User Experience &nbsp;</h1>
                                        </div>
                                        <div className={`UE2 ${styles.scrollerText}`}>
                                            <h1> User Experience &nbsp;</h1>
                                            <h1> User Experience &nbsp;</h1>
                                            <h1> User Experience &nbsp;</h1>
                                            <h1> User Experience &nbsp;</h1>
                                        </div>
                                    </React.Fragment>
                                ))}

                            </div>
                        </div>
                        <div className={styles.designContItem}>
                            <h1>2</h1>
                            <div className={styles.designContItemOverlay} style={{ width: overlay2Width, height: overlay2Width, borderRadius: overlay2Radius }}></div>
                        </div>

                        <div className={styles.designContItem}>
                            <h1>3</h1>
                            <div className={styles.designContItemOverlay} style={{ width: overlay3Width, height: overlay3Width, borderRadius: overlay3Radius }}></div>
                        </div>
                        <div className={styles.designContItem}>
                            <h1>4</h1>
                            <div className={styles.designContItemOverlay} style={{ width: overlay4Width, height: overlay4Width, borderRadius: overlay4Radius }}></div>
                        </div>
                    </div>
                </div>
                <div className={styles.designCard}></div>
                <MobileShader />
            </Curve>
        </motion.div>
    );
}

