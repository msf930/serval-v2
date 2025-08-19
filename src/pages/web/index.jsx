'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import MobileNav from '@/components/MobileNav';
import Curve from '@/components/Layout/Curve'
import MobileShader from '@/components/MobileShader';


export default function Web() {

    const [innerHeight, setInnerHeight] = useState(0);
    useEffect(() => {
        setInnerHeight(window.innerHeight);
    }, []);

    return (


        <Curve backgroundColor="transparent">
            <div className={styles.mainCont} style={{ height: innerHeight }}>
                <div className={styles.mobileMain}>

                    <h1>Web</h1>

                </div>
                {/* <MobileShader 
                    bg1b={0.0} 
                    bg1={0.0} 
                    bg2b={0.0} 
                    bg2={0.7} 
                    bg3b={0.3} 
                    bg3={0.8}
                /> */}
            </div>
        </Curve>
    );
}


