import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { media } from 'sanity-plugin-media';
import { schemaTypes } from './src/sanity/schemaTypes/index';
import { structure } from './src/sanity/structure';

export default defineConfig({
    name: 'regi-portfolio',
    title: 'Regi Muhammar — Portfolio CMS',

    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    basePath: '/studio', // ← tells Studio it lives at /studio

    plugins: [
        structureTool({ structure }),
        media(),
    ],

    schema: {
        types: schemaTypes,
    },
});
