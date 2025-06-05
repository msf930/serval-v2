"use client"

import ReactDOM from "react-dom";
import {useEffect} from "react";
import {useContext} from "react";
import {useRef} from "react";
import {gsap} from "gsap/dist/gsap";
import {Draggable} from "gsap/dist/Draggable";
import {InertiaPlugin} from "gsap/dist/InertiaPlugin";
import { useGSAP } from '@gsap/react';
import {useState} from "react";
import {Flip} from "gsap/dist/Flip";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import Image from "next/image";

import { FaArrowRight, FaArrowDown, FaTimes } from 'react-icons/fa';

import test from "@/../public/test.jpg";
import arapahoe from "@/../public/arapahoe.png";
import asb from "@/../public/asb.png";
import envision from "@/../public/envision.png";
import floworks from "@/../public/floworks.png";
import mtc from "@/../public/mtc.png";
import realm from "@/../public/realm.png";
import recess from "@/../public/recess.png";
import rizzazzle from "@/../public/rizzazzle.png";
import rmr from "@/../public/rmr.png";
import savvyb from "@/../public/savvyb.png";
import vpa from "@/../public/vpa.png";
import yusha from "@/../public/yusha.png";


gsap.registerPlugin(Draggable, InertiaPlugin, Flip, ScrollTrigger);

export default function Carousel() {


    useGSAP(() => {

        const
            flipItems = gsap.utils.toArray(".boxContent1"),
            details = document.querySelector('.detail'),
            detailsCont = document.querySelector('.detailCont'),
            detailContent = document.querySelector('.content'),
            detailImage = document.querySelector('.detailCont img'),
            detailTitle = document.querySelector('.detailCont .title'),
            detailSecondary = document.querySelector('.detailCont .secondary'),
            detailDescription = document.querySelector('.detailCont .description');


        let activeItem;
        function showDetails(flipItem) {
            if (activeItem) { // someone could click on an element behind the open details panel, in which case we should just close it.
                return hideDetails();
            }
            let onLoad = () => {
                document.querySelector(".detailCont").removeEventListener("click", showDetails);
                document.querySelector(".detailCont").addEventListener('wheel', (event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    // Handle the scroll (e.g., update child's position)
                    document.querySelector(".detailCont").scrollTop += event.deltaY;
                });
                gsap.set(details, {visibility: "hidden"}); // hide the details until we know where to put it
                // position the details on top of the item (scaled down)
                Flip.fit(
                    details,
                    flipItem,
                    {scale: true, fitChild: detailImage}

                );

                // record the state
                const state = Flip.getState(details);

                // set the final state
                gsap.set(details, {clearProps: true}); // wipe out all inline stuff so it's in the native state (not scaled)
                gsap.set(details, { visibility: "visible", overflow: "hidden"});
                gsap.set(detailsCont, {x: "50%", top: "0%", rotateY: 0, opacity: 1});

                Flip.from(state, {
                    duration: 0.5,
                    ease: "power2.inOut",
                    scale: true,
                    onComplete: () => gsap.set(details, {overflow: "auto"}) // to permit scrolling if necessary
                })
                    // Flip.from() returns a timeline, so add a tween to reveal the detail content. That way, if the flip gets interrupted and forced to completion & killed, this does too.
                    .to(detailContent, {yPercent: 0}, 0.2);

                // detailImage.removeEventListener("load", onLoad);
                document.querySelector('.closeBtn').addEventListener('click', hideDetails);
                document.querySelector('.detailBG').addEventListener('click', hideDetails);

            };

            // Change image and text
            const data = flipItem.dataset;
            // detailImage.addEventListener("load", onLoad);
            onLoad();
            detailImage.src = flipItem.querySelector('img').src;
            detailTitle.innerText = data.title;
            detailSecondary.innerText = data.secondary;
            detailDescription.innerText = data.text;

            // stagger-fade the items out from the one that was selected in a staggered way (and kill the tween of the selected item)
            // gsap.to(flipItems, {opacity: 0.3, stagger: { amount: 0.7, from: flipItems.indexOf(flipItem), grid: "auto"}}).kill(flipItem);
            // gsap.to(".app", {backgroundColor: "#888", duration: 1, delay: 0.3}); // fade out the background
            activeItem = flipItem;
        }
        function hideDetails() {
            document.querySelector('.detail').removeEventListener('click', hideDetails);
            gsap.set(details, {overflow: "hidden"});
            gsap.set(detailsCont, { rotateY: -20, opacity: 0});

            // record the current state of details
            const state = Flip.getState(details);

            // scale details down so that its detailImage fits exactly on top of activeItem
            Flip.fit(details, activeItem, {scale: true, fitChild: detailImage});

            // animate the other elements, like all fade all items back up to full opacity, slide the detailContent away, and tween the background color to white.
            const tl = gsap.timeline();
            tl.set(details, {overflow: "hidden"})
                .to(detailContent, {yPercent: -100})
                // .to(flipItems, {opacity: 1, stagger: {amount: 0.7, from: flipItems.indexOf(activeItem), grid: "auto"}})
                // .to(".app", {backgroundColor: "#fff"}, "<");

            // animate from the original state to the current one.
            Flip.from(state, {
                scale: true,
                duration: 0.5,
                delay: 0.2, // 0.2 seconds because we want the details to slide up first, then flip.
                onInterrupt: () => tl.kill()
            })
                .set(details, {visibility: "hidden"});
            activeItem = null;
        }

// Add click listeners
//             boxContentElement.addEventListener('click', showDetails(boxContentElement));
        gsap.utils.toArray('.boxContent1').forEach(flipItem => flipItem.addEventListener('click', () => showDetails(flipItem)));
//         const item1 = document.querySelector('.active .boxInner .boxContent1');
//         if(item1 !== null) {
//             item1.addEventListener('click', () => showDetails(item1));
//         }



// ---------------------------------------------------------------------------------------




// Intro animation
        window.addEventListener('load', () => {
            // gsap.to('.app', { autoAlpha: 1, duration: 0.2 });
            gsap.from('.item', {autoAlpha: 0, yPercent: 30, stagger: 0.04});
        });
        const wrapper = document.querySelector(".wrapper");

        const boxes = gsap.utils.toArray(".box1");
        const boxes2 = gsap.utils.toArray(".box2");
        // console.clear();


        let activeElement;
        const loop = verticalLoop(boxes, {
            paused: true,
            draggable: false, // make it draggable
            center: true, // the active element is the one in the center of the container rather than the left edge
            reverse: false,
            onChange: (element, index) => { // when the active element changes, this function gets called.
                activeElement && activeElement.classList.remove("active");
                element.classList.add("active");
                activeElement = element;
            }
        });
        const loop2 = verticalLoop(boxes2, {
            paused: true,
            draggable: false, // make it draggable
            center: true, // the active element is the one in the center of the container rather than the left edge
            reverse: true,
            onChange: (element, index) => { // when the active element changes, this function gets called.
                activeElement && activeElement.classList.remove("active");
                element.classList.add("active");
                activeElement = element;
            }
        });


        // boxes.forEach((box, i) => box.addEventListener("click", () => loop.toIndex(i, {duration: 0.8, ease: "power1.inOut"})));

        // document.querySelector(".toggle").addEventListener("click", () => wrapper.classList.toggle("show-overflow"));
        // document.querySelector(".next").addEventListener("click", () => loop.next({duration: 0.4, ease: "power1.inOut"}));
        // document.querySelector(".prev").addEventListener("click", () => loop.previous({duration: 0.4, ease: "power1.inOut"}));




        /*
        This helper function makes a group of elements animates along the x-axis in a seamless, responsive loop.

        Features:
         - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
         - When each item animates to the left or right enough, it will loop back to the other side
         - Optionally pass in a config object with values like draggable: true, center: true, speed (default: 1, which travels at roughly 100 pixels per second), paused (boolean), repeat, reversed, and paddingRight.
         - The returned timeline will have the following methods added to it:
           - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a var object to control duration, easing, etc.
           - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
           - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
           - current() - returns the current index (if an animation is in-progress, it reflects the final index)
           - times - an Array of the times on the timeline where each element hits the "starting" spot.
         */
        function verticalLoop(items, config) {
            let timeline;
            items = gsap.utils.toArray(items);
            config = config || {};
            gsap.context(() => { // use a context so that if this is called from within another context or a gsap.matchMedia(), we can perform proper cleanup like the "resize" event handler on the window
                let onChange = config.onChange,
                    reverse = config.reverse,
                    lastIndex = 0,
                    tl = gsap.timeline({repeat: config.repeat, onUpdate: onChange && function() {
                            let i = tl.closestIndex();
                            if (lastIndex !== i) {
                                lastIndex = i;
                                onChange(items[i], i);
                            }
                        }, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
                    length = items.length,
                    startY = items[0].offsetTop,
                    times = [],
                    heights = [],
                    spaceBefore = [],
                    yPercents = [],
                    curIndex = 0,
                    indexIsDirty = false,
                    center = config.center,
                    pixelsPerSecond = (config.speed || 1) * 100,
                    snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
                    timeOffset = 0,
                    container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode,
                    totalHeight,
                    getTotalHeight = () => items[length-1].offsetTop + yPercents[length-1] / 100 * heights[length-1] - startY + spaceBefore[0] + items[length-1].offsetHeight * gsap.getProperty(items[length-1], "scaleY") + (parseFloat(config.paddingBottom) || 0),
                    populateHeights = () => {
                        let b1 = container.getBoundingClientRect(), b2;
                        items.forEach((el, i) => {
                            heights[i] = parseFloat(gsap.getProperty(el, "height", "px"));
                            yPercents[i] = snap(parseFloat(gsap.getProperty(el, "y", "px")) / heights[i] * 100 + gsap.getProperty(el, "yPercent"));
                            b2 = el.getBoundingClientRect();
                            spaceBefore[i] = b2.top - (i ? b1.bottom : b1.top);
                            b1 = b2;
                        });
                        gsap.set(items, { // convert "x" to "yPercent" to make things responsive, and populate the heights/yPercents Arrays to make lookups faster.
                            yPercent: i => yPercents[i]
                        });
                        totalHeight = getTotalHeight();
                    },
                    timeWrap,
                    populateOffsets = () => {
                        timeOffset = center ? tl.duration() * (container.offsetHeight / 2) / totalHeight : 0;
                        center && times.forEach((t, i) => {
                            times[i] = timeWrap(tl.labels["label" + i] + tl.duration() * heights[i] / 2 / totalHeight - timeOffset);
                        });
                    },
                    getClosest = (values, value, wrap) => {
                        let i = values.length,
                            closest = 1e10,
                            index = 0, d;
                        while (i--) {
                            d = Math.abs(values[i] - value);
                            if (d > wrap / 2) {
                                d = wrap - d;
                            }
                            if (d < closest) {
                                closest = d;
                                index = i;
                            }
                        }
                        return index;
                    },
                    populateTimeline = () => {
                        let i, item, curX, distanceToStart, distanceToLoop;
                        tl.clear();
                        for (i = 0; i < length; i++) {
                            item = items[i];
                            curX = yPercents[i] / 100 * heights[i];
                            distanceToStart = item.offsetTop + curX - startY + spaceBefore[0];
                            distanceToLoop = distanceToStart + heights[i] * gsap.getProperty(item, "scaleY");
                            tl.to(item, {yPercent: snap((curX - distanceToLoop) / heights[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
                                .fromTo(item, {yPercent: snap((curX - distanceToLoop + totalHeight) / heights[i] * 100)}, {yPercent: yPercents[i], duration: (curX - distanceToLoop + totalHeight - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
                                .add("label" + i, distanceToStart / pixelsPerSecond);
                            times[i] = distanceToStart / pixelsPerSecond;
                        }
                        timeWrap = gsap.utils.wrap(0, tl.duration());
                    },
                    refresh = (deep) => {
                        let progress = tl.progress();
                        tl.progress(0, true);
                        populateHeights();
                        deep && populateTimeline();
                        populateOffsets();
                        deep && tl.draggable && tl.paused() ? tl.time(times[curIndex], true) : tl.progress(progress, true);
                    },
                    onResize = () => refresh(true),
                    proxy;
                gsap.set(items, {y: 0});
                populateHeights();
                populateTimeline();
                populateOffsets();
                window.addEventListener("resize", onResize);
                function toIndex(index, vars) {
                    vars = vars || {};
                    (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
                    let newIndex = gsap.utils.wrap(0, length, index),
                        time = times[newIndex];
                    if (time > tl.time() !== index > curIndex && index !== curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
                        time += tl.duration() * (index > curIndex ? 1 : -1);
                    }
                    if (time < 0 || time > tl.duration()) {
                        vars.modifiers = {time: timeWrap};
                    }
                    curIndex = newIndex;
                    vars.overwrite = true;
                    gsap.killTweensOf(proxy);
                    return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars);
                }
                tl.toIndex = (index, vars) => toIndex(index, vars);
                tl.closestIndex = setCurrent => {
                    let index = getClosest(times, tl.time(), tl.duration());
                    if (setCurrent) {
                        curIndex = index;
                        indexIsDirty = false;
                    }
                    return index;
                };
                tl.current = () => indexIsDirty ? tl.closestIndex(true) : curIndex;
                tl.next = vars => toIndex(tl.current()+1, vars);
                tl.previous = vars => toIndex(tl.current()-1, vars);
                tl.times = times;
                // tl.progress(1, true).progress(0, true); // pre-render for performance
                if (config.reversed) {
                    tl.vars.onReverseComplete();
                    tl.reverse();
                }
                if (config.draggable && typeof(Draggable) === "function") {
                    proxy = document.createElement("div")
                    let wrap = gsap.utils.wrap(0, 1),
                        ratio, startProgress, draggable, dragSnap, lastSnap, initChangeX, wasPlaying,
                        align = () => tl.progress(wrap(startProgress + (draggable.startY - draggable.y) * ratio)),
                        syncIndex = () => tl.closestIndex(true);
                    typeof(InertiaPlugin) === "undefined" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club");
                    draggable = Draggable.create(proxy, {
                        trigger: items[0].parentNode,
                        type: "y",
                        onPressInit() {
                            let y = this.y;
                            gsap.killTweensOf(tl);
                            wasPlaying = !tl.paused();
                            tl.pause();
                            startProgress = tl.progress();
                            refresh();
                            ratio = 1 / totalHeight;
                            initChangeX = (startProgress / -ratio) - y;
                            gsap.set(proxy, {y: startProgress / -ratio});
                        },
                        onDrag: align,
                        onThrowUpdate: align,
                        overshootTolerance: 0,
                        inertia: true,
                        snap(value) {
                            //note: if the user presses and releases in the middle of a throw, due to the sudden correction of proxy.x in the onPressInit(), the velocity could be very large, throwing off the snap.
                            // So sense that condition and adjust for it. We also need to set overshootTolerance to 0 to prevent the inertia from causing it to shoot past and come back
                            if (Math.abs(startProgress / -ratio - this.y) < 10) {
                                return lastSnap + initChangeX
                            }
                            let time = -(value * ratio) * tl.duration(),
                                wrappedTime = timeWrap(time),
                                snapTime = times[getClosest(times, wrappedTime, tl.duration())],
                                dif = snapTime - wrappedTime;
                            Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration());
                            lastSnap = (time + dif) / tl.duration() / -ratio;
                            return lastSnap;
                        },
                        onRelease() {
                            syncIndex();
                            draggable.isThrowing && (indexIsDirty = true);
                        },
                        onThrowComplete: () => {
                            syncIndex();
                            wasPlaying && tl.play();
                        }
                    })[0];
                    tl.draggable = draggable;
                }

                if(reverse) {
                    ScrollTrigger.create({
                        trigger: ".carouselCont",
                        start: "top top",
                        end: `${window.innerHeight * 10}`,
                        // end: "bottom top",
                        markers: false,
                        scrub: config.scrub || 1,
                        onUpdate: (self) => {
                            tl.progress(self.progress * -1.8 + 1);
                            // console.log(self.progress);
                        },
                    });
                } else {
                    ScrollTrigger.create({
                        trigger: ".carouselCont",
                        start: "top top",
                        end: `${window.innerHeight * 10}`,
                        // end: "bottom top",
                        markers: false,
                        scrub: config.scrub || 1,
                        onUpdate: (self) => {
                            tl.progress(self.progress * 1.8);
                            // console.log(self.progress);
                        },
                    });
                }

                    // tl.progress(webScroll)
                    // console.log(webScroll);

                // document.querySelector(".carouselCont").addEventListener("wheel", (event) => {
                //     // event.preventDefault();
                //     // event.stopPropagation();
                //     // const delta = Math.sign(event.deltaY);
                //     // if (delta > 0) {
                //     //     tl.next({duration: 0.4, ease: "power1.inOut"});
                //     // } else {
                //     //     tl.previous({duration: 0.4, ease: "power1.inOut"});
                //     // }
                // });

                tl.closestIndex(true);
                lastIndex = curIndex;
                onChange && onChange(items[curIndex], curIndex);
                timeline = tl;
                return () => window.removeEventListener("resize", onResize); // cleanup
            });
            return timeline;
        }
    }, []);
    return (
        <div>


        <div id="carouselCont" className="carouselCont">
            {/*<div className="button-cont">*/}
            {/*    <button className="prev"><FaArrowUp size={24} color="black" /></button>*/}
            {/*    /!*<button className="toggle">toggle overflow</button>*!/*/}
            {/*    <button className="next"><FaArrowDown size={24} color="black" /></button>*/}
            {/*</div>*/}

            <div className="wrapper">
                <div className="box1">
                        <FaArrowRight/>
                    <div className="boxInner">
                        <div className="boxContent1"

                             data-title="Owl"
                             data-secondary="Hoo are you?"
                             data-text="Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.">

                            <Image
                                src={arapahoe}
                                alt="test"
                                fill
                                className="boxContentImage"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <img
                                src="/arapahoe.png"
                                alt="test"
                            />

                        </div>
                    </div>
                </div>
                <div className="box1">
                    <FaArrowRight/>
                    <div className="boxInner">
                        <div className="boxContent1"

                             data-title="Owl"
                             data-secondary="Hoo are you?"
                             data-text="Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.">
                            <Image
                                src={asb}
                                alt="test"
                                fill
                                className="boxContentImage"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <img
                                src="/asb.png"
                                alt="test"
                            />
                        </div>
                    </div>
                </div>
                <div className="box1">
                    <FaArrowRight/>
                    <div className="boxInner">
                        <div className="boxContent1"

                             data-title="Owl"
                             data-secondary="Hoo are you?"
                             data-text="Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.">
                            <Image
                                src={envision}
                                alt="test"
                                fill
                                className="boxContentImage"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <img
                                src="/envision.png"
                                alt="test"
                            />
                        </div>
                    </div>
                </div>
                <div className="box1">
                    <FaArrowRight/>
                    <div className="boxInner">
                        <div className="boxContent1"

                             data-title="Owl"
                             data-secondary="Hoo are you?"
                             data-text="Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.">
                            <Image
                                src={floworks}
                                alt="test"
                                fill
                                className="boxContentImage"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <img
                                src="/floworks.png"
                                alt="test"
                            />
                        </div>
                    </div>
                </div>
                <div className="box1">
                    <FaArrowRight/>
                    <div className="boxInner">
                        <div className="boxContent1"

                             data-title="Owl"
                             data-secondary="Hoo are you?"
                             data-text="Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.">
                            <Image
                                src={mtc}
                                alt="test"
                                fill
                                className="boxContentImage"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <img
                                src="/mtc.png"
                                alt="test"
                            />
                        </div>
                    </div>
                </div>
                <div className="box1">
                    <FaArrowRight/>
                    <div className="boxInner">
                        <div className="boxContent1"

                             data-title="Owl"
                             data-secondary="Hoo are you?"
                             data-text="Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.">
                            <Image
                                src={realm}
                                alt="test"
                                fill
                                className="boxContentImage"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <img
                                src="/realm.png"
                                alt="test"
                            />
                        </div>
                    </div>
                </div>


            </div>
            <div className="wrapper2">
                <div className="box2">
                    <FaArrowRight/>
                    <div className="boxInner">
                        <div className="boxContent1"

                             data-title="Owl"
                             data-secondary="Hoo are you?"
                             data-text="Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.">
                            <Image
                                src={recess}
                                alt="test"
                                fill
                                className="boxContentImage"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <img
                                src="/recess.png"
                                alt="test"

                            />
                        </div>
                    </div>
                </div>
                <div className="box2">
                    <FaArrowRight/>
                    <div className="boxInner">
                        <div className="boxContent1"

                             data-title="Owl"
                             data-secondary="Hoo are you?"
                             data-text="Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.">
                            <Image
                                src={rizzazzle}
                                alt="test"
                                fill
                                className="boxContentImage"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <img
                                src="/rizzazzle.png"
                                alt="test"

                            />
                        </div>
                    </div>
                </div>
                <div className="box2">
                    <FaArrowRight/>
                    <div className="boxInner">
                        <div className="boxContent1"

                             data-title="Owl"
                             data-secondary="Hoo are you?"
                             data-text="Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.">
                            <Image
                                src={rmr}
                                alt="test"
                                fill
                                className="boxContentImage"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <img
                                src="/rmr.png"
                                alt="test"

                            />
                        </div>
                    </div>
                </div>
                <div className="box2">
                    <FaArrowRight/>
                    <div className="boxInner">
                        <div className="boxContent1"

                             data-title="Owl"
                             data-secondary="Hoo are you?"
                             data-text="Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.">
                            <Image
                                src={savvyb}
                                alt="test"
                                fill
                                className="boxContentImage"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <img
                                src="/savvyb.png"
                                alt="test"

                            />
                        </div>
                    </div>
                </div>
                <div className="box2">
                    <FaArrowRight/>
                    <div className="boxInner">
                        <div className="boxContent1"

                             data-title="Owl"
                             data-secondary="Hoo are you?"
                             data-text="Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.">
                            <Image
                                src={vpa}
                                alt="test"
                                fill
                                className="boxContentImage"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <img
                                src="/vpa.png"
                                alt="test"

                            />
                        </div>
                    </div>
                </div>
                <div className="box2">
                    <FaArrowRight/>
                    <div className="boxInner">
                        <div className="boxContent1"

                             data-title="Owl"
                             data-secondary="Hoo are you?"
                             data-text="Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.Owel lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus,
                             blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio,
                             fugit, quas ipsa impedit.">
                            <Image
                                src={yusha}
                                alt="test"
                                fill
                                className="boxContentImage"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <img
                                src="/yusha.png"
                                alt="test"

                            />
                        </div>
                    </div>
                </div>

            </div>


        </div>
            <div className="detail">

                <div className="detailCont">
                    <button className="closeBtn">
                        <FaTimes size={24} color="white" />
                    </button>
                    <img />
                    <div className="content">
                        <div className="title">Placeholder title</div>
                        <div className="secondary">Placeholder secondary</div>
                        <div className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est
                            amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum
                            adipisci iste earum distinctio, fugit, quas ipsa impedit.
                        </div>
                    </div>
                </div>
                <div className="detailBG"></div>
            </div>
        </div>
    )
}
