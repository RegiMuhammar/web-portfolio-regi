// Schema: Author
export default {
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Full Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'name', maxLength: 96 },
        },
        {
            name: 'role',
            title: 'Role / Title',
            description: 'e.g. Data Analyst & AI Engineer',
            type: 'string',
        },
        {
            name: 'photo',
            title: 'Profile Photo',
            description: 'Profile avatar. Ideal aspect ratio is 1:1 square (e.g., 500x500 px).',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'bio',
            title: 'Bio',
            type: 'text',
            rows: 4,
        },
        {
            name: 'expertise',
            title: 'Areas of Expertise',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    'Business Intelligence',
                    'Data Analytics',
                    'Analytics Engineering',
                    'Data Engineering',
                    'AI & Machine Learning',
                    'AI Agent',
                    'Automation',
                    'Data Visualization',
                ],
                layout: 'grid',
            },
        },
        {
            name: 'linkedinUrl',
            title: 'LinkedIn URL',
            type: 'url',
        },
        {
            name: 'githubUrl',
            title: 'GitHub URL',
            type: 'url',
        },
        {
            name: 'websiteUrl',
            title: 'Website URL',
            type: 'url',
        },
    ],
    preview: {
        select: { title: 'name', subtitle: 'role', media: 'photo' },
    },
};
