
import gsap from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import { useGSAP } from '@gsap/react';

import { Caveat, Instrument_Sans } from 'next/font/google';

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

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);
}
export default function App({ Component, pageProps }) {


  return (
    <main className={`${caveat.variable} ${instrumentSans.variable}`}>
      <Component {...pageProps} />;
    </main>
  )
}
