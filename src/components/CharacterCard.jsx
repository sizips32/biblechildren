import './CharacterCard.css';

export default function CharacterCard({ character }) {
    if (!character) return null;
    return (
        <div className="character-card">
            <div className="character-img">
                <img src={character.image} alt={character.name} />
            </div>
            <div className="character-info">
                <h2>{character.name}</h2>
                <p>{character.year}</p>
                <p>{character.description}</p>
                <div className="character-tags">
                    {character.tags?.map(tag => (
                        <span className="tag" key={tag}>{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
} 
