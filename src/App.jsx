import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AskQuestion from './pages/AskQuestion';
import QuestionDetail from './pages/QuestionDetail';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/ask' element={<ProtectedRoute><AskQuestion /></ProtectedRoute>} />
        <Route path='/question/:question_id' element={<ProtectedRoute><QuestionDetail /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
