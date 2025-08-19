'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import MobileNav from '@/components/MobileNav';
import Curve from '@/components/Layout/Curve';
import MobileShader from '@/components/MobileShader';


export default function design() {
    

    return (
        <div className={styles.mainCont}>
            <Curve backgroundColor="black">
                <div className={styles.mobileMain}>
                    {/* <MobileNav currentUrl={currentUrl} routeProp={routePropCurve} /> */}
                    <h1>Design</h1>
                </div>
                {/* <MobileShader 
                    bg1b={0.2} 
                    bg1={0.8} 
                    bg2b={0.4} 
                    bg2={0.6} 
                    bg3b={0.1} 
                    bg3={0.6}
                /> */}
            </Curve>
        </div>
    );
}

