// Portfolio Page — Server Component
// Fetches data from Sanity at request time, passes to PortfolioClient for filtering
import { getProjects } from '@/lib/sanity';
import PortfolioClient from './PortfolioClient';

export const metadata = {
    title: 'Portfolio — Regi Muhammar',
    description: 'Data & AI projects — dashboards, ML models, AI agents, data engineering, and automation.',
};

export default async function PortfolioPage() {
    const projects = await getProjects();
    return <PortfolioClient projects={projects} />;
}
