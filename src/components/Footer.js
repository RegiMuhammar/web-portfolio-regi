import { Github, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="site-footer">
            {/* Gradient Line Top with Glow */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '0.0625rem', background: 'linear-gradient(90deg, transparent 0%, var(--orange) 50%, transparent 100%)' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '12.5rem', height: '0.0625rem', boxShadow: '0 0 1.5rem 0.25rem var(--orange)', background: 'var(--orange-light)', borderRadius: '50%' }}></div>
            </div>

            <div className="footer-main" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '75rem', margin: '0 auto', flexWrap: 'wrap', gap: '2.5rem' }}>
                <div className="footer-brand" style={{ maxWidth: '31.25rem' }}>
                    <h2 className="footer-word gradient-text-white" style={{ fontSize: '2.5rem', fontFamily: 'Bebas Neue, sans-serif', marginBottom: '1rem', letterSpacing: '0.0625rem' }}>
                        Regi Muhammar
                    </h2>
                    <p style={{ color: 'var(--light-gray)', fontSize: '0.9375rem', lineHeight: '1.7' }}>
                        Data analytics, AI engineering, and automation systems for teams
                        that need better decisions from complex data.
                    </p>
                </div>
            </div>

            <div style={{ width: '100%', maxWidth: '75rem', margin: '0.5rem auto', height: '0.0625rem', background: 'rgba(255,255,255,0.06)' }}></div>

            <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '75rem', margin: '0 auto', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div className="footer-socials">
                    <a
                        className="footer-social"
                        href="https://github.com/RegiMuhammar"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub"
                    >
                        <Github size={20} strokeWidth={1.5} />
                    </a>
                    <a
                        className="footer-social"
                        href="https://www.linkedin.com/in/regimuhammar"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn"
                    >
                        <Linkedin size={20} strokeWidth={1.5} />
                    </a>
                    <a
                        className="footer-social"
                        href="https://www.instagram.com/regimuhammar"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Instagram"
                    >
                        <Instagram size={20} strokeWidth={1.5} />
                    </a>
                </div>
                <div className="footer-copy">©Copyright 2026. regimuhammar@gmail.com.</div>
            </div>
        </footer>
    );
}
