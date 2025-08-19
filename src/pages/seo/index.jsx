'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import MobileNav from '@/components/MobileNav';
import Curve from '@/components/Layout/Curve';
import MobileShader from '@/components/MobileShader';

export default function seo() {
    const router = useRouter();
    const currentUrl = router.asPath;

    return (
        <div className={styles.mainCont}>
        <Curve backgroundColor="black">

            <div className={styles.mobileMain}>
                
                <h1>SEO</h1>
            </div>
            {/* <MobileShader 
                    bg1b={0.2} 
                    bg1={0.8} 
                    bg2b={0.2} 
                    bg2={0.5} 
                    bg3b={0.0} 
                    bg3={0.7}
                /> */}
        </Curve>
        </div>
    );
}

