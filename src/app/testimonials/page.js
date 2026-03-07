'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadTestimonials() {
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setTestimonials(data);
            }
            setLoading(false);
        }
        loadTestimonials();
    }, []);

    return (
        <div style={{ paddingTop: '80px' }}>
            <section className="section">
                <div className="section-label">Social Proof</div>
                <div className="section-title">
                    What Clients
                    <br />
                    &amp; Peers <span className="outline">Say</span>
                </div>
                <p
                    style={{
                        fontSize: '15px',
                        color: 'var(--light-gray)',
                        maxWidth: '520px',
                        marginTop: '16px',
                        lineHeight: 1.8,
                    }}
                >
                    Trusted by data teams, government agencies, and startups to deliver
                    measurable analytics impact.
                </p>

                {loading ? (
                    <div className="loading-wrap" style={{ gridColumn: 'span 3' }}>
                        <div className="loading-spinner"></div>
                    </div>
                ) : (
                    <div className="testimonials-grid">
                        {testimonials.map((t) => (
                            <div className="testi-card" key={t.id}>
                                <div className="testi-quote">&ldquo;</div>
                                <div className="stars">{'★'.repeat(t.rating || 5)}</div>
                                <div className="testi-text">{t.text}</div>
                                <div className="testi-author">
                                    <div className="testi-avatar">
                                        {t.name?.charAt(0)?.toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="testi-name">{t.name}</div>
                                        <div className="testi-role">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* CTA */}
                <div
                    style={{
                        marginTop: '80px',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <div style={{ textAlign: 'center', maxWidth: '500px' }}>
                        <div
                            style={{
                                fontFamily: "'Bebas Neue',sans-serif",
                                fontSize: '48px',
                                marginBottom: '16px',
                            }}
                        >
                            Work with Me
                        </div>
                        <p
                            style={{
                                color: 'var(--light-gray)',
                                fontSize: '15px',
                                marginBottom: '32px',
                            }}
                        >
                            Join the growing list of clients who&apos;ve transformed their data
                            strategy.
                        </p>
                        <Link
                            href="/contact"
                            className="btn-primary"
                            style={{ fontSize: '14px', padding: '18px 40px' }}
                        >
                            Start a Conversation →
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
