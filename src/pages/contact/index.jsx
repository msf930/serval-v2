'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import MobileNav from '@/components/MobileNav';
import Curve from '@/components/Layout/Curve';
import MobileShader from '@/components/MobileShader';
import { motion } from 'framer-motion'; 

export default function contact({pageRoute}) {
    const [innerHeight, setInnerHeight] = useState(0);
    
    useEffect(() => {
        
        setInnerHeight(window.innerHeight);
        
    }, []);
    
    return (
        <motion.div className={styles.mainCont} animate={true}  style={{ height: innerHeight ? innerHeight : "100vh" }}>
            <Curve backgroundColor="transparent" routeLabel={pageRoute}>

            <div className={styles.mobileMain}>
                
                <h1>Contact</h1>
            </div>
           
            </Curve>
        </motion.div>
    );
}

