
import gsap from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import { useGSAP } from '@gsap/react';

import { Caveat, Instrument_Sans, Protest_Strike, Anta, Baumans, Fugaz_One } from 'next/font/google';

import '../styles/globals.css';

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
export default function App({ Component, pageProps }) {


  return (
    <main className={`
        ${caveat.variable} 
        ${instrumentSans.variable} 
        ${protestGuerrilla.variable} 
        ${anta.variable}
        ${baumans.variable}
        ${fugazOne.variable}
    `}>
      <Component {...pageProps} />;
    </main>
  )
}
