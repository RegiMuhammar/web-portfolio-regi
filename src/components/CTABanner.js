import Link from 'next/link';

export default function CTABanner() {
    return (
        <section
            style={{
                margin: '0 48px 120px',
                border: '1px solid rgba(232,80,2,0.2)',
                padding: '64px',
                position: 'relative',
                overflow: 'hidden',
                background: 'rgba(232,80,2,0.03)',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'radial-gradient(ellipse at center, rgba(232,80,2,0.08) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }}
            ></div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1,
                    flexWrap: 'wrap',
                    gap: '32px',
                }}
            >
                <div>
                    <div
                        style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            color: 'var(--orange)',
                            marginBottom: '12px',
                        }}
                    >
                        Open to Work
                    </div>
                    <div
                        style={{
                            fontFamily: "'Bebas Neue',sans-serif",
                            fontSize: 'clamp(36px,4vw,56px)',
                            lineHeight: 1,
                            marginBottom: '16px',
                        }}
                    >
                        Ready to transform
                        <br />
                        your data strategy?
                    </div>
                    <div style={{ fontSize: '15px', color: 'var(--light-gray)' }}>
                        From ML pipelines to executive dashboards — let&apos;s build something
                        remarkable.
                    </div>
                </div>
                <Link
                    href="/contact"
                    className="btn-primary"
                    style={{ fontSize: '15px', padding: '20px 40px' }}
                >
                    Start a Conversation
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </section>
    );
}
