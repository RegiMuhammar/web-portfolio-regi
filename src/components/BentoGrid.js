import Link from 'next/link';
import { GradientPillButton } from '@/components/design-system';

const cards = [
    {
        title: 'Data Analytics & Visualization',
        desc: 'Executive dashboards and analytics systems that turn complex datasets into clear operating signals.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
        ),
    },
    {
        title: 'AI & Machine Learning',
        desc: 'RAG assistants, anomaly detection, forecasting, and model workflows built for production use.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
            </svg>
        ),
    },
    {
        title: 'Data Engineering',
        desc: 'ETL pipelines, dbt models, Airflow orchestration, and cloud data platforms optimized for cost.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="13" r="8" />
                <path d="M12 9v4l2 2" />
                <path d="M5 3L2 6" />
                <path d="M19 3l3 3" />
            </svg>
        ),
    },
    {
        title: 'Governance & Quality',
        desc: 'Data standards, quality analysis, SDI frameworks, and adoption training for enterprise teams.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
            </svg>
        ),
    },
    {
        title: 'API & Backend',
        desc: 'FastAPI services, PostgreSQL architecture, Docker deployments, and automation prototypes.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
            </svg>
        ),
    },
    {
        title: 'Cloud & Infrastructure',
        desc: 'Scalable architecture, CI/CD pipelines, and infrastructure as code to guarantee reliable performance.',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
        ),
    },
];

export default function BentoGrid() {
    return (
        <section className="section">
            <div className="clean-grid-header reveal">
                <h2 className="clean-grid-title">
                    Build solution, <span>not just product</span>
                </h2>
                <GradientPillButton size="default" href="/contact" icon={false} className="clean-grid-cta">
                    Get Started
                </GradientPillButton>
            </div>

            <div className="clean-grid">
                {cards.map((card) => (
                    <div key={card.title} className="clean-card reveal">
                        <div className="clean-card-icon">{card.icon}</div>
                        <div className="clean-card-title">{card.title}</div>
                        <div className="clean-card-desc">{card.desc}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
