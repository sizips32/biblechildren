import { Canvas } from '@react-three/fiber';

function Character({ character, onClick, selected }) {
    // 인물별 색상 또는 텍스처
    const colorMap = {
        adam: '#ffb3b3',
        noah: '#b3d1ff',
        abraham: '#ffe0b3',
        moses: '#b3ffd1',
        david: '#d1b3ff',
        daniel: '#ffd1b3'
    };
    // 텍스처 예시 (이미지 파일이 있다면)
    // const texture = useTexture(`/assets/${character.id}.png`);

    return (
        <mesh
            position={character.position}
            onClick={() => onClick(character.id)}
            scale={selected ? 1.3 : 1}
            castShadow
            receiveShadow
        >
            <sphereGeometry args={[1, 48, 48]} />
            <meshStandardMaterial
                color={colorMap[character.id] || 'skyblue'}
                metalness={0.5}
                roughness={0.2}
                // map={texture} // 텍스처를 쓸 경우
                emissive={selected ? colorMap[character.id] : '#222'}
                emissiveIntensity={selected ? 0.2 : 0}
            />
        </mesh>
    );
}

export default function World3D({ characters, selectedId, onCharacterClick }) {
    return (
        <Canvas camera={{ position: [10, 10, 30] }} style={{ height: '260px', background: 'none' }} shadows>
            <ambientLight intensity={0.7} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
            {characters.map((char) => (
                <Character
                    key={char.id}
                    character={char}
                    onClick={onCharacterClick}
                    selected={char.id === selectedId}
                />
            ))}
            {/* 바닥 그림자 효과 */}
            <mesh receiveShadow position={[10, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial color="#222" transparent opacity={0.1} />
            </mesh>
        </Canvas>
    );
} 
