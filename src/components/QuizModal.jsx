import { useState } from 'react';
import { quizzes } from '../data/quizzes';

export default function QuizModal({ characterId, onClose }) {
    const [step, setStep] = useState(0);
    const [result, setResult] = useState(null);
    const quizList = quizzes[characterId];
    const quiz = quizList[step];

    function handleAnswer(idx) {
        if (idx === quiz.answer) {
            setResult('정답입니다!');
        } else {
            setResult('틀렸어요. 다시 시도해보세요.');
        }
    }

    function handleNext() {
        setResult(null);
        if (step < quizList.length - 1) {
            setStep(step + 1);
        } else {
            onClose();
        }
    }

    return (
        <div className="modal" style={{
            position: 'absolute', top: 120, left: 40, background: 'white',
            padding: 32, borderRadius: 16, boxShadow: '0 2px 16px #0003', zIndex: 20, minWidth: 340
        }}>
            <div style={{ marginBottom: 8, fontWeight: 'bold', color: '#b71c1c' }}>
                난이도: {quiz.level}
            </div>
            <div style={{ marginBottom: 8, color: '#888', fontSize: 15 }}>
                📖 {quiz.verse}
            </div>
            <h3 style={{ margin: '12px 0' }}>{quiz.question}</h3>
            {quiz.options.map((opt, idx) => (
                <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    style={{
                        display: 'block', margin: '8px 0', width: '100%',
                        background: '#f0f4fa', border: '1px solid #ddd', borderRadius: 8, padding: 10, fontSize: 16
                    }}
                    disabled={!!result}
                >
                    {opt}
                </button>
            ))}
            {result && (
                <div style={{ margin: '16px 0', color: result === '정답입니다!' ? '#388e3c' : '#d32f2f', fontWeight: 'bold' }}>
                    {result}
                </div>
            )}
            <div style={{ marginTop: 8, color: '#b71c1c', fontSize: 14 }}>
                📖 {quiz.verse}
            </div>
            <div style={{ marginTop: 16 }}>
                {result && (
                    <button onClick={handleNext} style={{
                        background: '#b71c1c', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 'bold'
                    }}>
                        {step < quizList.length - 1 ? '다음 문제' : '퀴즈 종료'}
                    </button>
                )}
                <button onClick={onClose} style={{
                    marginLeft: 12, background: '#888', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px'
                }}>
                    닫기
                </button>
            </div>
        </div>
    );
} 
