// About Page — Server Component, data fetched from Sanity
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { getAbout, urlFor } from '@/lib/sanity';
import Footer from '@/components/Footer';

// Fallback hardcoded data (used when Sanity has no About document yet)
const FALLBACK_HIGHLIGHTS = [
    { number: '50', suffix: '+', label: 'Dashboard Pages Built' },
    { number: '80', suffix: '%', label: 'Reporting Efficiency Gained' },
    { number: '3.86', suffix: '', label: 'GPA / 4.00 — Top 10% Bangkit' },
    { number: '3', suffix: 'rd', label: 'Place GEMASTIK 2025 National' },
];

const FALLBACK_TIMELINE = [
    {
        period: 'Sep 2024 — Feb 2026',
        role: 'Data Analyst & Automation Engineer',
        company: 'Narasio Data — Surabaya, Indonesia',
        description: 'Built 50+ dashboard pages across 7 industries. Automated SLA tracking improving efficiency by 80%. Deployed RAG chatbot reducing inquiries by 50%. Led AI-powered SDI data standardization for 80+ government agencies. Designed PostgreSQL to BigQuery pipelines cutting cloud costs 30%.',
    },
    {
        period: 'Feb 2024 — Jun 2024',
        role: 'Machine Learning Path — Bangkit Academy',
        company: 'Google, Tokopedia, Gojek, Traveloka',
        description: 'Graduated with Distinction (Top 10%). Specialized in Data Analytics, ML, Computer Vision, NLP, and Time Series using Python and TensorFlow Keras. Completed industry capstone with Amati Indonesia building LuxTrace supply chain platform.',
    },
    {
        period: 'Jan 2021 — Mar 2022',
        role: 'Content Design & Digital Marketing',
        company: 'Synergy Via Online — Pekanbaru',
        description: 'Managed Meta Ads campaigns achieving 300% ROI. Boosted WhatsApp conversions by 25%. Contributed to IDR 7B+ branch revenue through high-converting ad creatives for 30+ advertisers across beauty & health.',
    },
    {
        period: 'Jul 2021 — Jul 2025',
        role: 'Bachelor of Information Systems',
        company: 'State University of Surabaya — GPA 3.86/4.00',
        description: 'Focused on Data Mining, Business Intelligence, Databases, Project Management, and ERP. Active in Google DSC (ML Core Lead), Data Science Indonesia, and Avalon AI research community.',
    },
];

const FALLBACK_ACHIEVEMENTS = [
    { type: 'award', title: '3rd Place — GEMASTIK 2025', issuer: 'National ICT Business Development Competition', highlight: true },
    { type: 'award', title: '1st Place — DSSC 2019', issuer: 'National Sales Competition, Dekkson SMK', highlight: true },
    { type: 'certification', title: 'TensorFlow Developer', issuer: 'DeepLearning.AI, 2024', highlight: false },
    { type: 'certification', title: 'Machine Learning Specialization', issuer: 'DeepLearning.AI, 2024', highlight: false },
    { type: 'certification', title: 'Smart Analytics, ML & AI on GCP', issuer: 'Google Cloud, 2024', highlight: false },
    { type: 'academic', title: 'Bangkit Top 10% Graduate', issuer: 'Google, Tokopedia, Gojek, Traveloka, 2024', highlight: false },
];

export const metadata = {
    title: 'About — Regi Muhammar',
    description: 'Data Analyst & AI Engineer. 2+ years building BI dashboards, ML models, AI agents, and automation pipelines.',
};

export default async function AboutPage() {
    const about = await getAbout();

    // Use Sanity data if available, otherwise use fallback
    const highlights = about?.highlights || FALLBACK_HIGHLIGHTS;
    const timeline = about?.timeline || FALLBACK_TIMELINE;
    const achievements = about?.achievements || FALLBACK_ACHIEVEMENTS;
    const photoUrl = about?.photo ? urlFor(about.photo).width(600).height(800).url() : null;

    return (
        <div style={{ paddingTop: '80px' }}>
            <section className="section">
                <div className="about-grid">
                    <div className="about-photo-wrap">
                        {photoUrl ? (
                            <img
                                className="about-photo"
                                src={photoUrl}
                                alt={about?.name || 'Regi Muhammar'}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <Image
                                className="about-photo"
                                src="/headshot-subject.webp"
                                alt="Regi Muhammar"
                                width={600}
                                height={800}
                                priority
                            />
                        )}
                        <div className="about-photo-frame"></div>
                        <div className="about-photo-label">
                            {about?.role || 'Data & AI Engineer'}
                        </div>
                    </div>
                    <div className="about-content">
                        <div className="section-label">About Me</div>
                        <div className="section-title" style={{ fontSize: 'clamp(36px,4vw,60px)' }}>
                            {about?.name?.split(' ')[0] || 'Regi'}
                            <br />
                            <span className="outline">{about?.name?.split(' ').slice(1).join(' ') || 'Muhammar'}</span>
                        </div>

                        {/* Bio from Sanity Portable Text, or fallback text */}
                        {about?.bio && about.bio.length > 0 ? (
                            <div className="about-intro">
                                <PortableText value={about.bio} />
                            </div>
                        ) : (
                            <>
                                <p className="about-intro">
                                    Data Analyst & AI Engineer turning complex datasets into
                                    strategic intelligence. I believe data should drive decisions — not
                                    just fill dashboards.
                                </p>
                                <p className="about-bio">
                                    With 2+ years of professional experience at Narasio Data, I&apos;ve
                                    delivered end-to-end analytics solutions for clients across
                                    E-Commerce, Telecommunications, Government, Film, Real Estate, and
                                    Agriculture. My work spans from architecting BigQuery data
                                    warehouses to deploying RAG chatbots in production.
                                </p>
                                <p className="about-bio">
                                    Before data, I spent a year in content design and digital marketing
                                    — which gave me a unique lens: I understand both the technical data
                                    stack and how insights need to be communicated to drive action.
                                </p>
                            </>
                        )}

                        {/* Key Stats */}
                        <div className="about-highlights">
                            {highlights.map((h) => (
                                <div className="highlight" key={h.label || h.text}>
                                    <div className="highlight-num">
                                        {h.number || h.num}
                                        {(h.suffix) && <span>{h.suffix}</span>}
                                    </div>
                                    <div className="highlight-text">{h.label || h.text}</div>
                                </div>
                            ))}
                        </div>
                        <Link href="/contact" className="btn-primary" style={{ marginTop: '8px' }}>
                            Get in Touch
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Timeline */}
                <div className="timeline">
                    <div className="section-label" style={{ marginTop: '80px' }}>Experience</div>
                    <div className="timeline-title">
                        Career{' '}
                        <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
                            Timeline
                        </span>
                    </div>
                    {timeline.map((item) => (
                        <div className="timeline-item" key={item.period || item.year}>
                            <div className="timeline-dot"></div>
                            <div>
                                <div className="timeline-year">{item.period || item.year}</div>
                                <div className="timeline-role">{item.role}</div>
                                <div className="timeline-company">{item.company}</div>
                                <div className="timeline-body">{item.description || item.body}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Achievements */}
                <div style={{ marginTop: '80px' }}>
                    <div className="section-label">Recognition</div>
                    <div style={{
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: 'clamp(32px,4vw,52px)',
                        marginBottom: '40px',
                    }}>
                        Awards &{' '}
                        <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
                            Certifications
                        </span>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
                        gap: '16px',
                    }}>
                        {achievements.map((a) => (
                            <div
                                key={a.title}
                                style={{
                                    border: a.highlight
                                        ? '1px solid rgba(232,80,2,0.2)'
                                        : '1px solid rgba(255,255,255,0.06)',
                                    padding: '24px',
                                    background: a.highlight ? 'rgba(232,80,2,0.03)' : 'transparent',
                                }}
                            >
                                <div style={{
                                    color: a.highlight ? 'var(--orange)' : 'var(--light-gray)',
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    letterSpacing: '2px',
                                    marginBottom: '8px',
                                    textTransform: 'uppercase',
                                }}>
                                    {a.type === 'award' ? '🏆 AWARD' : a.type === 'certification' ? '📜 CERT' : '🎓 ACADEMIC'}
                                </div>
                                <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>
                                    {a.title}
                                </div>
                                <div style={{ fontSize: '13px', color: 'var(--gray)' }}>
                                    {a.issuer || a.sub}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
