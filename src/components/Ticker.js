const skills = [
    'AI & Machine Learning',
    'Deep Learning',
    'Data Engineering',
    'LLM & RAG Systems',
    'Dashboard Analytics',
    'BigQuery & dbt',
    'Data Management & Governance',
    'NLP & Computer Vision',
    'ETL Pipelines',
];

export default function Ticker() {
    // Duplicate items so the ticker loops seamlessly
    const items = [...skills, ...skills];

    return (
        <div className="ticker-section">
            <div className="ticker-track">
                {items.map((skill, i) => (
                    <span className="ticker-item" key={i}>
                        <span>✦</span> {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}
