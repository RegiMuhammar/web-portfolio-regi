import Link from 'next/link';
import Footer from '@/components/Footer';

const services = [
    {
        num: '01',
        name: 'Data Analytics & Visualization',
        desc: 'Build executive-grade dashboards and analytics systems that turn complex datasets into clear business signals. Specializing in real-time SLA tracking, customer journey analytics, and multi-industry BI solutions across E-Commerce, Telecom, Government, Agriculture, and Real Estate sectors.',
        tools: ['Looker Studio', 'Power BI', 'BigQuery', 'PostgreSQL', 'Python'],
    },
    {
        num: '02',
        name: 'AI & Machine Learning Engineering',
        desc: 'From RAG chatbots with vector retrieval to fraud detection models processing 2M+ records. Build, evaluate, and deploy production ML systems with proper experiment tracking, model versioning, and monitoring. Includes Deep Learning, NLP, Computer Vision, and Time Series forecasting.',
        tools: ['TensorFlow', 'Scikit-learn', 'MLFlow', 'LangChain', 'ChromaDB'],
    },
    {
        num: '03',
        name: 'Data Engineering & Pipelines',
        desc: 'Architect and build scalable ETL pipelines from ingestion to transformation to serving. Experience optimizing PostgreSQL to BigQuery ingestion, reducing cloud cost scenarios by 30%. Includes data modeling, pipeline orchestration, and cloud infrastructure on GCP and AWS.',
        tools: ['dbt', 'Airflow', 'PySpark', 'Docker', 'GCP', 'AWS'],
    },
    {
        num: '04',
        name: 'LLM & RAG System Development',
        desc: 'Design and deploy AI-powered chatbots, knowledge assistants, and agent systems. From prompt engineering and embedding pipelines to knowledge graph integration. Production RAG systems achieving 94% answer relevance and 50% reduction in repetitive inquiries.',
        tools: ['LangChain', 'ChromaDB', 'FastAPI', 'n8n', 'Gemini'],
    },
    {
        num: '05',
        name: 'Data Governance & Management',
        desc: 'Implement data quality frameworks, standardization pipelines, and governance policies aligned with national and enterprise standards. Delivered SDI compliance training to 80+ regional government agencies with documented quality analysis and technical implementation.',
        tools: ['dbt', 'Python', 'BigQuery', 'PostgreSQL'],
    },
    {
        num: '06',
        name: 'API & Backend Development',
        desc: 'Build robust FastAPI backends and microservices powering data products and ML inference. Full API development lifecycle from design to documentation. Automation workflow orchestration using n8n for operational efficiency and AI-assisted business processes.',
        tools: ['FastAPI', 'PostgreSQL', 'Docker', 'n8n', 'JavaScript'],
    },
];

const processSteps = [
    {
        num: '01 / DISCOVER',
        name: 'Business Understanding',
        desc: 'Deep-dive into your data ecosystem, business goals, and pain points to define the right problem statement.',
    },
    {
        num: '02 / ARCHITECT',
        name: 'Solution Design',
        desc: 'Design scalable architecture — data models, pipeline topology, ML approach, and cloud cost scenarios.',
    },
    {
        num: '03 / BUILD',
        name: 'Engineering & Development',
        desc: 'Iterative development with weekly checkpoints. Code review, testing, and documentation throughout.',
    },
    {
        num: '04 / DEPLOY',
        name: 'Launch & Handover',
        desc: 'Production deployment with monitoring, team training, and comprehensive handover documentation.',
    },
];

export default function ServicesPage() {
    return (
        <div style={{ paddingTop: '64px' }}>
            <section className="section">
                <div className="section-label">Capabilities</div>
                <div className="section-title">
                    What I Can
                    <br />
                    Do For <span className="outline">You</span>
                </div>
                <p
                    style={{
                        fontSize: '15px',
                        color: 'var(--light-gray)',
                        maxWidth: '580px',
                        marginTop: '16px',
                        lineHeight: 1.8,
                    }}
                >
                    End-to-end data and AI solutions — from raw data ingestion to
                    intelligent dashboards that drive decisions.
                </p>

                <div className="services-list" style={{ marginTop: '60px' }}>
                    {services.map((s) => (
                        <div className="service-item" key={s.num}>
                            <div className="service-number">{s.num}</div>
                            <div className="service-name">{s.name}</div>
                            <div className="service-desc">{s.desc}</div>
                            <div className="service-tools">
                                {s.tools.map((t) => (
                                    <span className="service-tool" key={t}>
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Process */}
                <div style={{ marginTop: '100px' }}>
                    <div className="section-label">How I Work</div>
                    <div className="section-title" style={{ fontSize: 'clamp(32px,4vw,52px)' }}>
                        My <span className="outline">Process</span>
                    </div>
                    <div className="process-steps" style={{ marginTop: '60px' }}>
                        {processSteps.map((step) => (
                            <div className="process-step" key={step.num}>
                                <div className="step-dot"></div>
                                <div className="step-num">{step.num}</div>
                                <div className="step-name">{step.name}</div>
                                <div className="step-desc">{step.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div
                    style={{
                        marginTop: '80px',
                        textAlign: 'center',
                        padding: '64px',
                        border: '1px solid rgba(232,80,2,0.2)',
                        position: 'relative',
                        overflow: 'hidden',
                        background: 'rgba(232,80,2,0.03)',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background:
                                'radial-gradient(ellipse at center,rgba(232,80,2,0.08) 0%,transparent 70%)',
                            pointerEvents: 'none',
                        }}
                    ></div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div
                            style={{
                                fontFamily: "'Bebas Neue',sans-serif",
                                fontSize: '48px',
                                marginBottom: '16px',
                            }}
                        >
                            Ready to get started?
                        </div>
                        <p
                            style={{
                                color: 'var(--light-gray)',
                                fontSize: '15px',
                                marginBottom: '32px',
                            }}
                        >
                            Tell me about your data challenge and I&apos;ll respond within 24
                            hours.
                        </p>
                        <Link
                            href="/contact"
                            className="btn-primary"
                            style={{ fontSize: '14px', padding: '18px 40px' }}
                        >
                            Start a Project →
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
