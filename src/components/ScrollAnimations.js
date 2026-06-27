'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollAnimations() {
    const pathname = usePathname();

    useEffect(() => {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // A context keeps track of all animations created during its execution
        // and makes it easy to revert/clean them up at once.
        const ctx = gsap.context(() => {
            // Kill existing scroll triggers to prevent duplicates
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());

            // --- 1. Roles Grid Animation ---
            const roleCards = gsap.utils.toArray('.roles-bar .role-card');
            if (roleCards.length > 0) {
                gsap.fromTo(roleCards,
                    { y: 30, opacity: 0, visibility: 'hidden' },
                    {
                        y: 0,
                        opacity: 1,
                        visibility: 'visible',
                        duration: 0.6,
                        stagger: 0.05,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: '.roles-bar',
                            start: 'top 88%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }

            // --- 2. Ticker Section Animation ---
            const ticker = document.querySelector('.ticker-section');
            if (ticker) {
                gsap.fromTo(ticker,
                    { y: 15, opacity: 0, visibility: 'hidden' },
                    {
                        y: 0,
                        opacity: 1,
                        visibility: 'visible',
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: '.ticker-section',
                            start: 'top 92%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }

            // --- 3. Featured Header Animation ---
            const featuredHeader = document.querySelector('.featured-header');
            if (featuredHeader) {
                gsap.fromTo(featuredHeader,
                    { y: 30, opacity: 0, visibility: 'hidden' },
                    {
                        y: 0,
                        opacity: 1,
                        visibility: 'visible',
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: '.featured-section',
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }

            // --- 4. Featured Project Cards Animation ---
            const projectCards = gsap.utils.toArray('.featured-card');
            projectCards.forEach((card) => {
                gsap.fromTo(card,
                    { y: 50, opacity: 0, visibility: 'hidden' },
                    {
                        y: 0,
                        opacity: 1,
                        visibility: 'visible',
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            });

            // --- 5. Bento Grid Header Animation ---
            const bentoHeader = document.querySelector('.clean-grid-header');
            if (bentoHeader) {
                gsap.fromTo(bentoHeader,
                    { y: 30, opacity: 0, visibility: 'hidden' },
                    {
                        y: 0,
                        opacity: 1,
                        visibility: 'visible',
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: bentoHeader,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }

            // --- 6. Bento Grid Cards Animation ---
            const bentoCards = gsap.utils.toArray('.clean-card');
            if (bentoCards.length > 0) {
                gsap.fromTo(bentoCards,
                    { y: 40, opacity: 0, visibility: 'hidden' },
                    {
                        y: 0,
                        opacity: 1,
                        visibility: 'visible',
                        duration: 0.8,
                        stagger: {
                            grid: [3, 2],
                            from: 'left',
                            amount: 0.4
                        },
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: '.clean-grid',
                            start: 'top 82%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }

            // --- 7. Tools & Tech Section Animation ---
            const techHeader = document.querySelector('.section-header');
            if (techHeader && techHeader.closest('.section')) {
                const parentSection = techHeader.closest('.section');
                if (parentSection.querySelector('.tech-grid')) {
                    gsap.fromTo(techHeader,
                        { y: 30, opacity: 0, visibility: 'hidden' },
                        {
                            y: 0,
                            opacity: 1,
                            visibility: 'visible',
                            duration: 0.8,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: parentSection,
                                start: 'top 85%',
                                toggleActions: 'play none none none'
                            }
                        }
                    );
                }
            }

            const techItems = gsap.utils.toArray('.tech-item');
            if (techItems.length > 0) {
                gsap.fromTo(techItems,
                    { scale: 0.8, opacity: 0, visibility: 'hidden' },
                    {
                        scale: 1,
                        opacity: 1,
                        visibility: 'visible',
                        duration: 0.5,
                        stagger: {
                            grid: 'auto',
                            from: 'center',
                            amount: 0.5
                        },
                        ease: 'back.out(1.2)',
                        scrollTrigger: {
                            trigger: '.tech-grid',
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }

            // --- 8. CTA Banner Animation ---
            const ctaBanner = document.querySelector('.cta-banner');
            if (ctaBanner) {
                gsap.fromTo(ctaBanner,
                    { y: 55, opacity: 0, visibility: 'hidden' },
                    {
                        y: 0,
                        opacity: 1,
                        visibility: 'visible',
                        duration: 1.0,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: '.cta-banner',
                            start: 'top 88%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }
        });

        // Clean up context on unmount or pathname changes
        return () => {
            ctx.revert();
        };
    }, [pathname]);

    return null;
}
