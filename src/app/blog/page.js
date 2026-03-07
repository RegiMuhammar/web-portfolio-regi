'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Footer from '@/components/Footer';

export default function BlogPage() {
    const [featured, setFeatured] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadBlog() {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('published', true)
                .order('created_at', { ascending: false });

            if (!error && data) {
                setFeatured(data.filter((p) => p.featured));
                setPosts(data.filter((p) => !p.featured));
            }
            setLoading(false);
        }
        loadBlog();
    }, []);

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });

    return (
        <div style={{ paddingTop: '80px' }}>
            <section className="section">
                <div className="section-label">Knowledge Base</div>
                <div className="section-title">
                    Writings on
                    <br />
                    Data &amp; <span className="outline">AI</span>
                </div>
                <p
                    style={{
                        fontSize: '15px',
                        color: 'var(--light-gray)',
                        maxWidth: '520px',
                        marginTop: '16px',
                        marginBottom: '48px',
                        lineHeight: 1.8,
                    }}
                >
                    Deep dives into machine learning, data engineering, LLM systems, and
                    lessons from building production analytics.
                </p>

                {loading ? (
                    <div className="loading-wrap" style={{ gridColumn: 'span 2' }}>
                        <div className="loading-spinner"></div>
                    </div>
                ) : (
                    <>
                        <div className="blog-featured">
                            {featured.map((p, i) => (
                                <Link
                                    href={`/blog/${p.slug}`}
                                    className={`blog-card ${i > 0 ? 'small' : ''}`}
                                    key={p.id}
                                >
                                    <div className="blog-img">
                                        <img
                                            src={
                                                p.cover_image_url ||
                                                'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800'
                                            }
                                            alt={p.title}
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="blog-body">
                                        <div className="blog-cat">{p.category}</div>
                                        <div className="blog-title">{p.title}</div>
                                        <div className="blog-excerpt">{p.excerpt}</div>
                                        <div className="blog-meta">
                                            <span className="blog-date">
                                                {formatDate(p.created_at)}
                                            </span>
                                            <span className="blog-read">
                                                {p.reading_time} min read →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="blog-grid">
                            {posts.map((p) => (
                                <Link
                                    href={`/blog/${p.slug}`}
                                    className="blog-card small"
                                    key={p.id}
                                >
                                    <div className="blog-img" style={{ height: '160px' }}>
                                        <img
                                            src={
                                                p.cover_image_url ||
                                                'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800'
                                            }
                                            alt={p.title}
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="blog-body">
                                        <div className="blog-cat">{p.category}</div>
                                        <div className="blog-title">{p.title}</div>
                                        <div className="blog-meta">
                                            <span className="blog-date">
                                                {formatDate(p.created_at)}
                                            </span>
                                            <span className="blog-read">
                                                {p.reading_time} min →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </section>
            <Footer />
        </div>
    );
}
