import { useState, useEffect } from 'react';
import Timeline from './components/Timeline';
import CharacterCard from './components/CharacterCard';
import { bibleCharacters as rawCharacters } from './data/bibleCharacters';
import { quizzes } from './data/quizzes';

// 태그 추가 예시 (실제 데이터에 맞게 조정)
const bibleCharacters = rawCharacters.map(char => ({
    ...char,
    tags: char.tags || (
        char.id === 'adam' ? ['창세기', '첫 인간', '에덴동산'] :
            char.id === 'noah' ? ['방주', '대홍수', '믿음'] :
                char.id === 'abraham' ? ['믿음', '약속', '이삭의 아버지'] :
                    char.id === 'moses' ? ['출애굽', '십계명', '지도자'] :
                        char.id === 'david' ? ['왕', '골리앗', '시편'] :
                            char.id === 'daniel' ? ['포로', '사자굴', '신앙'] : []
    )
}));

// 성경구절 본문 예시(실제 서비스라면 별도 데이터로 관리)
const bibleVerses = {
    '창세기 2:7-8': '여호와 하나님이 땅의 흙으로 사람을 지으시고 생기를 그 코에 불어넣으시니 사람이 생령이 되니라. 여호와 하나님이 동방에 에덴에 동산을 창설하시고 그 지으신 사람을 거기 두시고',
    '창세기 2:17': '선악을 알게 하는 나무의 열매는 먹지 말라 네가 먹는 날에는 반드시 죽으리라 하시니라',
    '창세기 2:23': '아담이 이르되 이는 내 뼈 중의 뼈요 살 중의 살이라 이것을 남자에게서 취하였은즉 여자라 부르리라 하니라',
    '창세기 6:14': '너는 고페르 나무로 너를 위하여 방주를 만들되',
    '창세기 7:9': '암수 둘씩 노아에게 나아와 방주로 들어갔으니',
    '창세기 8:20': '노아가 여호와께 제단을 쌓고',
    '창세기 21:3': '아브라함이 그에게 태어난 아들 곧 사라가 자기에게 낳은 아들을 이름하여 이삭이라 하였고',
    '창세기 22:2': '네 아들 이삭을 데리고 모리아 땅으로 가서',
    '창세기 12:1': '여호와께서 아브람에게 이르시되 너는 너의 고향과 친척과 아버지의 집을 떠나 내가 네게 보여 줄 땅으로 가라',
    '출애굽기 12:51': '바로 그 날에 여호와께서 이스라엘 자손을 그 군대대로 애굽 땅에서 인도하여 내셨더라',
    '출애굽기 31:18': '여호와께서 신의 산 위에서 모세에게 이르시기를 마치신 때에 증거판 둘을 모세에게 주시니',
    '출애굽기 15:1': '이 때에 모세와 이스라엘 자손이 이 노래로 여호와께 노래하니라',
    '사무엘상 17:49': '다윗이 손을 주머니에 넣어 돌을 가지고 물매로 던져 블레셋 사람의 이마를 침에',
    '사무엘하 2:4': '유다 사람들이 와서 거기서 다윗에게 기름을 부어 유다 족속의 왕으로 삼았더라',
    '시편 23:1': '여호와는 나의 목자시니 내게 부족함이 없으리로다',
    '다니엘 6:22': '나의 하나님이 이미 그의 천사를 보내어 사자들의 입을 봉하셨으므로',
    '다니엘 1:8': '다니엘은 뜻을 정하여 왕의 진미와 그가 마시는 포도주로 자기를 더럽히지 아니하리라',
    '다니엘 2:31-32': '왕이여 왕이 한 큰 신상을 보셨나이다 그 신상이 크고 광채가 매우 찬란하며 그 모양이 심히 두려우니',
};

export default function App() {
    const [selectedId, setSelectedId] = useState(bibleCharacters[0].id);
    const selectedChar = bibleCharacters.find(c => c.id === selectedId);
    const [quizStep, setQuizStep] = useState(0);
    const [quizResult, setQuizResult] = useState(null);

    useEffect(() => {
        setQuizStep(0);
        setQuizResult(null);
    }, [selectedId]);

    const quizList = quizzes[selectedId];
    const quiz = quizList[quizStep];
    const verseText = bibleVerses[quiz.verse] || '';

    function handleAnswer(idx) {
        if (idx === quiz.answer) setQuizResult('정답입니다!');
        else setQuizResult('틀렸어요. 다시 시도해보세요.');
    }

    function handleNext() {
        setQuizResult(null);
        if (quizStep < quizList.length - 1) setQuizStep(quizStep + 1);
        else setQuizStep(0); // 마지막 문제 후 처음으로
    }

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #b71c1c 0%, #2a2734 100%)', padding: 0 }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 0 24px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <h1 style={{ color: '#fff', textAlign: 'center', fontWeight: 700, fontSize: '2.8rem', marginBottom: 8 }}>성경 시간선 탐험</h1>
                <p style={{ color: '#fff', textAlign: 'center', fontSize: '1.2rem', marginBottom: 32 }}>성경의 주요 인물들을 시간순으로 만나보세요</p>
                <Timeline characters={bibleCharacters} selectedId={selectedId} onSelect={setSelectedId} />
                {/* 인물 정보 카드: 중간에 배치 */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CharacterCard character={selectedChar} />
                </div>
                {/* 퀴즈 영역: 화면 맨 아래 */}
                <div style={{ background: '#181624', borderRadius: 24, padding: 32, margin: '0 0 32px 0', minHeight: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <div style={{ marginBottom: 8, fontWeight: 'bold', color: '#b71c1c', fontSize: 18 }}>
                        난이도: {quiz.level}
                    </div>
                    <div style={{ marginBottom: 8, color: '#888', fontSize: 15 }}>
                        📖 {quiz.verse}
                    </div>
                    <div style={{ marginBottom: 12, color: '#fff', fontSize: 15, background: '#222', borderRadius: 8, padding: 12, width: '100%', maxWidth: 600 }}>
                        {verseText}
                    </div>
                    <h3 style={{ margin: '12px 0', color: '#fff' }}>{quiz.question}</h3>
                    {quiz.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            style={{
                                display: 'block', margin: '8px 0', width: 320,
                                background: '#f0f4fa', border: '1px solid #ddd', borderRadius: 8, padding: 10, fontSize: 16
                            }}
                            disabled={!!quizResult}
                        >
                            {opt}
                        </button>
                    ))}
                    {quizResult && (
                        <div style={{ margin: '16px 0', color: quizResult === '정답입니다!' ? '#388e3c' : '#d32f2f', fontWeight: 'bold' }}>
                            {quizResult}
                        </div>
                    )}
                    <div style={{ marginTop: 8, color: '#b71c1c', fontSize: 14 }}>
                        📖 {quiz.verse}
                    </div>
                    <div style={{ marginTop: 16 }}>
                        {quizResult && (
                            <button onClick={handleNext} style={{
                                background: '#b71c1c', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 'bold', marginRight: 8
                            }}>
                                {quizStep < quizList.length - 1 ? '다음 문제' : '처음부터'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 
