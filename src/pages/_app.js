import { useState, useEffect } from 'react';
import Router from 'next/router';
import Loading from '../components/Loading';
import gsap from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import { useGSAP } from '@gsap/react';

import '../styles/globals.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);
}
export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = Router;

  useEffect(() => {
    const handleStart = (url) => {
      if (url !== router.asPath) setLoading(true);
    };
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <>
        {/*{loading && (*/}
        {/*    <div className="inset-0 flex items-center justify-center bg-white z-[10000] h-[100vh] w-full">*/}
        {/*    <Loading />*/}
        {/*    </div>*/}
        {/*)}*/}
      <Component {...pageProps} />;
    </>
  )
}
