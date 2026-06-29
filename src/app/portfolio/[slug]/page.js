// Portfolio Detail Page — Server Component with Static Generation
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, FolderOpen } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { getProjectBySlug, getAllProjectSlugs, getRelatedProjects, urlFor } from '@/lib/sanity';
import Footer from '@/components/Footer';

// Helper to parse image dimensions from Sanity asset ref
const parseSanityDimensions = (ref) => {
    if (!ref) return { width: 800, height: 600 };
    const pattern = /-(?<width>\d+)x(?<height>\d+)-/;
    const match = pattern.exec(ref);
    if (match && match.groups) {
        return {
            width: parseInt(match.groups.width, 10),
            height: parseInt(match.groups.height, 10)
        };
    }
    return { width: 800, height: 600 };
};

// Portable Text component overrides for project body
const ptComponents = {
    types: {
        // Legacy: handles existing _type 'image' blocks
        image: ({ value }) => {
            if (!value || !value.asset) return null;
            const ref = value.asset._ref || value.asset._id;
            const { width, height } = parseSanityDimensions(ref);
            return (
                <figure style={{ margin: '32px 0' }}>
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || ''}
                        width={width}
                        height={height}
                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                    {value.caption && (
                        <figcaption style={{ textAlign: 'center', color: 'var(--gray)', fontSize: '13px', marginTop: '8px' }}>
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            );
        },
        // New: handles _type 'bodyImage' blocks
        bodyImage: ({ value }) => {
            if (!value || !value.asset) return null;
            const ref = value.asset._ref || value.asset._id;
            const { width, height } = parseSanityDimensions(ref);
            return (
                <figure style={{ margin: '32px 0' }}>
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || ''}
                        width={width}
                        height={height}
                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
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
                    }}>
                        {value.filename}
                    </div>
                )}
                <pre className="code-block">
                    <code>{value.code}</code>
                </pre>
            </div>
        ),
    },
};

// Generate static pages at build time for all projects
export async function generateStaticParams() {
    const slugs = await getAllProjectSlugs();
    return slugs.map((s) => ({ slug: s.slug }));
}

// Generate dynamic metadata per page
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);
    if (!project) return { title: 'Project Not Found' };
    return {
        title: `${project.title} — Regi Muhammar`,
        description: project.description,
    };
}

export default async function PortfolioDetailPage({ params }) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) notFound();

    const related = await getRelatedProjects(project.category, slug);

    return (
        <div className="clean-bg-page" style={{ paddingTop: '64px' }}>
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
                    {project.publishedAt && (
                        <span className="detail-meta-item">
                            <Calendar size={14} /> {new Date(project.publishedAt).toLocaleDateString('en-US', {
                                month: 'long',
                                year: 'numeric',
                            })}
                        </span>
                    )}
                    {project.industry && (
                        <span className="detail-meta-item">
                            <FolderOpen size={14} /> {project.industry}
                        </span>
                    )}
                    {project.client && (
                        <span className="detail-meta-item">
                            🏢 {project.client}
                        </span>
                    )}
                    {project.role && (
                        <span className="detail-meta-item">
                            👤 {project.role}
                        </span>
                    )}
                </div>

                {/* Banner Image */}
                <div className="detail-banner">
                    <Image
                        src={
                            (project.bannerImage && project.bannerImage.asset)
                                ? urlFor(project.bannerImage).width(1200).height(675).fit('crop').url()
                                : (project.thumbnail && project.thumbnail.asset)
                                    ? urlFor(project.thumbnail).width(1200).height(750).fit('crop').url()
                                    : 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200'
                        }
                        alt={project.title}
                        width={1200}
                        height={675}
                        priority
                    />
                </div>

                {/* Description */}
                <div className="detail-body">
                    <p>{project.description}</p>
                </div>

                {/* Impact */}
                {project.impact && (
                    <div style={{
                        margin: '24px 0',
                        padding: '20px 24px',
                        border: '1px solid rgba(232,80,2,0.2)',
                        background: 'rgba(232,80,2,0.03)',
                        borderRadius: '4px',
                    }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', color: 'var(--orange)', marginBottom: '6px' }}>
                            IMPACT
                        </div>
                        <p style={{ margin: 0 }}>{project.impact}</p>
                    </div>
                )}

                {/* Key Outcomes */}
                {project.outcomes && project.outcomes.length > 0 && (
                    <div className="detail-body">
                        <h2>Key Outcomes</h2>
                        <ul>
                            {project.outcomes.map((outcome, i) => (
                                <li key={i}>{outcome}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Portable Text Body / Case Study */}
                {project.body && project.body.length > 0 && (
                    <div className="detail-body">
                        <PortableText value={project.body} components={ptComponents} />
                    </div>
                )}

                {/* Domain Tags */}
                {project.domain && project.domain.length > 0 && (
                    <div className="detail-tags" style={{ marginTop: '32px' }}>
                        {project.domain.map((d) => (
                            <span className="detail-tag" key={d} style={{ background: 'rgba(232,80,2,0.08)', borderColor: 'rgba(232,80,2,0.2)' }}>
                                {d}
                            </span>
                        ))}
                    </div>
                )}

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                    <div className="detail-tags" style={{ marginTop: '12px' }}>
                        {project.tags.map((tag) => (
                            <span className="detail-tag" key={tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Tech Stack */}
                {project.techStack && project.techStack.length > 0 && (
                    <div className="detail-tech-stack">
                        <div style={{
                            width: '100%',
                            marginBottom: '12px',
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            color: 'var(--gray)',
                        }}>
                            Tech Stack
                        </div>
                        {project.techStack.map((tech) => (
                            <span className="service-tool" key={tech}>{tech}</span>
                        ))}
                    </div>
                )}

                {/* Links */}
                {(project.liveUrl || project.githubUrl) && (
                    <div className="detail-links">
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                                View Live
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                                </svg>
                            </a>
                        )}
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                                GitHub
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                            <Link href={`/portfolio/${item.slug}`} className="port-card" key={item._id}>
                                <div className="port-img">
                                    <Image
                                        src={
                                            (item.thumbnail && item.thumbnail.asset)
                                                ? urlFor(item.thumbnail).width(800).height(500).fit('crop').url()
                                                : 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'
                                        }
                                        alt={item.title}
                                        width={800}
                                        height={500}
                                        loading="lazy"
                                    />
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
