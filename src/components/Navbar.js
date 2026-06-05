'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    return (
        <nav id="navbar" className="site-nav">
            <Link href="/" className="nav-logo">
                <span className="nav-logo-text">Regi Muhammar</span>
            </Link>
            <ul className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
                {navItems.map((item) => (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            data-page={item.href.replace('/', '') || 'home'}
                            className={pathname === item.href ? 'active' : ''}
                            onClick={() => setMobileOpen(false)}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <Link href="/contact" className="nav-cta gradient-button">
                Discuss a Project
            </Link>
            <button
                type="button"
                className={`hamburger ${mobileOpen ? 'active' : ''}`}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation"
                aria-expanded={mobileOpen}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>
    );
}
