import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

/**
 * GradientPillButton — Rounded pill CTA with red-to-orange gradient glow.
 * Use `size="large"` for hero/CTA banner contexts.
 * Renders as <Link> when `href` is provided, <button> otherwise.
 */
export function GradientPillButton({ href, children, className = '', size = 'default', icon = true }) {
    const sizeClass = size === 'large' ? 'btn-gradient-pill--lg' : '';
    const classes = `btn-gradient-pill ${sizeClass} ${className}`.trim();

    const content = (
        <>
            <span>{children}</span>
            {icon && <ArrowRight size={size === 'large' ? 20 : 17} strokeWidth={2} />}
        </>
    );

    if (href) {
        return (
            <Link href={href} className={classes}>
                {content}
            </Link>
        );
    }

    return <button className={classes}>{content}</button>;
}

export function GradientButton({ href, children, className = '', size = 'default' }) {
    const content = (
        <>
            <span>{children}</span>
            <ArrowUpRight size={size === 'large' ? 19 : 16} strokeWidth={2.2} />
        </>
    );

    const classes = `btn-primary gradient-button ${size === 'large' ? 'gradient-button-large' : ''} ${className}`.trim();

    if (href) {
        return (
            <Link href={href} className={classes}>
                {content}
            </Link>
        );
    }

    return <button className={classes}>{content}</button>;
}

export function SectionHeader({
    eyebrow,
    title,
    accent,
    description,
    align = 'left',
    className = '',
}) {
    return (
        <div className={`section-header section-header-${align} ${className}`.trim()}>
            {eyebrow && <div className="section-label">{eyebrow}</div>}
            <h2 className="section-title">
                {title}
                {accent && (
                    <>
                        <br />
                        <span className="gradient-text-white reflected-stroke">{accent}</span>
                    </>
                )}
            </h2>
            {description && <p className="section-description">{description}</p>}
        </div>
    );
}

export function SurfaceCard({ children, className = '', as: Component = 'div', ...props }) {
    return (
        <Component className={`surface-card ${className}`.trim()} {...props}>
            {children}
        </Component>
    );
}
