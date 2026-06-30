'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const heroRef = useRef(null);
    const bigNameRef = useRef(null);
    const nameGlowRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // --- 1. Entry / Load Animations ---

            // Available badge (slide down + fade)
            gsap.fromTo('.hero-available-badge', 
                { y: -30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
            );

            // Headline (slide up + fade)
            gsap.fromTo('.hero-headline',
                { y: 35, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.35 }
            );

            // Description (slide up + fade)
            gsap.fromTo('.hero-description',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 }
            );

            // CTA Button (slide up + fade)
            gsap.fromTo('.hero-cta-wrap',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.6 }
            );

            // Background name 'REGI MUHAMMAR' (fade + slide from left to right)
            gsap.fromTo('.hero-big-name span',
                { x: -100 },
                { x: 0, duration: 1.2, ease: 'power3.out', delay: 0.4 }
            );
            gsap.fromTo('.hero-big-name .name-default',
                { opacity: 0 },
                { opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.4 }
            );

            // Desktop static subject (fade + zoom in slightly)
            gsap.fromTo('.hero-subject',
                { scale: 0.9, opacity: 0 },
                { scale: 0.95, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
            );

            // Mobile subject load animation
            gsap.fromTo('.hero-subject-mobile',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.6 }
            );

            // --- 2. Parallax Scroll Animation (Desktop only) ---
            if (window.innerWidth > 700) {
                gsap.to('.hero-subject', {
                    yPercent: 12,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.hero',
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            }
        }, heroRef);

        // --- 3. Interactive Hover Light Gradient for Name ---
        const nameContainer = bigNameRef.current;
        const nameGlow = nameGlowRef.current;

        let onNameMouseEnter, onNameMouseMove, onNameMouseLeave;

        if (nameContainer && nameGlow) {
            onNameMouseEnter = () => {
                gsap.to(nameGlow, { opacity: 1, duration: 0.4, ease: 'power2.out' });
            };

            onNameMouseMove = (e) => {
                const bounds = nameContainer.getBoundingClientRect();
                const x = e.clientX - bounds.left;
                const y = e.clientY - bounds.top;

                // Move radial gradient shine using CSS Variables (prevents background-clip overrides)
                gsap.to(nameGlow, {
                    '--mouse-x': `${x}px`,
                    '--mouse-y': `${y}px`,
                    duration: 0.1,
                    overwrite: 'auto'
                });
            };

            onNameMouseLeave = () => {
                gsap.to(nameGlow, { opacity: 0, duration: 0.5, ease: 'power2.out' });
            };

            nameContainer.addEventListener('mouseenter', onNameMouseEnter);
            nameContainer.addEventListener('mousemove', onNameMouseMove);
            nameContainer.addEventListener('mouseleave', onNameMouseLeave);
        }

        return () => {
            ctx.revert();
            if (nameContainer) {
                nameContainer.removeEventListener('mouseenter', onNameMouseEnter);
                nameContainer.removeEventListener('mousemove', onNameMouseMove);
                nameContainer.removeEventListener('mouseleave', onNameMouseLeave);
            }
        };
    }, []);

    return (
        <section ref={heroRef} className="hero">
            <Image
                className="hero-bg"
                src="/bg-hero-sec.webp"
                alt="Regi Muhammar Background"
                fill
                priority
                style={{ objectFit: 'cover', objectPosition: 'center' }}
            />

            {/* Restored standard desktop static portrait */}
            <Image
                className="hero-subject"
                src="/subject-hero-sec.webp"
                alt="Regi Muhammar"
                fill
                priority
                style={{ objectFit: 'contain', objectPosition: 'center', opacity: 0 }}
            />

            <div className="hero-glow"></div>
            <div className="hero-glow2"></div>
            <div className="hero-glow3"></div>

            <div className="hero-content">
                <div className="hero-content-left">
                    <span className="hero-available-badge">
                        <span className="hero-available-dot"></span>
                        Available for Work
                    </span>
                    <h3 id="hero-title" className="hero-headline">
                        Analytics Engineer and BI <br /> based in Pekanbaru, Indonesia
                    </h3>
                </div>
                <div className="hero-content-right">
                    <p className="hero-description">
                        Hi, I am Regi Muhammar – a Data Analyst, Automation and AI Developer with 2 years experience, building data system and architecture, drive business decision through data and empower AI and automation to enhance productivity.
                    </p>
                    <div className="hero-cta-wrap">
                        <Link href="/portfolio" className="btn-gradient-pill">
                            <span>View Work</span>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Overlapping name layout for mouse-glowing light text */}
            <div ref={bigNameRef} className="hero-big-name">
                <span className="name-default">REGI MUHAMMAR</span>
                <span ref={nameGlowRef} className="name-glow">REGI MUHAMMAR</span>
            </div>

            <Image
                className="hero-subject-mobile"
                src="/subject-hero-sec.webp"
                alt="Regi Muhammar"
                width={500}
                height={618}
                priority
                quality={90}
                style={{ opacity: 0 }}
            />
        </section>
    );
}
