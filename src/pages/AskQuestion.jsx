import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import Navbar from '../components/Navbar';
import './Auth.css';

function AskQuestion() {
  const titleDom = useRef();
  const descriptionDom = useRef();
  const tagDom = useRef();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const title = titleDom.current.value;
    const description = descriptionDom.current.value;
    const tag = tagDom.current.value;

    if (!title || !description) {
      alert('Please provide a title and description');
      return;
    }

    try {
      await axios.post('/questions/', { title, description, tag });
      alert('Question posted successfully');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.msg || 'Something went wrong!');
      console.log(error.response);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="auth-page" style={{ gap: 0 }}>
        <form className="auth-card" onSubmit={handleSubmit} style={{ width: '600px' }}>
          <h1>Ask a question</h1>
          <p className="auth-sub">Be specific — the clearer your question, the better the answers.</p>

          <div className="auth-field">
            <input ref={titleDom} type="text" placeholder="Question title" />
          </div>

          <div className="auth-field">
            <textarea
              ref={descriptionDom}
              placeholder="Describe your question in detail"
              rows={6}
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
              }}
            />
          </div>

          <div className="auth-field">
            <input ref={tagDom} type="text" placeholder="Tag (optional, e.g. javascript)" />
          </div>

          <button className="auth-submit" type="submit">Post question</button>
        </form>
      </div>
    </div>
  );
}

export default AskQuestion;
