// Blog Page — Server Component
import Link from 'next/link';
import { getPosts, urlFor } from '@/lib/sanity';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Blog — Regi Muhammar',
    description: 'Writings on Business Intelligence, Data Analytics, Analytics Engineering, Data Engineering, AI, AI Agents, and Automation.',
};

const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

export default async function BlogPage() {
    const allPosts = await getPosts();
    const featured = allPosts.filter((p) => p.featured);
    const posts = allPosts.filter((p) => !p.featured);

    return (
        <div style={{ paddingTop: '64px' }}>
            <section className="section">
                <div className="section-label">Knowledge Base</div>
                <div className="section-title">
                    Writings on
                    <br />
                    Data & <span className="outline">AI</span>
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
                    Deep dives into Business Intelligence, Data Engineering, Analytics Engineering,
                    LLM systems, AI Agents, Automation, and lessons from building production analytics.
                </p>

                {allPosts.length === 0 ? (
                    <div className="loading-wrap">
                        <p style={{ color: 'var(--gray)' }}>No posts published yet.</p>
                    </div>
                ) : (
                    <>
                        {/* Featured Posts */}
                        {featured.length > 0 && (
                            <div className="blog-featured">
                                {featured.map((p, i) => (
                                    <Link
                                        href={`/blog/${p.slug}`}
                                        className={`blog-card ${i > 0 ? 'small' : ''}`}
                                        key={p._id}
                                    >
                                        <div className="blog-img">
                                            <img
                                                src={
                                                    (p.coverImage && p.coverImage.asset)
                                                        ? urlFor(p.coverImage).width(900).url()
                                                        : 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800'
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
                                                    {p.publishedAt ? formatDate(p.publishedAt) : '—'}
                                                </span>
                                                <span className="blog-read">
                                                    {p.readingTime} min read →
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Regular Posts Grid */}
                        {posts.length > 0 && (
                            <div className="blog-grid">
                                {posts.map((p) => (
                                    <Link
                                        href={`/blog/${p.slug}`}
                                        className="blog-card small"
                                        key={p._id}
                                    >
                                        <div className="blog-img" style={{ height: '160px' }}>
                                            <img
                                                src={
                                                    (p.coverImage && p.coverImage.asset)
                                                        ? urlFor(p.coverImage).width(600).url()
                                                        : 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800'
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
                                                    {p.publishedAt ? formatDate(p.publishedAt) : '—'}
                                                </span>
                                                <span className="blog-read">
                                                    {p.readingTime} min →
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </section>
            <Footer />
        </div>
    );
}
