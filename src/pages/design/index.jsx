'use client';
import React, { useState, useEffect, useRef } from 'react';

import styles from './styles.module.css';

import Curve from '@/components/Layout/Curve';
import gsap from 'gsap/dist/gsap';
import { motion, animate, useSpring, useMotionValue, useTransform } from 'motion/react';
import { useGSAP } from '@gsap/react';
import { Flip } from "gsap/dist/Flip";

import { FaTimes } from 'react-icons/fa';
import MobileShader from '@/components/MobileShader';

gsap.registerPlugin(  Flip);

export default function design({ pageRoute }) {

    const [innerHeight, setInnerHeight] = useState(0);
    const [sectionHeight, setSectionHeight] = useState(0);
    const [sectionWidth, setSectionWidth] = useState(0);
    const [gridHeight, setGridHeight] = useState(0);
    const [overlay1Width, setOverlay1Width] = useState(0);
    const [overlay2Width, setOverlay2Width] = useState(0);
    const [overlay3Width, setOverlay3Width] = useState(0);
    const [overlay4Width, setOverlay4Width] = useState(0);
    const [overlay1Radius, setOverlay1Radius] = useState(50);
    const [overlay2Radius, setOverlay2Radius] = useState(50);
    const [overlay3Radius, setOverlay3Radius] = useState(50);
    const [overlay4Radius, setOverlay4Radius] = useState(50);
    const [dragGradinet1, setDragGradinet1] = useState(0);
    const [dragGradinet2, setDragGradinet2] = useState(0);
    const [dragGradinet3, setDragGradinet3] = useState(0);
    const [dragGradinet4, setDragGradinet4] = useState(0);
    const [isSelected, setIsSelected] = useState(0);
    const [zIndex1, setZIndex1] = useState(0);
    const [zIndex2, setZIndex2] = useState(0);
    const [zIndex3, setZIndex3] = useState(0);
    const [zIndex4, setZIndex4] = useState(0);
    const [zIndexA, setZIndexA] = useState(1);
    const [dragWidth, setDragWidth] = useState(80);
    const [dragText, setDragText] = useState("Drag");
    const [dragBg, setDragBg] = useState("goldenrod");
    const [isDragging, setIsDragging] = useState(false);
    const designContOverlayRef = useRef(null);
    const selectionTimeoutRef = useRef(null);
    const clearSelectionTimeoutRef = useRef(null);
    const selectionTimeoutActiveRef = useRef(false);



    useEffect(() => {
        setInnerHeight(window.innerHeight);
        setSectionHeight((window.innerHeight - 100) / 2);
        setGridHeight(window.innerHeight - 100);
        setSectionWidth(window.innerWidth);
    }, []);

    
    

    const isSelecting = (x, y) => {
        let xAbs = Math.abs(x);
        let yAbs = Math.abs(y);
        if (xAbs > ((sectionWidth / 2) / 2) - (((sectionWidth / 100) * 20) / 2) && xAbs < ((sectionWidth / 2) / 2) + (((sectionWidth / 100) * 20) / 2)
            &&
            yAbs > ((gridHeight / 2) / 2) - (((gridHeight / 100) * 20) / 2) && yAbs < ((gridHeight / 2) / 2) + (((gridHeight / 100) * 20) / 2)
        ) {
            return true;
        } else {
            return false;
        }
    }

    const makeSelection = (index) => {
        // Only start timeout if not already active
        if (selectionTimeoutActiveRef.current) {
            return;
        }
        // console.log("makeSelection called");
        selectionTimeoutActiveRef.current = true;
        // Clear any existing timeout
        if (selectionTimeoutRef.current) {
            // console.log("Clearing existing timeout");
            clearTimeout(selectionTimeoutRef.current);
        }
        // Set new timeout
        // console.log("Setting new timeout");
        selectionTimeoutRef.current = setTimeout(() => {
            // console.log("Timeout fired, setting isSelected to true");
            setIsSelected(index);
            selectionTimeoutRef.current = null;
            selectionTimeoutActiveRef.current = false;
        }, 900);
    }

    const clearSelection = () => {
        // console.log("clearSelection called");
        // Clear any pending timeout
        if (selectionTimeoutRef.current) {
            clearTimeout(selectionTimeoutRef.current);
            selectionTimeoutRef.current = null;
        }
        selectionTimeoutActiveRef.current = false;
        setTimeout(() => {
            setIsSelected(0);
        }, 10);
        
    }

    useEffect(() => {
        console.log("isSelected changed to:", isSelected);
    }, [isSelected]);
   
    

    useGSAP(() => {

        const
            flipItems = gsap.utils.toArray("#designItem"),
            details = document.querySelector('#detail'),
            detailsCont = document.querySelector('#detailCont'),
            detailContent = document.querySelector('#detailContent'),
            
            detailTitle = document.querySelector('#detailTitle'),
            
            detailDescription = document.querySelector('#detailDescription');

        let activeItem;
        
        function showDetails(flipItem) {
            // if (activeItem) { // someone could click on an element behind the open details panel, in which case we should just close it.          
            //     return hideDetails();
            // }
            let onLoad = () => {

                gsap.set(details, { visibility: "hidden" }); // hide the details until we know where to put it
                // position the details on top of the item (scaled down)
                Flip.fit(
                    details,
                    flipItem,
                    { scale: true }
                );

                // record the state
                const state = Flip.getState(details);

                // set the final state
                gsap.set(details, { clearProps: true }); // wipe out all inline stuff so it's in the native state (not scaled)
                gsap.set(details, { visibility: "visible", overflow: "hidden" });
                gsap.set(detailsCont, { left: "50%", top: "50%", x: "-50%", y: "-50%", rotateY: 0, opacity: 1 });

                Flip.from(state, {
                    duration: 0.5,
                    ease: "power2.inOut",
                    scale: true,
                    onComplete: () => gsap.set(details, { overflow: "auto" }) // to permit scrolling if necessary
                })
                    // Flip.from() returns a timeline, so add a tween to reveal the detail content. That way, if the flip gets interrupted and forced to completion & killed, this does too.
                    .to(detailContent, { yPercent: 0 }, 0.2);

                // detailImage.removeEventListener("load", onLoad);
                document.querySelector('#detailCont').addEventListener('click', hideDetails);
                document.querySelector('#detailBG').addEventListener('click', hideDetails);

                // Add scroll listener to hide details when scrolling
                

            };

            // Change image and text
            const data = flipItem.dataset;
            // detailImage.addEventListener("load", onLoad);
            onLoad();
            
            detailTitle.innerText = data.title;
            
            detailDescription.innerText = data.text;

            // stagger-fade the items out from the one that was selected in a staggered way (and kill the tween of the selected item)
            // gsap.to(flipItems, {opacity: 0.3, stagger: { amount: 0.7, from: flipItems.indexOf(flipItem), grid: "auto"}}).kill(flipItem);
            // gsap.to(".app", {backgroundColor: "#888", duration: 1, delay: 0.3}); // fade out the background
            activeItem = flipItem;
        }
        function hideDetails() {
            if (!activeItem) {
                return;
            }
            document.querySelector('#detail').removeEventListener('click', hideDetails);
            gsap.set(details, { overflow: "hidden" });
            gsap.set(detailsCont, { rotateY: -20, opacity: 0 });

            // record the current state of details
            const state = Flip.getState(details);

            // scale details down so that its detailImage fits exactly on top of activeItem
            Flip.fit(details, activeItem, { scale: true });

            // animate the other elements, like all fade all items back up to full opacity, slide the detailContent away, and tween the background color to white.
            const tl = gsap.timeline();
            tl.set(details, { overflow: "hidden" })
                .to(detailContent, { yPercent: -100 })
            // .to(flipItems, {opacity: 1, stagger: {amount: 0.7, from: flipItems.indexOf(activeItem), grid: "auto"}})
            // .to(".app", {backgroundColor: "#fff"}, "<");

            // animate from the original state to the current one.
            Flip.from(state, {
                scale: true,
                duration: 0.5,
                delay: 0.2, // 0.2 seconds because we want the details to slide up first, then flip.
                onInterrupt: () => tl.kill()
            })
                .set(details, { visibility: "hidden" });
            activeItem = null;
        }

        if (isSelected === 1 || isSelected === 2 || isSelected === 3 || isSelected === 4) {
            console.log("isSelected is not 0");
            console.log("isDragging:", isDragging);
            if(isDragging === false) {
                console.log("isDragging is false");
                console.log("showDetails called");
                const flipItem = flipItems[isSelected - 1];
                if (flipItem && flipItem.dataset) {
                    showDetails(flipItem);
                }
            } 
        }
        
        gsap.utils.toArray('.designContItem');
    }, [innerHeight, sectionWidth, gridHeight, isDragging, isSelected]);

    const onDrag = (e, info) => {
        let x = info.offset.x;
        let y = info.offset.y;
        setIsDragging(true);
        setDragWidth(40);

        if (Math.abs(x) > 50 || Math.abs(y) > 50) {
            setDragBg("white");

            // Reset all gradients first
            animate(dragGradinet1, 0, { duration: 0.3 });
            animate(dragGradinet2, 0, { duration: 0.3 });
            animate(dragGradinet3, 0, { duration: 0.3 });
            animate(dragGradinet4, 0, { duration: 0.3 });

            // Reset all overlays first
            animate(overlay1Width, 0, { duration: 0.3 });
            animate(overlay2Width, 0, { duration: 0.3 });
            animate(overlay3Width, 0, { duration: 0.3 });
            animate(overlay4Width, 0, { duration: 0.3 });
            animate(overlay1Radius, 50, { duration: 0.3 });
            animate(overlay2Radius, 50, { duration: 0.3 });
            animate(overlay3Radius, 50, { duration: 0.3 });
            animate(overlay4Radius, 50, { duration: 0.3 });

            // Then activate the appropriate quadrant
            if (x > 0 && y < 0) {
                setOverlay1Radius(50);
                setOverlay3Radius(50);
                setOverlay4Radius(50);
                setOverlay1Width(0);
                setOverlay3Width(0);
                setOverlay4Width(0);
                setDragGradinet1(0);
                setDragGradinet3(0);
                setDragGradinet4(0);
                setZIndex1(0);
                setZIndex2(1);
                setZIndex3(0);
                setZIndex4(0);
                setZIndexA(0);
                // Top Right - Visual Design
                setDragText("Visual Design");
                animate(overlay2Width, sectionHeight, {
                    duration: 0.5,
                    onUpdate: latest => {
                        setOverlay2Width(latest);
                    }
                });
                animate(overlay2Radius, 0, {
                    duration: 0.5,
                    onUpdate: latest => {
                        setOverlay2Radius(latest);
                    }
                });
                if (isSelecting(x, y)) {
                    makeSelection(2);
                    animate(dragGradinet2, 100, {
                        duration: 1.0,
                        onUpdate: latest => {
                            setDragGradinet2(latest);
                        }
                    });

                } else {
                    clearSelection();
                    setDragGradinet2(0);
                }

            } else if (x < 0 && y < 0) {
                setOverlay2Radius(50);
                setOverlay3Radius(50);
                setOverlay4Radius(50);
                setOverlay2Width(0);
                setOverlay3Width(0);
                setOverlay4Width(0);
                setDragGradinet2(0);
                setDragGradinet3(0);
                setDragGradinet4(0);
                setZIndex1(1);
                setZIndex2(0);
                setZIndex3(0);
                setZIndex4(0);
                setZIndexA(0);
                // Top Left - User Experience
                setDragText("User Experience");
                animate(overlay1Width, sectionHeight, {
                    duration: 0.5,
                    onUpdate: latest => {
                        setOverlay1Width(latest);
                    }
                });
                animate(overlay1Radius, 0, {
                    duration: 0.5,
                    onUpdate: latest => {
                        setOverlay1Radius(latest);
                    }
                });
                if (isSelecting(x, y)) {
                    makeSelection(1);
                    animate(dragGradinet1, 100, {
                        duration: 1.0,
                        onUpdate: latest => {
                            setDragGradinet1(latest);
                        }
                    });
                } else {
                    setDragGradinet1(0);
                    clearSelection();
                }

            } else if (x < 0 && y > 0) {
                setOverlay2Radius(50);
                setOverlay1Radius(50);
                setOverlay4Radius(50);
                setOverlay2Width(0);
                setOverlay1Width(0);
                setOverlay4Width(0);
                setDragGradinet2(0);
                setDragGradinet1(0);
                setDragGradinet4(0);
                setZIndex1(0);
                setZIndex2(0);
                setZIndex3(1);
                setZIndex4(0);
                setZIndexA(0);
                // Bottom Left
                setDragText("Responsive Design");
                animate(overlay3Width, sectionHeight, {
                    duration: 0.5,
                    onUpdate: latest => {
                        setOverlay3Width(latest);
                    }
                });
                animate(overlay3Radius, 0, {
                    duration: 0.5,
                    onUpdate: latest => {
                        setOverlay3Radius(latest);
                    }
                });
                if (isSelecting(x, y)) {
                    animate(dragGradinet3, 100, {
                        duration: 1.0,
                        onUpdate: latest => {
                            setDragGradinet3(latest);
                        }
                    });
                    makeSelection(3);
                } else {
                    setDragGradinet3(0);
                    clearSelection();
                }

            } else if (x > 0 && y > 0) {
                setOverlay2Radius(50);
                setOverlay1Radius(50);
                setOverlay3Radius(50);
                setOverlay2Width(0);
                setOverlay1Width(0);
                setOverlay3Width(0);
                setDragGradinet2(0);
                setDragGradinet1(0);
                setDragGradinet3(0);
                setZIndex1(0);
                setZIndex2(0);
                setZIndex3(0);
                setZIndex4(1);
                setZIndexA(0);
                // Bottom Right
                setDragText("User Interface");
                animate(overlay4Width, sectionHeight, {
                    duration: 0.5,
                    onUpdate: latest => {
                        setOverlay4Width(latest);
                    }
                });
                animate(overlay4Radius, 0, {
                    duration: 0.5,
                    onUpdate: latest => {
                        setOverlay4Radius(latest);
                    }
                });
                if (isSelecting(x, y)) {
                    animate(dragGradinet4, 100, {
                        duration: 1.0,
                        onUpdate: latest => {
                            setDragGradinet4(latest);
                        }
                    });
                    makeSelection(4);
                } else {
                    setDragGradinet4(0);
                    clearSelection();
                }

            }
        } else {
            setDragText("Drag");
            setDragBg("goldenrod");
            animate(dragGradinet1, 0, {
                duration: 0.3,
                onUpdate: latest => {
                    setDragGradinet1(latest);
                }
            });
            animate(dragGradinet2, 0, {
                duration: 0.3,
                onUpdate: latest => {
                    setDragGradinet2(latest);
                }
            });
            animate(dragGradinet3, 0, {
                duration: 0.3,
                onUpdate: latest => {
                    setDragGradinet3(latest);
                }
            });
            animate(dragGradinet4, 0, {
                duration: 0.3,
                onUpdate: latest => {
                    setDragGradinet4(latest);
                }
            });

        }
    }
    const onDragEnd = (e, info) => {
        setDragText("Drag");
        setDragBg("goldenrod");
        setDragWidth(80);
        setIsDragging(false);

        // Reset all gradients
        animate(dragGradinet1, 0, {
            duration: 0.5,
            onUpdate: latest => {
                setDragGradinet1(latest);
            }
        });
        animate(dragGradinet2, 0, {
            duration: 0.5,
            onUpdate: latest => {
                setDragGradinet2(latest);
            }
        });
        animate(dragGradinet3, 0, {
            duration: 0.5,
            onUpdate: latest => {
                setDragGradinet3(latest);
            }
        });
        animate(dragGradinet4, 0, {
            duration: 0.5,
            onUpdate: latest => {
                setDragGradinet4(latest);
            }
        });

        // Reset all overlays
        animate(overlay1Width, 0, {
            duration: 0.5,
            onUpdate: latest => {
                setOverlay1Width(latest);
            }
        });
        animate(overlay1Radius, 50, {
            duration: 0.5,
            onUpdate: latest => {
                setOverlay1Radius(latest);
            }
        });
        animate(overlay2Width, 0, {
            duration: 0.5,
            onUpdate: latest => {
                setOverlay2Width(latest);
            }
        });
        animate(overlay2Radius, 50, {
            duration: 0.5,
            onUpdate: latest => {
                setOverlay2Radius(latest);
            }
        });
        animate(overlay3Width, 0, {
            duration: 0.5,
            onUpdate: latest => {
                setOverlay3Width(latest);
            }
        });
        animate(overlay3Radius, 50, {
            duration: 0.5,
            onUpdate: latest => {
                setOverlay3Radius(latest);
            }
        });
        animate(overlay4Width, 0, {
            duration: 0.5,
            onUpdate: latest => {
                setOverlay4Width(latest);
            }
        });
        animate(overlay4Radius, 50, {
            duration: 0.5,
            onUpdate: latest => {
                setOverlay4Radius(latest);
            }
        });
        setZIndex1(0);
        setZIndex2(0);
        setZIndex3(0);
        setZIndex4(0);
        setZIndexA(1);
        clearSelection();
    }

    useEffect(() => {
        const scrollingText = gsap.utils.toArray('.UE1 h1');
        if (scrollingText && scrollingText.length) {
            horizontalLoop(scrollingText, {
                repeat: -1,
                paddingRight: 0,
                reversed: false,
            });
        }

        const scrollingText2 = gsap.utils.toArray('.UE2 h1');
        if (scrollingText2 && scrollingText2.length) {
            horizontalLoop(scrollingText2, {
                repeat: -1,
                paddingRight: 0,
                reversed: true,
            });
        }

        const scrollingTextVD1 = gsap.utils.toArray('.VD1 h1');
        if (scrollingTextVD1 && scrollingTextVD1.length) {
            horizontalLoop(scrollingTextVD1, {
                repeat: -1,
                paddingRight: 0,
                reversed: false,
            });
        }

        const scrollingTextVD2 = gsap.utils.toArray('.VD2 h1');
        if (scrollingTextVD2 && scrollingTextVD2.length) {
            horizontalLoop(scrollingTextVD2, {
                repeat: -1,
                paddingRight: 0,
                reversed: true,
            });
        }

        const scrollingTextRD1 = gsap.utils.toArray('.RD1 h1');
        if (scrollingTextRD1 && scrollingTextRD1.length) {
            horizontalLoop(scrollingTextRD1, {
                repeat: -1,
                paddingRight: 0,
                reversed: false,
            });
        }

        const scrollingTextRD2 = gsap.utils.toArray('.RD2 h1');
        if (scrollingTextRD2 && scrollingTextRD2.length) {
            horizontalLoop(scrollingTextRD2, {
                repeat: -1,
                paddingRight: 0,
                reversed: true,
            });
        }

        const scrollingTextUI1 = gsap.utils.toArray('.UI1 h1');
        if (scrollingTextUI1 && scrollingTextUI1.length) {
            horizontalLoop(scrollingTextUI1, {
                repeat: -1,
                paddingRight: 0,
                reversed: false,
            });
        }

        const scrollingTextUI2 = gsap.utils.toArray('.UI2 h1');
        if (scrollingTextUI2 && scrollingTextUI2.length) {
            horizontalLoop(scrollingTextUI2, {
                repeat: -1,
                paddingRight: 0,
                reversed: true,
            });
        }


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
            if (!items || !items.length) {
                return gsap.timeline({ paused: true });
            }
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
                            style={{ backgroundColor: dragBg, width: `${dragWidth}px`, height: `${dragWidth}px` }}
                        >
                            <div className={styles.dragTextCont} style={{ background: `linear-gradient(90deg, #ffffff, #ffffff 100%, #32005e00 100%, #32005e00)`, zIndex: `${zIndexA}` }}>

                                <h1 className={styles.dragText} style={{ marginBottom: isDragging ? "80px" : 0, whiteSpace: "nowrap" }}>{dragText}</h1>
                            </div>
                            <div className={styles.dragTextCont} style={{ background: `linear-gradient(90deg, #ff7a18, #ff7a18 ${dragGradinet1}%, #32005e00 ${dragGradinet1}%, #32005e00)`, zIndex: `${zIndex1}` }}>

                                <h1 className={styles.dragText} style={{ marginBottom: isDragging ? "80px" : 0, whiteSpace: "nowrap" }}>{dragText}</h1>
                            </div>

                            <div className={styles.dragTextCont} style={{ background: `linear-gradient(90deg, #4f9ce4, #4f9ce4 ${dragGradinet2}%, #32005e00 ${dragGradinet2}%, #32005e00)`, zIndex: `${zIndex2}` }}>


                                <h1 className={styles.dragText} style={{ marginBottom: isDragging ? "80px" : 0, whiteSpace: "nowrap" }}>{dragText}</h1>

                            </div>
                            <div className={styles.dragTextCont} style={{ background: `linear-gradient(90deg, #7678ed, #7678ed ${dragGradinet3}%, #32005e00 ${dragGradinet3}%, #32005e00)`, zIndex: `${zIndex3}` }}>

                                <h1 className={styles.dragText} style={{ marginBottom: isDragging ? "80px" : 0, whiteSpace: "nowrap" }}>{dragText}</h1>
                            </div>
                            <div className={styles.dragTextCont} style={{ background: `linear-gradient(90deg, #f7b801, #f7b801 ${dragGradinet4}%, #32005e00 ${dragGradinet4}%, #32005e00)`, zIndex: `${zIndex4}` }}>

                                <h1 className={styles.dragText} style={{ marginBottom: isDragging ? "80px" : 0, whiteSpace: "nowrap" }}>{dragText}</h1>
                            </div>
                        </motion.div>
                        <div className={styles.designContOverlayItem}>

                        </div>
                    </div>
                    <div className={styles.designCont}>
                        <div className={styles.designContItem} id="designItem" data-title="User Experience" data-text="Our User Experience (UX) services ensure your website is intuitive, engaging, and user-focused. We design seamless digital experiences that enhance satisfaction, boost conversions, and strengthen your brand.">
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
                                <div className={styles.designContItemOverlayItem}></div>
                            </div>
                        </div>
                        <div className={styles.designContItem} id="designItem" data-title="Visual Design" data-text="Our Visual Design services bring your brand to life with clean, modern, and impactful visuals. We craft cohesive designs that capture attention, enhance usability, and create a lasting impression across all digital touchpoints.">
                            <h1>Visual Design</h1>
                            <div className={styles.designContItemOverlay} style={{ width: overlay2Width, height: overlay2Width, borderRadius: overlay2Radius }}>
                                {Array.from({ length: 4 }, (_, index) => (
                                    <React.Fragment key={index}>
                                        <div className={`VD1 ${styles.scrollerText}`}>
                                            <h1>Visual Design &nbsp;</h1>
                                            <h1>Visual Design &nbsp;</h1>
                                            <h1>Visual Design &nbsp;</h1>
                                            <h1>Visual Design &nbsp;</h1>

                                        </div>
                                        <div className={`VD2 ${styles.scrollerText}`}>
                                            <h1>Visual Design &nbsp;</h1>
                                            <h1>Visual Design &nbsp;</h1>
                                            <h1>Visual Design &nbsp;</h1>
                                            <h1>Visual Design &nbsp;</h1>
                                        </div>
                                    </React.Fragment>
                                ))}
                                <div className={styles.designContItemOverlayItem}></div>
                            </div>
                            {/* <div className={styles.designContItemOverlay} style={{ width: overlay2Width, height: overlay2Width, borderRadius: overlay2Radius }}></div> */}
                        </div>

                        <div className={styles.designContItem} id="designItem" data-title="Responsive Design" data-text="Our Responsive Design services ensure your website looks and performs flawlessly on any device. We create flexible layouts that adapt seamlessly to different screen sizes, delivering a consistent and engaging user experience everywhere.">
                            <h1>Responsive Design</h1>
                            <div className={styles.designContItemOverlay} style={{ width: overlay3Width, height: overlay3Width, borderRadius: overlay3Radius }}>
                                {Array.from({ length: 4 }, (_, index) => (
                                    <React.Fragment key={index}>
                                        <div className={`RD1 ${styles.scrollerText}`}>

                                            <h1>Responsive Design &nbsp;</h1>
                                            <h1>Responsive Design &nbsp;</h1>
                                            <h1>Responsive Design &nbsp;</h1>
                                            <h1>Responsive Design &nbsp;</h1>

                                        </div>
                                        <div className={`RD2 ${styles.scrollerText}`}>
                                            <h1>Responsive Design &nbsp;</h1>
                                            <h1>Responsive Design &nbsp;</h1>
                                            <h1>Responsive Design &nbsp;</h1>
                                            <h1>Responsive Design &nbsp;</h1>
                                        </div>
                                    </React.Fragment>
                                ))}
                                <div className={styles.designContItemOverlayItem}></div>
                            </div>
                        </div>
                        <div className={styles.designContItem} id="designItem" data-title="User Interface" data-text="Our User Interface (UI) services focus on creating visually appealing, intuitive interfaces that make navigation effortless. We design with clarity and consistency to ensure every interaction feels seamless and engaging.">
                            <h1>User Interface</h1>
                            <div className={styles.designContItemOverlay} style={{ width: overlay4Width, height: overlay4Width, borderRadius: overlay4Radius }}>
                                {Array.from({ length: 4 }, (_, index) => (
                                    <React.Fragment key={index}>
                                        <div className={`UI1 ${styles.scrollerText}`}>

                                            <h1>User Interface &nbsp;</h1>
                                            <h1>User Interface &nbsp;</h1>
                                            <h1>User Interface &nbsp;</h1>
                                            <h1>User Interface &nbsp;</h1>

                                        </div>
                                        <div className={`UI2 ${styles.scrollerText}`}>
                                            <h1>User Interface &nbsp;</h1>
                                            <h1>User Interface &nbsp;</h1>
                                            <h1>User Interface &nbsp;</h1>
                                            <h1>User Interface &nbsp;</h1>
                                        </div>
                                    </React.Fragment>
                                ))}
                                <div className={styles.designContItemOverlayItem}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.detail} id="detail">
                    <div className={styles.detailCont} id="detailCont">
                        {/* <button className={styles.closeBtn} id="closeBtn">
                            <FaTimes size={'10px'} color="white" className={styles.closeBtnIcon}/>
                        </button> */}
                        <div className={styles.content} id="detailContent">
                            <div className={styles.title} id="detailTitle">Placeholder title</div>
                            
                            <div className={styles.detailDescription} id="detailDescription">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est
                                amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum
                                adipisci iste earum distinctio, fugit, quas ipsa impedit.
                            </div>
                        </div>
                        <div className={styles.detailClose}>Close</div>
                    </div>
                    <div className={styles.detailBG} id="detailBG"></div>
                </div>
                <div className={styles.designCard}></div>
                <MobileShader />
            </Curve>
        </motion.div>
    );
}

