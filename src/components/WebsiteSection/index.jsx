import {motion} from "motion/react";
import React, {useRef} from "react";

import styles from "./styles.module.css";

import gsap from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import { useGSAP } from '@gsap/react';

export default function WebsiteSection() {

    const main = useRef();
    const smoother = useRef();

    useEffect(
        () => {
            smoother.current = ScrollSmoother.create({
                smooth: 2,
                effects: true,
            });
            ScrollTrigger.create({
                trigger: '.box-c',
                pin: true,
                start: 'center center',
                end: '+=300',
                markers: true,
            });
        },
        {
            scope: main,
        }
    );
    return(
        <motion.div ref={main}  className={styles.stickyDiv}>
            <div className={styles.infoCont} data-speed="1.5">
                <div  className={styles.infoCard}>
                    <h1>Custom Built Websites</h1>
                </div>
                <div>

                </div>
            </div>
        </motion.div>
    )
}
