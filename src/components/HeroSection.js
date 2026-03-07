import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="hero">
            {/* Full-bleed photo background */}
            <Image
                className="hero-photo"
                src="/regi_profile_3.webp"
                alt="Regi Muhammar"
                fill
                priority
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
            {/* Gradient overlays */}
            <div className="hero-glow"></div>
            <div className="hero-glow2"></div>
            <div className="hero-glow3"></div>

            {/* Main content — title left · tagline right */}
            <div className="hero-content">
                <div className="hero-content-left">
                    <p className="hero-eyebrow">Hey, I&apos;m a</p>
                    <h1 id="hero-title">
                        Data
                        <br />
                        Analytics &amp;
                        <br />
                        Engineer
                    </h1>
                    <div className="hero-cta-wrap">
                        <Link href="/portfolio" className="btn-primary">
                            View Work
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
                        <Link href="/contact" className="btn-ghost">
                            Let&apos;s Talk →
                        </Link>
                    </div>
                </div>
                <div className="hero-content-right">
                    <p className="hero-tagline">
                        Great data should
                        <br />
                        <span>feel actionable.</span>
                    </p>
                    <p className="hero-sub">
                        From AI pipelines to executive dashboards — I build data systems that
                        connect insights to real business outcomes.
                    </p>
                    <div className="hero-stats">
                        <div className="stat">
                            <div className="stat-num">
                                50<span>+</span>
                            </div>
                            <div className="stat-label">Dashboards</div>
                        </div>
                        <div className="stat">
                            <div className="stat-num">
                                80<span>%</span>
                            </div>
                            <div className="stat-label">Efficiency Gain</div>
                        </div>
                        <div className="stat">
                            <div className="stat-num">
                                2<span>+</span>
                            </div>
                            <div className="stat-label">Yrs Experience</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar — service categories */}
            <div className="hero-bottom-bar">
                {[
                    { num: '#01', name: 'Data Analytics & BI' },
                    { num: '#02', name: 'Machine Learning & AI' },
                    { num: '#03', name: 'Data Engineering' },
                    { num: '#04', name: 'LLM & RAG Systems' },
                ].map((service) => (
                    <Link
                        key={service.num}
                        href="/services"
                        className="hero-service-item"
                    >
                        <div className="hero-service-num">{service.num}</div>
                        <div className="hero-service-name">{service.name}</div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
