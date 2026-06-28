'use client';

import { useState } from 'react';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import Footer from '@/components/Footer';

const filters = [
    { label: 'All Projects', value: 'all' },
    { label: 'Dashboards', value: 'dashboard' },
    { label: 'Machine Learning', value: 'ml' },
    { label: 'AI & LLM', value: 'ai' },
    { label: 'AI Agent', value: 'ai-agent' },
    { label: 'Data Engineering', value: 'data-engineering' },
    { label: 'Analytics Engineering', value: 'analytics-engineering' },
    { label: 'Analytics', value: 'analytics' },
    { label: 'Automation', value: 'automation' },
];

// Client component handles only filter interactivity
export default function PortfolioClient({ projects }) {
    const [activeFilter, setActiveFilter] = useState('all');

    const filtered =
        activeFilter === 'all'
            ? projects
            : projects.filter((p) => p.category === activeFilter);

    return (
        <div style={{ paddingTop: '64px' }}>
            <section className="section">
                <div className="section-label">Selected Work</div>
                <div className="section-title">
                    Data & AI <span className="outline">Projects</span>
                </div>
                <p
                    style={{
                        fontSize: '15px',
                        color: 'var(--light-gray)',
                        maxWidth: '600px',
                        marginBottom: '48px',
                        lineHeight: 1.8,
                    }}
                >
                    From machine learning models to enterprise dashboards — a curated
                    selection of work across data engineering, AI, and analytics.
                </p>

                <div className="filter-bar">
                    {filters.map((f) => (
                        <button
                            key={f.value}
                            className={`filter-btn ${activeFilter === f.value ? 'active' : ''}`}
                            onClick={() => setActiveFilter(f.value)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                <div className="portfolio-grid">
                    {filtered.length === 0 ? (
                        <p style={{ color: 'var(--gray)', gridColumn: 'span 3' }}>
                            No projects in this category yet.
                        </p>
                    ) : (
                        filtered.map((project) => (
                            <Link
                                href={`/portfolio/${project.slug}`}
                                className="port-card"
                                key={project._id}
                            >
                                <div className="port-img">
                                    <img
                                        src={
                                            (project.thumbnail && project.thumbnail.asset)
                                                ? urlFor(project.thumbnail).width(800).height(500).fit('crop').url()
                                                : 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'
                                        }
                                        alt={project.title}
                                        loading="lazy"
                                    />
                                    <div className="port-overlay"></div>
                                    <div className="port-category">{project.category}</div>
                                </div>
                                <div className="port-body">
                                    {project.tags && (
                                        <div className="port-tags">
                                            {project.tags.map((tag) => (
                                                <span className="port-tag" key={tag}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="port-title">{project.title}</div>
                                    <div className="port-desc">{project.description}</div>
                                    <div className="port-footer">
                                        <span className="port-stack">
                                            {project.techStack?.slice(0, 3).join(' · ')}
                                        </span>
                                        <span className="port-link">View Details →</span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
}
