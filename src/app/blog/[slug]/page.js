// Blog Detail Page — Server Component with Portable Text & Static Generation
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { getPostBySlug, getAllPostSlugs, getRelatedPosts, urlFor } from '@/lib/sanity';
import Footer from '@/components/Footer';

// Portable Text component overrides for blog body
const ptComponents = {
    types: {
        image: ({ value }) => {
            if (!value || !value.asset) return null;
            return (
                <figure style={{ margin: '32px 0' }}>
                    <img
                        src={urlFor(value).width(900).url()}
                        alt={value.alt || ''}
                        style={{ width: '100%', borderRadius: '8px' }}
                    />
                    {value.caption && (
                        <figcaption style={{ textAlign: 'center', color: 'var(--gray)', fontSize: '13px', marginTop: '8px' }}>
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            );
        },
        codeBlock: ({ value }) => (
            <div style={{ margin: '24px 0' }}>
                {value.filename && (
                    <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        padding: '6px 16px',
                        fontSize: '12px',
                        color: 'var(--gray)',
                        borderRadius: '6px 6px 0 0',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                        fontFamily: 'monospace',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}>
                        <span>{value.language?.toUpperCase() || 'CODE'}</span>
                        {value.filename && <span style={{ opacity: 0.6 }}>— {value.filename}</span>}
                    </div>
                )}
                <pre className="code-block">
                    <code>{value.code}</code>
                </pre>
            </div>
        ),
        callout: ({ value }) => {
            const icons = { tip: '💡', warning: '⚠️', info: 'ℹ️', insight: '🔑' };
            const colors = {
                tip: 'rgba(52,211,153,0.08)',
                warning: 'rgba(251,191,36,0.08)',
                info: 'rgba(99,179,237,0.08)',
                insight: 'rgba(232,80,2,0.08)',
            };
            return (
                <div style={{
                    margin: '24px 0',
                    padding: '20px 24px',
                    background: colors[value.type] || colors.info,
                    borderRadius: '6px',
                    borderLeft: '3px solid currentColor',
                }}>
                    <div style={{ marginBottom: '8px', fontWeight: 700 }}>
                        {icons[value.type] || 'ℹ️'} {value.type?.charAt(0).toUpperCase() + value.type?.slice(1)}
                    </div>
                    <p style={{ margin: 0 }}>{value.content}</p>
                </div>
            );
        },
    },
    marks: {
        link: ({ children, value }) => (
            <a
                href={value.href}
                target={value.blank ? '_blank' : '_self'}
                rel="noopener noreferrer"
                style={{ color: 'var(--orange)', textDecoration: 'underline' }}
            >
                {children}
            </a>
        ),
        code: ({ children }) => (
            <code className="inline-code">{children}</code>
        ),
    },
    block: {
        h2: ({ children }) => <h2>{children}</h2>,
        h3: ({ children }) => <h3>{children}</h3>,
        h4: ({ children }) => <h4>{children}</h4>,
        blockquote: ({ children }) => (
            <blockquote style={{
                borderLeft: '3px solid var(--orange)',
                paddingLeft: '20px',
                margin: '24px 0',
                color: 'var(--light-gray)',
                fontStyle: 'italic',
            }}>
                {children}
            </blockquote>
        ),
    },
};

// Generate static pages at build time for all posts
export async function generateStaticParams() {
    const slugs = await getAllPostSlugs();
    return slugs.map((s) => ({ slug: s.slug }));
}

// Generate dynamic metadata per post
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return { title: 'Post Not Found' };
    return {
        title: post.seoTitle || `${post.title} — Regi Muhammar`,
        description: post.seoDescription || post.excerpt,
        openGraph: {
            images: (post.coverImage && post.coverImage.asset) ? [urlFor(post.coverImage).width(1200).height(630).url()] : [],
        },
    };
}

const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

export default async function BlogDetailPage({ params }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) notFound();

    const related = await getRelatedPosts(post.category, slug);

    return (
        <div style={{ paddingTop: '64px' }}>
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
                        <Calendar size={14} /> {post.publishedAt ? formatDate(post.publishedAt) : '—'}
                    </span>
                    <span className="detail-meta-item">
                        <Clock size={14} /> {post.readingTime} min read
                    </span>
                    {post.author && (
                        <span className="detail-meta-item">
                            ✍️ {post.author.name}
                        </span>
                    )}
                </div>

                {/* Banner Image */}
                <div className="detail-banner">
                    <img
                        src={
                            (post.coverImage && post.coverImage.asset)
                                ? urlFor(post.coverImage).width(1200).url()
                                : 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200'
                        }
                        alt={post.title}
                    />
                </div>

                {/* Portable Text Body */}
                {post.body && post.body.length > 0 ? (
                    <div className="detail-body">
                        <PortableText value={post.body} components={ptComponents} />
                    </div>
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
                            <span className="detail-tag" key={tag}>{tag}</span>
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
                            <Link href={`/blog/${item.slug}`} className="blog-card small" key={item._id}>
                                <div className="blog-img" style={{ height: '160px' }}>
                                    <img
                                        src={
                                            (item.coverImage && item.coverImage.asset)
                                                ? urlFor(item.coverImage).width(600).url()
                                                : 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800'
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
                                            {item.publishedAt ? formatDate(item.publishedAt) : '—'}
                                        </span>
                                        <span className="blog-read">{item.readingTime} min →</span>
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
