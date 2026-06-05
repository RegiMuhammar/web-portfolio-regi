const techs = [
    'Python',
    'BigQuery',
    'dbt',
    'Airflow',
    'PostgreSQL',
    'TensorFlow',
    'LangChain',
    'FastAPI',
    'PySpark',
    'Looker Studio',
    'Power BI',
    'Docker',
    'ChromaDB',
    'MLFlow',
    'Scikit-learn',
    'n8n',
    'GCP',
    'AWS',
];

export default function Ticker() {
    const items = [...techs, ...techs];

    return (
        <div className="ticker-section">
            <div className="ticker-track">
                {items.map((tech, i) => (
                    <span className="ticker-item" key={i}>
                        <span>/</span> {tech}
                    </span>
                ))}
            </div>
        </div>
    );
}
