'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Footer from '@/components/Footer';

function renderMarkdown(text) {
    if (!text) return '';

    let html = text
        // Code blocks (``` ... ```)
        .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
            return `<pre class="code-block"><code>${code
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .trim()}</code></pre>`;
        })
        // Inline code
        .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
        // Headers
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^# (.+)$/gm, '<h2>$1</h2>')
        // Bold
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        // Horizontal rule
        .replace(/^---$/gm, '<hr />')
        // Tables
        .replace(/(?:^(\|.+\|)\n(\|[-| :]+\|)\n((?:\|.+\|\n?)+))/gm, (_, header, separator, body) => {
            const headers = header.split('|').filter(c => c.trim()).map(c => `<th>${c.trim()}</th>`).join('');
            const rows = body.trim().split('\n').map(row => {
                const cells = row.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('');
                return `<tr>${cells}</tr>`;
            }).join('');
            return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
        });

    // Process lists and paragraphs
    const lines = html.split('\n');
    let result = [];
    let inList = false;
    let listType = '';
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        // Skip lines that are part of pre-rendered HTML
        if (line.startsWith('<pre') || line.startsWith('<table') || line.startsWith('<h2') || line.startsWith('<h3') || line.startsWith('<hr')) {
            if (inList) {
                result.push(listType === 'ul' ? '</ul>' : '</ol>');
                inList = false;
            }
            result.push(line);
            i++;
            continue;
        }

        // Unordered list
        if (/^- (.+)$/.test(line)) {
            if (!inList || listType !== 'ul') {
                if (inList) result.push(listType === 'ul' ? '</ul>' : '</ol>');
                result.push('<ul>');
                inList = true;
                listType = 'ul';
            }
            result.push(`<li>${line.replace(/^- /, '')}</li>`);
            i++;
            continue;
        }

        // Ordered list
        if (/^\d+\. (.+)$/.test(line)) {
            if (!inList || listType !== 'ol') {
                if (inList) result.push(listType === 'ul' ? '</ul>' : '</ol>');
                result.push('<ol>');
                inList = true;
                listType = 'ol';
            }
            result.push(`<li>${line.replace(/^\d+\. /, '')}</li>`);
            i++;
            continue;
        }

        // Close list if we hit a non-list line
        if (inList) {
            result.push(listType === 'ul' ? '</ul>' : '</ol>');
            inList = false;
        }

        // Empty line
        if (line.trim() === '') {
            i++;
            continue;
        }

        // Regular paragraph
        result.push(`<p>${line}</p>`);
        i++;
    }

    if (inList) {
        result.push(listType === 'ul' ? '</ul>' : '</ol>');
    }

    return result.join('\n');
}

export default function BlogDetailPage() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPost() {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('slug', slug)
                .single();

            if (!error && data) {
                setPost(data);

                // Fetch related posts by same category
                const { data: relatedData } = await supabase
                    .from('blog_posts')
                    .select('*')
                    .eq('category', data.category)
                    .eq('published', true)
                    .neq('slug', slug)
                    .order('created_at', { ascending: false })
                    .limit(3);

                if (relatedData) setRelated(relatedData);
            }
            setLoading(false);
        }
        if (slug) loadPost();
    }, [slug]);

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });

    if (loading) {
        return (
            <div style={{ paddingTop: '80px' }}>
                <div className="loading-wrap">
                    <div className="loading-spinner"></div>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div style={{ paddingTop: '80px' }}>
                <div className="detail-content">
                    <Link href="/blog" className="detail-back">
                        ← Back to Blog
                    </Link>
                    <div className="detail-title">Post Not Found</div>
                    <p style={{ color: 'var(--light-gray)' }}>
                        The blog post you&apos;re looking for doesn&apos;t exist.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '80px' }}>
            {/* Content */}
            <div className="detail-content">
                <Link href="/blog" className="detail-back">
                    <ArrowLeft size={16} /> Back to Blog
                </Link>

                {/* Category */}
                <div className="detail-category">{post.category}</div>

                {/* Title */}
                <h1 className="detail-title">{post.title}</h1>

                {/* Meta */}
                <div className="detail-meta">
                    <span className="detail-meta-item">
                        <Calendar size={14} /> {formatDate(post.created_at)}
                    </span>
                    <span className="detail-meta-item">
                        <Clock size={14} /> {post.reading_time} min read
                    </span>
                </div>

                {/* Banner Image */}
                <div className="detail-banner">
                    <img
                        src={
                            post.cover_image_url ||
                            'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200'
                        }
                        alt={post.title}
                    />
                </div>

                {/* Body */}
                {post.content ? (
                    <div
                        className="detail-body"
                        dangerouslySetInnerHTML={{
                            __html: renderMarkdown(post.content),
                        }}
                    />
                ) : (
                    <div className="detail-body">
                        <p>{post.excerpt}</p>
                        <p style={{ color: 'var(--gray)', fontStyle: 'italic', marginTop: '32px' }}>
                            Full article coming soon.
                        </p>
                    </div>
                )}

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="detail-tags" style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        {post.tags.map((tag) => (
                            <span className="detail-tag" key={tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Related Posts */}
            {related.length > 0 && (
                <div className="related-section">
                    <div className="related-header">
                        <div className="section-label">Keep Reading</div>
                        <div className="related-title">
                            Related <span className="outline">Posts</span>
                        </div>
                    </div>
                    <div className="related-grid">
                        {related.map((item) => (
                            <Link
                                href={`/blog/${item.slug}`}
                                className="blog-card small"
                                key={item.id}
                            >
                                <div className="blog-img" style={{ height: '160px' }}>
                                    <img
                                        src={
                                            item.cover_image_url ||
                                            'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800'
                                        }
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="blog-body">
                                    <div className="blog-cat">{item.category}</div>
                                    <div className="blog-title">{item.title}</div>
                                    <div className="blog-meta">
                                        <span className="blog-date">
                                            {formatDate(item.created_at)}
                                        </span>
                                        <span className="blog-read">
                                            {item.reading_time} min →
                                        </span>
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
