import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="hero">
            <Image
                className="hero-bg"
                src="/bg-hero-sec.webp"
                alt="Regi Muhammar Background"
                fill
                priority
                style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            <Image
                className="hero-subject"
                src="/subject-hero-sec.webp"
                alt="Regi Muhammar"
                fill
                priority
                style={{ objectFit: 'contain', objectPosition: 'center' }}
            />
            <div className="hero-glow"></div>
            <div className="hero-glow2"></div>
            <div className="hero-glow3"></div>

            <div className="hero-content">
                <div className="hero-content-left">
                    <h1 id="hero-title" className="hero-headline">
                        Regi is turning raw data into intelligent products that drive real decisions
                    </h1>
                </div>
                <div className="hero-content-right">
                    <p className="hero-description">
                        As an analytics engineer with deep expertise in data pipelines, business intelligence, and AI-powered automation, he builds scalable solutions that bridge the gap between complex data systems and meaningful business outcomes.
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
            <Image
                className="hero-subject-mobile"
                src="/subject-hero-sec.webp"
                alt="Regi Muhammar"
                width={760}
                height={940}
                priority
            />
        </section>
    );
}
