import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';

const footerLinks = [
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
];

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-topline"></div>
            <div className="footer-main">
                <div className="footer-brand">
                    <img src="/logo_regi.webp" alt="RegiMR" className="footer-logo-img" />
                    <p>
                        Data analytics, AI engineering, and automation systems for teams
                        that need better decisions from complex data.
                    </p>
                </div>
                <nav className="footer-nav" aria-label="Footer navigation">
                    {footerLinks.map((item) => (
                        <Link key={item.href} href={item.href}>
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="footer-socials">
                    <a
                        className="footer-social"
                        href="https://www.linkedin.com/in/regimuhammar/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn"
                    >
                        <Linkedin size={17} />
                    </a>
                    <a
                        className="footer-social"
                        href="https://github.com/regimuhammar"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub"
                    >
                        <Github size={17} />
                    </a>
                    <Link className="footer-social" href="/contact" title="Contact">
                        <Mail size={17} />
                    </Link>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-word gradient-text-white">Regi Muhammar</div>
                <div className="footer-copy">Copyright 2026. Data Analytics &amp; Engineering.</div>
            </div>
        </footer>
    );
}
