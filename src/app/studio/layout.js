// Studio layout — overrides root layout completely for Sanity Studio
// This prevents Navbar, GlowOrbs, and other website components from appearing in Studio
export default function StudioLayout({ children }) {
    return children;
}
