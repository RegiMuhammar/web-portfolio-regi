// Schema: Blog Post
// Categories: BI, Data Analytics, Analytics Engineering, Data Engineering, AI & LLM, AI Agent, Automation

export default {
    name: 'post',
    title: 'Blog Post',
    type: 'document',
    fields: [
        // ─── Basic Info ───────────────────────────────────────────────────
        {
            name: 'title',
            title: 'Title',
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
            name: 'excerpt',
            title: 'Excerpt',
            description: 'Short summary shown on blog cards and used for SEO (max 300 chars)',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required().max(300),
        },
        {
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'author' }],
        },

        // ─── Categorization ───────────────────────────────────────────────
        {
            name: 'category',
            title: 'Primary Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Business Intelligence', value: 'Business Intelligence' },
                    { title: 'Data Analytics', value: 'Data Analytics' },
                    { title: 'Analytics Engineering', value: 'Analytics Engineering' },
                    { title: 'Data Engineering', value: 'Data Engineering' },
                    { title: 'AI & LLM', value: 'AI & LLM' },
                    { title: 'AI Agent', value: 'AI Agent' },
                    { title: 'Automation', value: 'Automation' },
                    { title: 'Career & Learning', value: 'Career & Learning' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'tags',
            title: 'Tags',
            description: 'Granular topics (e.g. RAG, dbt, Airflow, LangChain, Power BI, BigQuery)',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        },
        {
            name: 'relatedTopics',
            title: 'Related Topics / Keywords',
            description: 'For AI Agent context — key concepts covered in this article',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    // BI & Analytics
                    'Looker Studio', 'Power BI', 'Tableau', 'Metabase', 'Superset',
                    'Dashboard Design', 'KPI', 'Reporting',
                    // Data Engineering
                    'ETL', 'ELT', 'Apache Airflow', 'dbt', 'BigQuery', 'PostgreSQL',
                    'Data Pipeline', 'Data Warehouse', 'Data Lake', 'Spark', 'Kafka',
                    'Cloud Storage', 'GCP', 'AWS', 'Azure',
                    // Analytics Engineering
                    'dbt Core', 'dbt Cloud', 'Data Modeling', 'Data Mart',
                    // AI & ML
                    'Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'XGBoost',
                    'Time Series', 'Forecasting', 'Classification', 'Regression',
                    'Computer Vision', 'NLP',
                    // LLM & AI Agent
                    'LLM', 'RAG', 'LangChain', 'LlamaIndex', 'OpenAI', 'Gemini',
                    'AI Agent', 'Multi-Agent', 'Function Calling', 'Embeddings',
                    'Vector Database', 'Pinecone', 'ChromaDB', 'Weaviate',
                    'Prompt Engineering', 'Fine-tuning',
                    // Automation
                    'n8n', 'Make', 'Zapier', 'RPA', 'Workflow Automation',
                    'Google Apps Script', 'Python Automation',
                ],
                layout: 'tags',
            },
        },

        // ─── Media ────────────────────────────────────────────────────────
        {
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
                { name: 'alt', title: 'Alt Text', type: 'string' },
            ],
        },

        // ─── Rich Content ─────────────────────────────────────────────────
        {
            name: 'body',
            title: 'Article Body',
            description: 'Full article content (Portable Text — supports headings, images, code, tables)',
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
                    lists: [
                        { title: 'Bullet', value: 'bullet' },
                        { title: 'Numbered', value: 'number' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                            { title: 'Code', value: 'code' },
                            { title: 'Underline', value: 'underline' },
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'Link',
                                fields: [
                                    { name: 'href', type: 'url', title: 'URL' },
                                    {
                                        name: 'blank',
                                        type: 'boolean',
                                        title: 'Open in new tab',
                                        initialValue: true,
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        { name: 'caption', title: 'Caption', type: 'string' },
                        { name: 'alt', title: 'Alt Text', type: 'string' },
                    ],
                },
                {
                    type: 'object',
                    name: 'codeBlock',
                    title: 'Code Block',
                    fields: [
                        {
                            name: 'language',
                            title: 'Language',
                            type: 'string',
                            options: {
                                list: [
                                    'python', 'sql', 'javascript', 'typescript',
                                    'bash', 'yaml', 'json', 'dockerfile',
                                    'markdown', 'r',
                                ],
                            },
                        },
                        { name: 'code', title: 'Code', type: 'text' },
                        { name: 'filename', title: 'Filename (optional)', type: 'string' },
                        { name: 'highlightedLines', title: 'Highlighted Lines (comma-separated)', type: 'string' },
                    ],
                    preview: {
                        select: { title: 'filename', subtitle: 'language' },
                        prepare({ title, subtitle }) {
                            return { title: title || 'Code Block', subtitle: subtitle };
                        },
                    },
                },
                {
                    type: 'object',
                    name: 'callout',
                    title: 'Callout Box',
                    fields: [
                        {
                            name: 'type',
                            title: 'Type',
                            type: 'string',
                            options: {
                                list: [
                                    { title: '💡 Tip', value: 'tip' },
                                    { title: '⚠️ Warning', value: 'warning' },
                                    { title: 'ℹ️ Info', value: 'info' },
                                    { title: '🔑 Key Insight', value: 'insight' },
                                ],
                            },
                        },
                        { name: 'content', title: 'Content', type: 'text' },
                    ],
                },
            ],
        },

        // ─── Publication & SEO ────────────────────────────────────────────
        {
            name: 'published',
            title: 'Published?',
            type: 'boolean',
            initialValue: false,
        },
        {
            name: 'featured',
            title: 'Featured Post?',
            description: 'Shown at top of blog page in featured section',
            type: 'boolean',
            initialValue: false,
        },
        {
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
        },
        {
            name: 'readingTime',
            title: 'Reading Time (minutes)',
            type: 'number',
        },
        {
            name: 'seoTitle',
            title: 'SEO Title (override)',
            description: 'Leave blank to use post title',
            type: 'string',
        },
        {
            name: 'seoDescription',
            title: 'SEO Meta Description',
            description: 'Leave blank to use excerpt',
            type: 'text',
            rows: 2,
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
            media: 'coverImage',
        },
    },
};
