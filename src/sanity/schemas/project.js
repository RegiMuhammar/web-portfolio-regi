// Schema: Portfolio Project
// Covers: BI, Data Analytics, Analytics Engineering, Data Engineering, AI, AI Agent, Automation

export default {
    name: 'project',
    title: 'Portfolio Project',
    type: 'document',
    fields: [
        // ─── Basic Info ───────────────────────────────────────────────────
        {
            name: 'title',
            title: 'Project Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Short Description',
            description: 'Displayed on portfolio cards (max 200 chars)',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required().max(200),
        },

        // ─── Categorization ───────────────────────────────────────────────
        {
            name: 'category',
            title: 'Primary Category',
            description: 'Used for filtering on portfolio page',
            type: 'string',
            options: {
                list: [
                    { title: 'Dashboard & BI', value: 'dashboard' },
                    { title: 'Machine Learning', value: 'ml' },
                    { title: 'AI & LLM', value: 'ai' },
                    { title: 'AI Agent', value: 'ai-agent' },
                    { title: 'Data Engineering', value: 'data-engineering' },
                    { title: 'Analytics Engineering', value: 'analytics-engineering' },
                    { title: 'Analytics', value: 'analytics' },
                    { title: 'Automation', value: 'automation' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'domain',
            title: 'Domain Tags',
            description: 'All relevant domains this project touches (multi-select)',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Business Intelligence', value: 'Business Intelligence' },
                    { title: 'Data Analytics', value: 'Data Analytics' },
                    { title: 'Analytics Engineering', value: 'Analytics Engineering' },
                    { title: 'Data Engineering', value: 'Data Engineering' },
                    { title: 'AI & Machine Learning', value: 'AI & Machine Learning' },
                    { title: 'AI Agent', value: 'AI Agent' },
                    { title: 'Automation', value: 'Automation' },
                    { title: 'Data Visualization', value: 'Data Visualization' },
                    { title: 'NLP & Text Analytics', value: 'NLP & Text Analytics' },
                    { title: 'Computer Vision', value: 'Computer Vision' },
                    { title: 'Data Warehouse', value: 'Data Warehouse' },
                    { title: 'Data Pipeline', value: 'Data Pipeline' },
                ],
                layout: 'grid',
            },
        },
        {
            name: 'tags',
            title: 'Tags',
            description: 'Fine-grained tags (e.g. RAG, LLM, ETL, BigQuery, dbt)',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        },

        // ─── Context & Impact ─────────────────────────────────────────────
        {
            name: 'client',
            title: 'Client / Company',
            type: 'string',
        },
        {
            name: 'industry',
            title: 'Industry',
            type: 'string',
            options: {
                list: [
                    'E-Commerce',
                    'Government / Public Sector',
                    'Telecommunications',
                    'Agriculture',
                    'Real Estate',
                    'Film & Entertainment',
                    'Finance',
                    'Healthcare',
                    'Education',
                    'Retail',
                    'Manufacturing',
                    'Internal / Personal',
                ],
            },
        },
        {
            name: 'impact',
            title: 'Quantitative Impact',
            description: 'Key result with numbers (e.g. "Reduced reporting time by 80%")',
            type: 'text',
            rows: 2,
        },
        {
            name: 'outcomes',
            title: 'Key Outcomes',
            description: 'List of bullet-point outcomes for this project',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        },
        {
            name: 'role',
            title: 'My Role',
            description: 'e.g. Lead Data Engineer, Solo Developer',
            type: 'string',
        },
        {
            name: 'teamSize',
            title: 'Team Size',
            type: 'number',
        },
        {
            name: 'projectDuration',
            title: 'Project Duration',
            description: 'e.g. "3 months", "Ongoing"',
            type: 'string',
        },

        // ─── Technical Details ────────────────────────────────────────────
        {
            name: 'techStack',
            title: 'Tech Stack',
            description: 'Technologies used (e.g. Python, BigQuery, dbt, Airflow)',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        },
        {
            name: 'tools',
            title: 'Tools & Platforms',
            description: 'Platforms/tools (e.g. Looker Studio, Vertex AI, LangChain)',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        },
        {
            name: 'categories',
            title: 'Service Categories (for card display)',
            description: 'Used in FeaturedProjects card labels',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        },

        // ─── Media ────────────────────────────────────────────────────────
        {
            name: 'thumbnail',
            title: 'Thumbnail Image',
            description: 'Shown on portfolio grid cards. Ideal aspect ratio is 16:10 (e.g., 960x600 px or 800x500 px).',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'bannerImage',
            title: 'Banner Image',
            description: 'Shown at top of project detail page. Ideal aspect ratio is wide landscape / 16:9 (e.g., 1920x1080 px or 1200x675 px).',
            type: 'image',
            options: { hotspot: true },
        },

        // ─── Rich Content ─────────────────────────────────────────────────
        {
            name: 'body',
            title: 'Project Body / Case Study',
            description: 'Full case study content (rich text with headings, images, code blocks)',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                            { title: 'Code', value: 'code' },
                        ],
                    },
                },
                {
                    // Backward compat: existing data uses _type 'image'
                    type: 'image',
                    options: { hotspot: true },
                },
                {
                    type: 'bodyImage',
                },
                {
                    type: 'object',
                    name: 'codeBlock',
                    title: 'Code Block',
                    fields: [
                        { name: 'language', title: 'Language', type: 'string' },
                        { name: 'code', title: 'Code', type: 'text' },
                        { name: 'filename', title: 'Filename (optional)', type: 'string' },
                    ],
                },
            ],
        },

        // ─── Links ────────────────────────────────────────────────────────
        {
            name: 'liveUrl',
            title: 'Live Demo URL',
            type: 'url',
        },
        {
            name: 'githubUrl',
            title: 'GitHub URL',
            type: 'url',
        },
        {
            name: 'caseStudyUrl',
            title: 'External Case Study URL',
            type: 'url',
        },

        // ─── Publication ──────────────────────────────────────────────────
        {
            name: 'isFeatured',
            title: 'Featured on Homepage?',
            type: 'boolean',
            initialValue: false,
        },
        {
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
        },
    ],
    orderings: [
        {
            title: 'Published Date, Newest',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'category',
            media: 'thumbnail',
        },
    },
};
