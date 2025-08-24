

import gsap from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import { useGSAP } from '@gsap/react';
import { AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react';

import { Caveat, Instrument_Sans, Protest_Strike, Anta, Baumans, Fugaz_One } from 'next/font/google';

import '@/styles/globals.css';
import '@/styles/styles.scss';
import Link from 'next/link';
import MobileNav from '@/components/MobileNav';


const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-caveat',
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-instrument-sans',
});

const protestGuerrilla = Protest_Strike({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-protest-guerrilla',
});

const anta = Anta({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-anta',
});

const baumans = Baumans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-baumans',
});

const fugazOne = Fugaz_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-fugazOne',
});

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);
}
export default function App({ Component, pageProps, router }) {


  const [pageRoute, setPageRoute] = useState("");
  const [keyRoute, setKeyRoute] = useState("");


  const routePropCurve = (href) => {
    // console.log(href);
    setPageRoute(href);

    setKeyRoute(href);

    setTimeout(() => {
      router.push(href);
    }, 750);
  }
  // router.push(href);


  return (
    <div className={`
        ${caveat.variable} 
        ${instrumentSans.variable} 
        ${protestGuerrilla.variable} 
        ${anta.variable}
        ${baumans.variable}
        ${fugazOne.variable}
        main
    `}>
      <MobileNav currentUrl={router.route} routeProp={routePropCurve} />
      <AnimatePresence
        mode="wait"
      // onExitComplete={() => { }}
      // initial={false}
      // presenceAffectsLayout={false}
      // key={router.asPath}
      >
        <Component key={keyRoute} {...pageProps} pageRoute={pageRoute} />
      </AnimatePresence>
    </div>
  )
}
