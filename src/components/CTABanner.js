import { GradientButton } from '@/components/design-system';

export default function CTABanner() {
    return (
        <section className="cta-banner">
            <div className="cta-copy">
                <div className="section-label">Open to Work</div>
                <h2 className="cta-title">
                    Ready to transform
                    <span className="gradient-text-white"> your data strategy?</span>
                </h2>
                <p>
                    From ML pipelines to executive dashboards, let&apos;s build a system
                    that makes decisions easier.
                </p>
            </div>
            <GradientButton href="/contact" size="large">
                Start a Conversation
            </GradientButton>
        </section>
    );
}
