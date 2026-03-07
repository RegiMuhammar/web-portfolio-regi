import Link from 'next/link';

const cards = [
    {
        num: '01',
        title: 'Data Analytics & Visualization',
        desc: '50+ dashboard pages across E-Commerce, Telecom, Government, Real Estate. Real-time executive insights with Looker Studio & Power BI.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
            </svg>
        ),
        large: true,
        orange: false,
    },
    {
        num: '',
        title: 'AI & Machine Learning',
        desc: 'RAG chatbots, LLM fine-tuning, anomaly detection, demand forecasting — production-grade ML systems with MLFlow.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
        ),
        large: false,
        orange: true,
    },
    {
        num: '03',
        title: 'Data Engineering',
        desc: 'End-to-end ETL pipelines, dbt + Airflow orchestration, PostgreSQL to BigQuery ingestion. Cloud cost optimization on GCP & AWS.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
        ),
        large: false,
        orange: false,
    },
    {
        num: '04',
        title: 'Data Management & Governance',
        desc: 'SDI framework implementation, data standardization, quality analysis. Delivered training to 80+ government agencies.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
        ),
        large: false,
        orange: false,
    },
    {
        num: '05',
        title: 'API & Backend Development',
        desc: 'FastAPI microservices, PostgreSQL architecture, Docker deployments. Full AI agent prototyping with n8n automation.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
        ),
        large: false,
        orange: false,
    },
];

export default function BentoGrid() {
    return (
        <section className="section">
            <div className="section-label reveal">What I Do</div>
            <div className="section-title reveal">
                Expertise in <span className="outline">Data</span>
                <br />
                &amp; AI Intelligence
            </div>
            <div className="bento-grid" style={{ marginTop: '48px' }}>
                {cards.map((card) => (
                    <Link
                        key={card.title}
                        href="/services"
                        className={`bento-card reveal ${card.large ? 'large' : ''} ${card.orange ? 'orange-card' : ''}`}
                    >
                        {card.num && <div className="bento-num">{card.num}</div>}
                        <div className="bento-icon">{card.icon}</div>
                        <div className="bento-title">{card.title}</div>
                        <div className="bento-desc">{card.desc}</div>
                        <div className="bento-arrow">→</div>
                    </Link>
                ))}

                {/* CTA card */}
                <Link
                    href="/contact"
                    className="bento-card reveal"
                    style={{
                        background: 'transparent',
                        border: '1px dashed rgba(232,80,2,0.3)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                >
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '32px', marginBottom: '8px' }}>
                        Have a Project?
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--light-gray)', marginBottom: '24px' }}>
                        Let&apos;s turn your data into intelligence
                    </div>
                    <span className="btn-primary" style={{ fontSize: '12px', padding: '12px 24px' }}>
                        Get In Touch →
                    </span>
                </Link>
            </div>
        </section>
    );
}
