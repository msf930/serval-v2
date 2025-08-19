'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import MobileNav from '@/components/MobileNav';
import Curve from '@/components/Layout/Curve';
import MobileShader from '@/components/MobileShader';

export default function contact() {
    const router = useRouter();
    const currentUrl = router.asPath;
    
    return (
        <div className={styles.mainCont}>
        <Curve backgroundColor="black">

            <div className={styles.mobileMain}>
                
                <h1>Contact</h1>
            </div>
            {/* <MobileShader 
                    bg1b={0.1} 
                    bg1={0.7} 
                    bg2b={0.1} 
                    bg2={0.7} 
                    bg3b={0.1} 
                    bg3={0.7}
                /> */}
        </Curve>
        </div>
    );
}

