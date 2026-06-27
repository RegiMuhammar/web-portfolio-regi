'use client';

import { useState } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function ContactPage() {
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(null); // null | true | false

    async function handleSubmit(e) {
        e.preventDefault();
        setSending(true);
        setSuccess(null);

        const form = e.target;
        const payload = {
            name: form.name.value,
            email: form.email.value,
            subject: form.subject.value,
            message: form.message.value,
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                setSuccess(true);
                form.reset();
                setTimeout(() => setSuccess(null), 5000);
            } else {
                setSuccess(false);
            }
        } catch {
            setSuccess(false);
        } finally {
            setSending(false);
        }
    }

    return (
        <div style={{ paddingTop: '64px' }}>
            <section className="section" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%'
            }}>
                {/* Available for work badge at the top */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(232, 80, 2, 0.06)',
                    border: '1px solid rgba(232, 80, 2, 0.15)',
                    padding: '6px 14px',
                    borderRadius: '100px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--orange)',
                    marginBottom: '20px',
                    width: 'fit-content'
                }}>
                    <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'var(--orange)',
                        animation: 'pulse 2s infinite',
                        flexShrink: 0
                    }}></span>
                    Available for Work
                </div>

                <div className="section-title" style={{ textAlign: 'center' }}>
                    Let&apos;s Build
                    <br />
                    Something <span className="outline">Great</span>
                </div>

                <p style={{
                    fontSize: '16px',
                    color: 'var(--light-gray)',
                    lineHeight: '1.8',
                    marginBottom: '40px',
                    maxWidth: '650px',
                    textAlign: 'center'
                }}>
                    Whether you need a complete data pipeline, an AI chatbot, or
                    insights from your existing data — I&apos;d love to hear about your
                    challenge.
                </p>

                {/* Form and Social Links wrapped in a max-width container */}
                <div style={{ maxWidth: '800px', width: '100%' }}>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <input
                                    className="form-input"
                                    name="name"
                                    type="text"
                                    placeholder="Your full name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    className="form-input"
                                    name="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Subject</label>
                            <input
                                className="form-input"
                                name="subject"
                                type="text"
                                placeholder="e.g. Dashboard Project, ML Consultation"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Message</label>
                            <textarea
                                className="form-textarea"
                                name="message"
                                placeholder="Tell me about your project, data challenge, or what you'd like to explore..."
                                required
                            ></textarea>
                        </div>

                        {success === true && (
                            <div
                                className="form-success"
                                style={{
                                    display: 'block',
                                    background: 'rgba(46, 213, 115, 0.1)',
                                    color: '#2ed573',
                                    borderColor: 'rgba(46, 213, 115, 0.3)',
                                }}
                            >
                                ✓ Message sent! I&apos;ll get back to you within 24 hours.
                            </div>
                        )}
                        {success === false && (
                            <div
                                className="form-success"
                                style={{
                                    display: 'block',
                                    background: 'rgba(255, 71, 87, 0.1)',
                                    color: '#ff4757',
                                    borderColor: 'rgba(255, 71, 87, 0.3)',
                                }}
                            >
                                ✗ Failed to send. Please email me directly.
                            </div>
                        )}

                        <button
                            className="btn-primary"
                            type="submit"
                            disabled={sending}
                            style={{
                                fontSize: '14px',
                                padding: '18px 32px',
                                border: 'none',
                                width: 'fit-content',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                            }}
                        >
                            {sending ? (
                                <>
                                    <span
                                        className="loading-spinner"
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                            border: '2px solid rgba(255, 255, 255, 0.25)',
                                            borderTopColor: '#ffffff',
                                            flexShrink: 0,
                                        }}
                                    ></span>
                                    Sending...
                                </>
                            ) : (
                                'Send Message →'
                            )}
                        </button>
                    </form>

                    {/* Social links grid 2x2 */}
                    <div className="contact-links" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '16px',
                        marginTop: '40px'
                    }}>
                        <a className="contact-link" href="mailto:regimuhammar@gmail.com">
                            <div className="contact-link-icon">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                            </div>
                            <div>
                                <div className="contact-link-text">Email</div>
                                <div className="contact-link-val">regimuhammar@gmail.com</div>
                            </div>
                        </a>
                        <a
                            className="contact-link"
                            href="https://linkedin.com/in/regimuhammar"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="contact-link-icon">
                                <svg
                                    width="18"
                                    height="18"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                            </div>
                            <div>
                                <div className="contact-link-text">LinkedIn</div>
                                <div className="contact-link-val">
                                    linkedin.com/in/regimuhammar
                                </div>
                            </div>
                        </a>
                        <a
                            className="contact-link"
                            href="https://github.com/regimuhammar"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="contact-link-icon">
                                <svg
                                    width="18"
                                    height="18"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                </svg>
                            </div>
                            <div>
                                <div className="contact-link-text">GitHub</div>
                                <div className="contact-link-val">
                                    github.com/regimuhammar
                                </div>
                            </div>
                        </a>
                        <div className="contact-link">
                            <div className="contact-link-icon">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div>
                                <div className="contact-link-text">Location</div>
                                <div className="contact-link-val">Pekanbaru, Indonesia</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
