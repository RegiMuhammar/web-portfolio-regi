// Schema: About / Profile
// Provides AI Agent context on Regi's career, skills, and achievements.
// This is a singleton document (only one "about" doc should exist).

export default {
    name: 'about',
    title: 'About / Profile',
    type: 'document',
    fields: [
        // ─── Identity ─────────────────────────────────────────────────────
        {
            name: 'name',
            title: 'Full Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'role',
            title: 'Primary Role / Title',
            type: 'string',
        },
        {
            name: 'tagline',
            title: 'Tagline',
            description: 'Short one-liner shown under the name',
            type: 'string',
        },
        {
            name: 'photo',
            title: 'Profile Photo',
            description: 'Main profile photo on the About page. Ideal aspect ratio is 3:4 portrait (e.g., 600x800 px or 1200x1600 px).',
            type: 'image',
            options: { hotspot: true },
        },

        // ─── Bio ──────────────────────────────────────────────────────────
        {
            name: 'introParagraph',
            title: 'Intro Paragraph',
            description: 'Short intro shown prominently on About page',
            type: 'text',
            rows: 3,
        },
        {
            name: 'bio',
            title: 'Full Bio',
            description: 'Detailed bio in Portable Text',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H3', value: 'h3' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                        ],
                    },
                },
            ],
        },

        // ─── Key Stats ────────────────────────────────────────────────────
        {
            name: 'highlights',
            title: 'Key Stats / Highlights',
            description: 'Numbers shown in the About page stats grid',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'number', title: 'Number / Value', type: 'string', description: 'e.g. "50", "3.86", "80"' },
                        { name: 'suffix', title: 'Suffix', type: 'string', description: 'e.g. "+", "%", "rd"' },
                        { name: 'label', title: 'Label', type: 'string', description: 'e.g. "Dashboard Pages Built"' },
                    ],
                    preview: {
                        select: { title: 'label', subtitle: 'number' },
                    },
                },
            ],
        },

        // ─── Experience Timeline ──────────────────────────────────────────
        {
            name: 'timeline',
            title: 'Career & Education Timeline',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'period',
                            title: 'Period',
                            type: 'string',
                            description: 'e.g. "Sep 2024 — Feb 2026"',
                        },
                        {
                            name: 'role',
                            title: 'Role / Position',
                            type: 'string',
                        },
                        {
                            name: 'company',
                            title: 'Company / Institution',
                            type: 'string',
                        },
                        {
                            name: 'location',
                            title: 'Location',
                            type: 'string',
                        },
                        {
                            name: 'type',
                            title: 'Type',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Full-time', value: 'fulltime' },
                                    { title: 'Part-time', value: 'parttime' },
                                    { title: 'Internship', value: 'internship' },
                                    { title: 'Education', value: 'education' },
                                    { title: 'Bootcamp / Program', value: 'bootcamp' },
                                    { title: 'Freelance', value: 'freelance' },
                                ],
                            },
                        },
                        {
                            name: 'description',
                            title: 'Description',
                            type: 'text',
                            rows: 4,
                            description: 'Key responsibilities and achievements',
                        },
                        {
                            name: 'skills',
                            title: 'Skills Demonstrated',
                            type: 'array',
                            of: [{ type: 'string' }],
                            options: { layout: 'tags' },
                        },
                    ],
                    preview: {
                        select: { title: 'role', subtitle: 'company' },
                    },
                },
            ],
        },

        // ─── Skills & Expertise ───────────────────────────────────────────
        {
            name: 'skillGroups',
            title: 'Skill Groups',
            description: 'Group skills by domain for AI context',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'domain',
                            title: 'Domain',
                            type: 'string',
                            description: 'e.g. "Data Engineering", "AI & LLM"',
                        },
                        {
                            name: 'skills',
                            title: 'Skills / Tools',
                            type: 'array',
                            of: [{ type: 'string' }],
                            options: { layout: 'tags' },
                        },
                    ],
                    preview: {
                        select: { title: 'domain' },
                    },
                },
            ],
        },

        // ─── Achievements ─────────────────────────────────────────────────
        {
            name: 'achievements',
            title: 'Awards & Certifications',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'type',
                            title: 'Type',
                            type: 'string',
                            options: {
                                list: [
                                    { title: '🏆 Award', value: 'award' },
                                    { title: '📜 Certification', value: 'certification' },
                                    { title: '🎓 Academic', value: 'academic' },
                                ],
                            },
                        },
                        { name: 'title', title: 'Title', type: 'string' },
                        { name: 'issuer', title: 'Issuer / Organization', type: 'string' },
                        { name: 'year', title: 'Year', type: 'string' },
                        {
                            name: 'highlight',
                            title: 'Highlight (show in orange)?',
                            type: 'boolean',
                            initialValue: false,
                        },
                        { name: 'credentialUrl', title: 'Credential URL', type: 'url' },
                    ],
                    preview: {
                        select: { title: 'title', subtitle: 'issuer' },
                    },
                },
            ],
        },

        // ─── Social / Contact ─────────────────────────────────────────────
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
            name: 'email',
            title: 'Contact Email',
            type: 'string',
        },
    ],
    preview: {
        select: { title: 'name', subtitle: 'role', media: 'photo' },
    },
};
