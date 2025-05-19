import './Timeline.css';

export default function Timeline({ characters, selectedId, onSelect }) {
    return (
        <div className="timeline">
            {characters.map((char, idx) => (
                <div key={char.id} className="timeline-item">
                    <div
                        className={`timeline-dot${selectedId === char.id ? ' active' : ''}`}
                        onClick={() => onSelect(char.id)}
                    />
                    <div className="timeline-label">
                        {char.name} <br />({char.year})
                    </div>
                    {idx < characters.length - 1 && <div className="timeline-line" />}
                </div>
            ))}
        </div>
    );
} 
