import { SectionHeader } from '@/components/design-system';
import { DbtIcon, Dbt } from "@dev.icons/react";

const techs = [
    {
        name: 'Python',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    },
    {
        name: 'BigQuery',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg',
    },
    {
        name: 'dbt',
        icon: 'https://raw.githubusercontent.com/dbt-labs/dbt-styleguide/refs/heads/master/_includes/icons/dbt-logo-full.svg',
    },
    {
        name: 'Airflow',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apacheairflow/apacheairflow-original.svg',
    },
    {
        name: 'PostgreSQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
    },
    {
        name: 'TensorFlow',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
    },
    {
        name: 'LangChain',
        icon: 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/langchain-color.svg',
    },
    {
        name: 'FastAPI',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
    },
    {
        name: 'PySpark',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original.svg',
    },
    {
        name: 'Looker Studio',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg',
    },
    {
        name: 'Power BI',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg',
    },
    {
        name: 'Docker',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
    },
    {
        name: 'Scikit-learn',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg',
    },
    {
        name: 'n8n',
        icon: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/n8n.svg',
    },
    {
        name: 'GCP',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg',
    },
    {
        name: 'AWS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
    },
    {
        name: 'MLFlow',
        icon: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/ml-flow-wordmark.svg',
    },
    {
        name: 'ChromaDB',
        icon: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/chroma.svg',
    },
];

export default function TechStack() {
    return (
        <section className="section">
            <SectionHeader
                title="Tools & Technologies"
                description="The stack I use to ship reliable analytics, automation, and AI systems."
            />
            <div className="tech-grid">
                {techs.map((tech) => (
                    <div className="tech-item reveal" key={tech.name}>
                        <div className="tech-icon">
                            {tech.component ? (
                                tech.component
                            ) : (
                                <img
                                    src={tech.icon}
                                    alt={tech.name}
                                    width={32}
                                    height={32}
                                    loading="lazy"
                                />
                            )}
                        </div>
                        <div className="tech-name">{tech.name}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
