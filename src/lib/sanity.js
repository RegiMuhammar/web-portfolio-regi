import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

// ─── Sanity Client ────────────────────────────────────────────────────────────
export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-06-24',
    useCdn: true, // true = cached CDN responses (faster), false = real-time
    token: process.env.SANITY_API_TOKEN, // only used server-side for writes
});

// ─── Image URL Builder ────────────────────────────────────────────────────────
const builder = createImageUrlBuilder(client);

/**
 * Generate an optimized image URL from a Sanity image reference.
 * Usage: urlFor(image).width(800).url()
 */
export function urlFor(source) {
    if (!source || (typeof source === 'object' && !source.asset)) {
        return {
            width: () => ({
                height: () => ({
                    url: () => ''
                }),
                url: () => ''
            }),
            height: () => ({
                width: () => ({
                    url: () => ''
                }),
                url: () => ''
            }),
            url: () => ''
        };
    }
    return builder.image(source);
}

// ─── GROQ Query Helpers ───────────────────────────────────────────────────────

/** Fetch all published projects */
export async function getProjects() {
    return client.fetch(
        `*[_type == "project"] | order(publishedAt desc) {
            _id,
            title,
            "slug": slug.current,
            description,
            category,
            domain,
            tags,
            categories,
            techStack,
            tools,
            industry,
            client,
            impact,
            isFeatured,
            publishedAt,
            thumbnail,
            liveUrl,
            githubUrl,
        }`
    );
}

/** Fetch featured projects for homepage */
export async function getFeaturedProjects() {
    return client.fetch(
        `*[_type == "project" && isFeatured == true] | order(publishedAt desc)[0..2] {
            _id,
            title,
            "slug": slug.current,
            description,
            category,
            domain,
            categories,
            techStack,
            tools,
            impact,
            thumbnail,
            liveUrl,
            githubUrl,
        }`
    );
}

/** Fetch a single project by slug */
export async function getProjectBySlug(slug) {
    return client.fetch(
        `*[_type == "project" && slug.current == $slug][0] {
            _id,
            title,
            "slug": slug.current,
            description,
            category,
            domain,
            tags,
            categories,
            techStack,
            tools,
            client,
            industry,
            impact,
            outcomes,
            role,
            teamSize,
            projectDuration,
            body,
            thumbnail,
            bannerImage,
            liveUrl,
            githubUrl,
            caseStudyUrl,
            publishedAt,
        }`,
        { slug }
    );
}

/** Fetch all project slugs (for generateStaticParams) */
export async function getAllProjectSlugs() {
    return client.fetch(`*[_type == "project"]{ "slug": slug.current }`);
}

/** Fetch related projects (same category, excluding current) */
export async function getRelatedProjects(category, excludeSlug) {
    return client.fetch(
        `*[_type == "project" && category == $category && slug.current != $excludeSlug] | order(publishedAt desc)[0..2] {
            _id,
            title,
            "slug": slug.current,
            description,
            category,
            thumbnail,
        }`,
        { category, excludeSlug }
    );
}

// ─────────────────────────────────────────────────────────────────────────────

/** Fetch all published blog posts */
export async function getPosts() {
    return client.fetch(
        `*[_type == "post" && published == true] | order(publishedAt desc) {
            _id,
            title,
            "slug": slug.current,
            excerpt,
            category,
            tags,
            coverImage,
            featured,
            publishedAt,
            readingTime,
            author->{ name, photo },
        }`
    );
}

/** Fetch a single blog post by slug */
export async function getPostBySlug(slug) {
    return client.fetch(
        `*[_type == "post" && slug.current == $slug && published == true][0] {
            _id,
            title,
            "slug": slug.current,
            excerpt,
            category,
            tags,
            relatedTopics,
            coverImage,
            body,
            featured,
            publishedAt,
            readingTime,
            seoTitle,
            seoDescription,
            author->{ name, role, photo, bio },
        }`,
        { slug }
    );
}

/** Fetch all post slugs (for generateStaticParams) */
export async function getAllPostSlugs() {
    return client.fetch(`*[_type == "post" && published == true]{ "slug": slug.current }`);
}

/** Fetch related posts (same category, excluding current) */
export async function getRelatedPosts(category, excludeSlug) {
    return client.fetch(
        `*[_type == "post" && category == $category && published == true && slug.current != $excludeSlug] | order(publishedAt desc)[0..2] {
            _id,
            title,
            "slug": slug.current,
            excerpt,
            category,
            coverImage,
            publishedAt,
            readingTime,
        }`,
        { category, excludeSlug }
    );
}

// ─────────────────────────────────────────────────────────────────────────────

/** Fetch the About/Profile singleton document */
export async function getAbout() {
    return client.fetch(
        `*[_type == "about"][0] {
            name,
            role,
            tagline,
            photo,
            introParagraph,
            bio,
            highlights,
            timeline,
            skillGroups,
            achievements,
            linkedinUrl,
            githubUrl,
            email,
        }`
    );
}
