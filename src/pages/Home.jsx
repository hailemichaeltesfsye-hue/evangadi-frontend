import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axiosConfig';
import Navbar from '../components/Navbar';
import '../pages/Auth.css';

function Home() {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState('');
  const username = localStorage.getItem('username');

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const { data } = await axios.get('/questions/all-questions');
        setQuestions(data.questions);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetchQuestions();
  }, []);

  const filtered = questions.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      <div className="qpage-toolbar">
        <span className="welcome-pill">Welcome, {username || 'Guest'}</span>
        <Link to="/ask">
          <button className="ask-btn">Ask a question</button>
        </Link>
      </div>

      <div className="qpage-search">
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={{ padding: '0 64px 64px', maxWidth: '900px' }}>
        {filtered.length === 0 && (
          <p style={{ color: 'var(--muted)' }}>No questions yet. Be the first to ask one.</p>
        )}

        {filtered.map((q) => (
          <Link
            to={`/question/${q.questionid}`}
            key={q.questionid}
            style={{ textDecoration: 'none' }}
          >
            <div
              style={{
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '18px 20px',
                marginBottom: '14px',
              }}
            >
              <h3 style={{ margin: '0 0 6px', color: 'var(--navy)', fontSize: '18px' }}>
                {q.title}
              </h3>
              <p style={{ margin: '0 0 8px', color: 'var(--muted)', fontSize: '14px' }}>
                {q.description}
              </p>
              <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: 'var(--muted)' }}>
                <span>Asked by {q.username}</span>
                {q.tag && <span style={{ color: 'var(--orange)' }}>#{q.tag}</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
