'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, FolderOpen } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Footer from '@/components/Footer';

export default function PortfolioDetailPage() {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProject() {
            const { data, error } = await supabase
                .from('portfolio_projects')
                .select('*')
                .eq('slug', slug)
                .single();

            if (!error && data) {
                setProject(data);

                // Fetch related projects by same category
                const { data: relatedData } = await supabase
                    .from('portfolio_projects')
                    .select('*')
                    .eq('category', data.category)
                    .neq('slug', slug)
                    .order('created_at', { ascending: false })
                    .limit(3);

                if (relatedData) setRelated(relatedData);
            }
            setLoading(false);
        }
        if (slug) loadProject();
    }, [slug]);

    if (loading) {
        return (
            <div style={{ paddingTop: '80px' }}>
                <div className="loading-wrap">
                    <div className="loading-spinner"></div>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div style={{ paddingTop: '80px' }}>
                <div className="detail-content">
                    <Link href="/portfolio" className="detail-back">
                        ← Back to Portfolio
                    </Link>
                    <div className="detail-title">Project Not Found</div>
                    <p style={{ color: 'var(--light-gray)' }}>
                        The project you&apos;re looking for doesn&apos;t exist.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '80px' }}>
            {/* Content */}
            <div className="detail-content">
                <Link href="/portfolio" className="detail-back">
                    <ArrowLeft size={16} /> Back to Portfolio
                </Link>

                {/* Category */}
                <div className="detail-category">{project.category}</div>

                {/* Title */}
                <h1 className="detail-title">{project.title}</h1>

                {/* Meta */}
                <div className="detail-meta">
                    <span className="detail-meta-item">
                        <Calendar size={14} /> {new Date(project.created_at).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric',
                        })}
                    </span>
                    {project.category && (
                        <span className="detail-meta-item">
                            <FolderOpen size={14} /> {project.category.replace('-', ' ')}
                        </span>
                    )}
                </div>

                {/* Banner Image */}
                <div className="detail-banner">
                    <img
                        src={
                            project.thumbnail_url ||
                            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200'
                        }
                        alt={project.title}
                    />
                </div>

                {/* Description */}
                <div className="detail-body">
                    <p>{project.description}</p>
                    {project.long_description && (
                        <>
                            <h2>Project Details</h2>
                            <p>{project.long_description}</p>
                        </>
                    )}
                </div>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                    <div className="detail-tags" style={{ marginTop: '32px' }}>
                        {project.tags.map((tag) => (
                            <span className="detail-tag" key={tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Tech Stack */}
                {project.tech_stack && project.tech_stack.length > 0 && (
                    <div className="detail-tech-stack">
                        <div
                            style={{
                                width: '100%',
                                marginBottom: '12px',
                                fontSize: '11px',
                                fontWeight: 700,
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                color: 'var(--gray)',
                            }}
                        >
                            Tech Stack
                        </div>
                        {project.tech_stack.map((tech) => (
                            <span className="service-tool" key={tech}>
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                {/* Links */}
                {(project.live_url || project.github_url) && (
                    <div className="detail-links">
                        {project.live_url && (
                            <a
                                href={project.live_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                            >
                                View Live
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                                </svg>
                            </a>
                        )}
                        {project.github_url && (
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-ghost"
                            >
                                GitHub
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                                </svg>
                            </a>
                        )}
                    </div>
                )}
            </div>

            {/* Related Projects */}
            {related.length > 0 && (
                <div className="related-section">
                    <div className="related-header">
                        <div className="section-label">More Like This</div>
                        <div className="related-title">
                            Related <span className="outline">Projects</span>
                        </div>
                    </div>
                    <div className="related-grid">
                        {related.map((item) => (
                            <Link
                                href={`/portfolio/${item.slug}`}
                                className="port-card"
                                key={item.id}
                            >
                                <div className="port-img">
                                    <img
                                        src={
                                            item.thumbnail_url ||
                                            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'
                                        }
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                    <div className="port-overlay"></div>
                                    <div className="port-category">{item.category}</div>
                                </div>
                                <div className="port-body">
                                    <div className="port-title">{item.title}</div>
                                    <div className="port-desc">{item.description}</div>
                                    <div className="port-footer">
                                        <span className="port-link">View Details →</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
