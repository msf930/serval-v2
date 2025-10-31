'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import MobileNav from '@/components/MobileNav';
import Curve from '@/components/Layout/Curve';
import MobileShader from '@/components/MobileShader';
import { motion } from 'motion/react';
import { AnimatePresence, cubicBezier } from 'motion/react';

export default function contact({ pageRoute }) {
    const [innerHeight, setInnerHeight] = useState(0);

    useEffect(() => {

        setInnerHeight(window.innerHeight);

    }, []);
    const [result, setResult] = React.useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "28bf711e-7ad3-41c0-8a51-b96b7d51ddfc");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return (
        <motion.div className={styles.mainCont} animate={true} style={{ height: innerHeight ? innerHeight : "100vh" }}>
            <Curve backgroundColor="transparent" routeLabel={pageRoute}>

                <div className={styles.mobileMain}>

                    <div className={styles.contactFormCont}>
                        <form onSubmit={onSubmit} className={styles.contactForm}>
                            {/* <input type="hidden" name="access_key" value="28bf711e-7ad3-41c0-8a51-b96b7d51ddfc" /> */}
                            <h1>Work With Us</h1>
                            <div className={styles.contactFormNameCont}>
                                <div className={styles.contactFormInputCont} onClick={(e) => {
                                    e.stopPropagation();
                                    const input = e.currentTarget.querySelector('input');
                                    if (input) input.focus();
                                }}>
                                    <h3>First Name</h3>
                                    <input type="text" name="nameFirst" required />
                                </div>
                                <div className={styles.contactFormInputCont} onClick={(e) => {
                                    e.stopPropagation();
                                    const input = e.currentTarget.querySelector('input');
                                    if (input) input.focus();
                                }}>
                                    <h3>Last Name</h3>
                                    <input type="text" name="nameLast" required />
                                </div>
                            </div>
                            <div className={styles.contactFormInputCont} onClick={(e) => {
                                e.stopPropagation();
                                const input = e.currentTarget.querySelector('input');
                                if (input) input.focus();
                            }}>
                                <h3>Email</h3>
                                <input type="email" name="email" required />
                            </div>
                                <div className={styles.contactFormInputCont} onClick={(e) => {
                                e.stopPropagation();
                                const input = e.currentTarget.querySelector('input');
                                if (input) input.focus();
                            }}>
                                <h3>Phone</h3>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '');
                                        let formattedValue = '';

                                        if (value.length > 0) {
                                            if (value.length <= 3) {
                                                formattedValue = `(${value}`;
                                            } else if (value.length <= 6) {
                                                formattedValue = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                                            } else {
                                                formattedValue = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                                            }
                                        }

                                        e.target.value = formattedValue;
                                    }}

                                />
                            </div>
                            <div className={styles.contactFormInputCont} onClick={(e) => {
                                e.stopPropagation();
                                const textarea = e.currentTarget.querySelector('textarea');
                                if (textarea) textarea.focus();
                            }}>
                                <h3>Message</h3>
                                <textarea name="message" required />
                            </div>
                            {/* <input type="hidden" name="redirect" value="https://web3forms.com/success" /> */}
                            <button className={styles.contactFormButton} type="submit">Submit Form</button>
                            {result && <p>{result}</p>}
                        </form>

                    </div>
                </div>
                <MobileShader />
            </Curve>
        </motion.div>
    );
}

