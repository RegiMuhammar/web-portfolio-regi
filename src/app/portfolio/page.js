'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Footer from '@/components/Footer';

const filters = [
    { label: 'All Projects', value: 'all' },
    { label: 'Dashboards', value: 'dashboard' },
    { label: 'Machine Learning', value: 'ml' },
    { label: 'AI & LLM', value: 'ai' },
    { label: 'Data Engineering', value: 'data-engineering' },
    { label: 'Analytics', value: 'analytics' },
];

export default function PortfolioPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        async function loadProjects() {
            const { data, error } = await supabase
                .from('portfolio_projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setProjects(data);
            }
            setLoading(false);
        }
        loadProjects();
    }, []);

    const filtered =
        activeFilter === 'all'
            ? projects
            : projects.filter((p) => p.category === activeFilter);

    return (
        <div style={{ paddingTop: '80px' }}>
            <section className="section">
                <div className="section-label">Selected Work</div>
                <div className="section-title">
                    Data &amp; AI <span className="outline">Projects</span>
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

                {loading ? (
                    <div className="loading-wrap">
                        <div className="loading-spinner"></div>
                    </div>
                ) : (
                    <div className="portfolio-grid">
                        {filtered.map((project) => (
                            <Link
                                href={`/portfolio/${project.slug}`}
                                className="port-card"
                                key={project.id}
                            >
                                <div className="port-img">
                                    <img
                                        src={
                                            project.thumbnail_url ||
                                            project.image_url ||
                                            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'
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
                                        <span className="port-stack">{project.stack}</span>
                                        <span className="port-link">
                                            View Details →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
            <Footer />
        </div>
    );
}
