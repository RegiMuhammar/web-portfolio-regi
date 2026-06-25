'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import GlowOrbs from './GlowOrbs';

// Hides website chrome (Navbar + GlowOrbs) on /studio routes
export default function SiteChrome() {
    const pathname = usePathname();

    if (pathname?.startsWith('/studio')) return null;

    return (
        <>
            <GlowOrbs />
            <Navbar />
        </>
    );
}
