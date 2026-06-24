// Custom Sanity Studio sidebar structure
export const structure = (S) =>
    S.list()
        .title('Content')
        .items([
            // ── Singleton: About/Profile ─────────────────────────
            S.listItem()
                .title('About / Profile')
                .id('about')
                .child(
                    S.document()
                        .schemaType('about')
                        .documentId('singleton-about')
                        .title('About / Profile')
                ),

            S.divider(),

            // ── Portfolio Projects ────────────────────────────────
            S.listItem()
                .title('Portfolio Projects')
                .schemaType('project')
                .child(S.documentTypeList('project').title('Portfolio Projects')),

            // ── Blog Posts ────────────────────────────────────────
            S.listItem()
                .title('Blog Posts')
                .schemaType('post')
                .child(S.documentTypeList('post').title('Blog Posts')),

            S.divider(),

            // ── Authors ───────────────────────────────────────────
            S.listItem()
                .title('Authors')
                .schemaType('author')
                .child(S.documentTypeList('author').title('Authors')),
        ]);
