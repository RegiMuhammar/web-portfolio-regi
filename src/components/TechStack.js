import { SectionHeader } from '@/components/design-system';

const techs = [
    'Python', 'BigQuery', 'dbt', 'Airflow', 'PostgreSQL', 'TensorFlow',
    'LangChain', 'FastAPI', 'PySpark', 'Looker Studio', 'Power BI', 'Docker',
    'ChromaDB', 'MLFlow', 'Scikit-learn', 'n8n', 'GCP', 'AWS',
];

export default function TechStack() {
    return (
        <section className="section">
            <SectionHeader
                eyebrow="Tech Arsenal"
                title="Tools &"
                accent="Technologies"
                description="The stack I use to ship reliable analytics, automation, and AI systems."
            />
            <div className="tech-grid">
                {techs.map((tech) => (
                    <div className="tech-item reveal" key={tech}>
                        <div className="tech-name">{tech}</div>
                        <div className="tech-dot"></div>
                    </div>
                ))}
            </div>
        </section>
    );
}
