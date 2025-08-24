'use client';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';

const MobileNav = ({ currentUrl, routeProp = () => {} }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [line1, setLine1] = useState("");
    const [line2, setLine2] = useState("");
    const [line3, setLine3] = useState("");
    const [lineLoaded, setLineLoaded] = useState(false);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const router = useRouter();
    useEffect(() => {
        
        const pageArr = ['/', '/web', '/design', '/seo', '/contact'];
        if (pageArr.includes(currentUrl)) {
            setCurrentPageIndex(pageArr.indexOf(currentUrl));
        }
        document.documentElement.style.setProperty('--line-transition', `0ms`);
        setTimeout(() => {
            document.documentElement.style.setProperty('--line-transition', `600ms`);
        }, 10);
    }, [currentUrl]);

    useEffect(() => {
        document.documentElement.style.setProperty('--line-transition', `0ms`);
        setTimeout(() => {
            document.documentElement.style.setProperty('--line-transition', `600ms`);
        }, 200);
    }, []);

    useEffect(() => {
        const calculateLine1 = () => {
            const vWidth = window.innerWidth;
            
            const vw = vWidth - 100;
            const lh = 150 + 30 + (currentPageIndex * 62);
            
            // Set SVG path data
            setLine1(`M ${vw + 20},29.000046 H ${vw + 80.000231} C ${vw + 80.000231},29.000046 ${vw + 94.498839},28.817352 ${vw + 94.532987},66.711331 ${vw + 94.543142},77.980673 ${vw + 90.966081},81.670246 ${vw + 85.259173},81.668997 ${vw + 79.552261},81.667751 ${vw + 75.000211},74.999942 ${vw + 75.000211},74.999942 L ${vw + 25.000021},25.000058`);
            setLine2(`M ${vw + 80},50 H ${vw + 20} C ${vw + 0},50 ${vw + 0},50 ${vw + 0},70 V ${lh} C ${vw + 0},${lh + 20} ${vw + 0},${lh + 20} ${vw -20},${lh + 20} H 120`);
            setLine3(`M ${vw + 20},70.999954 H ${vw + 80.000231} C ${vw + 80.000231},70.999954 ${vw + 94.498839},71.182648 ${vw + 94.532987},33.288669 ${vw + 94.543142},22.019327 ${vw + 90.966081},18.329754 ${vw + 85.259173},18.331003 ${vw + 79.552261},18.332249 ${vw + 75.000211},25.000058 ${vw + 75.000211},25.000058 L ${vw + 25.000021},74.999942`);
            setLineLoaded(true);
            // Update CSS custom properties
            
        };

        calculateLine1();
        // window.addEventListener('resize', calculateLine1);

        // return () => window.removeEventListener('resize', calculateLine1);
    }, [currentPageIndex]);

    useEffect(() => {
        if (lineLoaded) {
            const line2Element = document.getElementById('line2');
                if (line2Element) {
                    document.documentElement.style.setProperty('--line2-length', `${line2Element.getTotalLength()}`);
                    document.documentElement.style.setProperty('--line2-offset', `${window.innerWidth - 220}`);
                    
                }
            
            
        }
    }, [lineLoaded, currentPageIndex, line2]);

    const toggleMenu = (href = null) => {
        if (href && currentUrl !== href) {
            if(currentUrl === undefined && href === '/') {
                setIsOpen(false);
            } else {
            // Close menu first
            setIsOpen(false);
            
            // Wait for menu close animation, then navigate
            // setTimeout(() => {
                // console.log(href);
                routeProp(href);
                // router.push(href);
                // }, 1000);
            }
        
        } else {
            // Just toggle menu if no href provided
            setIsOpen(!isOpen);
        }
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className={styles.mobileNav}>
            {/* Mobile Navigation Header */}
           

            {/* Mobile Menu Overlay */}
            <div className={`${styles.menuOverlay} ${isOpen ? styles.open : ''}`}>
                <div className={styles.menuButton} onClick={() => toggleMenu(null)}></div>
                <button
                    className={`${styles.menu} ${isOpen ? styles.opened : ''}`}
                    // onClick={toggleMenu}
                    aria-label="Main Menu"
                >

                    <svg width="100vw" height="100vh" viewBox="0 0 100vw 100vh" className={styles.menuIcon}>
                        {/* <path className={`${styles.line} ${styles.line1}`} d={`M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058`} /> */}
                        <path className={`${styles.line} ${styles.line1}`} d={line1} />
                        {/* <path className={`${styles.line} ${styles.line2}`} d="M 80 50 H 20 C 0 50 0 50 0 70 V 400 C 0 420 0 420 -20 420 H -80" /> */}
                        <path className={`${styles.line} ${styles.line2}`} d={line2} id="line2" />
                        {/* <path className={`${styles.line} ${styles.line3}`} d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" /> */}
                        <path className={`${styles.line} ${styles.line3}`} d={line3} />
                    </svg>
                </button>
                <div className={styles.menuContent} style={{display: isOpen ? 'block' : 'none'}}>
                    {/* Navigation Links */}
                    <ul className={styles.navLinks}>
                        <li>
                            <a onClick={() => toggleMenu('/')}>
                                HOME
                            </a>
                        </li>
                        <li>
                            <a onClick={() => toggleMenu('/web')}>
                                WEB
                            </a>
                        </li>
                        <li>
                            <a onClick={() => toggleMenu('/design')}>
                                DESIGN
                            </a>
                        </li>
                        <li>
                            <a  onClick={() => toggleMenu('/seo')}>
                                SEO
                            </a>
                        </li>
                        <li>
                            <a  onClick={() => toggleMenu('/contact')}>
                                CONTACT
                            </a>
                        </li>
                    </ul>

                    {/* Contact Info */}
                    <div className={styles.contactInfo}>
                        <p>info@servaldesigns.com</p>
                    </div>
                </div>
                <div className={`${styles.menuOverlayBG} ${isOpen ? styles.open : ''}`}></div>
            </div>
        </nav>
    );
};

export default MobileNav;
