import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import ProfilePage from './Pages/ProfilePage/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App;
