import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';
import Navbar from '../components/Navbar';
import './Auth.css';

function QuestionDetail() {
  const { question_id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const answerDom = useRef();

  async function fetchData() {
    try {
      const [qRes, aRes] = await Promise.all([
        axios.get(`/questions/${question_id}`),
        axios.get(`/answers/${question_id}`),
      ]);
      setQuestion(qRes.data.question);
      setAnswers(aRes.data.answers);
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    fetchData();
  }, [question_id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const answer = answerDom.current.value;

    if (!answer) {
      alert('Please write an answer first');
      return;
    }

    try {
      await axios.post('/answers/', { questionid: question_id, answer });
      answerDom.current.value = '';
      fetchData();
    } catch (error) {
      alert(error.response?.data?.msg || 'Something went wrong!');
    }
  }

  if (!question) {
    return (
      <div>
        <Navbar />
        <p style={{ padding: '40px 64px' }}>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div style={{ padding: '40px 64px', maxWidth: '800px' }}>
        <h1 style={{ color: 'var(--navy)', marginBottom: '4px' }}>{question.title}</h1>
        <p style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '20px' }}>
          Asked by {question.username} {question.tag && `· #${question.tag}`}
        </p>
        <p style={{ fontSize: '15px', lineHeight: 1.6, marginBottom: '32px' }}>
          {question.description}
        </p>

        <h3 style={{ color: 'var(--navy)' }}>{answers.length} Answer{answers.length !== 1 ? 's' : ''}</h3>

        {answers.map((a) => (
          <div
            key={a.answerid}
            style={{
              borderTop: '1px solid var(--border)',
              padding: '16px 0',
            }}
          >
            <p style={{ fontSize: '15px', marginBottom: '6px' }}>{a.answer}</p>
            <p style={{ fontSize: '13px', color: 'var(--muted)' }}>— {a.username}</p>
          </div>
        ))}

        <form onSubmit={handleSubmit} style={{ marginTop: '32px' }}>
          <h3 style={{ color: 'var(--navy)' }}>Your answer</h3>
          <textarea
            ref={answerDom}
            placeholder="Write your answer..."
            rows={4}
            style={{
              width: '100%',
              padding: '13px 14px',
              fontSize: '15px',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
              resize: 'vertical',
              marginBottom: '12px',
            }}
          />
          <button className="auth-submit" type="submit" style={{ width: 'auto', padding: '11px 24px' }}>
            Post answer
          </button>
        </form>
      </div>
    </div>
  );
}

export default QuestionDetail;
