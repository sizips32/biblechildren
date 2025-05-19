export default function CharacterOverlay({ character, onClose, onQuiz }) {
    if (!character) return null;
    return (
        <div className="overlay" style={{ position: 'absolute', top: 40, left: 40, background: 'rgba(255,255,255,0.95)', padding: 24, borderRadius: 12, boxShadow: '0 2px 8px #0002', zIndex: 10 }}>
            <img src={character.image} alt={character.name} style={{ width: 80, height: 80, objectFit: 'contain' }} />
            <h2>{character.name}</h2>
            <p>{character.year}</p>
            <p>{character.description}</p>
            <button onClick={() => onQuiz(character.id)} style={{ marginRight: 8 }}>퀴즈 풀기</button>
            <button onClick={onClose}>닫기</button>
        </div>
    );
} 
