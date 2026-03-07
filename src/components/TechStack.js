const techs = [
    'Python', 'BigQuery', 'dbt', 'Airflow', 'PostgreSQL', 'TensorFlow',
    'LangChain', 'FastAPI', 'PySpark', 'Looker Studio', 'Power BI', 'Docker',
    'ChromaDB', 'MLFlow', 'Scikit-learn', 'n8n', 'GCP', 'AWS',
];

export default function TechStack() {
    return (
        <section className="section">
            <div className="section-label reveal">Tech Arsenal</div>
            <div className="section-title reveal">
                Tools &amp; <span className="outline">Technologies</span>
            </div>
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
