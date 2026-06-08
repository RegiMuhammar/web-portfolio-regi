'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function FeaturedProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFeatured() {
            const { data, error } = await supabase
                .from('portfolio_projects')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(3);

            if (!error && data) {
                setProjects(data);
            }
            setLoading(false);
        }
        loadFeatured();
    }, []);

    return (
        <section className="featured-section">
            <div className="featured-wrap">
                {/* Header */}
                <div className="featured-header">
                    <h2 className="featured-title">Featured works</h2>
                    <Link href="/portfolio" className="featured-all-btn">
                        All Works
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* Projects List */}
                {loading ? (
                    <div className="loading-wrap">
                        <div className="loading-spinner"></div>
                    </div>
                ) : (
                    <div className="featured-list">
                        {projects.map((project, index) => (
                            <div className="featured-card" key={project.id}>
                                {/* Left: Info (40%) */}
                                <div className="featured-card-info">
                                    <h3 className="featured-card-title">{project.title}</h3>

                                    {/* Metadata Rows */}
                                    <div className="featured-card-rows">



                                        {/* Categories */}
                                        {project.categories && project.categories.length > 0 && (
                                            <div className="featured-card-row">
                                                <span className="featured-card-row-label">Services</span>
                                                <div className="featured-card-tags">
                                                    {project.categories.map((cat) => (
                                                        <span className="featured-card-tag" key={cat}>
                                                            {cat}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Tech Stack */}
                                        {project.tech_stack && project.tech_stack.length > 0 && (
                                            <div className="featured-card-row">
                                                <span className="featured-card-row-label">Tech Stack</span>
                                                <div className="featured-card-tags">
                                                    {project.tech_stack.map((tech) => (
                                                        <span className="featured-card-tag" key={tech}>
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Read Case Study Button */}
                                    <Link
                                        href={`/portfolio/${project.slug}`}
                                        className="featured-card-btn"
                                    >
                                        <span>Read Case Study</span>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M7 17L17 7M7 7h10v10" />
                                        </svg>
                                    </Link>
                                </div>

                                {/* Right: Thumbnail (60%) */}
                                <div className="featured-card-thumb">
                                    <img
                                        src={
                                            project.thumbnail_url ||
                                            project.image_url ||
                                            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'
                                        }
                                        alt={project.title}
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
