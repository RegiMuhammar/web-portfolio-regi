// FeaturedProjects — Server Component (no more client-side Supabase fetch)
import Link from 'next/link';
import { getFeaturedProjects, urlFor } from '@/lib/sanity';

export default async function FeaturedProjects() {
    const projects = await getFeaturedProjects();

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
                {projects.length === 0 ? (
                    <div className="loading-wrap">
                        <p style={{ color: 'var(--gray)' }}>No featured projects yet.</p>
                    </div>
                ) : (
                    <div className="featured-list">
                        {projects.map((project) => (
                            <div className="featured-card" key={project._id}>
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
                                        {project.techStack && project.techStack.length > 0 && (
                                            <div className="featured-card-row">
                                                <span className="featured-card-row-label">Tech Stack</span>
                                                <div className="featured-card-tags">
                                                    {project.techStack.map((tech) => (
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
                                            (project.thumbnail && project.thumbnail.asset)
                                                ? urlFor(project.thumbnail).width(900).url()
                                                : 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'
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
