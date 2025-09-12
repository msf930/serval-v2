'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import Curve from '@/components/Layout/Curve'
import { motion } from 'motion/react';
import { AnimatePresence, cubicBezier } from 'motion/react';

import GameCards from '../../components/WebCards';
import MobileShader from '@/components/MobileShader';


export default function Web({ pageRoute }) {

    const [innerHeight, setInnerHeight] = useState(0);

    useEffect(() => {

        setInnerHeight(window.innerHeight);
    }, []);



    const gameScreenVariants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: { duration: 2, ease: cubicBezier(0.16, 1, 0.3, 1) },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.2, ease: cubicBezier(0.7, 0, 0.84, 0) },
        },
    };

    return (

        <>

            <motion.div className={styles.mainCont} animate={true} style={{ height: innerHeight ? innerHeight : "100dvh" }}>
                <Curve backgroundColor="transparent" routeLabel={pageRoute}>
                    <div className={styles.mobileMain}>
                        <GameCards />
                    </div>
                    <MobileShader />
                </Curve>
            </motion.div>
        </>
    );
}


