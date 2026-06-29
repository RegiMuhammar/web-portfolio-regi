export default {
    name: 'bodyImage',
    title: 'Image with Caption',
    type: 'image',
    options: { hotspot: true },
    fields: [
        {
            name: 'caption',
            title: 'Caption',
            type: 'string',
        },
        {
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
        },
    ],
    preview: {
        select: {
            media: 'asset',
        },
        prepare({ media }) {
            return {
                title: 'Image with Caption',
                media,
            };
        },
    },
};
